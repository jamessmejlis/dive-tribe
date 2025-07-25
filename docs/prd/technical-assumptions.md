# Technical Assumptions

## Repository Structure: Monorepo

Single repository structure using React Native with Expo for streamlined development and deployment across iOS and Android platforms.

## Service Architecture

**Mobile-first hybrid architecture** combining:

- React Native frontend with Expo for cross-platform mobile development
- Supabase backend-as-a-service for database, authentication, and real-time features
- External API integrations (Garmin Connect, Maps API) for specialized functionality

## Testing Requirements

**Mobile-focused testing pyramid**:

- Unit testing for business logic and data transformations
- Component testing for React Native UI components
- Integration testing for Supabase and external API connections
- End-to-end testing for critical user flows (dive logging, social interactions)
- Manual testing on physical devices for location services and offline functionality

## Additional Technical Assumptions and Requests

**Frontend Framework**: React Native with Expo for cross-platform mobile development

- Enables single codebase for iOS and Android
- Expo managed workflow for simplified deployment and updates
- Native performance for smooth animations and offline capabilities

**Styling & UI Components**: Gluestack UI v2 for comprehensive, accessible component library

- Universal components that work across mobile and potential web versions
- Built-in accessibility features for WCAG AA compliance
- Robust theming system for ocean-inspired branding
- Performance-optimized for smooth dive feed interactions

**Authentication Provider**: Supabase Auth with Email, Google OAuth, Apple OAuth

- Secure, managed authentication service
- Social login options for reduced friction
- Built-in session management and security features

**Database & Backend**: Supabase (PostgreSQL) as single source of truth

- Real-time subscriptions for community feed updates
- Row-level security for privacy controls
- Built-in storage for dive photos and user content

**External Integrations**:

- Garmin Connect API for automatic dive data import
- Maps API (Google Maps or Mapbox) for dive site catalog and location services
- Push notification service for community engagement and safety alerts

**Offline Capabilities**:

- Local storage for dive logs when offline
- Automatic sync when connectivity restored
- Cached dive site information for remote locations

**Performance Optimization**:

- Image compression and lazy loading for dive photos
- Background sync for large data imports
- Efficient state management for real-time feed updates
