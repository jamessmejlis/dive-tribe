import React, { useState } from 'react'
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  ButtonText,
  Box,
  SafeAreaView,
  ScrollView,
  Pressable,
  Center
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import * as Location from 'expo-location'
import { useProfileStore } from '../../../../stores/profile.store'
import { useAuthStore } from '../../../../stores/auth.store'

export default function LocationPermissions() {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')
  
  const { completeProfileSetup, updateSetupFormData } = useProfileStore()
  const { user } = useAuthStore()

  const requestLocationPermission = async () => {
    setLocationStatus('requesting')
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      
      if (status === 'granted') {
        setLocationStatus('granted')
        console.log('Location permission granted')
      } else {
        setLocationStatus('denied')
        console.log('Location permission denied')
      }
    } catch (error) {
      console.error('Error requesting location permission:', error)
      setLocationStatus('denied')
    }
  }

  const handleFinish = async () => {
    try {
      if (!user?.id) {
        console.error('No user ID found')
        return
      }

      // Update privacy settings to include location sharing preference
      updateSetupFormData('privacySettings', { 
        location_sharing: locationStatus === 'granted' 
      })

      // Complete profile setup by saving all data to Supabase
      await completeProfileSetup(user.id)
      
      console.log('Profile setup completed successfully')
      router.push('/(tabs)/')
    } catch (error) {
      console.error('Error completing profile setup:', error)
      // Could show an error toast here
    }
  }


  const handleBack = () => {
    router.back()
  }

  const getLocationIcon = () => {
    switch (locationStatus) {
      case 'granted':
        return '📍'
      case 'denied':
        return '❌'
      case 'requesting':
        return '⏳'
      default:
        return '🗺️'
    }
  }

  const getLocationButtonText = () => {
    switch (locationStatus) {
      case 'granted':
        return 'Location Access Granted'
      case 'denied':
        return 'Try Again'
      case 'requesting':
        return 'Requesting Permission...'
      default:
        return 'Enable Location Access'
    }
  }

  return (
    <SafeAreaView flex={1} bg="$surface50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} padding="$6" justifyContent="space-between">
          {/* Header */}
          <VStack space="lg">
            <HStack justifyContent="space-between" alignItems="center">
              <Pressable onPress={handleBack}>
                <Text color="$primary500" fontSize="$lg">← Back</Text>
              </Pressable>
              <Text fontSize="$sm" color="$surface500">Step 5 of 5</Text>
            </HStack>

            <VStack space="md" marginTop="$4">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
              >
                Location permissions
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                lineHeight="$2xl"
              >
                Enable location access to automatically tag your dive sites and discover diving spots near you.
              </Text>
            </VStack>

            {/* Location Permission Visual */}
            <VStack space="lg" alignItems="center" marginTop="$8">
              <Center>
                <Box
                  width={120}
                  height={120}
                  borderRadius="$full"
                  bg={
                    locationStatus === 'granted' ? '$achievement100' :
                    locationStatus === 'denied' ? '$safety100' :
                    '$primary100'
                  }
                  alignItems="center"
                  justifyContent="center"
                  marginBottom="$4"
                >
                  <Text fontSize="$4xl">{getLocationIcon()}</Text>
                </Box>
              </Center>

              {locationStatus === 'granted' && (
                <Box 
                  padding="$4" 
                  bg="$achievement50" 
                  borderRadius="$lg" 
                  borderWidth={1} 
                  borderColor="$achievement200"
                >
                  <Text fontSize="$md" color="$achievement700" textAlign="center" fontWeight="$medium">
                    ✅ Perfect! You can now tag dive sites automatically
                  </Text>
                </Box>
              )}

              {locationStatus === 'denied' && (
                <Box 
                  padding="$4" 
                  bg="$safety50" 
                  borderRadius="$lg" 
                  borderWidth={1} 
                  borderColor="$safety200"
                >
                  <Text fontSize="$md" color="$safety700" textAlign="center" fontWeight="$medium">
                    Location access was denied. You can enable it later in device settings.
                  </Text>
                </Box>
              )}
            </VStack>

            {/* Benefits List */}
            <VStack space="lg" marginTop="$8">
              <Text 
                fontSize="$xl" 
                fontWeight="$semibold" 
                color="$surface800"
                textAlign="center"
              >
                Why we need location access:
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
                    Automatically tag dive sites in your logs
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
                    Discover popular diving spots near you
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
                    Find local diving communities and events
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
                    Get personalized dive site recommendations
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Privacy Note */}
            <Box 
              padding="$4" 
              bg="$surface100" 
              borderRadius="$lg" 
              borderWidth={1} 
              borderColor="$surface200"
              marginTop="$6"
            >
              <HStack space="md" alignItems="flex-start">
                <Text fontSize="$lg">🔒</Text>
                <VStack flex={1} space="xs">
                  <Text fontSize="$md" fontWeight="$medium" color="$surface800">
                    Your Privacy is Protected
                  </Text>
                  <Text fontSize="$sm" color="$surface600" lineHeight="$lg">
                    • Location data is only used when you actively log a dive
                    • We apply privacy fuzzing to protect your exact coordinates
                    • You can disable location sharing anytime in settings
                    • Location data is never shared without your permission
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            {locationStatus !== 'granted' && (
              <Button 
                bg="$primary500" 
                onPress={requestLocationPermission}
                borderRadius="$lg"
                paddingVertical="$4"
                isDisabled={locationStatus === 'requesting'}
                opacity={locationStatus === 'requesting' ? 0.6 : 1}
              >
                <ButtonText 
                  color="white" 
                  fontSize="$lg" 
                  fontWeight="$medium"
                >
                  {getLocationButtonText()}
                </ButtonText>
              </Button>
            )}

            <Button 
              bg={locationStatus === 'granted' ? '$primary500' : 'transparent'}
              variant={locationStatus === 'granted' ? 'solid' : 'outline'}
              borderColor={locationStatus === 'granted' ? '$primary500' : '$surface300'}
              onPress={handleFinish}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText 
                color={locationStatus === 'granted' ? 'white' : '$surface600'}
                fontSize="$lg" 
                fontWeight="$medium"
              >
                {locationStatus === 'granted' ? 'Complete Setup' : 'Maybe Later'}
              </ButtonText>
            </Button>

            {locationStatus !== 'granted' && (
              <Text 
                fontSize="$sm" 
                color="$surface500" 
                textAlign="center"
                marginTop="$2"
              >
                You can enable location access anytime from your device settings
              </Text>
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}