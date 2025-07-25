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
import { router } from 'expo-router'
import { Platform } from 'react-native'
import { ChevronLeft, CheckCircle } from 'lucide-react-native'
import { COLORS } from '../../constants'
import { useAuthStore } from '../../stores/auth.store'

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ResetFormData = z.infer<typeof resetSchema>

export default function ResetPasswordScreen() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const { resetPassword, isLoading } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: ResetFormData) => {
    setAuthError(null)

    const result = await resetPassword(data.email)
    
    if (result.success) {
      setIsSuccess(true)
    } else {
      setAuthError(result.error || 'Failed to send reset email. Please try again.')
    }
  }

  if (isSuccess) {
    return (
      <Box flex={1} bg="$surface50">
        <StatusBar style="dark" />
        
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
            Check Your Email
          </Text>
        </HStack>

        <VStack flex={1} justifyContent="center" alignItems="center" px="$6" space="lg">
          {/* Success Icon */}
          <Box 
            width="$20" 
            height="$20" 
            borderRadius="$full" 
            bg="$achievement500" 
            justifyContent="center" 
            alignItems="center"
            opacity={0.1}
          >
            <CheckCircle size={48} color={COLORS.ACHIEVEMENT_GREEN} />
          </Box>

          {/* Success Message */}
          <VStack space="sm" alignItems="center">
            <Text fontSize="$2xl" fontWeight="bold" color="$surface900" textAlign="center">
              Reset Link Sent
            </Text>
            <Text fontSize="$md" color="$surface600" textAlign="center" px="$4">
              We've sent a password reset link to{'\n'}
              <Text fontWeight="medium">{getValues('email')}</Text>
            </Text>
          </VStack>

          {/* Instructions */}
          <VStack space="sm" alignItems="center" mt="$4">
            <Text fontSize="$sm" color="$surface700" textAlign="center" px="$2">
              Check your email and click the link to reset your password. 
              The link will expire in 24 hours.
            </Text>
          </VStack>
        </VStack>

        {/* Actions */}
        <VStack space="md" px="$6" pb="$12">
          <Button 
            size="lg" 
            bg="$primary500"
            onPress={() => router.push('/(auth)/login')}
          >
            <ButtonText color="white" fontWeight="semibold">
              Back to Sign In
            </ButtonText>
          </Button>

          <HStack justifyContent="center" space="xs">
            <Text fontSize="$sm" color="$surface600">
              Didn't receive the email?
            </Text>
            <Pressable onPress={() => setIsSuccess(false)}>
              <Text fontSize="$sm" color="$primary500" fontWeight="medium">
                Try again
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    )
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
              Reset Password
            </Text>
          </HStack>

          <VStack space="lg" px="$6" pb="$6">
            {/* Instructions */}
            <VStack space="sm">
              <Text fontSize="$lg" fontWeight="semibold" color="$surface900">
                Forgot your password?
              </Text>
              <Text fontSize="$md" color="$surface600" lineHeight="$lg">
                Enter your email address and we'll send you a link to reset your password.
              </Text>
            </VStack>

            {/* Email Form */}
            <VStack space="md" mt="$6">
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

            {/* Send Reset Button */}
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
                  <ButtonText color="white">Sending...</ButtonText>
                </HStack>
              ) : (
                <ButtonText color="white" fontWeight="semibold">
                  Send Reset Link
                </ButtonText>
              )}
            </Button>

            {/* Back to Sign In Link */}
            <HStack justifyContent="center" space="xs" mt="$6">
              <Text fontSize="$sm" color="$surface600">
                Remember your password?
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