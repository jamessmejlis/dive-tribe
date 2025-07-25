import React, { ReactNode } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore, selectIsAuthenticated } from '../../stores/auth.store'
import { Box, Spinner } from '@gluestack-ui/themed'
import { COLORS } from '../../constants'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * ProtectedRoute component that redirects unauthenticated users to the auth flow
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isInitialized = useAuthStore((state) => state.isInitialized)

  // Show loading spinner while auth system is initializing or loading
  if (!isInitialized || isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$surface50">
        <Spinner color={COLORS.DIVE_BLUE} size="large" />
      </Box>
    )
  }

  // Redirect to auth flow if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />
  }

  // User is authenticated, show protected content
  return <>{children}</>
}

export default ProtectedRoute