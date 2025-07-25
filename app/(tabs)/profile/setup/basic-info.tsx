import React, { useState } from 'react'
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  ButtonText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Box,
  SafeAreaView,
  ScrollView,
  Center,
  Pressable,
  Image,
  Spinner
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfileStore } from '../../../../stores/profile.store'
import { ProfileService } from '../../../../services/profile.service'
import { PROFILE_VALIDATION_RULES } from '../../../../constants/profile'

const basicInfoSchema = z.object({
  display_name: z
    .string()
    .min(PROFILE_VALIDATION_RULES.DISPLAY_NAME.MIN_LENGTH, `Display name must be at least ${PROFILE_VALIDATION_RULES.DISPLAY_NAME.MIN_LENGTH} characters`)
    .max(PROFILE_VALIDATION_RULES.DISPLAY_NAME.MAX_LENGTH, `Display name must be less than ${PROFILE_VALIDATION_RULES.DISPLAY_NAME.MAX_LENGTH} characters`)
    .regex(PROFILE_VALIDATION_RULES.DISPLAY_NAME.REGEX, 'Display name can only contain letters, numbers, spaces, hyphens, and apostrophes'),
  bio: z
    .string()
    .max(PROFILE_VALIDATION_RULES.BIO.MAX_LENGTH, `Bio must be less than ${PROFILE_VALIDATION_RULES.BIO.MAX_LENGTH} characters`)
    .optional()
})

type BasicInfoFormData = z.infer<typeof basicInfoSchema>

export default function BasicProfileInfo() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  
  const { updateSetupFormData } = useProfileStore()
  
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    mode: 'onChange',
    defaultValues: {
      display_name: '',
      bio: ''
    }
  })

  const handlePhotoSelect = async () => {
    try {
      setUploadingPhoto(true)
      const imageUri = await ProfileService.selectProfileImage()
      
      if (imageUri) {
        setProfilePhoto(imageUri)
        // Store the image URI temporarily in setup form data
        updateSetupFormData('basicInfo', { avatar_url: imageUri })
      }
    } catch (error) {
      console.error('Error selecting photo:', error)
      // Could show an error toast here
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleNext = (data: BasicInfoFormData) => {
    // Store the form data in profile store
    updateSetupFormData('basicInfo', data)
    router.push('/profile/setup/diving-experience')
  }

  const handleSkip = () => {
    router.push('/profile/setup/diving-experience')
  }

  const handleBack = () => {
    router.back()
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
              <Text fontSize="$sm" color="$surface500">Step 1 of 5</Text>
            </HStack>

            <VStack space="md" marginTop="$4">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
              >
                Tell us about yourself
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                lineHeight="$2xl"
              >
                This helps other divers get to know you in the community.
              </Text>
            </VStack>

            {/* Profile Photo Section */}
            <VStack space="md" alignItems="center" marginTop="$6">
              <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                Profile Photo
              </Text>
              
              <Pressable onPress={handlePhotoSelect} disabled={uploadingPhoto}>
                <Center>
                  <Box
                    width={120}
                    height={120}
                    borderRadius="$full"
                    bg={profilePhoto ? 'transparent' : '$surface200'}
                    borderWidth={2}
                    borderColor="$surface300"
                    borderStyle="dashed"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {uploadingPhoto ? (
                      <VStack space="xs" alignItems="center">
                        <Spinner color="$primary500" />
                        <Text fontSize="$sm" color="$surface600" textAlign="center">
                          Loading...
                        </Text>
                      </VStack>
                    ) : profilePhoto ? (
                      <Image 
                        source={{ uri: profilePhoto }}
                        alt="Profile photo"
                        width={116}
                        height={116}
                        borderRadius="$full"
                      />
                    ) : (
                      <VStack space="xs" alignItems="center">
                        <Text fontSize="$2xl">📷</Text>
                        <Text fontSize="$sm" color="$surface600" textAlign="center">
                          Add Photo
                        </Text>
                      </VStack>
                    )}
                  </Box>
                </Center>
              </Pressable>
              
              <Text fontSize="$xs" color="$surface500" textAlign="center">
                Optional - You can add this later
              </Text>
            </VStack>

            {/* Form Fields */}
            <VStack space="lg" marginTop="$6">
              <FormControl isInvalid={!!errors.display_name}>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$surface800">
                    Display Name *
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="display_name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input borderRadius="$lg" borderColor="$surface300">
                      <InputField
                        placeholder="Enter your display name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        fontSize="$md"
                      />
                    </Input>
                  )}
                />
                {errors.display_name && (
                  <FormControlError>
                    <FormControlErrorText color="$safety500">
                      {errors.display_name.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.bio}>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$surface800">
                    Bio
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Textarea borderRadius="$lg" borderColor="$surface300" minHeight={100}>
                      <TextareaInput
                        placeholder="Tell us a bit about yourself and your diving interests..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        fontSize="$md"
                      />
                    </Textarea>
                  )}
                />
                {errors.bio && (
                  <FormControlError>
                    <FormControlErrorText color="$safety500">
                      {errors.bio.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
                <Text fontSize="$xs" color="$surface500" marginTop="$1">
                  Optional - Share your diving story, interests, or goals
                </Text>
              </FormControl>
            </VStack>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            <Button 
              bg="$primary500" 
              onPress={handleSubmit(handleNext)}
              borderRadius="$lg"
              paddingVertical="$4"
              isDisabled={!isValid}
              opacity={isValid ? 1 : 0.6}
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