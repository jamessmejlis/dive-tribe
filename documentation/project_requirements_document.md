# DiveTribe – Project Requirements Document (PRD)

## 1. Project Overview

DiveTribe is a mobile-first social and performance platform designed specifically for freedivers and spearfishers. Think of it like 'Strava for Freedivers'. It combines community-driven content, smart dive analytics, gamification, and AI-powered buddy/coach matching. By syncing with Garmin dive computers or accepting manual logs, DiveTribe turns each dive into a data-rich story—helping ocean athletes track progress, discover peers and mentors, and stay motivated with challenges and leaderboards.

We’re building DiveTribe to solve two key problems in the freediving world: (1) the lack of a dedicated social network that highlights performance metrics rather than just photos, and (2) the difficulty of finding trustworthy dive buddies or coaches in new locations. Our success criteria for the MVP include strong user engagement (feed interactions, group activity), reliable dive data import, and positive feedback on ease of finding dive partners and local instructors.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (MVP Phase 1)

*   **User Onboarding & Profiles**

    *   Email / Google / Apple sign-up via Supabase Auth
    *   Profile wizard: bio, certifications, goals, gear, privacy settings

*   **Dive Logging & Analytics**

    *   Manual dive logs: site name, depth, duration, temp, visibility, notes
    *   Garmin Connect API sync: depth, dive time, heart rate, surface interval, GPS
    *   Personal dashboard with basic graphs and milestone summaries

*   **Community Feed & Groups**

    *   Scrollable dive feed (photos + key metrics + captions)
    *   Like, comment, share
    *   Join or create local/niche community chapters

*   **Dive Site Catalog**

    *   Built-in map pins, descriptions, photos
    *   Dive site profiles with details

*   **Buddy & Coach Discovery**

    *   Search filters: distance radius, skill level, certifications, languages, shared goals, availability
    *   Profile cards with basic stats and external contact links (phone/WhatsApp/email)

*   **Challenges & Gamification**

    *   Monthly/seasonal challenges with title, description, dates, rules, prize overview
    *   Achievement badges and public leaderboards

*   **B2B Premium Profiles**

    *   Instructors/shops: business name, address, rates, certifications, languages, equipment rentals, cancellation policy, reviews, photos
    *   Featured placement + contact links

*   **Settings & Privacy**

    *   Notification preferences
    *   Post visibility (friends-only by default, with public/private options)

*   **Admin & Moderation Tools**

    *   Remove/edit posts, suspend users, review reports
    *   Manage challenges (create/edit/remove)
    *   View basic platform usage stats

### Out-of-Scope (Phase 2+)

*   In-app booking, payments, or calendar scheduling
*   Integrations beyond Garmin (Suunto, Shearwater, etc.)
*   Full AI-driven buddy/coach matching engine
*   Advanced analytics (oxygen saturation, custom dive plans)
*   Video content sharing, group challenges, sustainability campaigns
*   Marketplace for gear sales or affiliate promotions
*   Aggregated data partnerships or research exports

## 3. User Flow

When a new diver opens DiveTribe, they land on a welcome screen that outlines core benefits. Tapping “Sign Up” leads them to choose email, Google, or Apple login (handled by Supabase Auth). After verifying credentials, they enter a profile setup wizard: display name, bio, certifications, gear, and personal goals. Before finishing, the app requests location permissions to enable dive-site tagging and local matching.

Post-onboarding, users see a bottom-nav bar with tabs: **Home (Feed & Groups)**, **Log Dive**, **Discover (Buddies & Coaches)**, **Challenges**, and **Profile/Settings**. From **Log Dive**, they choose manual entry or Garmin sync, then view dive trends in their personal dashboard. In **Home**, they scroll dive stories, engage with posts, and join community chapters. **Discover** lets them filter and view potential dive buddies or instructors, tapping contact links to WhatsApp or email. **Challenges** displays active events and real-time leaderboards. **Profile/Settings** lets them review logs, adjust privacy for each post, upgrade to premium, or report content. Admins have a separate dashboard to moderate content, manage users, and configure challenges.

