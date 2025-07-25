import { Text, Box, Button, ButtonText, VStack } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '../../stores/auth.store'

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <VStack space="lg" alignItems="center">
          <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
            Profile
          </Text>
          <Text fontSize="$lg" color="$surface600">
            Welcome, {user?.email}
          </Text>
          <Text
            fontSize="$md"
            color="$surface500"
            textAlign="center"
            px="$4"
          >
            Your diving profile and achievements will be shown here.
          </Text>
          
          <Button 
            size="lg" 
            variant="outline" 
            borderColor="$safety500"
            onPress={handleSignOut}
            mt="$8"
          >
            <ButtonText color="$safety500">
              Sign Out
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  )
}
