import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ButtonText,
  Pressable,
  Spinner,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { Mail, CheckCircle, RefreshCw } from 'lucide-react-native'
import { COLORS } from '../../constants'
import { useAuthStore } from '../../stores/auth.store'

export default function VerifyEmailScreen() {
  const [resendCooldown, setResendCooldown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  
  const { resendEmailVerification, user, isLoading } = useAuthStore()

  // Simulate cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendEmail = async () => {
    if (!user?.email) return

    const result = await resendEmailVerification(user.email)
    
    if (result.success) {
      setResendCooldown(60) // 60 second cooldown
    } else {
      console.error('Failed to resend verification email:', result.error)
    }
  }

  const handleCheckVerification = async () => {
    try {
      console.log('Checking verification status')
      
      // For production, this should refresh the user session to check email_confirmed_at
      // For now, we'll simulate the check and navigate to tabs
      setIsVerified(true)
      
      // Navigate to app after brief delay to show success state
      setTimeout(() => {
        router.replace('/(tabs)')
      }, 2000)
    } catch (error) {
      console.error('Failed to check verification status:', error)
    }
  }

  if (isVerified) {
    return (
      <Box flex={1} bg="$surface50" justifyContent="center" alignItems="center">
        <StatusBar style="dark" />
        
        <VStack space="lg" alignItems="center" px="$6">
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
              Email Verified!
            </Text>
            <Text fontSize="$md" color="$surface600" textAlign="center">
              Welcome to DiveTribe. Taking you to the app...
            </Text>
          </VStack>

          <Spinner color={COLORS.DIVE_BLUE} size="large" />
        </VStack>
      </Box>
    )
  }

  return (
    <Box flex={1} bg="$surface50">
      <StatusBar style="dark" />
      
      <VStack flex={1} justifyContent="center" alignItems="center" px="$6" space="lg">
        {/* Email Icon */}
        <Box 
          width="$20" 
          height="$20" 
          borderRadius="$full" 
          bg="$primary500" 
          justifyContent="center" 
          alignItems="center"
          opacity={0.1}
        >
          <Mail size={48} color={COLORS.DIVE_BLUE} />
        </Box>

        {/* Main Message */}
        <VStack space="sm" alignItems="center">
          <Text fontSize="$2xl" fontWeight="bold" color="$surface900" textAlign="center">
            Check Your Email
          </Text>
          <Text fontSize="$md" color="$surface600" textAlign="center" px="$4">
            We've sent you a verification email. Click the link in the email to verify your account.
          </Text>
        </VStack>

        {/* Instructions */}
        <VStack space="sm" alignItems="center" mt="$4">
          <Text fontSize="$sm" color="$surface700" textAlign="center" px="$2">
            Can't find the email? Check your spam folder or try resending.
          </Text>
        </VStack>

        {/* Action Buttons */}
        <VStack space="md" width="100%" mt="$8">
          <Button 
            size="lg" 
            bg="$primary500"
            onPress={handleCheckVerification}
          >
            <HStack space="sm" alignItems="center">
              <RefreshCw size={20} color="white" />
              <ButtonText color="white" fontWeight="semibold">
                I've Verified My Email
              </ButtonText>
            </HStack>
          </Button>

          <Button 
            size="lg" 
            variant="outline"
            borderColor="$primary500"
            onPress={handleResendEmail}
            isDisabled={isLoading || resendCooldown > 0}
          >
            {isLoading ? (
              <HStack space="sm" alignItems="center">
                <Spinner color={COLORS.DIVE_BLUE} size="small" />
                <ButtonText color="$primary500">Sending...</ButtonText>
              </HStack>
            ) : resendCooldown > 0 ? (
              <ButtonText color="$surface400">
                Resend in {resendCooldown}s
              </ButtonText>
            ) : (
              <ButtonText color="$primary500" fontWeight="semibold">
                Resend Email
              </ButtonText>
            )}
          </Button>
        </VStack>
      </VStack>

      {/* Footer Actions */}
      <VStack space="md" px="$6" pb="$12">
        <HStack justifyContent="center" space="xs">
          <Text fontSize="$sm" color="$surface600">
            Wrong email address?
          </Text>
          <Pressable onPress={() => router.back()}>
            <Text fontSize="$sm" color="$primary500" fontWeight="medium">
              Go back
            </Text>
          </Pressable>
        </HStack>

        <HStack justifyContent="center" space="xs">
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
    </Box>
  )
}