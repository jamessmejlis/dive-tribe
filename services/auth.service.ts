import { supabase } from './supabase'
import { 
  AuthError, 
  AuthResponse, 
  AuthTokenResponse, 
  Session, 
  User,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Platform } from 'react-native'

export interface AuthUser {
  id: string
  email: string
  emailConfirmed: boolean
  lastSignInAt?: string
  createdAt: string
}

export interface AuthSession {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: AuthUser
}

export interface SignInResult {
  user: AuthUser | null
  session: AuthSession | null
  error: string | null
}

export interface SignUpResult {
  user: AuthUser | null
  session: AuthSession | null
  error: string | null
  needsEmailVerification: boolean
}

/**
 * Authentication service wrapper for Supabase Auth
 * Provides simplified interface for authentication operations
 */
export class AuthService {
  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string): Promise<SignInResult> {
    try {
      const credentials: SignInWithPasswordCredentials = {
        email: email.toLowerCase().trim(),
        password,
      }

      const { data, error }: AuthResponse = await supabase.auth.signInWithPassword(credentials)

      if (error) {
        return {
          user: null,
          session: null,
          error: this.formatAuthError(error),
        }
      }

      if (!data.user || !data.session) {
        return {
          user: null,
          session: null,
          error: 'Authentication failed. Please try again.',
        }
      }

      return {
        user: this.transformUser(data.user),
        session: this.transformSession(data.session),
        error: null,
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        user: null,
        session: null,
        error: 'Network error. Please check your connection and try again.',
      }
    }
  }

  /**
   * Sign up with email and password
   */
  static async signUp(email: string, password: string): Promise<SignUpResult> {
    try {
      const credentials: SignUpWithPasswordCredentials = {
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: undefined, // Will be handled by deep linking in production
        },
      }

      const { data, error }: AuthResponse = await supabase.auth.signUp(credentials)

      if (error) {
        return {
          user: null,
          session: null,
          error: this.formatAuthError(error),
          needsEmailVerification: false,
        }
      }

      if (!data.user) {
        return {
          user: null,
          session: null,
          error: 'Failed to create account. Please try again.',
          needsEmailVerification: false,
        }
      }

      // Check if email confirmation is required
      const needsEmailVerification = !data.session && !data.user.email_confirmed_at

      return {
        user: this.transformUser(data.user),
        session: data.session ? this.transformSession(data.session) : null,
        error: null,
        needsEmailVerification,
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return {
        user: null,
        session: null,
        error: 'Network error. Please check your connection and try again.',
        needsEmailVerification: false,
      }
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: this.formatAuthError(error) }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: 'Failed to sign out. Please try again.' }
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.toLowerCase().trim(),
        {
          redirectTo: undefined, // Will be handled by deep linking in production
        }
      )

      if (error) {
        return { error: this.formatAuthError(error) }
      }

      return { error: null }
    } catch (error) {
      console.error('Password reset error:', error)
      return { error: 'Network error. Please check your connection and try again.' }
    }
  }

  /**
   * Resend email verification
   */
  static async resendEmailVerification(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.toLowerCase().trim(),
      })

      if (error) {
        return { error: this.formatAuthError(error) }
      }

      return { error: null }
    } catch (error) {
      console.error('Resend verification error:', error)
      return { error: 'Network error. Please check your connection and try again.' }
    }
  }

  /**
   * Get current session
   */
  static async getCurrentSession(): Promise<{ session: AuthSession | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        return { session: null, error: this.formatAuthError(error) }
      }

      if (!data.session) {
        return { session: null, error: null }
      }

      return { 
        session: this.transformSession(data.session), 
        error: null 
      }
    } catch (error) {
      console.error('Get session error:', error)
      return { session: null, error: 'Failed to get session.' }
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        return { user: null, error: this.formatAuthError(error) }
      }

      if (!data.user) {
        return { user: null, error: null }
      }

      return { 
        user: this.transformUser(data.user), 
        error: null 
      }
    } catch (error) {
      console.error('Get user error:', error)
      return { user: null, error: 'Failed to get user.' }
    }
  }

  /**
   * Refresh current session
   */
  static async refreshSession(): Promise<{ session: AuthSession | null; error: string | null }> {
    try {
      const { data, error }: AuthTokenResponse = await supabase.auth.refreshSession()

      if (error) {
        return { session: null, error: this.formatAuthError(error) }
      }

      if (!data.session) {
        return { session: null, error: null }
      }

      return { 
        session: this.transformSession(data.session), 
        error: null 
      }
    } catch (error) {
      console.error('Refresh session error:', error)
      return { session: null, error: 'Failed to refresh session.' }
    }
  }

  /**
   * Sign in with Google OAuth
   */
  static async signInWithGoogle(): Promise<SignInResult> {
    try {
      // Configure Google Sign-In
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.email'],
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      })

      // Check Play Services and sign in
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signIn()

      // Extract tokens from response
      const tokens = await GoogleSignin.getTokens()
      
      if (!tokens.idToken) {
        return {
          user: null,
          session: null,
          error: 'Failed to get Google authentication token.',
        }
      }

      // Sign in to Supabase with Google token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: tokens.idToken,
      })

      if (error) {
        return {
          user: null,
          session: null,
          error: this.formatAuthError(error),
        }
      }

      if (!data.user || !data.session) {
        return {
          user: null,
          session: null,
          error: 'Google authentication failed. Please try again.',
        }
      }

      return {
        user: this.transformUser(data.user),
        session: this.transformSession(data.session),
        error: null,
      }
    } catch (error: unknown) {
      console.error('Google sign in error:', error)
      const googleError = error as { code?: string }

      if (googleError.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          user: null,
          session: null,
          error: 'Google sign in was cancelled.',
        }
      }

      if (error.code === statusCodes.IN_PROGRESS) {
        return {
          user: null,
          session: null,
          error: 'Google sign in is already in progress.',
        }
      }

      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          user: null,
          session: null,
          error: 'Google Play Services not available.',
        }
      }

      return {
        user: null,
        session: null,
        error: 'Failed to sign in with Google. Please try again.',
      }
    }
  }

  /**
   * Sign in with Apple OAuth (iOS only)
   */
  static async signInWithApple(): Promise<SignInResult> {
    try {
      if (Platform.OS !== 'ios') {
        return {
          user: null,
          session: null,
          error: 'Apple Sign-In is only available on iOS.',
        }
      }

      // Check if Apple Sign-In is available
      const isAvailable = await AppleAuthentication.isAvailableAsync()
      if (!isAvailable) {
        return {
          user: null,
          session: null,
          error: 'Apple Sign-In is not available on this device.',
        }
      }

      // Sign in with Apple
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (!appleCredential.identityToken) {
        return {
          user: null,
          session: null,
          error: 'Failed to get Apple authentication token.',
        }
      }

      // Sign in to Supabase with Apple token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: appleCredential.identityToken,
      })

      if (error) {
        return {
          user: null,
          session: null,
          error: this.formatAuthError(error),
        }
      }

      if (!data.user || !data.session) {
        return {
          user: null,
          session: null,
          error: 'Apple authentication failed. Please try again.',
        }
      }

      return {
        user: this.transformUser(data.user),
        session: this.transformSession(data.session),
        error: null,
      }
    } catch (error: unknown) {
      console.error('Apple sign in error:', error)
      const appleError = error as { code?: string }

      if (appleError.code === 'ERR_CANCELED') {
        return {
          user: null,
          session: null,
          error: 'Apple sign in was cancelled.',
        }
      }

      return {
        user: null,
        session: null,
        error: 'Failed to sign in with Apple. Please try again.',
      }
    }
  }

  /**
   * Set up auth state change listener
   */
  static onAuthStateChange(callback: (session: AuthSession | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email)
      
      if (session) {
        callback(this.transformSession(session))
      } else {
        callback(null)
      }
    })
  }

  /**
   * Transform Supabase User to AuthUser
   */
  private static transformUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email || '',
      emailConfirmed: !!user.email_confirmed_at,
      lastSignInAt: user.last_sign_in_at || undefined,
      createdAt: user.created_at,
    }
  }

  /**
   * Transform Supabase Session to AuthSession
   */
  private static transformSession(session: Session): AuthSession {
    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresAt: session.expires_at || 0,
      user: this.transformUser(session.user),
    }
  }

  /**
   * Format Supabase auth errors into user-friendly messages
   */
  private static formatAuthError(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password. Please check your credentials and try again.'
      
      case 'Email not confirmed':
        return 'Please verify your email address before signing in.'
      
      case 'User already registered':
        return 'An account with this email already exists. Please sign in instead.'
      
      case 'Signup requires a valid password':
        return 'Please enter a valid password (at least 6 characters).'
      
      case 'Unable to validate email address: invalid format':
        return 'Please enter a valid email address.'
      
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long.'
      
      case 'Too many requests':
        return 'Too many attempts. Please wait a moment before trying again.'
      
      case 'Email rate limit exceeded':
        return 'Too many emails sent. Please wait before requesting another.'
      
      default:
        console.error('Unhandled auth error:', error.message)
        return error.message || 'An unexpected error occurred. Please try again.'
    }
  }
}