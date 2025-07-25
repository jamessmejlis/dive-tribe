# Requirements

## Functional

**FR1:** The app shall provide user authentication via email, Google OAuth, and Apple OAuth through Supabase Auth

**FR2:** Users shall be able to create comprehensive profiles including bio, certifications, gear list, diving goals, and privacy settings

**FR3:** The app shall support manual dive logging with site name, GPS location, depth, duration, temperature, visibility, equipment used, and notes

**FR4:** The app shall automatically sync dive data from Garmin Connect API including depth, dive time, heart rate, surface intervals, and GPS coordinates

**FR5:** Users shall be able to view personal analytics dashboard with dive trends, monthly milestones, and auto-generated performance summaries

**FR6:** The app shall provide a scrollable community feed where users can post dive stories with photos, key metrics, and captions

**FR7:** Users shall be able to engage with posts through likes, comments, and shares

**FR8:** The app shall support community chapters where users can join local or interest-based groups

**FR9:** The app shall include a built-in dive site catalog with map pins, descriptions, photos, and user-contributed content

**FR10:** Users shall be able to search and filter for dive buddies and instructors by distance, skill level, certifications, languages, goals, and availability

**FR11:** The app shall provide external contact links (WhatsApp, email, phone) for connecting with other users

**FR12:** The app shall support monthly and seasonal challenges with titles, descriptions, dates, rules, and prize information

**FR13:** The app shall maintain public leaderboards and award achievement badges based on dive performance and challenge participation

**FR14:** Instructors and dive shops shall be able to create premium business profiles with enhanced visibility and detailed service information

**FR15:** Users shall have granular privacy controls for post visibility (public, friends-only, private) with friends-only as default

## Non Functional

**NFR1:** The app shall launch in under 2 seconds on mid-range mobile devices

**NFR2:** Feed queries and dashboard analytics shall load in under 1 second

**NFR3:** The app shall support offline dive logging with automatic sync when connectivity is restored

**NFR4:** All API communications shall use HTTPS/TLS encryption

**NFR5:** Sensitive user data shall be encrypted at rest in the Supabase database

**NFR6:** The app shall implement role-based access control for admin functions

**NFR7:** The app shall provide GDPR-compliant privacy controls including data export and deletion

**NFR8:** UI shall meet WCAG AA color contrast requirements and support adaptive font sizing

**NFR9:** Animations shall maintain 60fps performance on target devices

**NFR10:** The app shall handle Garmin Connect API rate limits with exponential backoff and client-side caching
