// DiveTribe Type Definitions

export interface User {
  id: string
  email: string
  profile?: UserProfile
  privacy_settings?: PrivacySettings
  location?: {
    latitude: number
    longitude: number
  }
  created_at: string
  updated_at: string
}

export interface UserProfile {
  display_name: string
  bio?: string
  avatar_url?: string
  certifications: string[]
  years_experience: number
  diving_goals: string[]
  gear_list: GearItem[]
}

export interface GearItem {
  id: string
  name: string
  brand?: string
  category: 'mask' | 'fins' | 'wetsuit' | 'computer' | 'bcd' | 'regulator' | 'other'
  notes?: string
}

export interface PrivacySettings {
  post_visibility: 'public' | 'friends' | 'private'
  location_sharing: boolean
  profile_visibility: 'public' | 'friends' | 'private'
  activity_visibility: 'public' | 'friends' | 'private'
}

export interface DiveEntry {
  id: string
  user_id: string
  depth: number
  duration: number
  location?: string
  notes?: string
  created_at: string
}

// Theme-related types
export interface ThemeColors {
  primary: Record<string, string>
  surface: Record<string, string>
  depth: Record<string, string>
  safety: Record<string, string>
  achievement: Record<string, string>
}
