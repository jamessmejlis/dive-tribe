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
  Switch,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Icon,
  ChevronDownIcon
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { PrivacySettings } from '../../../../types'
import { useProfileStore } from '../../../../stores/profile.store'
import { VISIBILITY_OPTIONS } from '../../../../constants/profile'

export default function PrivacySettingsSetup() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    post_visibility: 'friends', // Default to friends-only as per AC
    location_sharing: false,
    profile_visibility: 'friends',
    activity_visibility: 'friends'
  })

  const { updateSetupFormData } = useProfileStore()

  const updateSetting = <K extends keyof PrivacySettings>(
    key: K, 
    value: PrivacySettings[K]
  ) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNext = () => {
    // Store privacy settings in profile store
    updateSetupFormData('privacySettings', privacySettings)
    router.push('/profile/setup/location-permissions')
  }

  const handleSkip = () => {
    router.push('/profile/setup/location-permissions')
  }

  const handleBack = () => {
    router.back()
  }

  const getVisibilityOption = (value: string) => {
    return VISIBILITY_OPTIONS.find(option => option.value === value)
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
              <Text fontSize="$sm" color="$surface500">Step 4 of 5</Text>
            </HStack>

            <VStack space="md" marginTop="$4">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
              >
                Privacy settings
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                lineHeight="$2xl"
              >
                Control who can see your diving activities and profile information. You can change these anytime.
              </Text>
            </VStack>

            {/* Privacy Settings */}
            <VStack space="lg" marginTop="$6">
              
              {/* Post Visibility */}
              <VStack space="md">
                <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                  🏊‍♂️ Post Visibility
                </Text>
                <Text fontSize="$md" color="$surface600" marginBottom="$2">
                  Who can see your dive logs and posts
                </Text>
                
                <Select 
                  selectedValue={privacySettings.post_visibility} 
                  onValueChange={(value) => updateSetting('post_visibility', value as PrivacySettings['post_visibility'])}
                >
                  <SelectTrigger variant="outline" borderRadius="$lg">
                    <SelectInput 
                      placeholder="Select visibility" 
                      value={getVisibilityOption(privacySettings.post_visibility)?.label}
                    />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {VISIBILITY_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          label={option.label} 
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>

                <Box 
                  padding="$3" 
                  bg="$primary50" 
                  borderRadius="$md" 
                  borderLeftWidth={4} 
                  borderLeftColor="$primary500"
                >
                  <Text fontSize="$sm" color="$primary700">
                    {getVisibilityOption(privacySettings.post_visibility)?.description}
                  </Text>
                </Box>
              </VStack>

              {/* Profile Visibility */}
              <VStack space="md">
                <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                  👤 Profile Visibility
                </Text>
                <Text fontSize="$md" color="$surface600" marginBottom="$2">
                  Who can see your profile information
                </Text>
                
                <Select 
                  selectedValue={privacySettings.profile_visibility} 
                  onValueChange={(value) => updateSetting('profile_visibility', value as PrivacySettings['profile_visibility'])}
                >
                  <SelectTrigger variant="outline" borderRadius="$lg">
                    <SelectInput 
                      placeholder="Select visibility" 
                      value={getVisibilityOption(privacySettings.profile_visibility)?.label}
                    />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {VISIBILITY_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          label={option.label} 
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>

              {/* Activity Visibility */}
              <VStack space="md">
                <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                  📊 Activity Visibility
                </Text>
                <Text fontSize="$md" color="$surface600" marginBottom="$2">
                  Who can see your diving statistics and achievements
                </Text>
                
                <Select 
                  selectedValue={privacySettings.activity_visibility} 
                  onValueChange={(value) => updateSetting('activity_visibility', value as PrivacySettings['activity_visibility'])}
                >
                  <SelectTrigger variant="outline" borderRadius="$lg">
                    <SelectInput 
                      placeholder="Select visibility" 
                      value={getVisibilityOption(privacySettings.activity_visibility)?.label}
                    />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {VISIBILITY_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          label={option.label} 
                          value={option.value}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>

              {/* Location Sharing Toggle */}
              <VStack space="md">
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack flex={1} space="xs">
                    <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                      📍 Location Sharing
                    </Text>
                    <Text fontSize="$md" color="$surface600">
                      Allow location tagging on your dive posts
                    </Text>
                  </VStack>
                  <Switch
                    value={privacySettings.location_sharing}
                    onValueChange={(value) => updateSetting('location_sharing', value)}
                    trackColor={{ false: '$surface300', true: '$primary200' }}
                    thumbColor={privacySettings.location_sharing ? '$primary500' : '$surface500'}
                  />
                </HStack>

                {privacySettings.location_sharing && (
                  <Box 
                    padding="$3" 
                    bg="$surface100" 
                    borderRadius="$md" 
                    borderLeftWidth={4} 
                    borderLeftColor="$surface400"
                  >
                    <Text fontSize="$sm" color="$surface700">
                      📱 Location will be requested when you log dives. We'll apply privacy fuzzing to protect your exact location.
                    </Text>
                  </Box>
                )}
              </VStack>

              {/* Privacy Notice */}
              <Box 
                padding="$4" 
                bg="$surface100" 
                borderRadius="$lg" 
                borderWidth={1} 
                borderColor="$surface200"
                marginTop="$4"
              >
                <HStack space="md" alignItems="flex-start">
                  <Text fontSize="$lg">🔒</Text>
                  <VStack flex={1} space="xs">
                    <Text fontSize="$md" fontWeight="$medium" color="$surface800">
                      Your Privacy Matters
                    </Text>
                    <Text fontSize="$sm" color="$surface600" lineHeight="$lg">
                      We've set your default visibility to "Friends Only" for safety. You can always make your profile more public later, but we recommend keeping personal diving information within your trusted network.
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            <Button 
              bg="$primary500" 
              onPress={handleNext}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText 
                color="white" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                Continue
              </ButtonText>
            </Button>

            <Button 
              variant="outline" 
              borderColor="$surface300"
              onPress={handleSkip}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText 
                color="$surface600" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                Skip This Step
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}