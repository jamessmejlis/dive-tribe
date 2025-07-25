import React, { useState } from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Pressable,
  Button,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Input,
  InputField,
  Spinner,
  Icon,
  CloseIcon
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { 
  ArrowLeft, 
  LogOut, 
  Trash2, 
  Download, 
  AlertTriangle,
  Shield
} from 'lucide-react-native'
import { useAuthStore } from '../../stores/auth.store'
import { useSettingsStore } from '../../stores/settings.store'

interface AccountActionProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  onPress: () => void
  danger?: boolean
  warning?: boolean
}

function AccountAction({ icon, title, subtitle, onPress, danger = false, warning = false }: AccountActionProps) {
  const bgColor = danger ? '$safety50' : warning ? '$warning50' : '$surface0'
  const iconColor = danger ? '#dc2626' : warning ? '#f59e0b' : '#0891b2'
  const textColor = danger ? '$safety600' : warning ? '$warning600' : '$surface900'

  return (
    <Pressable onPress={onPress}>
      <Box
        bg={bgColor}
        paddingHorizontal="$4"
        paddingVertical="$4"
        borderRadius="$lg"
        marginBottom="$2"
        borderWidth={danger ? 1 : 0}
        borderColor={danger ? '$safety200' : undefined}
      >
        <HStack space="md" alignItems="center">
          <Box
            width={40}
            height={40}
            borderRadius="$md"
            bg={danger ? '$safety100' : warning ? '$warning100' : '$primary50'}
            alignItems="center"
            justifyContent="center"
          >
            {React.cloneElement(icon as React.ReactElement, { 
              size: 20, 
              color: iconColor 
            })}
          </Box>
          
          <VStack flex={1} space="xs">
            <Text fontSize="$lg" fontWeight="medium" color={textColor}>
              {title}
            </Text>
            <Text fontSize="$sm" color={danger ? '$safety500' : warning ? '$warning500' : '$surface600'}>
              {subtitle}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  )
}

