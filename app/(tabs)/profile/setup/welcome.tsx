import React from 'react'
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  ButtonText,
  Box,
  SafeAreaView,
  ScrollView,
  Center
} from '@gluestack-ui/themed'
import { router } from 'expo-router'

export default function ProfileSetupWelcome() {
  const handleGetStarted = () => {
    router.push('/profile/setup/basic-info')
  }

  const handleSkipForNow = () => {
    router.push('/(tabs)/')
  }

  return (
    <SafeAreaView flex={1} bg="$surface50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} padding="$6" justifyContent="space-between">
          {/* Header */}
          <VStack space="lg" alignItems="center" paddingTop="$8">
            <Center>
              <Box
                width={120}
                height={120}
                borderRadius="$full"
                bg="$primary100"
                alignItems="center"
                justifyContent="center"
                marginBottom="$4"
              >
                <Text fontSize="$4xl" color="$primary500">🏊‍♂️</Text>
              </Box>
            </Center>

            <VStack space="md" alignItems="center">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
                textAlign="center"
              >
                Welcome to DiveTribe!
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                textAlign="center"
                lineHeight="$2xl"
                maxWidth={280}
              >
                Let's set up your diving profile so you can connect with the community and track your underwater adventures.
              </Text>
            </VStack>
          </VStack>

          {/* Features List */}
          <VStack space="lg" marginVertical="$8">
            <Text 
              fontSize="$xl" 
              fontWeight="$semibold" 
              color="$surface800"
              textAlign="center"
              marginBottom="$2"
            >
              What you'll set up:
            </Text>

            <VStack space="md">
              <HStack space="md" alignItems="center" paddingHorizontal="$2">
                <Box
                  width={8}
                  height={8}
                  borderRadius="$full"
                  bg="$primary500"
                />
                <Text fontSize="$md" color="$surface700" flex={1}>
                  Display name and profile photo
                </Text>
              </HStack>

              <HStack space="md" alignItems="center" paddingHorizontal="$2">
                <Box
                  width={8}
                  height={8}
                  borderRadius="$full"
                  bg="$primary500"
                />
                <Text fontSize="$md" color="$surface700" flex={1}>
                  Diving experience and certifications
                </Text>
              </HStack>

              <HStack space="md" alignItems="center" paddingHorizontal="$2">
                <Box
                  width={8}
                  height={8}
                  borderRadius="$full"
                  bg="$primary500"
                />
                <Text fontSize="$md" color="$surface700" flex={1}>
                  Gear list and diving goals
                </Text>
              </HStack>

              <HStack space="md" alignItems="center" paddingHorizontal="$2">
                <Box
                  width={8}
                  height={8}
                  borderRadius="$full"
                  bg="$primary500"
                />
                <Text fontSize="$md" color="$surface700" flex={1}>
                  Privacy settings and preferences
                </Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md">
            <Button 
              bg="$primary500" 
              onPress={handleGetStarted}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText 
                color="white" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                Get Started
              </ButtonText>
            </Button>

            <Button 
              variant="outline" 
              borderColor="$surface300"
              onPress={handleSkipForNow}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText 
                color="$surface600" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                Skip for Now
              </ButtonText>
            </Button>

            <Text 
              fontSize="$sm" 
              color="$surface500" 
              textAlign="center"
              marginTop="$2"
            >
              You can complete your profile setup anytime from settings
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}