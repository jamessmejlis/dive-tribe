import React, { useState } from 'react'
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  ButtonText,
  Input,
  InputField,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Box,
  SafeAreaView,
  ScrollView,
  Pressable
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfileStore } from '../../../../stores/profile.store'
import { CERTIFICATION_LEVELS, DIVING_GOALS, PROFILE_VALIDATION_RULES } from '../../../../constants/profile'

const divingExperienceSchema = z.object({
  years_experience: z
    .number()
    .min(PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MIN, `Years of experience must be ${PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MIN} or greater`)
    .max(PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MAX, `Years of experience must be ${PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MAX} or less`)
    .default(0),
  certifications: z
    .array(z.string())
    .min(0, 'Please select at least one certification or select "None"')
    .default([]),
  diving_goals: z
    .array(z.string())
    .min(1, 'Please select at least one diving goal')
    .default([])
})

type DivingExperienceFormData = z.infer<typeof divingExperienceSchema>

export default function DivingExperience() {
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  
  const { updateSetupFormData } = useProfileStore()
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<DivingExperienceFormData>({
    resolver: zodResolver(divingExperienceSchema),
    mode: 'onChange',
    defaultValues: {
      years_experience: 0,
      certifications: [],
      diving_goals: []
    }
  })

  const toggleCertification = (cert: string) => {
    const updated = selectedCertifications.includes(cert)
      ? selectedCertifications.filter(c => c !== cert)
      : [...selectedCertifications, cert]
    
    setSelectedCertifications(updated)
    setValue('certifications', updated, { shouldValidate: true })
  }

  const toggleGoal = (goal: string) => {
    const updated = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal]
    
    setSelectedGoals(updated)
    setValue('diving_goals', updated, { shouldValidate: true })
  }

  const handleNext = (data: DivingExperienceFormData) => {
    // Store the form data in profile store
    updateSetupFormData('divingExperience', data)
    router.push('/profile/setup/gear-list')
  }

  const handleSkip = () => {
    router.push('/profile/setup/gear-list')
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
              <Text fontSize="$sm" color="$surface500">Step 2 of 5</Text>
            </HStack>

            <VStack space="md" marginTop="$4">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
              >
                Your diving experience
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                lineHeight="$2xl"
              >
                Help us understand your diving background and what you're looking to achieve.
              </Text>
            </VStack>

            {/* Years of Experience */}
            <FormControl isInvalid={!!errors.years_experience} marginTop="$6">
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

            {/* Certifications */}
            <FormControl isInvalid={!!errors.certifications} marginTop="$6">
              <FormControlLabel>
                <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$surface800">
                  Certifications
                </FormControlLabelText>
              </FormControlLabel>
              
              <VStack space="sm" marginTop="$2">
                {CERTIFICATION_LEVELS.map((cert) => (
                  <Pressable key={cert} onPress={() => toggleCertification(cert)}>
                    <HStack 
                      space="sm" 
                      alignItems="center" 
                      padding="$3"
                      borderRadius="$lg"
                      borderWidth={1}
                      borderColor={selectedCertifications.includes(cert) ? '$primary500' : '$surface300'}
                      bg={selectedCertifications.includes(cert) ? '$primary50' : '$surface50'}
                    >
                      <Box
                        width={20}
                        height={20}
                        borderRadius="$sm"
                        borderWidth={2}
                        borderColor={selectedCertifications.includes(cert) ? '$primary500' : '$surface400'}
                        bg={selectedCertifications.includes(cert) ? '$primary500' : 'transparent'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {selectedCertifications.includes(cert) && (
                          <Text color="white" fontSize="$xs" fontWeight="$bold">✓</Text>
                        )}
                      </Box>
                      <Text 
                        fontSize="$md" 
                        color={selectedCertifications.includes(cert) ? '$primary700' : '$surface700'}
                        flex={1}
                      >
                        {cert}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
              
              {errors.certifications && (
                <FormControlError>
                  <FormControlErrorText color="$safety500">
                    {errors.certifications.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Diving Goals */}
            <FormControl isInvalid={!!errors.diving_goals} marginTop="$6">
              <FormControlLabel>
                <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$surface800">
                  Diving Goals *
                </FormControlLabelText>
              </FormControlLabel>
              
              <VStack space="sm" marginTop="$2">
                {DIVING_GOALS.map((goal) => (
                  <Pressable key={goal} onPress={() => toggleGoal(goal)}>
                    <HStack 
                      space="sm" 
                      alignItems="center" 
                      padding="$3"
                      borderRadius="$lg"
                      borderWidth={1}
                      borderColor={selectedGoals.includes(goal) ? '$primary500' : '$surface300'}
                      bg={selectedGoals.includes(goal) ? '$primary50' : '$surface50'}
                    >
                      <Box
                        width={20}
                        height={20}
                        borderRadius="$sm"
                        borderWidth={2}
                        borderColor={selectedGoals.includes(goal) ? '$primary500' : '$surface400'}
                        bg={selectedGoals.includes(goal) ? '$primary500' : 'transparent'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {selectedGoals.includes(goal) && (
                          <Text color="white" fontSize="$xs" fontWeight="$bold">✓</Text>
                        )}
                      </Box>
                      <Text 
                        fontSize="$md" 
                        color={selectedGoals.includes(goal) ? '$primary700' : '$surface700'}
                        flex={1}
                      >
                        {goal}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
              
              {errors.diving_goals && (
                <FormControlError>
                  <FormControlErrorText color="$safety500">
                    {errors.diving_goals.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            <Button 
              bg="$primary500" 
              onPress={handleSubmit(handleNext)}
              borderRadius="$lg"
              paddingVertical="$4"
              isDisabled={selectedGoals.length === 0}
              opacity={selectedGoals.length === 0 ? 0.6 : 1}
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