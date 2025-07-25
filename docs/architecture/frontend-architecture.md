# Frontend Architecture

## React Native + Expo Architecture

DiveTribe follows a **component-driven architecture** with Expo Router for navigation and Gluestack UI v2 for the component system:

### Project Structure

```
divetribe/
├── app/                          # Expo Router pages
│   ├── (auth)/                  # Authentication flow
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx
│   ├── (tabs)/                  # Main app tabs
│   │   ├── _layout.tsx         # Tab navigation
│   │   ├── index.tsx           # Home feed
│   │   ├── discover.tsx        # Discovery
│   │   ├── log-dive.tsx        # Dive logging
│   │   ├── challenges.tsx      # Challenges
│   │   └── profile.tsx         # Profile
│   ├── dive/[id].tsx           # Dive details
│   ├── post/[id].tsx           # Post details
│   └── _layout.tsx             # Root layout
├── components/                  # Reusable components
│   ├── ui/                     # Gluestack UI extensions
│   ├── dive/                   # Dive-specific components
│   ├── social/                 # Social feature components
│   └── forms/                  # Form components
├── services/                   # API and data services
│   ├── supabase.ts            # Supabase client
│   ├── dive.service.ts        # Dive management
│   ├── social.service.ts      # Social features
│   └── auth.service.ts        # Authentication
├── stores/                     # State management
│   ├── auth.store.ts          # User authentication
│   ├── dive.store.ts          # Dive data
│   └── feed.store.ts          # Social feed
├── types/                      # TypeScript definitions
│   ├── dive.types.ts          # Dive-related types
│   ├── user.types.ts          # User and profile types
│   └── api.types.ts           # API response types
├── utils/                      # Utility functions
│   ├── validation.ts          # Form validation
│   ├── formatting.ts          # Data formatting
│   └── constants.ts           # App constants
└── assets/                     # Static assets
    ├── images/
    ├── icons/
    └── animations/
```

## Component Architecture

### Design System Implementation

**Gluestack UI v2 Configuration:**

```typescript
// theme/config.ts
import { config } from '@gluestack-ui/config'

export const divetribeTheme = {
  ...config,
  tokens: {
    colors: {
      // Ocean-inspired color palette
      primary: {
        50: '#e6f7ff', // Light aqua
        500: '#0891b2', // Dive blue
        900: '#0b1426', // Deep ocean
      },
      surface: {
        50: '#f8fafc', // Light background
        900: '#0f172a', // Dark background
      },
      // Diving-specific colors
      depth: '#1e40af', // Depth indicators
      surface: '#06b6d4', // Surface markers
      safety: '#dc2626', // Safety alerts
      achievement: '#059669', // Achievements
    },
    space: {
      // 8px spacing system
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
    },
    fonts: {
      body: 'Inter',
      heading: 'Inter',
      mono: 'Source Code Pro', // For metrics only
    },
  },
}
```

### Component Standards

**Base Component Template:**

