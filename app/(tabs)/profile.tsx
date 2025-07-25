import React, { useEffect } from 'react'
import { 
  Text, 
  Box, 
  Button, 
  ButtonText, 
  VStack, 
  HStack,
  Image,
  Center,
  ScrollView,
  Spinner
} from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuthStore } from '../../stores/auth.store'
import { useProfileStore } from '../../stores/profile.store'

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore()
  const { profile, loading, setupComplete, loadProfile, checkSetupComplete } = useProfileStore()

  useEffect(() => {
    if (user?.id) {
      loadProfile(user.id)
      checkSetupComplete(user.id)
    }
  }, [user?.id, loadProfile, checkSetupComplete])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleEditProfile = () => {
    router.push('/profile/edit')
  }

  const handleCompleteSetup = () => {
    router.push('/profile/setup/welcome')
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
          <VStack space="md" alignItems="center">
            <Spinner size="large" color="$primary500" />
            <Text fontSize="$lg" color="$surface600">
              Loading profile...
            </Text>
          </VStack>
        </Box>
      </SafeAreaView>
    )
  }

  // Show setup prompt if profile is incomplete
  if (!setupComplete) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
          <VStack space="lg" alignItems="center" px="$6">
            <Box
              width={100}
              height={100}
              borderRadius="$full"
              bg="$primary100"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="$3xl">🏊‍♂️</Text>
            </Box>
            
            <VStack space="md" alignItems="center">
              <Text fontSize="$2xl" fontWeight="bold" color="$surface900" textAlign="center">
                Complete Your Profile
              </Text>
              <Text fontSize="$lg" color="$surface600" textAlign="center">
                Set up your diving profile to connect with the community and track your adventures.
              </Text>
            </VStack>
            
            <VStack space="md" width="100%">
              <Button 
                bg="$primary500" 
                onPress={handleCompleteSetup}
                borderRadius="$lg"
                paddingVertical="$4"
              >
                <ButtonText color="white" fontSize="$lg" fontWeight="medium">
                  Complete Setup
                </ButtonText>
              </Button>
              
              <Button 
                variant="outline" 
                borderColor="$surface300"
                onPress={handleSignOut}
                borderRadius="$lg"
                paddingVertical="$4"
              >
                <ButtonText color="$surface600" fontSize="$lg" fontWeight="medium">
                  Sign Out
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView bg="$surface50">
        <VStack space="lg" padding="$6">
          {/* Profile Header */}
          <VStack space="lg" alignItems="center">
            <Center>
              <Box
                width={120}
                height={120}
                borderRadius="$full"
                bg={profile?.avatar_url ? 'transparent' : '$surface200'}
                borderWidth={3}
                borderColor="$primary200"
                alignItems="center"
                justifyContent="center"
              >
                {profile?.avatar_url ? (
                  <Image 
                    source={{ uri: profile.avatar_url }}
                    alt="Profile photo"
                    width={114}
                    height={114}
                    borderRadius="$full"
                  />
                ) : (
                  <Text fontSize="$4xl">👤</Text>
                )}
              </Box>
            </Center>

            <VStack space="sm" alignItems="center">
              <Text fontSize="$3xl" fontWeight="bold" color="$surface900">
                {profile?.display_name || 'Diver'}
              </Text>
              
              {profile?.bio && (
                <Text 
                  fontSize="$lg" 
                  color="$surface600" 
                  textAlign="center"
                  maxWidth={300}
                >
                  {profile.bio}
                </Text>
              )}
              
              <HStack space="md" alignItems="center">
                <Text fontSize="$md" color="$surface500">
                  {profile?.years_experience || 0} years diving
                </Text>
                <Text fontSize="$md" color="$surface400">•</Text>
                <Text fontSize="$md" color="$surface500">
                  {user?.email}
                </Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Certifications */}
          {profile?.certifications && profile.certifications.length > 0 && (
            <VStack space="md">
              <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
                Certifications
              </Text>
              <HStack space="xs" flexWrap="wrap">
                {profile.certifications.map((cert, index) => (
                  <Box
                    key={index}
                    bg="$primary50"
                    borderRadius="$md"
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                    marginBottom="$2"
                    marginRight="$1"
                  >
                    <Text fontSize="$sm" color="$primary700" fontWeight="medium">
                      {cert}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
          )}

          {/* Diving Goals */}
          {profile?.diving_goals && profile.diving_goals.length > 0 && (
            <VStack space="md">
              <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
                Diving Goals
              </Text>
              <HStack space="xs" flexWrap="wrap">
                {profile.diving_goals.map((goal, index) => (
                  <Box
                    key={index}
                    bg="$achievement50"
                    borderRadius="$md"
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                    marginBottom="$2"
                    marginRight="$1"
                  >
                    <Text fontSize="$sm" color="$achievement700" fontWeight="medium">
                      {goal}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
          )}

          {/* Gear List */}
          {profile?.gear_list && profile.gear_list.length > 0 && (
            <VStack space="md">
              <Text fontSize="$xl" fontWeight="semibold" color="$surface800">
                Gear
              </Text>
              <VStack space="sm">
                {profile.gear_list.map((item) => (
                  <HStack key={item.id} space="md" alignItems="center">
                    <Box
                      bg="$surface100"
                      borderRadius="$md"
                      padding="$3"
                      flex={1}
                    >
                      <Text fontSize="$md" fontWeight="medium" color="$surface800">
                        {item.name}
                      </Text>
                      {item.brand && (
                        <Text fontSize="$sm" color="$surface600">
                          {item.brand} • {item.category}
                        </Text>
                      )}
                      {item.notes && (
                        <Text fontSize="$sm" color="$surface500" mt="$1">
                          {item.notes}
                        </Text>
                      )}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          )}

          {/* Action Buttons */}
          <VStack space="md" marginTop="$8">
            <Button 
              bg="$primary500" 
              onPress={handleEditProfile}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText color="white" fontSize="$lg" fontWeight="medium">
                Edit Profile
              </ButtonText>
            </Button>
            
            <Button 
              variant="outline" 
              borderColor="$safety500"
              onPress={handleSignOut}
              borderRadius="$lg"
              paddingVertical="$4"
            >
              <ButtonText color="$safety500" fontSize="$lg" fontWeight="medium">
                Sign Out
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
