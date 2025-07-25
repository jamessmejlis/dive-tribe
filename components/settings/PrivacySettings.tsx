import React, { useEffect } from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Switch,
  Pressable,
  Spinner,
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  User, 
  Eye, 
  EyeOff, 
  Globe, 
  Users, 
  Lock,
  Target
} from 'lucide-react-native'
import { useSettingsStore, PrivacySettings } from '../../stores/settings.store'
import { useAuthStore } from '../../stores/auth.store'

interface PrivacyToggleProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value: boolean
  onToggle: (value: boolean) => void
}

function PrivacyToggle({ icon, title, subtitle, value, onToggle }: PrivacyToggleProps) {
  return (
    <Box
      bg="$surface0"
      paddingHorizontal="$4"
      paddingVertical="$4"
      borderRadius="$lg"
      marginBottom="$2"
    >
      <HStack space="md" alignItems="center">
        <Box
          width={40}
          height={40}
          borderRadius="$md"
          bg="$primary50"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
        
        <VStack flex={1} space="xs">
          <Text fontSize="$lg" fontWeight="medium" color="$surface900">
            {title}
          </Text>
          <Text fontSize="$sm" color="$surface600">
            {subtitle}
          </Text>
        </VStack>
        
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#d1d5db', true: '#0891b2' }}
          thumbColor={value ? '#ffffff' : '#f3f4f6'}
        />
      </HStack>
    </Box>
  )
}

interface PrivacySelectProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value: string
  options: { label: string; value: string; icon?: React.ReactNode }[]
  onSelect: (value: string) => void
}

function PrivacySelect({ icon, title, subtitle, value, options, onSelect }: PrivacySelectProps) {
  return (
    <Box
      bg="$surface0"
      paddingHorizontal="$4"
      paddingVertical="$4"
      borderRadius="$lg"
      marginBottom="$2"
    >
      <HStack space="md" alignItems="center">
        <Box
          width={40}
          height={40}
          borderRadius="$md"
          bg="$primary50"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
        
        <VStack flex={1} space="xs">
          <Text fontSize="$lg" fontWeight="medium" color="$surface900">
            {title}
          </Text>
          <Text fontSize="$sm" color="$surface600">
            {subtitle}
          </Text>
        </VStack>
        
        <Select selectedValue={value} onValueChange={onSelect}>
          <SelectTrigger variant="outline" size="sm" width={120}>
            <SelectInput placeholder="Select..." />
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
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
    </Box>
  )
}