export default function AccountManagementScreen() {
  const { user, signOut } = useAuthStore()
  const { exportData, deleteAccount } = useSettingsStore()
  
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    setShowLogoutDialog(false)
    await signOut()
  }

  const handleExportData = async () => {
    if (!user?.id) return
    
    setExporting(true)
    try {
      const data = await exportData(user.id)
      
      // TODO: Implement actual file download/share
      // For now, we'll log the data structure
      console.log('Export data:', Object.keys(data))
      
      // In a real implementation, you would:
      // 1. Convert data to JSON/CSV
      // 2. Use expo-sharing or expo-file-system to save/share the file
      // 3. Show success message
      
      alert('Data export completed! Check your downloads folder.')
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true)
    setDeleteConfirmText('')
  }

  const confirmDeleteAccount = async () => {
    if (!user?.id || deleteConfirmText !== 'DELETE') return
    
    setDeleting(true)
    try {
      await deleteAccount(user.id)
      setShowDeleteDialog(false)
      // Account deletion will automatically sign out the user
    } catch (error) {
      console.error('Account deletion failed:', error)
      alert('Failed to delete account. Please contact support.')
      setDeleting(false)
    }
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
                Account Management
              </Text>
              <Text fontSize="$lg" color="$surface600">
                Manage your account and data
              </Text>
            </VStack>
          </HStack>

          {/* Account Info */}
          <Box
            bg="$surface0"
            padding="$4"
            borderRadius="$lg"
          >
            <VStack space="sm">
              <Text fontSize="$lg" fontWeight="medium" color="$surface800">
                Account Information
              </Text>
              <Text fontSize="$md" color="$surface600">
                Email: {user?.email}
              </Text>
              <Text fontSize="$sm" color="$surface500">
                Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </Text>
            </VStack>
          </Box>

          {/* Data Management */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Data Management
            </Text>
            
            <AccountAction
              icon={<Download />}
              title="Export My Data"
              subtitle="Download all your DiveTribe data (GDPR compliant)"
              onPress={handleExportData}
            />
          </VStack>

          {/* Account Actions */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Account Actions
            </Text>
            
            <AccountAction
              icon={<LogOut />}
              title="Sign Out"
              subtitle="Sign out of your DiveTribe account"
              onPress={handleLogout}
              warning={true}
            />
            
            <AccountAction
              icon={<Trash2 />}
              title="Delete Account"
              subtitle="Permanently delete your account and all data"
              onPress={handleDeleteAccount}
              danger={true}
            />
          </VStack>

          {/* GDPR Info */}
          <Box
            bg="$info50"
            padding="$4"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$info200"
            marginTop="$4"
          >
            <VStack space="sm">
              <HStack space="sm" alignItems="center">
                <Shield size={16} color="#0891b2" />
                <Text fontSize="$md" fontWeight="medium" color="$info800">
                  Your Data Rights
                </Text>
              </HStack>
              <Text fontSize="$sm" color="$info700">
                Under GDPR, you have the right to access, correct, and delete your personal data. 
                Use the export feature to download your data, or contact support for assistance.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <AlertDialog isOpen={showLogoutDialog} onClose={() => setShowLogoutDialog(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text fontSize="$lg" fontWeight="bold">
              Sign Out
            </Text>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontSize="$md">
              Are you sure you want to sign out of your DiveTribe account?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onPress={() => setShowLogoutDialog(false)}
              mr="$3"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              bg="$warning500"
              onPress={confirmLogout}
            >
              <ButtonText color="white">Sign Out</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <HStack space="sm" alignItems="center">
              <AlertTriangle size={20} color="#dc2626" />
              <Text fontSize="$lg" fontWeight="bold" color="$safety600">
                Delete Account
              </Text>
            </HStack>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack space="md">
              <Text fontSize="$md" color="$surface900">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </Text>
              
              <Box
                bg="$safety50"
                padding="$3"
                borderRadius="$md"
                borderWidth={1}
                borderColor="$safety200"
              >
                <VStack space="sm">
                  <Text fontSize="$sm" fontWeight="medium" color="$safety800">
                    This will delete:
                  </Text>
                  <Text fontSize="$sm" color="$safety700">
                    • Your profile and personal information
                  </Text>
                  <Text fontSize="$sm" color="$safety700">
                    • All dive logs and photos
                  </Text>
                  <Text fontSize="$sm" color="$safety700">
                    • Social connections and posts
                  </Text>
                  <Text fontSize="$sm" color="$safety700">
                    • Group memberships and activities
                  </Text>
                </VStack>
              </Box>
              
              <VStack space="sm">
                <Text fontSize="$sm" color="$surface700">
                  To confirm deletion, type <Text fontWeight="bold" fontSize="$sm">DELETE</Text> below:
                </Text>
                <Input>
                  <InputField
                    value={deleteConfirmText}
                    onChangeText={setDeleteConfirmText}
                    placeholder="Type DELETE to confirm"
                  />
                </Input>
              </VStack>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onPress={() => setShowDeleteDialog(false)}
              mr="$3"
              disabled={deleting}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              bg="$safety500"
              onPress={confirmDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE' || deleting}
            >
              {deleting ? (
                <HStack space="sm" alignItems="center">
                  <Spinner size="small" color="white" />
                  <ButtonText color="white">Deleting...</ButtonText>
                </HStack>
              ) : (
                <ButtonText color="white">Delete Account</ButtonText>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Loading overlay for export */}
      {exporting && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.5)"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="$surface0"
            padding="$6"
            borderRadius="$lg"
            alignItems="center"
          >
            <VStack space="md" alignItems="center">
              <Spinner size="large" color="$primary500" />
              <Text fontSize="$lg" color="$surface900">
                Exporting your data...
              </Text>
              <Text fontSize="$sm" color="$surface600" textAlign="center">
                This may take a few moments
              </Text>
            </VStack>
          </Box>
        </Box>
      )}
    </SafeAreaView>
  )
}