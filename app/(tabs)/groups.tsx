import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GroupsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          Groups
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Connect & Explore
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          Join local diving communities, connect with fellow divers, and
          discover new dive buddies and diving spots.
        </Text>
      </Box>
    </SafeAreaView>
  )
}