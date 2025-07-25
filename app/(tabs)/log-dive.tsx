import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LogDiveScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          Log Dive
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Record Your Adventures
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          Log your dives manually or sync automatically with your Garmin dive
          computer. Track your progress and share your underwater adventures.
        </Text>
      </Box>
    </SafeAreaView>
  )
}
