import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          Profile
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Your Diving Journey
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          View your diving stats, manage your profile, and access settings.
          Track your progress and celebrate your achievements.
        </Text>
      </Box>
    </SafeAreaView>
  )
}
