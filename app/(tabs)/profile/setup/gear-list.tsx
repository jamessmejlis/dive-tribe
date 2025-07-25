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
  Pressable,
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
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  CloseIcon,
  ChevronDownIcon
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GearItem } from '../../../../types'
import { useProfileStore } from '../../../../stores/profile.store'
import { GEAR_CATEGORIES, PROFILE_VALIDATION_RULES } from '../../../../constants/profile'

const gearItemSchema = z.object({
  name: z
    .string()
    .min(PROFILE_VALIDATION_RULES.GEAR_NAME.MIN_LENGTH, 'Gear name is required')
    .max(PROFILE_VALIDATION_RULES.GEAR_NAME.MAX_LENGTH, `Gear name must be less than ${PROFILE_VALIDATION_RULES.GEAR_NAME.MAX_LENGTH} characters`),
  brand: z
    .string()
    .max(PROFILE_VALIDATION_RULES.GEAR_BRAND.MAX_LENGTH, `Brand name must be less than ${PROFILE_VALIDATION_RULES.GEAR_BRAND.MAX_LENGTH} characters`)
    .optional(),
  category: z.enum(['mask', 'fins', 'wetsuit', 'computer', 'bcd', 'regulator', 'other']),
  notes: z
    .string()
    .max(PROFILE_VALIDATION_RULES.GEAR_NOTES.MAX_LENGTH, `Notes must be less than ${PROFILE_VALIDATION_RULES.GEAR_NOTES.MAX_LENGTH} characters`)
    .optional()
})

type GearItemFormData = z.infer<typeof gearItemSchema>

