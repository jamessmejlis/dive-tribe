# Unified Project Documentation

## Project Requirements Document (PRD)

### 1. Project Overview

DiveTribe is a mobile-first social and performance platform built specifically for freedivers and spearfishers. It combines a community feed, detailed dive analytics, gamified challenges, and AI-powered buddy and coach matching. By syncing with Garmin dive computers or letting users log dives manually, DiveTribe turns each dive into a rich data story, helping ocean athletes track their progress and share real dive experiences rather than just photos.

We’re building DiveTribe to solve two main problems: first, the lack of a dedicated social network that highlights performance metrics for divers; second, the challenge of finding trustworthy dive buddies and instructors in new locations. Success for our MVP will be measured by strong engagement in the feed and groups, reliable import of Garmin dive data, and positive user feedback on how easy it is to discover and connect with dive partners and local instructors.

### 2. In-Scope vs. Out-of-Scope

**In-Scope (MVP Phase 1)**

*   User Onboarding & Profiles (Email, Google, Apple via Supabase Auth; profile wizard for bio, certifications, goals, gear, privacy)
*   Dive Logging & Analytics (manual logs and Garmin Connect API sync with depth, time, heart rate, surface interval, GPS; personal dashboard with graphs and milestone summaries)
*   Community Feed & Groups (scrollable dive feed, like/comment/share, join/create local and niche chapters)
*   Dive Site Catalog (built-in map pins, descriptions, photos, and site profiles)
*   Buddy & Coach Discovery (filters: distance, skill, certifications, languages, goals, availability; profile cards with external contact links)
*   Challenges & Gamification (monthly/seasonal events with title, description, dates, rules, prizes; badges; public leaderboards)
*   B2B Premium Profiles (instructors/shops with name, address, rates, certifications, languages, equipment, cancellation policy, reviews, photos; featured placement)
*   Settings & Privacy (notification preferences; default friends-only post visibility with public or private options per post)
*   Admin & Moderation Tools (remove/edit posts, suspend users, review reports, manage challenges, view basic usage stats)

**Out-of-Scope (Phase 2 and beyond)**

*   In-app booking, calendar scheduling, and payments
*   Integrations beyond Garmin (e.g., Suunto, Shearwater)
*   Full AI-driven matching engine
*   Advanced analytics (oxygen saturation, personalized dive plans)
*   Video content sharing, team/group challenges, sustainability features
*   Gear marketplace or affiliate promotions
*   Data partnerships or export of aggregated dive data

### 3. User Flow

A typical user first downloads DiveTribe and sees a welcome screen that highlights community, analytics, and challenges. They tap to sign up, choose email, Google, or Apple login, verify their account, and complete a profile wizard that collects a display name, bio, certifications, gear list, and personal goals. The app then asks for location permission to support dive-site tagging and local matching.

Once onboarded, the user sees a bottom navigation bar with five tabs: Home (feed and groups), Log Dive, Discover (buddies and coaches), Challenges, and Profile/Settings. From Home they scroll and engage with dive posts and chapters. In Log Dive they pick manual entry or Garmin sync, then view dive graphs and auto-generated summaries in their personal dashboard. Discover lets them filter and view divers or instructors, then tap contact links to WhatsApp or email. Challenges shows active events and leaderboards. In Profile/Settings they manage dive logs, privacy, notifications, upgrade to premium, or access support. Admin users see an extra menu for moderating content, managing users, and creating or editing challenges.

### 4. Core Features

*   Authentication: Supabase Auth supporting Email, Google, and Apple OAuth
*   User Profiles: bios, certifications, gear, goals, and privacy controls
*   Dive Logging: manual logs (site, depth, duration, temp, visibility, notes) and Garmin API sync (depth, time, heart rate, surface interval, GPS)
*   Analytics Dashboard: easy-to-read graphs, monthly trends, personal milestones, and summary messages
*   Community Feed: scrollable posts with photos and dive stats, with like, comment, and share actions
*   Community Chapters: join or create local and niche dive groups, view meetups and workshops
*   Dive Site Catalog: curated site profiles with map pins, descriptions, photos, and favorites
*   Buddy & Coach Discovery: multi-criteria filters and profile cards with external messaging links
*   Challenges & Gamification: event pages, join buttons, progress tracking, badges, and leaderboards
*   Business Hub: premium instructor/shop listings with service details, rates, schedules, and reviews
*   Settings & Privacy Controls: notification and visibility options, log editing, and account support
*   Admin & Moderation Tools: content removal, user suspension, report review, challenge management, and simple analytics