## 4. Core Features

*   **Authentication**: Supabase Auth with Email, Google, Apple OAuth

*   **User Profiles**: Bio, certifications, gear list, goals, privacy settings

*   **Dive Logging**

    *   Manual: site name, GPS/location, depth, duration, temp, visibility, equipment, notes
    *   Automatic: Garmin Connect API import (depth, time, heart rate, surface interval, GPS)

*   **Analytics Dashboard**: Simple graphs, monthly milestones, auto summaries

*   **Community Feed**: Posts with photos + metrics, likes, comments, shares

*   **Community Chapters**: Local/niche groups, join or organize events

*   **Dive Site Catalog**: Built-in site profiles with pins, descriptions, photos

*   **Discovery & Matching Filters**: Distance, skill, certifications, languages, goals, availability

*   **Contact Links**: External messaging via WhatsApp or email (Phase 1)

*   **Challenges & Gamification**: Title, description, dates, rules, leaderboard, badges, prizes

*   **Business Hub**: Premium instructor/shop profiles, featured placement, reviews, contact links

*   **Settings & Privacy Controls**: Notifications, post visibility toggles (public/friends/private)

*   **Admin Tools**: Post moderation, user suspension, report review, challenge management, usage stats

## 5. Tech Stack & Tools

*   **Frontend**

    *   React Native + Expo (iOS & Android)
    *   Tailwind CSS & Radix UI for styling & components

*   **Backend**

    *   Supabase (PostgreSQL database + Auth)
    *   Garmin Connect API for dive data, bluetooth connectivity
    *   Maps API (e.g., Google Maps or Mapbox) for dive-site catalog

*   **Authentication**

    *   Supabase Auth with Email, Google OAuth, Apple OAuth

*   **AI Layer**

    *   Basic matching logic (local rules)
    *   Summary generation (e.g., GPT-4 via API)

*   **Tools & IDE**

    *   Bolt for project scaffolding
    *   Cursor for AI-powered coding
    *   Xcode for iOS builds

## 6. Non-Functional Requirements

*   **Performance**: App launch under 2 seconds; feed and dashboard queries under 1 second

*   **Reliability**: Offline dive logging queue; sync resumes when online

*   **Security**:

    *   HTTPS/TLS for all API calls
    *   Encrypt sensitive data at rest (user logs, personal info)
    *   Role-based access control for admin functions

*   **Compliance**: GDPR-style privacy controls; user data export/deletion

*   **Usability & Accessibility**:

    *   WCAG AA color contrast
    *   Font size adaptability and clear tap targets
    *   Smooth animations (≤60 fps) on mid-range devices

## 7. Constraints & Assumptions

*   Garmin Connect API is available and supports required dive metrics
*   Phase 1 booking is handled via external links; no in-app scheduler/payments
*   Premium subscription structure (monthly/yearly with trial) to be finalized later
*   Default post privacy is friends-only; users can override per post
*   Supabase chosen as single source of truth (DB + Auth)

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limits**: Garmin Connect may throttle requests—implement client-side caching and exponential back-off
*   **Offline Challenges**: Users in remote areas need reliable dive logging—queue offline entries and sync gracefully
*   **Data Consistency**: Manual vs. automatic dives may conflict—flag duplicates and allow user reconciliation
*   **Privacy Concerns**: Public leaderboards vs. user comfort—ensure easy settings control and clear explanations
*   **Moderation Load**: Growing community may flood reports—automate simple flagging rules and prioritize high-risk content
*   **Map Accuracy**: Dive site coordinates may vary—allow admin curation and user feedback loops

This PRD lays out all essential details for DiveTribe’s MVP launch. It ensures that subsequent technical documents—Tech Stack, Frontend Guidelines, Backend Structure, and more—can be derived without ambiguity.
