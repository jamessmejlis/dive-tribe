import React from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Pressable
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Shield,
  FileText
} from 'lucide-react-native'
import { APP_CONFIG } from '../constants'

interface AboutItemProps {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onPress: () => void
  showExternal?: boolean
}

function AboutItem({ icon, title, subtitle, onPress, showExternal = false }: AboutItemProps) {
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
            {subtitle && (
              <Text fontSize="$sm" color="$surface600">
                {subtitle}
              </Text>
            )}
          </VStack>
          
          {showExternal && (
            <ExternalLink size={16} color="#64748b" />
          )}
        </HStack>
      </Box>
    </Pressable>
  )
}

export default function AboutScreen() {
  const handleBack = () => {
    router.back()
  }

  const handleSupport = () => {
    // TODO: Open email client or support form
    console.log('Open support contact')
  }

  const handlePrivacyPolicy = () => {
    // TODO: Open privacy policy URL
    console.log('Open privacy policy')
  }

  const handleTermsOfService = () => {
    // TODO: Open terms of service URL
    console.log('Open terms of service')
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
                About & Help
              </Text>
            </VStack>
          </HStack>

          {/* App Info Section */}
          <VStack space="md">
            <Box
              bg="$surface0"
              padding="$6"
              borderRadius="$lg"
              alignItems="center"
            >
              <Box
                width={80}
                height={80}
                borderRadius="$full"
                bg="$primary100"
                alignItems="center"
                justifyContent="center"
                marginBottom="$4"
              >
                <Text fontSize="$4xl">🏊‍♂️</Text>
              </Box>
              
              <VStack space="sm" alignItems="center">
                <Text fontSize="$2xl" fontWeight="bold" color="$surface900">
                  {APP_CONFIG.NAME}
                </Text>
                <Text fontSize="$lg" color="$surface600">
                  Version {APP_CONFIG.VERSION}
                </Text>
                <Text fontSize="$md" color="$surface500" textAlign="center">
                  {APP_CONFIG.DESCRIPTION}
                </Text>
              </VStack>
            </Box>
          </VStack>

          {/* Support Section */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Support
            </Text>
            
            <AboutItem
              icon={<Mail size={20} color="#0891b2" />}
              title="Contact Support"
              subtitle="Get help with your account or report issues"
              onPress={handleSupport}
            />
          </VStack>

          {/* Legal Section */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Legal
            </Text>
            
            <AboutItem
              icon={<Shield size={20} color="#0891b2" />}
              title="Privacy Policy"
              subtitle="How we protect and use your data"
              onPress={handlePrivacyPolicy}
              showExternal={true}
            />
            
            <AboutItem
              icon={<FileText size={20} color="#0891b2" />}
              title="Terms of Service"
              subtitle="Terms and conditions of use"
              onPress={handleTermsOfService}
              showExternal={true}
            />
          </VStack>

          {/* App Info */}
          <VStack space="md" marginTop="$8">
            <Box
              bg="$surface100"
              padding="$4"
              borderRadius="$lg"
            >
              <VStack space="sm">
                <Text fontSize="$md" fontWeight="medium" color="$surface800">
                  Build Information
                </Text>
                <Text fontSize="$sm" color="$surface600">
                  Environment: Development
                </Text>
                <Text fontSize="$sm" color="$surface600">
                  Build Date: {new Date().toLocaleDateString()}
                </Text>
              </VStack>
            </Box>
          </VStack>

          {/* Safety Notice */}
          <VStack space="md" marginTop="$4">
            <Box
              bg="$warning50"
              padding="$4"
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$warning200"
            >
              <VStack space="sm">
                <Text fontSize="$md" fontWeight="medium" color="$warning800">
                  ⚠️ Diving Safety Notice
                </Text>
                <Text fontSize="$sm" color="$warning700">
                  Always dive within your limits and follow proper safety protocols. 
                  DiveTribe is for tracking and social purposes only and should never 
                  replace proper diving training, certification, or safety practices.
                </Text>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}