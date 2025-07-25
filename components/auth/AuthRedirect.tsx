import React, { ReactNode } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore, selectIsAuthenticated } from '../../stores/auth.store'
import { Box, Spinner } from '@gluestack-ui/themed'
import { COLORS } from '../../constants'

interface AuthRedirectProps {
  children: ReactNode
}

/**
 * AuthRedirect component that redirects authenticated users away from auth screens
 */
export function AuthRedirect({ children }: AuthRedirectProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isInitialized = useAuthStore((state) => state.isInitialized)

  // Show loading spinner while auth system is initializing
  if (!isInitialized) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$surface50">
        <Spinner color={COLORS.DIVE_BLUE} size="large" />
      </Box>
    )
  }

  // Redirect to main app if already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />
  }

  // User is not authenticated, show auth screens
  return <>{children}</>
}

export default AuthRedirect