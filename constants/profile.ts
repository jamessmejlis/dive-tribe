// Profile-related constants

export const CERTIFICATION_LEVELS = [
  'Open Water',
  'Advanced Open Water',
  'Rescue Diver',
  'Divemaster',
  'Instructor',
  'Freediving Level 1',
  'Freediving Level 2',
  'Freediving Level 3',
  'Spearfishing Certified',
  'Technical Diver',
  'Other'
] as const

export const DIVING_GOALS = [
  'Explore new dive sites',
  'Improve depth and breath hold',
  'Learn spearfishing',
  'Photography/videography',
  'Marine conservation',
  'Technical diving',
  'Connect with local divers',
  'Compete in competitions',
  'Teach others',
  'Wreck diving'
] as const

export const GEAR_CATEGORIES = [
  { value: 'mask', label: '🥽 Mask' },
  { value: 'fins', label: '🦶 Fins' },
  { value: 'wetsuit', label: '🏊‍♂️ Wetsuit' },
  { value: 'computer', label: '⌚ Dive Computer' },
  { value: 'bcd', label: '🎒 BCD' },
  { value: 'regulator', label: '🫁 Regulator' },
  { value: 'other', label: '🛠️ Other' }
] as const

export const VISIBILITY_OPTIONS = [
  { value: 'public', label: '🌍 Public', description: 'Visible to everyone' },
  { value: 'friends', label: '👥 Friends Only', description: 'Visible to your connections' },
  { value: 'private', label: '🔒 Private', description: 'Only visible to you' }
] as const

export const PROFILE_VALIDATION_RULES = {
  DISPLAY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    REGEX: /^[a-zA-Z0-9\s\-']+$/
  },
  BIO: {
    MAX_LENGTH: 500
  },
  YEARS_EXPERIENCE: {
    MIN: 0,
    MAX: 50
  },
  GEAR_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100
  },
  GEAR_BRAND: {
    MAX_LENGTH: 50
  },
  GEAR_NOTES: {
    MAX_LENGTH: 200
  }
} as const

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp']
} as const