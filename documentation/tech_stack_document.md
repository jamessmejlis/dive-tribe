# Tech Stack Document for DiveTribe

This document explains the technology choices behind DiveTribe in everyday language, so everyone—from divers to dive shop owners—can understand why each piece of technology was chosen and how it helps the app deliver a smooth, secure, and scalable experience.

## 1. Frontend Technologies

These are the tools we use to build everything you see and interact with on your phone.

*   **React Native**\
    A cross-platform framework that lets us write one codebase for both iOS and Android. It speeds up development and ensures a consistent look and feel.
*   **Expo**\
    A set of tools and services built around React Native, which makes it easy to build, test, and publish mobile apps without dealing with native code directly.
*   **Tailwind CSS**\
    A utility-first styling framework that lets us rapidly design and update the app’s appearance. It keeps our design consistent and makes it easy to tweak colors, spacing, and typography.
*   **Radix UI**\
    A lightweight library of accessible UI components (buttons, modals, dropdowns). It ensures everyone, including users with accessibility needs, can use DiveTribe comfortably.
*   **Developer Tools**\
    • **Bolt**: AI-powered project scaffolding to set up best-practice code structure in minutes.\
    • **Cursor**: An AI-powered IDE extension that gives real-time code suggestions and helps catch errors early.\
    • **Xcode**: Apple’s IDE used to build, test, and submit the iOS version of DiveTribe to the App Store.

**Why these?** Together, these technologies let us iterate quickly, maintain a consistent style, and deliver a polished mobile experience on both major platforms.

## 2. Backend Technologies

Here’s what powers DiveTribe behind the scenes—where data is stored, processed, and served.

*   **Supabase (PostgreSQL Database + Auth)**\
    A hosted service that provides a relational database (PostgreSQL) plus user authentication in one package. It handles:

    *   Dive logs, user profiles, community posts, and challenge data in the database
    *   Secure sign-up/sign-in via email, Google, and Apple OAuth
    *   Real-time subscriptions for live leaderboards and feed updates

*   **Supabase Edge Functions**\
    Lightweight serverless functions for any custom business logic—like validating challenge entries, sending notification emails, or running our basic AI matching rules.

*   **AI Layer**

    *   **Basic Matching Engine**: A simple rules-based system (Phase 1) that pairs users with dive buddies or coaches based on skill, location, and preferences.
    *   **Summary Generation**: We call an external AI API (e.g., GPT-4) to turn raw dive data into friendly text insights like “Your deepest dive this month!”

**How it all works together:** Supabase stores and serves data. Edge Functions run small bits of logic on demand. The AI layer enhances analytics and matching. This stack gives us a reliable backend without maintaining our own servers.

## 3. Infrastructure and Deployment

These choices ensure DiveTribe is reliable, secure, and easy to update.

*   **Version Control & Collaboration**

    *   **Git** for source code management
    *   **GitHub** for hosting repositories, code reviews, and issue tracking

*   **CI/CD Pipelines**

    *   **GitHub Actions** to automatically run tests, lint code, and build the app whenever we push changes

*   **Mobile Build & Deployment**

    *   **Expo Application Services (EAS)** to generate signed iOS and Android builds in the cloud
    *   **App Store & Google Play** for distributing the app to users

*   **Hosting & Data**

    *   **Supabase Cloud** hosts our database, authentication, and Edge Functions
    *   A **CDN** (Content Delivery Network) to serve any static assets (images, configuration files)

*   **Monitoring & Error Tracking**

    *   **Sentry** for real-time crash reporting and performance monitoring
    *   Supabase’s built-in analytics for usage stats (active users, query times)

**Why it matters:** Automated builds and deployments reduce human error, keep our releases on schedule, and let us respond quickly to issues. Hosting on managed services (Supabase, Expo) means minimal operations overhead and high uptime.

## 4. Third-Party Integrations

These services add functionality without building everything from scratch.

*   **Garmin Connect API**\
    To pull dive computer data (depth, dive time, heart rate, surface intervals, GPS). Essential for accurate dive analytics.
*   **Maps API** (Google Maps or Mapbox)\
    Powering our dive-site catalog with interactive map pins, descriptions, and photos.
*   **OAuth Providers**\
    • Google OAuth\
    • Apple OAuth\
    For fast, secure sign-in without managing passwords.
*   **Email Provider**\
    Supabase’s built-in email service or a provider like SendGrid for sending verification and notification emails.
*   **GPT-4 or Similar**\
    Used server-side to generate human-friendly summaries of dive data.
*   **Bluetooth Connectivity (Phase 1+)**\
    Planning for direct BLE support to sync dive computers without a third-party bridge, boosting convenience.

**Benefits:** Each integration brings a critical feature—data sync, mapping, secure login, or smart text—without delaying our core build.

## 5. Security and Performance Considerations

We want users to trust DiveTribe with their data and enjoy a smooth experience.

**Security Measures:**

*   **TLS/HTTPS** for all data in transit
*   **Encryption at Rest** for sensitive user data in the database
*   **Role-Based Access Control** in Supabase to separate normal users from admins
*   **GDPR-Style Privacy Controls**: Users can export or delete their data on request
*   **Input Validation & Rate Limiting** on our APIs to prevent abuse

**Performance Optimizations:**

*   **Offline-First Dive Logging**: Store logs locally when offline and sync automatically when back online
*   **Local Caching** of recent feed items to reduce load times
*   **Lazy-Loading & Code Splitting**: Only download the code and assets you need, keeping the app lightweight
*   **Real-Time Subscriptions** via Supabase for instant leaderboard and feed updates
*   **Optimized Images** and use of a CDN for fast asset delivery

Together, these measures protect user data and keep the app feeling fast and responsive—even on spotty connections.

## 6. Conclusion and Overall Tech Stack Summary

DiveTribe’s technology choices were guided by three goals:

1.  **Speed of Development**\
    • React Native + Expo and Supabase speed up both frontend and backend work.
2.  **Scalability & Reliability**\
    • Managed services (Supabase, GitHub Actions, Expo EAS) ensure high uptime with minimal ops overhead.
3.  **User-Focused Experience**\
    • Tailwind, Radix, and real-time updates deliver a polished, accessible, and engaging mobile app.

Unique aspects of our stack:

*   A fully managed backend with real-time capabilities (Supabase)
*   AI-powered dive summaries and basic buddy-matching (GPT-4 integration)
*   Out-of-the-box cross-platform mobile build and deployment (Expo)

This combination lets us focus on what matters most: building a thriving, data-driven community for freedivers and spearfishers around the world. Any questions about how these pieces fit together or why we chose them? Let us know!
