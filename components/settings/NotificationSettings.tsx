import React, { useEffect, useState } from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Switch,
  Pressable,
  Button,
  ButtonText,
  Spinner
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, Bell, AlertTriangle, Users, Heart, MessageSquare, Mail } from 'lucide-react-native'
import { useSettingsStore, NotificationPreferences } from '../../stores/settings.store'
import { useAuthStore } from '../../stores/auth.store'
// import * as Notifications from 'expo-notifications' // TODO: Add when dependency is available

interface NotificationToggleProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
}

function NotificationToggle({ 
  icon, 
  title, 
  subtitle, 
  value, 
  onToggle, 
  disabled = false 
}: NotificationToggleProps) {
  return (
    <Box
      bg="$surface0"
      paddingHorizontal="$4"
      paddingVertical="$4"
      borderRadius="$lg"
      marginBottom="$2"
      opacity={disabled ? 0.6 : 1}
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
          disabled={disabled}
        />
      </HStack>
    </Box>
  )
}

export default function NotificationSettingsScreen() {
  const { user } = useAuthStore()
  const { notifications, loading, updateNotifications, loadSettings } = useSettingsStore()
  const [permissionStatus, setPermissionStatus] = useState<string>('undetermined')
  const [requestingPermissions, setRequestingPermissions] = useState(false)

  useEffect(() => {
    if (user?.id) {
      loadSettings(user.id)
    }
    checkNotificationPermissions()
  }, [user?.id, loadSettings])

  const checkNotificationPermissions = async () => {
    // TODO: Implement when expo-notifications is available
    setPermissionStatus('granted') // Simulate granted for now
  }

  const requestNotificationPermissions = async () => {
    setRequestingPermissions(true)
    try {
      // TODO: Implement when expo-notifications is available
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate request
      setPermissionStatus('granted')
    } catch (error) {
      console.error('Failed to request notification permissions:', error)
    } finally {
      setRequestingPermissions(false)
    }
  }

  const handleToggle = async (key: keyof NotificationPreferences, value: boolean) => {
    await updateNotifications({ [key]: value })
  }

  const handleBack = () => {
    router.back()
  }

  const permissionsGranted = permissionStatus === 'granted'

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
          <VStack space="md" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <Text fontSize="$lg" color="$surface600">
              Loading notification settings...
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
                Notifications
              </Text>
              <Text fontSize="$lg" color="$surface600">
                Manage your notification preferences
              </Text>
            </VStack>
          </HStack>

          {/* Permission Status */}
          {!permissionsGranted && (
            <Box
              bg="$warning50"
              padding="$4"
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$warning200"
            >
              <VStack space="md">
                <HStack space="sm" alignItems="center">
                  <AlertTriangle size={20} color="#f59e0b" />
                  <Text fontSize="$md" fontWeight="medium" color="$warning800">
                    Notifications Disabled
                  </Text>
                </HStack>
                <Text fontSize="$sm" color="$warning700">
                  Enable notifications in your device settings to receive dive reminders and social updates.
                </Text>
                <Button
                  bg="$warning500"
                  onPress={requestNotificationPermissions}
                  disabled={requestingPermissions}
                  size="sm"
                >
                  <ButtonText color="white">
                    {requestingPermissions ? 'Requesting...' : 'Enable Notifications'}
                  </ButtonText>
                </Button>
              </VStack>
            </Box>
          )}

          {/* Diving Notifications */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Diving & Safety
            </Text>
            
            <NotificationToggle
              icon={<Bell size={20} color="#0891b2" />}
              title="Dive Reminders"
              subtitle="Get reminded to log your dives and track your progress"
              value={notifications.dive_reminders}
              onToggle={(value) => handleToggle('dive_reminders', value)}
              disabled={!permissionsGranted}
            />
            
            <NotificationToggle
              icon={<AlertTriangle size={20} color="#dc2626" />}
              title="Safety Alerts"
              subtitle="Important safety notifications and weather warnings"
              value={notifications.safety_alerts}
              onToggle={(value) => handleToggle('safety_alerts', value)}
              disabled={!permissionsGranted}
            />
          </VStack>

          {/* Social Notifications */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Social & Community
            </Text>
            
            <NotificationToggle
              icon={<Heart size={20} color="#dc2626" />}
              title="Social Interactions"
              subtitle="Likes, comments, and mentions on your posts"
              value={notifications.social_notifications}
              onToggle={(value) => handleToggle('social_notifications', value)}
              disabled={!permissionsGranted}
            />
            
            <NotificationToggle
              icon={<Users size={20} color="#0891b2" />}
              title="Buddy Requests"
              subtitle="New dive buddy requests and acceptances"
              value={notifications.buddy_requests}
              onToggle={(value) => handleToggle('buddy_requests', value)}
              disabled={!permissionsGranted}
            />
            
            <NotificationToggle
              icon={<MessageSquare size={20} color="#0891b2" />}
              title="Group Activities"
              subtitle="Updates from diving groups you've joined"
              value={notifications.group_activities}
              onToggle={(value) => handleToggle('group_activities', value)}
              disabled={!permissionsGranted}
            />
          </VStack>

          {/* Marketing */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Updates & News
            </Text>
            
            <NotificationToggle
              icon={<Mail size={20} color="#0891b2" />}
              title="Marketing Communications"
              subtitle="Product updates, tips, and promotional offers"
              value={notifications.marketing_communications}
              onToggle={(value) => handleToggle('marketing_communications', value)}
              disabled={!permissionsGranted}
            />
          </VStack>

          {/* Help Text */}
          <Box
            bg="$surface100"
            padding="$4"
            borderRadius="$lg"
            marginTop="$4"
          >
            <VStack space="sm">
              <Text fontSize="$md" fontWeight="medium" color="$surface800">
                💡 Notification Tips
              </Text>
              <Text fontSize="$sm" color="$surface600">
                • Safety alerts are always recommended to stay informed about diving conditions
                • You can customize notification times in your device settings
                • Critical safety notifications will always be delivered regardless of these settings
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}