// DiveTribe Type Definitions

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
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
