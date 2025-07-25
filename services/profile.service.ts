import { supabase } from './supabase'
import { UserProfile, PrivacySettings } from '../types'
import * as ImagePicker from 'expo-image-picker'
import { PROFILE_VALIDATION_RULES, FILE_UPLOAD_LIMITS } from '../constants/profile'

export class ProfileService {
  /**
   * Sanitize text input to prevent XSS and other injection attacks
   */
  private static sanitizeTextInput(input: string): string {
    return input
      .trim()
      .replace(/[<>"'&]/g, (char) => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        }
        return entities[char] || char
      })
  }
  /**
   * Create or update user profile in the database
   */
  static async updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required to update profile')
    }

    try {
      // Sanitize text inputs
      const sanitizedData = { ...profileData }
      if (sanitizedData.display_name) {
        sanitizedData.display_name = this.sanitizeTextInput(sanitizedData.display_name)
      }
      if (sanitizedData.bio) {
        sanitizedData.bio = this.sanitizeTextInput(sanitizedData.bio)
      }
      
      const { error } = await supabase
        .from('users')
        .update({ 
          profile: sanitizedData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('Error updating profile:', error)
        throw new Error(`Failed to update profile: ${error.message}`)
      }
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  /**
   * Update user privacy settings
   */
  static async updatePrivacySettings(userId: string, privacySettings: PrivacySettings): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          privacy_settings: privacySettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('Error updating privacy settings:', error)
        throw new Error(`Failed to update privacy settings: ${error.message}`)
      }
    } catch (error) {
      console.error('Privacy settings update error:', error)
      throw error
    }
  }

  /**
   * Get user profile data
   */
  static async getProfile(userId: string): Promise<{ profile: UserProfile | null, privacy_settings: PrivacySettings | null }> {
    if (!userId) {
      throw new Error('User ID is required to fetch profile')
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('profile, privacy_settings')
        .eq('id', userId)
        .single()

      if (error) {
        // Handle specific error cases
        if (error.code === 'PGRST116') {
          // No rows returned - user doesn't exist or has no profile
          return { profile: null, privacy_settings: null }
        }
        console.error('Error fetching profile:', error)
        throw new Error(`Failed to fetch profile: ${error.message}`)
      }

      return {
        profile: data?.profile || null,
        privacy_settings: data?.privacy_settings || null
      }
    } catch (error) {
      console.error('Profile fetch error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred while fetching profile')
    }
  }

  /**
   * Request camera/library permissions and launch image picker
   */
  static async selectProfileImage(): Promise<string | null> {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        throw new Error('Camera roll permissions are required to select a photo')
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for profile photos
        quality: 0.8,
        base64: false,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null
      }

      return result.assets[0].uri
    } catch (error) {
      console.error('Image selection error:', error)
      throw error
    }
  }

  /**
   * Upload profile photo to Supabase Storage and return the public URL
   */
  static async uploadProfilePhoto(userId: string, imageUri: string): Promise<string> {
    if (!userId || !imageUri) {
      throw new Error('User ID and image URI are required for photo upload')
    }

    try {
      // Convert image to blob
      const response = await fetch(imageUri)
      if (!response.ok) {
        throw new Error('Failed to fetch image from URI')
      }
      
      const blob = await response.blob()
      
      // Validate file type and size
      const isValidType = FILE_UPLOAD_LIMITS.ALLOWED_TYPES.some(type => type === blob.type)
      if (!isValidType) {
        throw new Error(`Invalid file type. Only ${FILE_UPLOAD_LIMITS.ALLOWED_EXTENSIONS.join(', ').toUpperCase()} images are allowed.`)
      }
      
      if (blob.size > FILE_UPLOAD_LIMITS.MAX_SIZE) {
        const maxSizeMB = FILE_UPLOAD_LIMITS.MAX_SIZE / (1024 * 1024)
        throw new Error(`File size too large. Maximum size is ${maxSizeMB}MB.`)
      }
      
      const arrayBuffer = await blob.arrayBuffer()
      
      // Generate secure filename
      const fileExtension = blob.type.split('/')[1] || 'jpg'
      const timestamp = Date.now()
      const fileName = `profile_${timestamp}.${fileExtension}`
      const filePath = `avatars/${userId}/${fileName}`

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, {
          contentType: `image/${fileExtension}`,
          upsert: true // Replace existing file
        })

      if (error) {
        console.error('Error uploading photo:', error)
        throw new Error(`Failed to upload photo: ${error.message}`)
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return publicData.publicUrl
    } catch (error) {
      console.error('Photo upload error:', error)
      throw error
    }
  }

  /**
   * Complete profile setup by updating the profile with all collected data
   */
  static async completeProfileSetup(
    userId: string, 
    profileData: UserProfile, 
    privacySettings: PrivacySettings
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          profile: profileData,
          privacy_settings: privacySettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('Error completing profile setup:', error)
        throw new Error(`Failed to complete profile setup: ${error.message}`)
      }
    } catch (error) {
      console.error('Profile setup completion error:', error)
      throw error
    }
  }

  /**
   * Check if user has completed profile setup
   */
  static async isProfileSetupComplete(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('profile')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error checking profile setup status:', error)
        return false
      }

      // Check if essential profile fields are filled
      const profile = data?.profile as UserProfile
      return !!(profile?.display_name && profile?.diving_goals?.length > 0)
    } catch (error) {
      console.error('Profile setup check error:', error)
      return false
    }
  }

  /**
   * Validate profile data before saving
   */
  static validateProfileData(profileData: Partial<UserProfile>): { isValid: boolean, errors: string[] } {
    const errors: string[] = []

    if (profileData.display_name) {
      if (profileData.display_name.length < PROFILE_VALIDATION_RULES.DISPLAY_NAME.MIN_LENGTH) {
        errors.push(`Display name must be at least ${PROFILE_VALIDATION_RULES.DISPLAY_NAME.MIN_LENGTH} characters`)
      }
      if (profileData.display_name.length > PROFILE_VALIDATION_RULES.DISPLAY_NAME.MAX_LENGTH) {
        errors.push(`Display name must be less than ${PROFILE_VALIDATION_RULES.DISPLAY_NAME.MAX_LENGTH} characters`)
      }
      if (!PROFILE_VALIDATION_RULES.DISPLAY_NAME.REGEX.test(profileData.display_name)) {
        errors.push('Display name can only contain letters, numbers, spaces, hyphens, and apostrophes')
      }
    }

    if (profileData.bio && profileData.bio.length > PROFILE_VALIDATION_RULES.BIO.MAX_LENGTH) {
      errors.push(`Bio must be less than ${PROFILE_VALIDATION_RULES.BIO.MAX_LENGTH} characters`)
    }

    if (profileData.years_experience !== undefined) {
      if (profileData.years_experience < PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MIN || profileData.years_experience > PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MAX) {
        errors.push(`Years of experience must be between ${PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MIN} and ${PROFILE_VALIDATION_RULES.YEARS_EXPERIENCE.MAX}`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}