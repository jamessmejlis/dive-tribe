import { Redirect } from 'expo-router'
import { useAuthStore, selectIsAuthenticated } from '../stores/auth.store'
import { Box, Spinner } from '@gluestack-ui/themed'
import { COLORS } from '../constants'

/**
 * Root index route that redirects to appropriate screen based on auth state
 */
export default function IndexScreen() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isInitialized = useAuthStore((state) => state.isInitialized)

  // Show loading spinner while auth system is initializing
  if (!isInitialized || isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$surface50">
        <Spinner color={COLORS.DIVE_BLUE} size="large" />
      </Box>
    )
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/(auth)/welcome" />
}