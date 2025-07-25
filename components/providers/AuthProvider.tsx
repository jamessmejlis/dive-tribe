import React, { useEffect, ReactNode } from 'react'
import { Box, Spinner } from '@gluestack-ui/themed'
import { useAuthStore } from '../../stores/auth.store'
import { COLORS } from '../../constants'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider component that initializes the authentication system
 * and provides auth state throughout the app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const initialize = useAuthStore((state) => state.initialize)
  const isInitialized = useAuthStore((state) => state.isInitialized)

  useEffect(() => {
    // Initialize auth system on app start
    initialize()
  }, [initialize])

  // Show loading screen while auth is initializing
  if (!isInitialized) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color={COLORS.DIVE_BLUE} size="large" />
      </Box>
    )
  }

  return <>{children}</>
}

export default AuthProvider