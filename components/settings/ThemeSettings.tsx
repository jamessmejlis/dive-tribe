import React, { useEffect, useState } from 'react'
import {
  Text,
  Box,
  VStack,
  HStack,
  ScrollView,
  Pressable,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  Spinner
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, Sun, Moon, Smartphone, Palette } from 'lucide-react-native'
import { useSettingsStore } from '../../stores/settings.store'
import { useAuthStore } from '../../stores/auth.store'
import { useColorScheme } from 'react-native'

interface ThemeOptionProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value: string
  isSelected: boolean
  onSelect: () => void
}

function ThemeOption({ icon, title, subtitle, value, isSelected, onSelect }: ThemeOptionProps) {
  return (
    <Pressable onPress={onSelect}>
      <Box
        bg={isSelected ? '$primary50' : '$surface0'}
        paddingHorizontal="$4"
        paddingVertical="$4"
        borderRadius="$lg"
        marginBottom="$2"
        borderWidth={isSelected ? 2 : 1}
        borderColor={isSelected ? '$primary300' : '$surface200'}
      >
        <HStack space="md" alignItems="center">
          <Box
            width={40}
            height={40}
            borderRadius="$md"
            bg={isSelected ? '$primary100' : '$surface100'}
            alignItems="center"
            justifyContent="center"
          >
            {React.cloneElement(icon as React.ReactElement, { 
              size: 20, 
              color: isSelected ? '#0891b2' : '#64748b'
            })}
          </Box>
          
          <VStack flex={1} space="xs">
            <Text 
              fontSize="$lg" 
              fontWeight="medium" 
              color={isSelected ? '$primary700' : '$surface900'}
            >
              {title}
            </Text>
            <Text 
              fontSize="$sm" 
              color={isSelected ? '$primary600' : '$surface600'}
            >
              {subtitle}
            </Text>
          </VStack>
          
          <Radio value={value} size="md">
            <RadioIndicator mr="$2">
              <RadioIcon as={CircleIcon} strokeWidth={1} />
            </RadioIndicator>
          </Radio>
        </HStack>
      </Box>
    </Pressable>
  )
}

export default function ThemeSettingsScreen() {
  const { user } = useAuthStore()
  const { theme, loading, setTheme, loadSettings } = useSettingsStore()
  const systemColorScheme = useColorScheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    if (user?.id) {
      loadSettings(user.id)
    }
  }, [user?.id, loadSettings])

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  const handleBack = () => {
    router.back()
  }

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setCurrentTheme(newTheme)
    await setTheme(newTheme)
  }

  const getEffectiveTheme = () => {
    if (currentTheme === 'system') {
      return systemColorScheme || 'light'
    }
    return currentTheme
  }

  const themeOptions = [
    {
      value: 'light',
      icon: <Sun />,
      title: 'Light Theme',
      subtitle: 'Clean, bright interface perfect for daylight diving'
    },
    {
      value: 'dark',
      icon: <Moon />,
      title: 'Dark Theme',
      subtitle: 'Easy on the eyes for night diving and low-light conditions'
    },
    {
      value: 'system',
      icon: <Smartphone />,
      title: 'System Default',
      subtitle: 'Automatically matches your device settings'
    }
  ]

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
          <VStack space="md" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <Text fontSize="$lg" color="$surface600">
              Loading theme settings...
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
                Theme
              </Text>
              <Text fontSize="$lg" color="$surface600">
                Choose your preferred color theme
              </Text>
            </VStack>
          </HStack>

          {/* Current Theme Preview */}
          <Box
            bg="$surface0"
            padding="$4"
            borderRadius="$lg"
          >
            <VStack space="sm">
              <HStack space="sm" alignItems="center">
                <Palette size={16} color="#0891b2" />
                <Text fontSize="$md" fontWeight="medium" color="$surface800">
                  Current Theme: {getEffectiveTheme() === 'light' ? 'Light' : 'Dark'}
                </Text>
              </HStack>
              {currentTheme === 'system' && (
                <Text fontSize="$sm" color="$surface600">
                  Following system preference ({systemColorScheme || 'light'})
                </Text>
              )}
            </VStack>
          </Box>

          {/* Theme Options */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Theme Options
            </Text>
            
            <RadioGroup value={currentTheme} onChange={handleThemeChange}>
              {themeOptions.map((option) => (
                <ThemeOption
                  key={option.value}
                  icon={option.icon}
                  title={option.title}
                  subtitle={option.subtitle}
                  value={option.value}
                  isSelected={currentTheme === option.value}
                  onSelect={() => handleThemeChange(option.value as 'light' | 'dark' | 'system')}
                />
              ))}
            </RadioGroup>
          </VStack>

          {/* Color Palette Preview */}
          <VStack space="md">
            <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
              Ocean Color Palette
            </Text>
            
            <Box
              bg="$surface0"
              padding="$4"
              borderRadius="$lg"
            >
              <VStack space="md">
                <Text fontSize="$md" fontWeight="medium" color="$surface800">
                  DiveTribe Colors
                </Text>
                
                <HStack space="md" flexWrap="wrap">
                  <VStack space="xs" alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      bg="$primary500"
                      borderRadius="$md"
                    />
                    <Text fontSize="$xs" color="$surface600">
                      Dive Blue
                    </Text>
                  </VStack>
                  
                  <VStack space="xs" alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      bg="$depth500"
                      borderRadius="$md"
                    />
                    <Text fontSize="$xs" color="$surface600">
                      Deep Water
                    </Text>
                  </VStack>
                  
                  <VStack space="xs" alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      bg="$safety500"
                      borderRadius="$md"
                    />
                    <Text fontSize="$xs" color="$surface600">
                      Safety Red
                    </Text>
                  </VStack>
                  
                  <VStack space="xs" alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      bg="$achievement500"
                      borderRadius="$md"
                    />
                    <Text fontSize="$xs" color="$surface600">
                      Achievement
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Theme Info */}
          <Box
            bg="$info50"
            padding="$4"
            borderRadius="$lg"
            borderWidth={1}
            borderColor="$info200"
            marginTop="$4"
          >
            <VStack space="sm">
              <Text fontSize="$md" fontWeight="medium" color="$info800">
                🎨 Theme Features
              </Text>
              <Text fontSize="$sm" color="$info700">
                • Ocean-inspired color palette designed for divers
              </Text>
              <Text fontSize="$sm" color="$info700">
                • High contrast for underwater visibility
              </Text>
              <Text fontSize="$sm" color="$info700">
                • System theme automatically adjusts with your device
              </Text>
              <Text fontSize="$sm" color="$info700">
                • Changes apply instantly across the entire app
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}