import React, { useEffect, ReactNode } from 'react'
import { useAuthStore } from '../../stores/auth.store'

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
    // Could show a splash screen component here
    return null
  }

  return <>{children}</>
}

export default AuthProvider