export default function GearList() {
  const [gearList, setGearList] = useState<GearItem[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingGear, setEditingGear] = useState<GearItem | null>(null)
  
  const { updateSetupFormData } = useProfileStore()
  
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<GearItemFormData>({
    resolver: zodResolver(gearItemSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      brand: '',
      category: 'other',
      notes: ''
    }
  })

  const handleAddGear = (data: GearItemFormData) => {
    const newGear: GearItem = {
      id: `gear_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      brand: data.brand || undefined,
      notes: data.notes || undefined
    }
    
    setGearList([...gearList, newGear])
    reset()
    setIsAddModalOpen(false)
  }

  const handleEditGear = (gear: GearItem) => {
    setEditingGear(gear)
    setValue('name', gear.name)
    setValue('brand', gear.brand || '')
    setValue('category', gear.category)
    setValue('notes', gear.notes || '')
    setIsAddModalOpen(true)
  }

  const handleUpdateGear = (data: GearItemFormData) => {
    if (!editingGear) return
    
    const updatedGear: GearItem = {
      ...editingGear,
      ...data,
      brand: data.brand || undefined,
      notes: data.notes || undefined
    }
    
    setGearList(gearList.map(item => 
      item.id === editingGear.id ? updatedGear : item
    ))
    
    reset()
    setEditingGear(null)
    setIsAddModalOpen(false)
  }

  const handleDeleteGear = (gearId: string) => {
    setGearList(gearList.filter(item => item.id !== gearId))
  }

  const handleNext = () => {
    // Store the gear list in profile store
    updateSetupFormData('gearList', { gear_list: gearList })
    router.push('/profile/setup/privacy-settings')
  }

  const handleSkip = () => {
    router.push('/profile/setup/privacy-settings')
  }

  const handleBack = () => {
    router.back()
  }

  const getCategoryIcon = (category: string) => {
    const cat = GEAR_CATEGORIES.find(c => c.value === category)
    return cat ? cat.label.split(' ')[0] : '🛠️'
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
              <Text fontSize="$sm" color="$surface500">Step 3 of 5</Text>
            </HStack>

            <VStack space="md" marginTop="$4">
              <Text 
                fontSize="$3xl" 
                fontWeight="$bold" 
                color="$surface900"
              >
                Your diving gear
              </Text>
              
              <Text 
                fontSize="$lg" 
                color="$surface600"
                lineHeight="$2xl"
              >
                Add the equipment you own or regularly use. This helps other divers with recommendations.
              </Text>
            </VStack>

            {/* Gear List */}
            <VStack space="md" marginTop="$6">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$lg" fontWeight="$medium" color="$surface800">
                  My Gear ({gearList.length})
                </Text>
                <Button 
                  size="sm" 
                  bg="$primary500" 
                  onPress={() => setIsAddModalOpen(true)}
                  borderRadius="$lg"
                >
                  <ButtonText color="white" fontSize="$sm">+ Add Gear</ButtonText>
                </Button>
              </HStack>

              {gearList.length === 0 ? (
                <Box 
                  padding="$8" 
                  borderRadius="$lg" 
                  borderWidth={2} 
                  borderColor="$surface200"
                  borderStyle="dashed"
                  alignItems="center"
                >
                  <Text fontSize="$6xl" marginBottom="$2">🛠️</Text>
                  <Text fontSize="$lg" fontWeight="$medium" color="$surface600" textAlign="center">
                    No gear added yet
                  </Text>
                  <Text fontSize="$md" color="$surface500" textAlign="center" marginTop="$1">
                    Tap "Add Gear" to get started
                  </Text>
                </Box>
              ) : (
                <VStack space="sm">
                  {gearList.map((gear) => (
                    <HStack 
                      key={gear.id}
                      space="md" 
                      padding="$4" 
                      bg="white" 
                      borderRadius="$lg"
                      borderWidth={1}
                      borderColor="$surface200"
                      alignItems="center"
                    >
                      <Text fontSize="$2xl">{getCategoryIcon(gear.category)}</Text>
                      <VStack flex={1} space="xs">
                        <Text fontSize="$md" fontWeight="$medium" color="$surface900">
                          {gear.name}
                        </Text>
                        {gear.brand && (
                          <Text fontSize="$sm" color="$surface600">
                            {gear.brand}
                          </Text>
                        )}
                        {gear.notes && (
                          <Text fontSize="$sm" color="$surface500" numberOfLines={2}>
                            {gear.notes}
                          </Text>
                        )}
                      </VStack>
                      <HStack space="sm">
                        <Pressable onPress={() => handleEditGear(gear)}>
                          <Text color="$primary500" fontSize="$sm">Edit</Text>
                        </Pressable>
                        <Pressable onPress={() => handleDeleteGear(gear.id)}>
                          <Text color="$safety500" fontSize="$sm">Delete</Text>
                        </Pressable>
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              )}
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

      {/* Add/Edit Gear Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => {
        setIsAddModalOpen(false)
        setEditingGear(null)
        reset()
      }}>
        <ModalBackdrop />
        <ModalContent maxWidth="$96" marginHorizontal="$4">
          <ModalHeader>
            <Text fontSize="$lg" fontWeight="$bold">
              {editingGear ? 'Edit Gear' : 'Add New Gear'}
            </Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <VStack space="lg">
              <FormControl isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText>Gear Name *</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input>
                      <InputField
                        placeholder="e.g., Mares Puck Pro+"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
                {errors.name && (
                  <FormControlError>
                    <FormControlErrorText>{errors.name.message}</FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Brand</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="brand"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input>
                      <InputField
                        placeholder="e.g., Mares, Scubapro, Cressi"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Category *</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <Select selectedValue={value} onValueChange={onChange}>
                      <SelectTrigger variant="outline">
                        <SelectInput placeholder="Select category" />
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
                          {GEAR_CATEGORIES.map((category) => (
                            <SelectItem key={category.value} label={category.label} value={category.value} />
                          ))}
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Notes</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="notes"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input>
                      <InputField
                        placeholder="Any additional details..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack space="md" flex={1}>
              <Button 
                flex={1} 
                variant="outline" 
                onPress={() => {
                  setIsAddModalOpen(false)
                  setEditingGear(null)
                  reset()
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button 
                flex={1} 
                bg="$primary500" 
                onPress={handleSubmit(editingGear ? handleUpdateGear : handleAddGear)}
              >
                <ButtonText color="white">
                  {editingGear ? 'Update' : 'Add'}
                </ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  )
}