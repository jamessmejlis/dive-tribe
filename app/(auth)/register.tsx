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
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { Platform } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { COLORS } from '../../constants'
import { useAuthStore } from '../../stores/auth.store'

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const [authError, setAuthError] = useState<string | null>(null)
  
  const { signUp, signInWithGoogle, signInWithApple, isLoading } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null)

    const result = await signUp(data.email, data.password)
    
    if (result.success) {
      if (result.needsVerification) {
        router.push('/(auth)/verify-email')
      } else {
        router.replace('/(tabs)')
      }
    } else {
      setAuthError(result.error || 'Failed to create account. Please try again.')
    }
  }

  const handleOAuthRegister = async (provider: 'google' | 'apple') => {
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
      setAuthError(result.error || `Failed to sign up with ${provider}. Please try again.`)
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
              Create Account
            </Text>
          </HStack>

          <VStack space="lg" px="$6" pb="$6">
            {/* OAuth Options */}
            <VStack space="md">
              <Button 
                size="lg" 
                variant="outline"
                borderColor="$surface300"
                onPress={() => handleOAuthRegister('google')}
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
                  onPress={() => handleOAuthRegister('apple')}
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
                  or create with email
                </Text>
                <Box height="$px" flex={1} bg="$surface300" />
              </HStack>
            </VStack>

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
                        placeholder="Create a password (8+ characters)"
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

              {/* Confirm Password Input */}
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormControlLabel>
                  <Text fontSize="$sm" fontWeight="medium" color="$surface700">
                    Confirm Password
                  </Text>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="Confirm your password"
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
                    {errors.confirmPassword?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Terms and Conditions */}
              <FormControl isInvalid={!!errors.acceptTerms}>
                <Controller
                  control={control}
                  name="acceptTerms"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      size="sm"
                      isChecked={value}
                      onChange={onChange}
                      alignItems="flex-start"
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel flex={1}>
                        <Text fontSize="$sm" color="$surface700">
                          I agree to the{' '}
                          <Text color="$primary500" fontWeight="medium">
                            Terms of Service
                          </Text>
                          {' '}and{' '}
                          <Text color="$primary500" fontWeight="medium">
                            Privacy Policy
                          </Text>
                        </Text>
                      </CheckboxLabel>
                    </Checkbox>
                  )}
                />
                <FormControlError>
                  <FormControlErrorText>
                    {errors.acceptTerms?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
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

            {/* Create Account Button */}
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
                  <ButtonText color="white">Creating Account...</ButtonText>
                </HStack>
              ) : (
                <ButtonText color="white" fontWeight="semibold">
                  Create Account
                </ButtonText>
              )}
            </Button>

            {/* Sign In Link */}
            <HStack justifyContent="center" space="xs" mt="$6">
              <Text fontSize="$sm" color="$surface600">
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text fontSize="$sm" color="$primary500" fontWeight="medium">
                  Sign in
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  )
}