```typescript
// components/dive/DiveCard.tsx
import React from 'react'
import { Box, Text, Image, Badge, VStack, HStack } from '@gluestack-ui/themed'
import { Dive, User } from '@/types'

interface DiveCardProps {
  dive: Dive
  user: User
  onPress?: () => void
  showActions?: boolean
}

export const DiveCard: React.FC<DiveCardProps> = ({
  dive,
  user,
  onPress,
  showActions = true
}) => {
  return (
    <Box
      bg="surface.50"
      rounded="lg"
      p="$4"
      mb="$3"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Dive by ${user.name} to ${dive.depth}m`}
    >
      <VStack space="$3">
        {/* User header */}
        <HStack space="$3" alignItems="center">
          <Image
            source={{ uri: user.avatar_url }}
            size="sm"
            rounded="full"
            alt={`${user.name}'s avatar`}
          />
          <VStack flex={1}>
            <Text fontWeight="$semibold">{user.name}</Text>
            <Text size="sm" color="$textLight600">
              {dive.dive_site?.name || 'Unknown Site'}
            </Text>
          </VStack>
          <Badge variant="outline" colorScheme="primary">
            {dive.discipline}
          </Badge>
        </HStack>

        {/* Dive metrics */}
        <HStack space="$4" justifyContent="space-around">
          <VStack alignItems="center">
            <Text fontFamily="$mono" size="lg" fontWeight="$bold">
              {dive.depth_meters}m
            </Text>
            <Text size="xs" color="$textLight600">DEPTH</Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontFamily="$mono" size="lg" fontWeight="$bold">
              {formatDuration(dive.duration)}
            </Text>
            <Text size="xs" color="$textLight600">TIME</Text>
          </VStack>
          {dive.temperature && (
            <VStack alignItems="center">
              <Text fontFamily="$mono" size="lg" fontWeight="$bold">
                {dive.temperature}°C
              </Text>
              <Text size="xs" color="$textLight600">TEMP</Text>
            </VStack>
          )}
        </HStack>

        {/* Dive photo if available */}
        {dive.photos?.[0] && (
          <Image
            source={{ uri: dive.photos[0] }}
            height={200}
            rounded="md"
            alt="Dive photo"
          />
        )}

        {/* Notes preview */}
        {dive.notes && (
          <Text numberOfLines={2} color="$textLight700">
            {dive.notes}
          </Text>
        )}
      </VStack>
    </Box>
  )
}
```

## State Management with Zustand

**Authentication Store:**

```typescript
// stores/auth.store.ts
import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/services/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: false,

  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      set({ session: data.session, user: data.user })
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  setSession: (session: Session | null) => {
    set({ session, user: session?.user || null })
  },
}))
```

**Dive Data Store:**

```typescript
// stores/dive.store.ts
import { create } from 'zustand'
import { Dive } from '@/types'
import { DiveService } from '@/services/dive.service'

interface DiveState {
  dives: Dive[]
  currentDive: Dive | null
  analytics: DiveAnalytics | null
  loading: boolean
  loadDives: (userId: string) => Promise<void>
  addDive: (dive: Partial<Dive>) => Promise<void>
  updateDive: (id: string, updates: Partial<Dive>) => Promise<void>
  loadAnalytics: (userId: string) => Promise<void>
}

export const useDiveStore = create<DiveState>((set, get) => ({
  dives: [],
  currentDive: null,
  analytics: null,
  loading: false,

  loadDives: async (userId: string) => {
    set({ loading: true })
    try {
      const dives = await DiveService.getUserDives(userId)
      set({ dives })
    } catch (error) {
      console.error('Load dives error:', error)
    } finally {
      set({ loading: false })
    }
  },

  addDive: async (dive: Partial<Dive>) => {
    try {
      const newDive = await DiveService.createDive(dive)
      set((state) => ({
        dives: [newDive, ...state.dives],
      }))
    } catch (error) {
      console.error('Add dive error:', error)
      throw error
    }
  },

  loadAnalytics: async (userId: string) => {
    try {
      const analytics = await DiveService.getAnalytics(userId)
      set({ analytics })
    } catch (error) {
      console.error('Load analytics error:', error)
    }
  },
}))
```

## Navigation & Routing

**Expo Router Configuration:**

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { divetribeTheme } from '@/theme/config'
import { AuthProvider } from '@/providers/AuthProvider'

export default function RootLayout() {
  return (
    <GluestackUIProvider config={divetribeTheme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' }
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="dive/[id]"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Dive Details'
            }}
          />
        </Stack>
      </AuthProvider>
    </GluestackUIProvider>
  )
}
```

**Tab Navigation:**

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'
import {
  Home,
  Search,
  PlusCircle,
  Award,
  User
} from 'lucide-react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 84
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="log-dive"
        options={{
          title: 'Log Dive',
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => <Award size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />
        }}
      />
    </Tabs>
  )
}
```
