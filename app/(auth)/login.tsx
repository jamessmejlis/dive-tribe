import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  Pressable,
  Spinner,
  KeyboardAvoidingView,
  ScrollView,
} from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'
import { Platform } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { COLORS } from '../../constants'
import { useAuthStore } from '../../stores/auth.store'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const [authError, setAuthError] = useState<string | null>(null)
  const params = useLocalSearchParams()
  const provider = params.provider as string
  
  const { signIn, signInWithGoogle, signInWithApple, isLoading } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null)

    const result = await signIn(data.email, data.password)
    
    if (result.success) {
      router.replace('/(tabs)')
    } else {
      setAuthError(result.error || 'Sign in failed. Please try again.')
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    setAuthError(null)

    let result
    if (provider === 'google') {
      result = await signInWithGoogle()
    } else {
      result = await signInWithApple()
    }
    
    if (result.success) {
      router.replace('/(tabs)')
    } else {
      setAuthError(result.error || `Failed to sign in with ${provider}. Please try again.`)
    }
  }

  return (
    <KeyboardAvoidingView 
      flex={1} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Box flex={1} bg="$surface50">
        <StatusBar style="dark" />
        
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <HStack alignItems="center" px="$4" pt="$12" pb="$6">
            <Pressable 
              onPress={() => router.back()}
              p="$2"
              mr="$2"
            >
              <ChevronLeft size={24} color={COLORS.DIVE_BLUE} />
            </Pressable>
            <Text fontSize="$xl" fontWeight="semibold" color="$surface900">
              Sign In
            </Text>
          </HStack>

          <VStack space="lg" px="$6" pb="$6">
            {/* OAuth Options */}
            {!provider && (
              <VStack space="md">
                <Button 
                  size="lg" 
                  variant="outline"
                  borderColor="$surface300"
                  onPress={() => handleOAuthLogin('google')}
                  isDisabled={isLoading}
                >
                  <HStack space="sm" alignItems="center">
                    <Text fontSize="$lg">🔍</Text>
                    <ButtonText color="$surface700">
                      Continue with Google
                    </ButtonText>
                  </HStack>
                </Button>

                {Platform.OS === 'ios' && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    borderColor="$surface300"
                    onPress={() => handleOAuthLogin('apple')}
                    isDisabled={isLoading}
                  >
                    <HStack space="sm" alignItems="center">
                      <Text fontSize="$lg">🍎</Text>
                      <ButtonText color="$surface700">
                        Continue with Apple
                      </ButtonText>
                    </HStack>
                  </Button>
                )}

                <HStack justifyContent="center" alignItems="center" space="md" my="$4">
                  <Box height="$px" flex={1} bg="$surface300" />
                  <Text fontSize="$sm" color="$surface500">
                    or sign in with email
                  </Text>
                  <Box height="$px" flex={1} bg="$surface300" />
                </HStack>
              </VStack>
            )}

            {/* Email/Password Form */}
            <VStack space="md">
              {/* Email Input */}
              <FormControl isInvalid={!!errors.email}>
                <FormControlLabel>
                  <Text fontSize="$sm" fontWeight="medium" color="$surface700">
                    Email
                  </Text>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
                <FormControlError>
                  <FormControlErrorText>
                    {errors.email?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Password Input */}
              <FormControl isInvalid={!!errors.password}>
                <FormControlLabel>
                  <Text fontSize="$sm" fontWeight="medium" color="$surface700">
                    Password
                  </Text>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="Enter your password"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
                <FormControlError>
                  <FormControlErrorText>
                    {errors.password?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Forgot Password Link */}
              <HStack justifyContent="flex-end">
                <Pressable onPress={() => router.push('/(auth)/reset-password')}>
                  <Text fontSize="$sm" color="$primary500" fontWeight="medium">
                    Forgot password?
                  </Text>
                </Pressable>
              </HStack>
            </VStack>

            {/* Error Message */}
            {authError && (
              <Box 
                bg="$safety500" 
                p="$3" 
                borderRadius="$md"
                opacity={0.1}
              >
                <Text fontSize="$sm" color="$safety500" textAlign="center">
                  {authError}
                </Text>
              </Box>
            )}

            {/* Sign In Button */}
            <Button 
              size="lg" 
              bg="$primary500"
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid || isLoading}
              mt="$4"
            >
              {isLoading ? (
                <HStack space="sm" alignItems="center">
                  <Spinner color="white" size="small" />
                  <ButtonText color="white">Signing In...</ButtonText>
                </HStack>
              ) : (
                <ButtonText color="white" fontWeight="semibold">
                  Sign In
                </ButtonText>
              )}
            </Button>

            {/* Sign Up Link */}
            <HStack justifyContent="center" space="xs" mt="$6">
              <Text fontSize="$sm" color="$surface600">
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push('/(auth)/register')}>
                <Text fontSize="$sm" color="$primary500" fontWeight="medium">
                  Sign up
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  )
}