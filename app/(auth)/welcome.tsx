import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ButtonText,
  Pressable,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { APP_CONFIG } from '../../constants'

export default function WelcomeScreen() {
  return (
    <Box flex={1} bg="$surface50">
      <StatusBar style="dark" />
      
      {/* Hero Section */}
      <VStack flex={1} justifyContent="center" alignItems="center" px="$6" space="lg">
        {/* App Logo/Icon */}
        <Box 
          width="$32" 
          height="$32" 
          borderRadius="$full" 
          bg="$primary500" 
          justifyContent="center" 
          alignItems="center"
          mb="$4"
        >
          <Text color="white" fontSize="$4xl" fontWeight="bold">
            🌊
          </Text>
        </Box>

        {/* App Branding */}
        <VStack space="sm" alignItems="center">
          <Text fontSize="$4xl" fontWeight="bold" color="$surface900">
            {APP_CONFIG.NAME}
          </Text>
          <Text fontSize="$lg" color="$surface600" textAlign="center">
            Social platform for freedivers and spearfishers
          </Text>
        </VStack>

        {/* Value Proposition */}
        <VStack space="sm" alignItems="center" mt="$8" mb="$12">
          <Text fontSize="$sm" color="$surface700" textAlign="center" px="$4">
            Track your dives, connect with the community, and explore the ocean like never before
          </Text>
        </VStack>
      </VStack>

      {/* Authentication Options */}
      <VStack space="md" px="$6" pb="$12">
        {/* Primary CTA - Sign Up */}
        <Button 
          size="lg" 
          bg="$primary500" 
          onPress={() => router.push('/(auth)/register')}
        >
          <ButtonText color="white" fontWeight="semibold">
            Get Started
          </ButtonText>
        </Button>

        {/* Secondary CTA - Sign In */}
        <Button 
          size="lg" 
          variant="outline" 
          borderColor="$primary500"
          onPress={() => router.push('/(auth)/login')}
        >
          <ButtonText color="$primary500" fontWeight="semibold">
            Sign In
          </ButtonText>
        </Button>

        {/* Alternative OAuth Options Preview */}
        <HStack justifyContent="center" alignItems="center" space="md" mt="$4">
          <Box height="$px" flex={1} bg="$surface300" />
          <Text fontSize="$sm" color="$surface500">
            or continue with
          </Text>
          <Box height="$px" flex={1} bg="$surface300" />
        </HStack>

        <HStack space="md" justifyContent="center" mt="$2">
          <Pressable 
            onPress={() => router.push('/(auth)/login?provider=google')}
            borderRadius="$lg"
            bg="$surface100"
            p="$3"
            borderWidth="$1"
            borderColor="$surface300"
          >
            <Text fontSize="$lg">🔍</Text>
          </Pressable>
          
          <Pressable 
            onPress={() => router.push('/(auth)/login?provider=apple')}
            borderRadius="$lg"
            bg="$surface100"
            p="$3"
            borderWidth="$1"
            borderColor="$surface300"
          >
            <Text fontSize="$lg">🍎</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Box>
  )
}