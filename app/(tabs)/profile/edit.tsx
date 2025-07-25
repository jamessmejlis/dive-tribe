import React, { useState, useEffect } from 'react'
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
import { useProfileStore } from '../../../stores/profile.store'
import { useAuthStore } from '../../../stores/auth.store'
import { ProfileService } from '../../../services/profile.service'

const profileEditSchema = z.object({
  display_name: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-']+$/, 'Display name can only contain letters, numbers, spaces, hyphens, and apostrophes'),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  years_experience: z
    .number()
    .min(0, 'Years of experience must be 0 or greater')
    .max(50, 'Years of experience must be 50 or less')
})

type ProfileEditFormData = z.infer<typeof profileEditSchema>

export default function EditProfile() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const { profile, updateProfile, uploadAvatar, loading } = useProfileStore()
  const { user } = useAuthStore()
  
  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onChange',
    defaultValues: {
      display_name: '',
      bio: '',
      years_experience: 0
    }
  })

  // Load current profile data into form
  useEffect(() => {
    if (profile) {
      reset({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        years_experience: profile.years_experience || 0
      })
      setProfilePhoto(profile.avatar_url || null)
    }
  }, [profile, reset])

  const handlePhotoSelect = async () => {
    try {
      if (!user?.id) return
      
      setUploadingPhoto(true)
      const imageUri = await ProfileService.selectProfileImage()
      
      if (imageUri) {
        // Upload the photo and update profile
        const avatarUrl = await uploadAvatar(user.id, imageUri)
        setProfilePhoto(avatarUrl)
      }
    } catch (error) {
      console.error('Error selecting/uploading photo:', error)
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSave = async (data: ProfileEditFormData) => {
    try {
      if (!user?.id) return
      
      setSaving(true)
      await updateProfile(user.id, data)
      router.back()
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <SafeAreaView flex={1} bg="$surface50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} padding="$6" justifyContent="space-between">
          {/* Header */}
          <VStack space="lg">
            <HStack justifyContent="space-between" alignItems="center">
              <Pressable onPress={handleCancel}>
                <Text color="$primary500" fontSize="$lg">Cancel</Text>
              </Pressable>
              <Text fontSize="$lg" fontWeight="$medium" color="$surface900">
                Edit Profile
              </Text>
              <Box width={60} /> {/* Spacer for center alignment */}
            </HStack>

            {/* Profile Photo Section */}
            <VStack space="md" alignItems="center" marginTop="$6">
              <Pressable onPress={handlePhotoSelect} disabled={uploadingPhoto}>
                <Center>
                  <Box
                    width={120}
                    height={120}
                    borderRadius="$full"
                    bg={profilePhoto ? 'transparent' : '$surface200'}
                    borderWidth={2}
                    borderColor="$surface300"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {uploadingPhoto ? (
                      <VStack space="xs" alignItems="center">
                        <Spinner color="$primary500" />
                        <Text fontSize="$sm" color="$surface600" textAlign="center">
                          Uploading...
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
              
              <Button size="sm" variant="outline" onPress={handlePhotoSelect} disabled={uploadingPhoto}>
                <ButtonText fontSize="$sm">
                  {profilePhoto ? 'Change Photo' : 'Add Photo'}
                </ButtonText>
              </Button>
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
                        placeholder="Tell us about yourself and your diving interests..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value || ''}
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
              </FormControl>

              <FormControl isInvalid={!!errors.years_experience}>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$surface800">
                    Years of Diving Experience
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="years_experience"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input borderRadius="$lg" borderColor="$surface300">
                      <InputField
                        placeholder="0"
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                        value={value.toString()}
                        keyboardType="numeric"
                        fontSize="$md"
                      />
                    </Input>
                  )}
                />
                {errors.years_experience && (
                  <FormControlError>
                    <FormControlErrorText color="$safety500">
                      {errors.years_experience.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              {/* Display current certifications and goals (read-only for now) */}
              {profile && (
                <>
                  {profile.certifications && profile.certifications.length > 0 && (
                    <VStack space="md">
                      <Text fontSize="$md" fontWeight="$medium" color="$surface800">
                        Certifications
                      </Text>
                      <HStack space="xs" flexWrap="wrap">
                        {profile.certifications.map((cert, index) => (
                          <Box
                            key={index}
                            bg="$primary50"
                            borderRadius="$md"
                            paddingHorizontal="$3"
                            paddingVertical="$1"
                            marginBottom="$1"
                          >
                            <Text fontSize="$sm" color="$primary700">
                              {cert}
                            </Text>
                          </Box>
                        ))}
                      </HStack>
                    </VStack>
                  )}

                  {profile.diving_goals && profile.diving_goals.length > 0 && (
                    <VStack space="md">
                      <Text fontSize="$md" fontWeight="$medium" color="$surface800">
                        Diving Goals
                      </Text>
                      <HStack space="xs" flexWrap="wrap">
                        {profile.diving_goals.map((goal, index) => (
                          <Box
                            key={index}
                            bg="$achievement50"
                            borderRadius="$md"
                            paddingHorizontal="$3"
                            paddingVertical="$1"
                            marginBottom="$1"
                          >
                            <Text fontSize="$sm" color="$achievement700">
                              {goal}
                            </Text>
                          </Box>
                        ))}
                      </HStack>
                    </VStack>
                  )}
                </>
              )}
            </VStack>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            <Button 
              bg="$primary500" 
              onPress={handleSubmit(handleSave)}
              borderRadius="$lg"
              paddingVertical="$4"
              isDisabled={!isValid || saving || loading}
              opacity={(!isValid || saving || loading) ? 0.6 : 1}
            >
              <ButtonText 
                color="white" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </ButtonText>
            </Button>

            <Button 
              variant="outline" 
              borderColor="$surface300"
              onPress={handleCancel}
              borderRadius="$lg"
              paddingVertical="$4"
              isDisabled={saving}
            >
              <ButtonText 
                color="$surface600" 
                fontSize="$lg" 
                fontWeight="$medium"
              >
                Cancel
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}