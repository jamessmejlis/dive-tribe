import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          Discover
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Find Dive Buddies & Sites
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          Discover dive buddies, instructors, and amazing dive sites around the
          world. Connect with your local diving community.
        </Text>
      </Box>
    </SafeAreaView>
  )
}
