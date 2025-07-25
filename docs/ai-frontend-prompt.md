# DiveTribe AI Frontend Generation Prompt

## High-Level Goal

Create a premium mobile-first React Native application for DiveTribe - "Strava for Freedivers" - that combines dive performance tracking with social community features. Build responsive, ocean-inspired UI components that serve both competitive athletes and recreational diving enthusiasts.

## Detailed Step-by-Step Instructions

1. **Initialize React Native Project Structure**
   - Create React Native app with Expo managed workflow
   - Install and configure Gluestack UI v2 as the component library
   - Set up React Navigation v6 with bottom tab navigator (5 tabs)
   - Configure Supabase client for authentication and database
   - Implement basic TypeScript types for diving data structures

2. **Design System Implementation**
   - Create theme configuration with ocean-inspired color palette (Deep Ocean #0B1426, Dive Blue #1E3A8A, Aqua Active #06B6D4)
   - Implement Inter font family with Source Code Pro for metrics
   - Set up 8px base spacing system with consistent component sizing
   - Create custom icons based on diving equipment (depth gauge, fins, bubbles)

3. **Core Navigation Structure**
   - Bottom tab navigator with tabs: Home (feed), Discover (people/sites), Log Dive (center action), Challenges, Profile
   - Implement tab icons with active/inactive states and notification badges
   - Add floating action button on Log Dive tab for quick dive entry
   - Include modal navigation for creation flows and detail views

4. **Authentication & Onboarding Flow**
   - Welcome screen with ocean video background and value proposition
   - OAuth integration buttons for Google/Apple with email fallback
   - Multi-step profile wizard: basic info → diving experience → goals/interests
   - Location permissions request with clear diving-specific benefits
   - Profile photo upload with placeholder avatar system

5. **Dive Logging Interface (Core Feature)**
   - Manual dive entry form with large touch targets for wet hands
   - Environment toggle: Ocean/Open Water vs Pool training
   - Discipline selection: CWT, FIM, CNF, DYN, DNF, STA, Variable Weight, No Limits
   - Smart form fields: depth, time, location with GPS integration
   - Photo upload (up to 5 images) with compression
   - Garmin Connect integration placeholder (sync status indicator)
   - Offline capability with local storage and sync queue

6. **Community Feed (Home Tab)**
   - Infinite scroll card layout optimized for dive content
   - Post cards featuring: profile photo, dive metrics overlay, location chip, main photo, caption
   - Engagement actions: like heart, comment, share with smooth animations
   - Pull-to-refresh with wave animation
   - Group highlights carousel at top of feed
   - Create post floating action button with quick dive post option

7. **Discovery & Matching (Discover Tab)**
   - Filter panel: distance radius, skill level, certifications, availability
   - User profile cards in grid layout with compatibility indicators
   - Map view toggle showing nearby divers and dive sites
   - Instructor profiles with verification badges and service listings
   - Contact options: WhatsApp, email, phone with privacy controls
   - Dive site catalog with photos, descriptions, and recent activity

8. **Personal Analytics Dashboard**
   - Key statistics summary cards: total dives, deepest dive, longest dive
   - Monthly progress charts with depth trends over time
   - Dive frequency calendar heatmap (GitHub-style contributions)
   - Personal milestones with achievement celebrations
   - Equipment usage tracking with gear optimization suggestions
   - Export functionality for dive statistics

9. **Challenges & Gamification**
   - Featured challenges carousel with join/participate actions
   - Challenge categories: depth, duration, frequency, exploration
   - Real-time leaderboards with skill-level filtering
   - Achievement badge system with progress indicators
   - Challenge progress tracking with visual completion bars
   - Safety disclaimers and responsible diving messaging

10. **User Profile & Settings**
    - Personal dive history with filter/search capabilities
    - Profile editing with diving certifications and gear lists
    - Privacy controls for post visibility (public/friends/private)
    - Business profile upgrade option for instructors
    - Notification preferences and account management
    - GDPR-compliant data export and deletion options

## Code Examples, Data Structures & Constraints

### Core Data Types

```typescript
interface DiveLog {
  id: string
  userId: string
  environment: 'ocean' | 'pool'
  discipline: 'CWT' | 'FIM' | 'CNF' | 'DYN' | 'DNF' | 'STA' | 'VWT' | 'NLT'
  maxDepth?: number // meters
  duration?: number // seconds
  distance?: number // meters for dynamic disciplines
  location: {
    name: string
    coordinates: [number, number]
    isPrivate: boolean
  }
  conditions?: {
    temperature: number
    visibility: number
  }
  equipment: string[]
  notes: string
  photos: string[]
  timestamp: Date
  isFromGarmin: boolean
}

interface UserProfile {
  id: string
  displayName: string
  bio: string
  profilePhoto: string
  certifications: string[]
  experienceYears: number
  goals: string[]
  gear: string[]
  location: {
    city: string
    country: string
    coordinates: [number, number]
  }
  privacySettings: {
    defaultPostVisibility: 'public' | 'friends' | 'private'
    showLocation: boolean
    allowMessages: boolean
  }
}
```

### Theme Configuration

```typescript
const theme = {
  colors: {
    primary: '#1E3A8A', // Dive Blue
    secondary: '#06B6D4', // Aqua Active
    background: '#0B1426', // Deep Ocean
    surface: '#F8FAFC', // Surface Light
    text: '#334155', // Depth Gradient
    success: '#059669', // Community Green
    warning: '#F59E0B', // Achievement Gold
    error: '#EA580C', // Safety Orange
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fonts: {
    primary: 'Inter',
    metrics: 'SourceCodePro',
  },
}
```

### Required Component Patterns

```typescript
// DiveCard Component for Feed
interface DiveCardProps {
  dive: DiveLog
  user: UserProfile
  onLike: () => void
  onComment: () => void
  onShare: () => void
  showEngagement: boolean
}

// Use Gluestack UI components: Card, Button, Image, Text, Badge
// Implement metric overlays on dive photos
// Include smooth like animations and haptic feedback
```

### API Integration Constraints

```typescript
// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// Required API endpoints
interface ApiEndpoints {
  dives: '/api/dives'
  users: '/api/users'
  challenges: '/api/challenges'
  diveSites: '/api/dive-sites'
  garminSync: '/api/garmin/sync'
}

// Offline-first architecture with optimistic updates
// Real-time subscriptions for community feed updates
// Image optimization and lazy loading for performance
```

### Mobile-Specific Requirements

```typescript
// React Native specific configurations
import { Platform } from 'react-native'

// Location services integration
import * as Location from 'expo-location'

// Camera and photo handling
import * as ImagePicker from 'expo-image-picker'

// Push notifications
import * as Notifications from 'expo-notifications'

// Biometric authentication for app security
import * as LocalAuthentication from 'expo-local-authentication'
```

## Define Strict Scope

**You should ONLY create:**

- React Native components using Gluestack UI v2
- TypeScript interfaces for diving-specific data structures
- Basic navigation structure with bottom tabs
- Core screens: Welcome, Dive Logging, Community Feed, Discovery, Profile
- Authentication flows with Supabase integration
- Responsive layouts optimized for mobile-first experience

**Do NOT modify or create:**

- Backend API implementations (use Supabase client only)
- External service integrations beyond Supabase (Garmin API is external)
- Native iOS/Android platform-specific code
- Complex state management beyond React hooks and Context
- Payment processing or subscription management
- Advanced analytics or reporting features

**Technical Constraints:**

- Use ONLY Gluestack UI v2 components - no custom UI libraries
- Implement TypeScript throughout with strict type checking
- Follow React Native performance best practices (FlatList for large datasets, Image optimization)
- Ensure offline functionality with local storage and sync queues
- Maintain 60fps animations using React Native Reanimated
- Optimize for mid-range Android devices and iPhone SE performance
- Support iOS 13+ and Android API 21+ minimum versions

**Design Constraints:**

- Maintain ocean-inspired color palette throughout all components
- Use Inter font family with Source Code Pro for metrics only
- Implement 8px spacing system consistently
- Ensure WCAG AA color contrast ratios (4.5:1 minimum)
- Optimize touch targets for 44px minimum size
- Design for one-handed mobile usage patterns
- Include loading states and error boundaries for all async operations

**Data Privacy Constraints:**

- Implement privacy-by-design with granular post visibility controls
- Default to "friends-only" privacy for all user-generated content
- Provide clear data export and deletion capabilities
- Respect location privacy with optional GPS tagging
- Include safety warnings and responsible diving messaging throughout

This prompt provides comprehensive guidance for creating a production-ready DiveTribe mobile application that balances performance tracking with community features while maintaining the premium, safety-conscious experience expected by the freediving community.
