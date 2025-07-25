import { Text, Box } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChallengesScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$surface50" alignItems="center" justifyContent="center">
        <Text fontSize="$2xl" fontWeight="bold" color="$primary500">
          Challenges
        </Text>
        <Text fontSize="$lg" color="$surface600" mt="$2">
          Compete & Achieve
        </Text>
        <Text
          fontSize="$md"
          color="$surface500"
          mt="$4"
          textAlign="center"
          px="$4"
        >
          Join diving challenges, compete with the community, and earn
          achievements. Push your limits safely with fellow divers.
        </Text>
      </Box>
    </SafeAreaView>
  )
}
