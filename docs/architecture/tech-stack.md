# Tech Stack

## Cloud Infrastructure

- **Provider:** Supabase (built on AWS)
- **Key Services:** PostgreSQL, Real-time Engine, Edge Functions, Storage, Auth
- **Deployment Regions:** Global CDN with primary regions in US West, Europe, Asia-Pacific

## Technology Stack Table

| Category                 | Technology             | Version | Purpose                            | Rationale                                                             |
| ------------------------ | ---------------------- | ------- | ---------------------------------- | --------------------------------------------------------------------- |
| **Frontend Language**    | TypeScript             | 5.3.3   | Primary development language       | Strong typing prevents runtime errors, excellent React Native support |
| **Mobile Framework**     | React Native           | 0.73.x  | Cross-platform mobile development  | Single codebase for iOS/Android, native performance                   |
| **Development Platform** | Expo                   | 50.x    | React Native development platform  | Managed workflow for simplified deployment and updates                |
| **UI Component Library** | Gluestack UI           | v2.x    | Universal component library        | Universal components, built-in accessibility, performance-optimized   |
| **Backend-as-a-Service** | Supabase               | Latest  | Database, auth, real-time, storage | Comprehensive BaaS reducing infrastructure complexity                 |
| **State Management**     | Zustand                | 4.4.x   | Lightweight state management       | Simple API, TypeScript support, no boilerplate                        |
| **Navigation**           | Expo Router            | 3.x     | File-based routing                 | Type-safe navigation, web compatibility                               |
| **Authentication**       | Supabase Auth          | Latest  | User authentication service        | OAuth providers, session management, RLS integration                  |
| **Database**             | PostgreSQL             | 15.x    | Primary database                   | Relational data, JSON support, full-text search                       |
| **Real-time**            | Supabase Realtime      | Latest  | Live data synchronization          | WebSocket-based real-time subscriptions                               |
| **File Storage**         | Supabase Storage       | Latest  | Media and file storage             | S3-compatible, CDN, image transformations                             |
| **Maps**                 | Expo MapView           | 11.x    | Native maps integration            | Platform-native maps with dive site marking                           |
| **HTTP Client**          | Supabase JS            | 2.x     | API client library                 | Auto-generated types, auth integration                                |
| **Form Handling**        | React Hook Form        | 7.48.x  | Form validation and management     | Performance-optimized, minimal re-renders                             |
| **Testing Framework**    | Jest + Testing Library | Latest  | Unit and integration testing       | React Native compatible testing tools                                 |
| **E2E Testing**          | Maestro                | Latest  | End-to-end testing                 | Mobile-specific E2E testing framework                                 |
| **Code Quality**         | ESLint + Prettier      | Latest  | Code formatting and linting        | Consistent code style and quality                                     |
| **Type Checking**        | TypeScript             | 5.3.x   | Static type checking               | Type safety, better IDE support                                       |
| **Build Tool**           | Expo EAS               | Latest  | Build and deployment service       | Cloud-based builds for app stores                                     |
| **Analytics**            | Expo Analytics         | Latest  | User behavior tracking             | Privacy-focused analytics integration                                 |
| **Push Notifications**   | Expo Notifications     | Latest  | Cross-platform notifications       | Community engagement and safety alerts                                |
| **Device APIs**          | Expo Modules           | Latest  | Native device functionality        | Camera, location, contacts integration                                |