### 5. Tech Stack & Tools

*   Frontend: React Native with Expo for cross-platform mobile; Tailwind CSS and Radix UI for styling and components
*   Backend: Supabase (PostgreSQL database and Auth); Garmin Connect API for dive data; Map API (Google Maps or Mapbox) for site catalog
*   Authentication: Supabase Auth using Email/password, Google OAuth, and Apple OAuth
*   AI Layer: basic matching logic built in-house; GPT-powered summary generation via API
*   Development Tools: Bolt for project scaffolding, Cursor IDE for AI-powered coding assistance, Xcode for iOS builds

### 6. Non-Functional Requirements

*   Performance: launch time under 2 seconds; feed and dashboard queries under 1 second
*   Reliability: offline dive logging queue that syncs automatically when connectivity returns
*   Security: HTTPS/TLS for all network calls; encryption of sensitive data at rest; role-based access control for admin features
*   Compliance: user data export/deletion to meet GDPR-style privacy rules
*   Usability & Accessibility: WCAG AA color contrast; scalable font size and clear tap targets; smooth animations at 60 fps on mid-range devices

### 7. Constraints & Assumptions

*   Garmin Connect API will provide required dive metrics without prohibitive rate limits
*   Phase 1 booking is done via external contact links—no in-app scheduler or payment system
*   Premium subscription tiers (monthly, yearly, trial) will be finalized later
*   New posts default to friends-only visibility, with per-post public or private overrides
*   Supabase serves as the single source of truth for database and authentication

### 8. Known Issues & Potential Pitfalls

*   API Rate Limits: Garmin may throttle requests; mitigate with client-side caching and exponential back-off
*   Offline Challenges: divers in remote areas need reliable logging; implement a robust local queue and sync logic
*   Data Consistency: manual and automatic logs might duplicate; flag potential duplicates and let users merge them
*   Privacy Concerns: users may hesitate to share data publicly; ensure clear privacy settings and in-app help
*   Moderation Load: community growth could overwhelm manual review; build simple automated flag rules and a priority queue
*   Map Accuracy: user-reported dive site coordinates may vary; allow admin edits and user feedback loops

## App Flow Document

### Onboarding and Sign-In/Sign-Up

A new user opens the DiveTribe app and sees a friendly welcome screen that highlights key benefits like community, analytics, and challenges. They tap a button to sign up or log in. If they choose sign up, they pick email, Google, or Apple login. Email sign up asks for address and password, while Google and Apple use OAuth. After they complete authentication, they verify their account by email or through their OAuth provider. The app then walks them through a quick profile setup wizard. If a returning user taps log in, they go straight to their chosen method, and if they forget their password they use a “Forgot Password” link to get a reset email. Signing out is always available in settings, taking them back to the welcome screen.

### Main Dashboard or Home Page

Once signed in and profile setup is complete, the user lands on the Home tab, which shows a header with their profile picture and a notifications icon. Below that is an endlessly scrollable feed of dive posts, each displaying photos, stats like depth and duration, and location tags, along with like, comment, and share buttons. At the bottom is a navigation bar with icons for Home, Log Dive, Discover, Challenges, and Profile/Settings. A floating action button on the Home tab offers a quick way to log a new dive. Users switch between sections by tapping icons in this bar.

### Detailed Feature Flows and Page Transitions

When the user taps the Log Dive icon, they see two options: manual entry or Garmin sync. Manual entry requires typing in dive site name, optional GPS coordinates, maximum depth, duration, temperature, visibility, equipment details, and personal notes. Submitting saves the dive and shows a depth-over-time graph and a milestone summary. If they choose Garmin sync, the app calls the Garmin Connect API, imports depth, dive time, heart rate, surface interval, and GPS, and presents the same analytics dashboard with auto-generated text. Users swipe left or right on the dashboard to view monthly trends and personal bests.

In the Home feed, tapping on a community chapter label opens a dedicated chapter page with a filtered feed, upcoming local events, and a join button. Tapping a location tag opens a dive site profile from the built-in catalog, showing map pins, descriptions, and photos, and lets users save the site to favorites. In the Discover tab, filter controls at the top let users choose distance, skill level, certifications, spoken languages, shared goals, and availability. Matching profiles appear as cards; tapping one shows full details and a contact button that links to WhatsApp or email. After contacting, users return to Discover or continue chatting outside the app.

