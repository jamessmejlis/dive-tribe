# Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish the foundational project setup, user authentication system, and core app navigation that enables users to create accounts, set up profiles, and navigate the basic app structure. This epic delivers a working mobile app with secure user onboarding that can be deployed and tested.

## Story 1.1: Project Initialization & Setup

As a **developer**,
I want **a properly configured React Native project with all necessary dependencies**,
so that **I can begin building DiveTribe features on a solid technical foundation**.

### Acceptance Criteria

1. React Native project created with Expo managed workflow
2. Gluestack UI v2 integrated with base theme configuration
3. Supabase client configured with environment variables
4. Navigation structure implemented using React Navigation with bottom tabs
5. Basic app icons and splash screen configured
6. Development environment runs successfully on iOS and Android simulators
7. ESLint and Prettier configured for code consistency
8. Git repository initialized with proper .gitignore for React Native

## Story 1.2: User Authentication System

As a **new user**,
I want **to create an account using email, Google, or Apple login**,
so that **I can securely access DiveTribe and personalize my experience**.

### Acceptance Criteria

1. Welcome screen displays with app branding and sign-up/sign-in options
2. Email registration flow with email verification via Supabase Auth
3. Google OAuth integration working on both iOS and Android
4. Apple Sign-In integration working on iOS (Android shows email option)
5. Password reset functionality for email users
6. Secure token storage and automatic session management
7. Error handling for failed authentication attempts with user-friendly messages
8. Loading states during authentication processes

## Story 1.3: User Profile Creation & Management

As a **registered user**,
I want **to create and manage my diving profile with personal information and preferences**,
so that **I can represent myself accurately in the DiveTribe community**.

### Acceptance Criteria

1. Profile setup wizard appears after first successful authentication
2. Required fields: display name, profile photo (optional), bio (optional)
3. Diving-specific fields: certifications, years of experience, diving goals
4. Gear list section where users can add equipment they own/use
5. Privacy settings with default to "friends-only" for posts
6. Location permissions requested with clear explanation
7. Profile can be edited after initial creation through settings
8. Profile photo upload and storage via Supabase Storage
9. Form validation with helpful error messages
10. Skip options for optional fields with ability to complete later

## Story 1.4: Core App Navigation & Settings

As a **authenticated user**,
I want **intuitive navigation between main app sections and control over my preferences**,
so that **I can easily access all DiveTribe features and customize my experience**.

### Acceptance Criteria

1. Bottom tab navigation with 5 main sections: Home, Discover, Log Dive, Groups, Profile
2. Each tab displays appropriate icon and label
3. Profile tab includes settings access and current user info
4. Settings screen includes: notification preferences, privacy controls, account management
5. Logout functionality with confirmation dialog
6. About/Help section with app version and support contact
7. Theme customization options (if applicable)
8. Account deletion option with clear warnings and confirmation flow
9. Data export functionality for GDPR compliance
10. Smooth navigation transitions and loading states
