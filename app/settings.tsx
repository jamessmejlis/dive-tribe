import React from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Pressable,
  Divider
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import {
  Bell,
  Shield,
  User,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react-native'
import { useAuthStore } from '../stores/auth.store'

interface SettingsItemProps {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onPress: () => void
  showChevron?: boolean
  danger?: boolean
}

function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showChevron = true, 
  danger = false 
}: SettingsItemProps) {
  return (
    <Pressable onPress={onPress}>
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
            bg={danger ? "$safety50" : "$primary50"}
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </Box>
          
          <VStack flex={1} space="xs">
            <Text 
              fontSize="$lg" 
              fontWeight="medium" 
              color={danger ? "$safety600" : "$surface900"}
            >
              {title}
            </Text>
            {subtitle && (
              <Text fontSize="$sm" color="$surface600">
                {subtitle}
              </Text>
            )}
          </VStack>
          
          {showChevron && (
            <ChevronRight 
              size={20} 
              color={danger ? "#dc2626" : "#64748b"} 
            />
          )}
        </HStack>
      </Box>
    </Pressable>
  )
}

export default function SettingsScreen() {
  const { signOut } = useAuthStore()

  const handleSignOut = async () => {
    // TODO: Add confirmation dialog
    await signOut()
  }

  const handleNotificationSettings = () => {
    router.push('/settings/notifications')
  }

  const handlePrivacySettings = () => {
    router.push('/settings/privacy')
  }

  const handleAccountManagement = () => {
    router.push('/settings/account')
  }

  const handleThemeSettings = () => {
    router.push('/settings/theme')
  }

  const handleAboutHelp = () => {
    router.push('/about')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView bg="$surface50">
        <VStack space="lg" padding="$6">
          {/* Header */}
          <VStack space="sm">
            <Text fontSize="$3xl" fontWeight="bold" color="$surface900">
              Settings
            </Text>
            <Text fontSize="$lg" color="$surface600">
              Customize your DiveTribe experience
            </Text>
          </VStack>

          {/* Preferences Section */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Preferences
            </Text>
            
            <SettingsItem
              icon={<Bell size={20} color="#0891b2" />}
              title="Notifications"
              subtitle="Manage dive reminders and social alerts"
              onPress={handleNotificationSettings}
            />
            
            <SettingsItem
              icon={<Shield size={20} color="#0891b2" />}
              title="Privacy & Safety"
              subtitle="Control who sees your posts and location"
              onPress={handlePrivacySettings}
            />
            
            <SettingsItem
              icon={<Palette size={20} color="#0891b2" />}
              title="Theme"
              subtitle="Choose your preferred color theme"
              onPress={handleThemeSettings}
            />
          </VStack>

          <Divider />

          {/* Account Section */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Account
            </Text>
            
            <SettingsItem
              icon={<User size={20} color="#0891b2" />}
              title="Account Management"
              subtitle="Update profile, export data, delete account"
              onPress={handleAccountManagement}
            />
          </VStack>

          <Divider />

          {/* Support Section */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Support
            </Text>
            
            <SettingsItem
              icon={<HelpCircle size={20} color="#0891b2" />}
              title="About & Help"
              subtitle="App info, support, and privacy policy"
              onPress={handleAboutHelp}
            />
          </VStack>

          <Divider />

          {/* Sign Out */}
          <VStack space="md" marginTop="$4">
            <SettingsItem
              icon={<LogOut size={20} color="#dc2626" />}
              title="Sign Out"
              subtitle="Sign out of your DiveTribe account"
              onPress={handleSignOut}
              showChevron={false}
              danger={true}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}