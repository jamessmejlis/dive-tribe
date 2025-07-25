import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthService, AuthUser, AuthSession } from '../services/auth.service'

export interface AuthState {
  // State
  user: AuthUser | null
  session: AuthSession | null
  isLoading: boolean
  isInitialized: boolean
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
  signInWithApple: () => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  resendEmailVerification: (email: string) => Promise<{ success: boolean; error?: string }>
  refreshSession: () => Promise<{ success: boolean; error?: string }>
  initialize: () => Promise<void>
  setSession: (session: AuthSession | null) => void
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,

      // Actions
      signIn: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          const result = await AuthService.signIn(email, password)

          if (result.error) {
            return { success: false, error: result.error }
          }

          set({
            user: result.user,
            session: result.session,
            isLoading: false,
          })

          return { success: true }
        } catch (error) {
          console.error('Store signIn error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      signUp: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          const result = await AuthService.signUp(email, password)

          if (result.error) {
            set({ isLoading: false })
            return { success: false, error: result.error }
          }

          // Only set session if user doesn't need email verification
          if (!result.needsEmailVerification && result.session) {
            set({
              user: result.user,
              session: result.session,
              isLoading: false,
            })
          } else {
            set({ isLoading: false })
          }

          return { 
            success: true, 
            needsVerification: result.needsEmailVerification 
          }
        } catch (error) {
          console.error('Store signUp error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      signInWithGoogle: async () => {
        set({ isLoading: true })

        try {
          const result = await AuthService.signInWithGoogle()

          if (result.error) {
            set({ isLoading: false })
            return { success: false, error: result.error }
          }

          set({
            user: result.user,
            session: result.session,
            isLoading: false,
          })

          return { success: true }
        } catch (error) {
          console.error('Store signInWithGoogle error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      signInWithApple: async () => {
        set({ isLoading: true })

        try {
          const result = await AuthService.signInWithApple()

          if (result.error) {
            set({ isLoading: false })
            return { success: false, error: result.error }
          }

          set({
            user: result.user,
            session: result.session,
            isLoading: false,
          })

          return { success: true }
        } catch (error) {
          console.error('Store signInWithApple error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      signOut: async () => {
        set({ isLoading: true })

        try {
          await AuthService.signOut()
        } catch (error) {
          console.error('Store signOut error:', error)
        } finally {
          // Always clear local state regardless of API result
          set({
            user: null,
            session: null,
            isLoading: false,
          })
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true })

        try {
          const result = await AuthService.resetPassword(email)
          set({ isLoading: false })

          if (result.error) {
            return { success: false, error: result.error }
          }

          return { success: true }
        } catch (error) {
          console.error('Store resetPassword error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      resendEmailVerification: async (email: string) => {
        set({ isLoading: true })

        try {
          const result = await AuthService.resendEmailVerification(email)
          set({ isLoading: false })

          if (result.error) {
            return { success: false, error: result.error }
          }

          return { success: true }
        } catch (error) {
          console.error('Store resendEmailVerification error:', error)
          set({ isLoading: false })
          return { success: false, error: 'An unexpected error occurred' }
        }
      },

      refreshSession: async () => {
        try {
          const result = await AuthService.refreshSession()

          if (result.error) {
            console.error('Session refresh failed:', result.error)
            // If refresh fails, sign out user
            set({ user: null, session: null })
            return { success: false, error: result.error }
          }

          if (result.session) {
            set({ session: result.session })
          }

          return { success: true }
        } catch (error) {
          console.error('Store refreshSession error:', error)
          set({ user: null, session: null })
          return { success: false, error: 'Session refresh failed' }
        }
      },

      initialize: async () => {
        if (get().isInitialized) return

        set({ isLoading: true })

        try {
          // Get current session
          const sessionResult = await AuthService.getCurrentSession()
          
          if (sessionResult.session) {
            set({
              session: sessionResult.session,
              user: sessionResult.session.user,
            })
          }

          // Set up auth state listener
          AuthService.onAuthStateChange((session) => {
            set({
              session,
              user: session?.user || null,
            })
          })

        } catch (error) {
          console.error('Auth initialization error:', error)
        } finally {
          set({ 
            isLoading: false, 
            isInitialized: true 
          })
        }
      },

      // Direct setters for auth state changes
      setSession: (session: AuthSession | null) => {
        set({ 
          session, 
          user: session?.user || null 
        })
      },

      setUser: (user: AuthUser | null) => {
        set({ user })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'divetribe-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user and session, not loading states
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
      // Skip hydration for loading states
      skipHydration: false,
    }
  )
)

// Selectors for common auth checks
export const selectIsAuthenticated = (state: AuthState) => 
  !!state.user && !!state.session && state.user.emailConfirmed

export const selectIsEmailVerified = (state: AuthState) => 
  !!state.user?.emailConfirmed

export const selectNeedsEmailVerification = (state: AuthState) => 
  !!state.user && !state.user.emailConfirmed