Selecting the Challenges tab shows active events in a list. Each event tile leads to a detail page with rules, prize information, and a join button. Once joined, qualifying dives contribute automatically to progress, and the user can view real-time leaderboards. In the business hub, users tap instructor or shop profiles from Discover or the feed to see service offerings, rates, schedules, languages, certifications, equipment rental options, cancellation policies, and reviews. A contact button opens WhatsApp or email.

### Settings and Account Management

Tapping the Profile icon leads to the user’s personal page with recent dive logs and badges. A Settings button opens account controls for editing display name, bio, certifications, gear list, and email/password. Notifications for log milestones, comments, and challenges are adjustable here. Privacy controls let users set default visibility for new posts (public, friends-only, private) and change visibility of past logs. They can also view blocked or muted accounts and access support features to report problems or see usage stats. A Sign Out button returns the user to the welcome screen.

### Error States and Alternate Paths

If the user enters invalid data in any form, an inline error message explains what’s wrong and how to fix it. During Garmin sync, a failed connection shows a retry prompt and offers manual entry as a fallback. If network connectivity drops, an offline banner appears and dives are queued locally until the app is back online. Unauthorized access to admin features shows a “Not Authorized” message with a link back to Home. Reset password links that expire include instructions to request a new link. All error screens have a button to retry or return to the last successful screen.

### Conclusion and Overall App Journey

From installation to daily use, DiveTribe guides freedivers through a seamless path of signing up, filling out a profile, and diving into logging and community engagement. Users log dives manually or via Garmin, share their stories in the feed, join local and niche chapters, find buddies and instructors, and compete in challenges. Premium subscribers get deeper analytics and AI matching, while businesses connect with clients through featured profiles. Admins keep everything running smoothly with moderation and challenge management tools. This end-to-end flow empowers divers at all levels to connect, learn, and compete under the sea.

## Tech Stack Document

### Frontend Technologies

*   **React Native + Expo**: Build one codebase for both iOS and Android, speeding up development and ensuring consistent behavior.
*   **Tailwind CSS**: Utility-first styling for rapid UI creation and easy theme updates.
*   **Radix UI**: Accessible, unstyled component primitives that help maintain design consistency and accessibility standards.

### Backend Technologies

*   **Supabase (PostgreSQL + Auth)**: Managed database and authentication service to store user data, dive logs, and community content securely.
*   **Garmin Connect API**: Fetch dive data (depth, time, heart rate, surface interval, GPS) from users devices for automatic logging.
*   **Maps API (Google Maps or Mapbox)**: Render dive site catalog with pins, map views, and geolocation features.

### Infrastructure and Deployment

*   **Hosting (e.g., Vercel or Netlify)** for any serverless functions and the web admin dashboard.
*   **CI/CD Pipeline** using GitHub Actions or similar to automate testing, builds, and deployments for both mobile and backend services.
*   **Version Control** with Git and GitHub for code collaboration, branch protection, and PR reviews.

### Third-Party Integrations

*   **Supabase Auth Providers** (Email, Google OAuth, Apple OAuth) for secure and familiar sign-in methods.
*   **Expo EAS** (Expo Application Services) for over-the-air updates and build management.
*   **GPT-4 API** for generating dive summaries and supporting future AI-driven features.

### Security and Performance Considerations

*   **HTTPS/TLS** for all network traffic to protect data in transit.
*   **Encryption at Rest** for sensitive user data stored in the database.
*   **Role-Based Access Control** to restrict admin features to authorized users.
*   **Caching and CDN** for static assets and API responses to speed up load times.
*   **Offline Data Queue** to capture dives when offline and sync when connectivity returns.

### Conclusion and Overall Tech Stack Summary

Our chosen stack balances rapid mobile development with strong data capabilities and security. React Native and Expo let us build once for both platforms, while Supabase handles database and auth without extra backend work. Garmin and Maps APIs power our core features, and GPT adds AI-driven insights. CI/CD and hosted services ensure reliable deployments, setting us up to scale confidently as DiveTribe grows.

## Frontend Guidelines Document

### Frontend Architecture

DiveTribe uses a component-based architecture with React Native and Expo. We organize code by feature domains (e.g., auth, feed, logging, discovery) and keep reusable UI components in a shared library. This structure supports scalability and maintainability, letting teams add new features quickly without rewriting core components.

### Design Principles

