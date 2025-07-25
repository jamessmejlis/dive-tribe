import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          DiveTribe
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Community Feed
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          Welcome to DiveTribe! This will be your community feed where you can
          see dive stories, achievements, and connect with fellow divers.
        </Text>
      </Box>
    </SafeAreaView>
  )
}
