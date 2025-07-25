import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProfile, PrivacySettings } from '../types'
import { ProfileService } from '../services/profile.service'

interface ProfileState {
  // State
  profile: UserProfile | null
  privacySettings: PrivacySettings | null
  loading: boolean
  setupComplete: boolean
  error: string | null

  // Profile setup form data (temporary storage during setup)
  setupFormData: {
    basicInfo: Partial<UserProfile>
    divingExperience: Partial<UserProfile>
    gearList: Partial<UserProfile>
    privacySettings: Partial<PrivacySettings>
  }

  // Actions
  setProfile: (profile: UserProfile | null) => void
  setPrivacySettings: (settings: PrivacySettings | null) => void
  setLoading: (loading: boolean) => void
  setSetupComplete: (complete: boolean) => void
  setError: (error: string | null) => void

  // Setup form actions
  updateSetupFormData: (section: keyof ProfileState['setupFormData'], data: Record<string, unknown>) => void
  clearSetupFormData: () => void

  // Async actions
  loadProfile: (userId: string) => Promise<void>
  updateProfile: (userId: string, updates: Partial<UserProfile>) => Promise<void>
  updatePrivacySettings: (userId: string, settings: PrivacySettings) => Promise<void>
  uploadAvatar: (userId: string, imageUri: string) => Promise<string>
  completeProfileSetup: (userId: string) => Promise<void>
  checkSetupComplete: (userId: string) => Promise<boolean>
}

const defaultPrivacySettings: PrivacySettings = {
  post_visibility: 'friends',
  location_sharing: false,
  profile_visibility: 'friends',
  activity_visibility: 'friends'
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      privacySettings: null,
      loading: false,
      setupComplete: false,
      error: null,
      setupFormData: {
        basicInfo: {},
        divingExperience: {},
        gearList: {},
        privacySettings: {}
      },

      // Sync actions
      setProfile: (profile) => set({ profile }),
      setPrivacySettings: (settings) => set({ privacySettings: settings }),
      setLoading: (loading) => set({ loading }),
      setSetupComplete: (complete) => set({ setupComplete: complete }),
      setError: (error) => set({ error }),

      // Setup form actions
      updateSetupFormData: (section, data) => {
        const currentSetupFormData = get().setupFormData
        set({
          setupFormData: {
            ...currentSetupFormData,
            [section]: { ...currentSetupFormData[section], ...data }
          }
        })
      },

      clearSetupFormData: () => set({
        setupFormData: {
          basicInfo: {},
          divingExperience: {},
          gearList: {},
          privacySettings: {}
        }
      }),

      // Async actions
      loadProfile: async (userId: string) => {
        set({ loading: true, error: null })
        try {
          const { profile, privacy_settings } = await ProfileService.getProfile(userId)
          const isSetupComplete = await ProfileService.isProfileSetupComplete(userId)
          
          set({ 
            profile, 
            privacySettings: privacy_settings || defaultPrivacySettings,
            setupComplete: isSetupComplete,
            loading: false 
          })
        } catch (error) {
          console.error('Failed to load profile:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to load profile',
            loading: false 
          })
        }
      },

      updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
        set({ loading: true, error: null })
        try {
          // Validate profile data
          const validation = ProfileService.validateProfileData(updates)
          if (!validation.isValid) {
            throw new Error(validation.errors.join(', '))
          }

          const currentProfile = get().profile
          const updatedProfile = { ...currentProfile, ...updates } as UserProfile

          await ProfileService.updateProfile(userId, updatedProfile)
          set({ profile: updatedProfile, loading: false })
        } catch (error) {
          console.error('Failed to update profile:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update profile',
            loading: false 
          })
          throw error
        }
      },

      updatePrivacySettings: async (userId: string, settings: PrivacySettings) => {
        set({ loading: true, error: null })
        try {
          await ProfileService.updatePrivacySettings(userId, settings)
          set({ privacySettings: settings, loading: false })
        } catch (error) {
          console.error('Failed to update privacy settings:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update privacy settings',
            loading: false 
          })
          throw error
        }
      },

      uploadAvatar: async (userId: string, imageUri: string) => {
        set({ loading: true, error: null })
        try {
          const avatarUrl = await ProfileService.uploadProfilePhoto(userId, imageUri)
          
          // Update profile with new avatar URL
          const currentProfile = get().profile
          const updatedProfile = { ...currentProfile, avatar_url: avatarUrl } as UserProfile
          
          await ProfileService.updateProfile(userId, updatedProfile)
          set({ profile: updatedProfile, loading: false })
          
          return avatarUrl
        } catch (error) {
          console.error('Failed to upload avatar:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to upload avatar',
            loading: false 
          })
          throw error
        }
      },

      completeProfileSetup: async (userId: string) => {
        set({ loading: true, error: null })
        try {
          const { setupFormData } = get()
          
          // Combine all setup form data into final profile
          const finalProfile: UserProfile = {
            display_name: setupFormData.basicInfo.display_name || '',
            bio: setupFormData.basicInfo.bio,
            avatar_url: setupFormData.basicInfo.avatar_url,
            certifications: setupFormData.divingExperience.certifications || [],
            years_experience: setupFormData.divingExperience.years_experience || 0,
            diving_goals: setupFormData.divingExperience.diving_goals || [],
            gear_list: setupFormData.gearList.gear_list || []
          }

          const finalPrivacySettings: PrivacySettings = {
            ...defaultPrivacySettings,
            ...setupFormData.privacySettings
          }

          // Validate final profile data
          const validation = ProfileService.validateProfileData(finalProfile)
          if (!validation.isValid) {
            throw new Error(validation.errors.join(', '))
          }

          await ProfileService.completeProfileSetup(userId, finalProfile, finalPrivacySettings)
          
          set({ 
            profile: finalProfile,
            privacySettings: finalPrivacySettings,
            setupComplete: true,
            loading: false 
          })

          // Clear setup form data
          get().clearSetupFormData()
        } catch (error) {
          console.error('Failed to complete profile setup:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to complete profile setup',
            loading: false 
          })
          throw error
        }
      },

      checkSetupComplete: async (userId: string) => {
        try {
          const isComplete = await ProfileService.isProfileSetupComplete(userId)
          set({ setupComplete: isComplete })
          return isComplete
        } catch (error) {
          console.error('Failed to check setup status:', error)
          return false
        }
      }
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        privacySettings: state.privacySettings,
        setupComplete: state.setupComplete,
        setupFormData: state.setupFormData
      })
    }
  )
)