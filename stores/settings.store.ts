import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../services/supabase'

export interface NotificationPreferences {
  dive_reminders: boolean
  social_notifications: boolean
  safety_alerts: boolean
  buddy_requests: boolean
  group_activities: boolean
  marketing_communications: boolean
}

export interface PrivacySettings {
  default_post_visibility: 'public' | 'friends' | 'private'
  location_sharing: 'exact' | 'fuzzy' | 'none'
  profile_visibility: {
    name: boolean
    bio: boolean
    certifications: boolean
    gear_list: boolean
    dive_stats: boolean
  }
  activity_privacy: {
    hide_personal_records: boolean
    hide_dive_locations: boolean
    hide_achievement_notifications: boolean
  }
}

export interface DataExport {
  user_profile: Record<string, unknown>
  dive_history: Record<string, unknown>[]
  posts: Record<string, unknown>[]
  connections: Record<string, unknown>[]
  group_memberships: Record<string, unknown>[]
  settings: Record<string, unknown>
}

interface SettingsState {
  // State
  notifications: NotificationPreferences
  privacy: PrivacySettings
  theme: 'light' | 'dark' | 'system'
  loading: boolean
  error: string | null

  // Actions
  loadSettings: (userId: string) => Promise<void>
  updateNotifications: (prefs: Partial<NotificationPreferences>) => Promise<void>
  updatePrivacy: (settings: Partial<PrivacySettings>) => Promise<void>
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>
  exportData: (userId: string) => Promise<DataExport>
  deleteAccount: (userId: string) => Promise<void>
  reset: () => void
}

// Default settings
const defaultNotifications: NotificationPreferences = {
  dive_reminders: true,
  social_notifications: true,
  safety_alerts: true,
  buddy_requests: true,
  group_activities: true,
  marketing_communications: false
}

const defaultPrivacy: PrivacySettings = {
  default_post_visibility: 'friends',
  location_sharing: 'fuzzy',
  profile_visibility: {
    name: true,
    bio: true,
    certifications: true,
    gear_list: true,
    dive_stats: true
  },
  activity_privacy: {
    hide_personal_records: false,
    hide_dive_locations: false,
    hide_achievement_notifications: false
  }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Initial state
  notifications: defaultNotifications,
  privacy: defaultPrivacy,
  theme: 'system',
  loading: false,
  error: null,

  // Load user settings from Supabase and local storage
  loadSettings: async (userId: string) => {
    set({ loading: true, error: null })
    
    try {
      // Load theme from local storage
      const storedTheme = await AsyncStorage.getItem('@divetribe_theme')
      if (storedTheme) {
        set({ theme: storedTheme as 'light' | 'dark' | 'system' })
      }

      // Load settings from user profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('notification_preferences, privacy_settings')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (profile) {
        set({
          notifications: profile.notification_preferences || defaultNotifications,
          privacy: profile.privacy_settings || defaultPrivacy
        })
      }

      set({ loading: false })
    } catch (error) {
      console.error('Failed to load settings:', error)
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to load settings'
      })
    }
  },

  // Update notification preferences
  updateNotifications: async (prefs: Partial<NotificationPreferences>) => {
    const currentUser = supabase.auth.getUser()
    if (!currentUser) return

    set({ loading: true, error: null })
    
    try {
      const newNotifications = { ...get().notifications, ...prefs }

      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: newNotifications })
        .eq('id', (await currentUser).data.user?.id)

      if (error) throw error

      set({ notifications: newNotifications, loading: false })
    } catch (error) {
      console.error('Failed to update notifications:', error)
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update notifications'
      })
    }
  },

  // Update privacy settings
  updatePrivacy: async (settings: Partial<PrivacySettings>) => {
    const currentUser = supabase.auth.getUser()
    if (!currentUser) return

    set({ loading: true, error: null })
    
    try {
      const newPrivacy = { ...get().privacy, ...settings }

      const { error } = await supabase
        .from('profiles')
        .update({ privacy_settings: newPrivacy })
        .eq('id', (await currentUser).data.user?.id)

      if (error) throw error

      set({ privacy: newPrivacy, loading: false })
    } catch (error) {
      console.error('Failed to update privacy settings:', error)
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update privacy settings'
      })
    }
  },

  // Set theme preference
  setTheme: async (theme: 'light' | 'dark' | 'system') => {
    try {
      await AsyncStorage.setItem('@divetribe_theme', theme)
      set({ theme })
    } catch (error) {
      console.error('Failed to save theme preference:', error)
    }
  },

  // Export user data for GDPR compliance
  exportData: async (userId: string): Promise<DataExport> => {
    set({ loading: true, error: null })
    
    try {
      // Fetch all user data
      const [profileResult, divesResult, postsResult, connectionsResult, groupsResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('dives').select('*').eq('user_id', userId),
        supabase.from('posts').select('*').eq('user_id', userId),
        supabase.from('connections').select('*').or(`user_id.eq.${userId},connected_user_id.eq.${userId}`),
        supabase.from('group_members').select('*, groups(*)').eq('user_id', userId)
      ])

      const exportData: DataExport = {
        user_profile: profileResult.data,
        dive_history: divesResult.data || [],
        posts: postsResult.data || [],
        connections: connectionsResult.data || [],
        group_memberships: groupsResult.data || [],
        settings: {
          notifications: get().notifications,
          privacy: get().privacy,
          theme: get().theme
        }
      }

      set({ loading: false })
      return exportData
    } catch (error) {
      console.error('Failed to export data:', error)
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to export data'
      })
      throw error
    }
  },

  // Delete user account
  deleteAccount: async (userId: string) => {
    set({ loading: true, error: null })
    
    try {
      // This should trigger a cascade delete in the database
      const { error } = await supabase.auth.admin.deleteUser(userId)
      
      if (error) throw error

      // Clear local storage
      await AsyncStorage.multiRemove([
        '@divetribe_theme',
        '@divetribe_user',
        '@divetribe_session'
      ])

      set({ loading: false })
    } catch (error) {
      console.error('Failed to delete account:', error)
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete account'
      })
      throw error
    }
  },

  // Reset store state
  reset: () => {
    set({
      notifications: defaultNotifications,
      privacy: defaultPrivacy,
      theme: 'system',
      loading: false,
      error: null
    })
  }
}))