We focus on usability, accessibility, and responsiveness. Interfaces are clear and uncluttered, with a strong visual hierarchy to guide users’ attention. All components meet WCAG AA contrast ratios, use readable font sizes, and have touch targets sized for mobile devices. Animations are smooth but subtle, enhancing feedback without distracting.

### Styling and Theming

We use Tailwind CSS for utility-driven styling, enabling rapid iteration on spacing, colors, and typography. Our theme follows a flat, clean style with glassmorphism accents on cards. The color palette includes deep navy (#1E3F66) as primary, turquoise sea (#3FBAC2) as accent, and sandy beiges and light grays for backgrounds. We use the Inter font for a friendly, modern feel.

### Component Structure

Components live in a hierarchy: atoms (buttons, icons), molecules (input fields, cards), organisms (feed items, profile sections), and screens (full page layouts). This promotes reusability and consistency. Each component is documented with props and usage examples, making it easy for new developers or AI assistants to pick up and extend.

### State Management

We use React Context and hooks for global state like auth and theme. Feature-specific data (e.g., feed posts, dive logs) is managed with React Query to handle caching, background updates, and optimistic UI. This approach keeps components focused and simplifies data fetching patterns.

### Routing and Navigation

React Navigation powers our tab and stack navigators. The bottom tab navigator holds Home, Log Dive, Discover, Challenges, and Profile screens. Within each tab, a stack navigator handles deeper flows (e.g., dive details, challenge details, admin screens). We centralize route names and param types in a single file for consistency.

### Performance Optimization

We rely on lazy loading for screens and code splitting for heavy components. Images are served in optimized formats and sizes with caching. We use FlatList with proper key extraction and windowing for the feed. Memoization (React.memo) prevents unnecessary renders in frequently updated lists.

### Testing and Quality Assurance

Our testing strategy includes:

*   **Unit Tests** with Jest for business logic and utility functions.
*   **Component Tests** with React Native Testing Library to verify UI behavior.
*   **End-to-End Tests** with Detox or Appium for core user journeys like sign-up, dive logging, and social feed interactions.
*   **Accessibility Audits** using axe-core to catch contrast and semantic issues.

### Conclusion and Overall Frontend Summary

These guidelines ensure a consistent, accessible, and high-performance frontend. Our component hierarchy, styling approach, and state management pattern let us scale features quickly. With clear testing and performance strategies, DiveTribe’s mobile app will stay robust as it grows.

## Implementation Plan

1.  **Project Setup**: Use Bolt to generate a React Native + Expo scaffold, configure Tailwind and Radix UI, and initialize GitHub repository with CI/CD.
2.  **Authentication Module**: Integrate Supabase Auth, build sign-up/log-in screens, and set up profile wizard flow.
3.  **Database Schema**: Design tables for users, dive logs, feed posts, chapters, challenges, and business profiles in Supabase.
4.  **Dive Logging**: Implement manual log form and personal dashboard with basic charts; integrate Garmin Connect API for automatic sync.
5.  **Social Feed & Chapters**: Build feed screen with FlatList, post cards, like/comment/share actions, and chapter management.
6.  **Dive Site Catalog**: Integrate Maps API, create site catalog entries, and link from logging and feed screens.
7.  **Discovery & Matching**: Develop filter UI, profile cards, and external contact link feature for Phase 1.
8.  **Challenges & Gamification**: Create challenge list and detail screens, join logic, badge system, and leaderboards.
9.  **Business Hub**: Build instructor/shop profile pages with service details, images, reviews, and contact actions.
10. **Settings & Privacy**: Add settings screens for notifications, post visibility, account edits, and support links.
11. **Admin Tools**: Create hidden admin menu for moderators, including post review, user suspension, challenge management, and basic metrics.
12. **Frontend QA & Testing**: Write unit, component, and E2E tests; conduct accessibility audits and performance optimizations.
13. **Deployment**: Configure Expo EAS builds and over-the-air updates; set up CI/CD to deploy staging and production builds.
14. **Beta Launch & Feedback**: Release MVP to pilot users in target regions, collect feedback on engagement, data reliability, and matching effectiveness.
15. **Iterate & Phase 2 Planning**: Analyze metrics, prioritize improvements, and prepare for Phase 2 features like AI matching, expanded integrations, and in-app booking.

This plan lays out a clear, step-by-step roadmap to build, test, and launch DiveTribe’s MVP in a structured, low-risk way, setting the stage for future growth and advanced features.