export default function PrivacySettingsScreen() {
  const { user } = useAuthStore()
  const { privacy, loading, updatePrivacy, loadSettings } = useSettingsStore()

  useEffect(() => {
    if (user?.id) {
      loadSettings(user.id)
    }
  }, [user?.id, loadSettings])

  const handleBack = () => {
    router.back()
  }

  const handlePostVisibilityChange = async (value: string) => {
    await updatePrivacy({ 
      default_post_visibility: value as 'public' | 'friends' | 'private' 
    })
  }

  const handleLocationSharingChange = async (value: string) => {
    await updatePrivacy({ 
      location_sharing: value as 'exact' | 'fuzzy' | 'none' 
    })
  }

  const handleProfileVisibilityToggle = async (field: keyof PrivacySettings['profile_visibility'], value: boolean) => {
    await updatePrivacy({
      profile_visibility: {
        ...privacy.profile_visibility,
        [field]: value
      }
    })
  }

  const handleActivityPrivacyToggle = async (field: keyof PrivacySettings['activity_privacy'], value: boolean) => {
    await updatePrivacy({
      activity_privacy: {
        ...privacy.activity_privacy,
        [field]: value
      }
    })
  }

  const postVisibilityOptions = [
    { label: 'Public', value: 'public', icon: <Globe size={16} color="#0891b2" /> },
    { label: 'Friends', value: 'friends', icon: <Users size={16} color="#0891b2" /> },
    { label: 'Private', value: 'private', icon: <Lock size={16} color="#0891b2" /> }
  ]

  const locationSharingOptions = [
    { label: 'Exact', value: 'exact', icon: <Target size={16} color="#0891b2" /> },
    { label: 'Fuzzy', value: 'fuzzy', icon: <MapPin size={16} color="#0891b2" /> },
    { label: 'None', value: 'none', icon: <EyeOff size={16} color="#0891b2" /> }
  ]

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
          <VStack space="md" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <Text fontSize="$lg" color="$surface600">
              Loading privacy settings...
            </Text>
          </VStack>
        </Box>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView bg="$surface50">
        <VStack space="lg" padding="$6">
          {/* Header with back button */}
          <HStack space="md" alignItems="center">
            <Pressable onPress={handleBack}>
              <Box
                width={44}
                height={44}
                borderRadius="$md"
                bg="$surface100"
                alignItems="center"
                justifyContent="center"
              >
                <ArrowLeft size={20} color="#64748b" />
              </Box>
            </Pressable>
            
            <VStack flex={1}>
              <Text fontSize="$3xl" fontWeight="bold" color="$surface900">
                Privacy & Safety
              </Text>
              <Text fontSize="$lg" color="$surface600">
                Control who sees your information
              </Text>
            </VStack>
          </HStack>

          {/* Post Visibility */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Post Visibility
            </Text>
            
            <PrivacySelect
              icon={<Eye size={20} color="#0891b2" />}
              title="Default Post Visibility"
              subtitle="Who can see your new posts by default"
              value={privacy.default_post_visibility}
              options={postVisibilityOptions}
              onSelect={handlePostVisibilityChange}
            />
          </VStack>

          {/* Location Privacy */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Location Privacy
            </Text>
            
            <PrivacySelect
              icon={<MapPin size={20} color="#0891b2" />}
              title="Location Sharing"
              subtitle="How precise location data is shared"
              value={privacy.location_sharing}
              options={locationSharingOptions}
              onSelect={handleLocationSharingChange}
            />
            
            <Box
              bg="$info50"
              padding="$3"
              borderRadius="$md"
              borderWidth={1}
              borderColor="$info200"
            >
              <Text fontSize="$sm" color="$info800">
                💡 Fuzzy location shows your general area (~1km radius) instead of exact coordinates for safety.
              </Text>
            </Box>
          </VStack>

          {/* Profile Visibility */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Profile Information
            </Text>
            
            <PrivacyToggle
              icon={<User size={20} color="#0891b2" />}
              title="Display Name"
              subtitle="Show your display name to other users"
              value={privacy.profile_visibility.name}
              onToggle={(value) => handleProfileVisibilityToggle('name', value)}
            />
            
            <PrivacyToggle
              icon={<User size={20} color="#0891b2" />}
              title="Bio"
              subtitle="Show your bio on your profile"
              value={privacy.profile_visibility.bio}
              onToggle={(value) => handleProfileVisibilityToggle('bio', value)}
            />
            
            <PrivacyToggle
              icon={<Shield size={20} color="#0891b2" />}
              title="Certifications"
              subtitle="Display your diving certifications"
              value={privacy.profile_visibility.certifications}
              onToggle={(value) => handleProfileVisibilityToggle('certifications', value)}
            />
            
            <PrivacyToggle
              icon={<User size={20} color="#0891b2" />}
              title="Gear List"
              subtitle="Show your diving gear to others"
              value={privacy.profile_visibility.gear_list}
              onToggle={(value) => handleProfileVisibilityToggle('gear_list', value)}
            />
            
            <PrivacyToggle
              icon={<User size={20} color="#0891b2" />}
              title="Dive Statistics"
              subtitle="Display your diving stats and achievements"
              value={privacy.profile_visibility.dive_stats}
              onToggle={(value) => handleProfileVisibilityToggle('dive_stats', value)}
            />
          </VStack>

          {/* Activity Privacy */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Activity Privacy
            </Text>
            
            <PrivacyToggle
              icon={<EyeOff size={20} color="#0891b2" />}
              title="Hide Personal Records"
              subtitle="Keep your personal best dives private"
              value={privacy.activity_privacy.hide_personal_records}
              onToggle={(value) => handleActivityPrivacyToggle('hide_personal_records', value)}
            />
            
            <PrivacyToggle
              icon={<MapPin size={20} color="#0891b2" />}
              title="Hide Dive Locations"
              subtitle="Don't show specific dive locations in posts"
              value={privacy.activity_privacy.hide_dive_locations}
              onToggle={(value) => handleActivityPrivacyToggle('hide_dive_locations', value)}
            />
            
            <PrivacyToggle
              icon={<EyeOff size={20} color="#0891b2" />}
              title="Hide Achievement Notifications"
              subtitle="Keep achievement notifications private"
              value={privacy.activity_privacy.hide_achievement_notifications}
              onToggle={(value) => handleActivityPrivacyToggle('hide_achievement_notifications', value)}
            />
          </VStack>

          {/* Safety Notice */}
          <Box
            bg="$warning50"
            padding="$4"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$warning200"
            marginTop="$4"
          >
            <VStack space="sm">
              <Text fontSize="$md" fontWeight="medium" color="$warning800">
                🛡️ Privacy & Safety Tips
              </Text>
              <Text fontSize="$sm" color="$warning700">
                • Never share exact dive locations of sensitive spots publicly
                • Use fuzzy location sharing to protect your privacy and dive sites
                • Report any inappropriate behavior to our support team
                • Your safety is our priority - these settings help protect you
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}