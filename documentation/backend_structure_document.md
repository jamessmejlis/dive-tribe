# Backend Structure Document

This document outlines the backend setup for DiveTribe, a mobile-first social and performance platform for freedivers and spearfishers. It covers architecture, database design, APIs, hosting, infrastructure, security, monitoring, and maintenance.

## 1. Backend Architecture

### Overall Design

*   **Serverless-first approach using Supabase:** We rely on Supabase for authentication, database (PostgreSQL), storage, and edge functions. This minimizes server maintenance and scales automatically.
*   **RESTful API layer:** Supabase auto-generated REST endpoints plus custom edge functions for specialized logic (e.g., Garmin integration, AI matching).
*   **Modular design patterns:** Each feature (dive logging, social feed, challenges, matching) lives in its own module, making code easier to maintain and test.

### Scalability, Maintainability, Performance

*   **Scalability:** Supabase’s managed Postgres scales vertically and horizontally. Edge functions scale on demand.
*   **Maintainability:** Clear module boundaries, shared utilities, and documentation ensure new developers can onboard quickly.
*   **Performance:** Built-in caching on edge functions, use of indexes on key database columns, and pagination on list endpoints keep response times low.

## 2. Database Management

### Technologies Used

*   SQL database: **PostgreSQL** via Supabase
*   Real-time subscriptions: Supabase Realtime
*   Authentication & RLS: Supabase Auth + Postgres Row Level Security

### Data Organization & Practices

*   **Tables for each core entity:** users, dives, posts, comments, likes, challenges, badges, groups, memberships, etc.
*   **Row-Level Security (RLS):** Ensures users only see or modify data they own or are permitted to access.
*   **Backups & retention:** Daily automated backups via Supabase; point-in-time recovery enabled.
*   **Migrations & versioning:** Schema changes tracked using SQL migration scripts.

## 3. Database Schema

Below is a human-readable overview followed by SQL statements for the key tables.

### Human-Readable Schema Overview

*   **users:** Profiles, preferences, roles (diver, instructor, admin), certifications, languages
*   **dives:** Manual logs and imported Garmin logs
*   **posts:** Dive posts with media and stats
*   **comments & likes:** Social interactions on posts
*   **groups & memberships:** Local chapters and their members
*   **challenges:** Gamification events by admins/businesses
*   **user_challenges & badges:** User participation and achievements
*   **follows:** Who follows whom
*   **instructor_profiles:** Premium listings for instructors/schools
*   **reports:** User or content reports for moderation

### SQL Schema (PostgreSQL)

`-- users CREATE TABLE users ( id UUID PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, avatar_url TEXT, role TEXT DEFAULT 'diver', -- diver, instructor, admin certifications TEXT[], -- e.g. {PADI,CMAS} languages TEXT[], -- e.g. {EN,FR} bio TEXT, created_at TIMESTAMPTZ DEFAULT NOW() ); -- dives CREATE TABLE dives ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id) ON DELETE CASCADE, site_name TEXT, location GEOGRAPHY(POINT), -- latitude/longitude max_depth_meters REAL, duration_seconds INT, water_temp_c REAL, visibility_m REAL, equipment TEXT[], notes TEXT, source TEXT, -- 'manual' or 'garmin' imported_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW() ); -- posts CREATE TABLE posts ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), dive_id UUID REFERENCES dives(id), content TEXT, media_urls TEXT[], visibility TEXT DEFAULT 'friends', -- friends, public, private created_at TIMESTAMPTZ DEFAULT NOW() ); -- comments CREATE TABLE comments ( id UUID PRIMARY KEY, post_id UUID REFERENCES posts(id) ON DELETE CASCADE, user_id UUID REFERENCES users(id), content TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() ); -- likes CREATE TABLE likes ( user_id UUID REFERENCES users(id), post_id UUID REFERENCES posts(id), created_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(user_id, post_id) ); -- follows CREATE TABLE follows ( follower_id UUID REFERENCES users(id), followee_id UUID REFERENCES users(id), created_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(follower_id, followee_id) ); -- groups CREATE TABLE groups ( id UUID PRIMARY KEY, name TEXT, description TEXT, location GEOGRAPHY(POINT), created_at TIMESTAMPTZ DEFAULT NOW() ); -- group_memberships CREATE TABLE group_memberships ( group_id UUID REFERENCES groups(id) ON DELETE CASCADE, user_id UUID REFERENCES users(id), joined_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(group_id, user_id) ); -- challenges CREATE TABLE challenges ( id UUID PRIMARY KEY, title TEXT, description TEXT, start_date DATE, end_date DATE, metrics JSONB, -- e.g. {"depth":30, "dives":10} rules TEXT, prize TEXT, created_by UUID REFERENCES users(id), created_at TIMESTAMPTZ DEFAULT NOW() ); -- user_challenges CREATE TABLE user_challenges ( user_id UUID REFERENCES users(id), challenge_id UUID REFERENCES challenges(id), status TEXT DEFAULT 'joined', -- joined, completed progress JSONB, -- e.g. {"dives":3} PRIMARY KEY(user_id, challenge_id) ); -- badges CREATE TABLE badges ( id UUID PRIMARY KEY, name TEXT, description TEXT, icon_url TEXT ); -- user_badges CREATE TABLE user_badges ( user_id UUID REFERENCES users(id), badge_id UUID REFERENCES badges(id), awarded_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(user_id, badge_id) ); -- instructor_profiles CREATE TABLE instructor_profiles ( user_id UUID PRIMARY KEY REFERENCES users(id), business_name TEXT, website TEXT, featured BOOLEAN DEFAULT FALSE, contact_info JSONB, -- e.g. {"whatsapp": "+12345"} pricing_info JSONB, created_at TIMESTAMPTZ DEFAULT NOW() ); -- reports CREATE TABLE reports ( id UUID PRIMARY KEY, reporter_id UUID REFERENCES users(id), reported_user_id UUID REFERENCES users(id), post_id UUID REFERENCES posts(id), reason TEXT, status TEXT DEFAULT 'open', -- open, resolved created_at TIMESTAMPTZ DEFAULT NOW() );`

## 4. API Design and Endpoints

### Approach

*   **RESTful endpoints** for all main resources.
*   **JWT-based auth** via Supabase Auth middleware.
*   **Pagination, filtering, sorting** supported on list endpoints.

### Key Endpoints

|        |                            |                                               |
| ------ | -------------------------- | --------------------------------------------- |
|        |                            |                                               |
| Method | Path                       | Purpose                                       |
| POST   | /auth/signup               | Register new users                            |
| POST   | /auth/login                | User login                                    |
| GET    | /users/me                  | Retrieve current user’s profile               |
| PATCH  | /users/me                  | Update current user’s profile                 |
| GET    | /dives                     | List dives (own or public)                    |
| POST   | /dives                     | Create a manual dive log                      |
| POST   | /integration/garmin/import | Import dives from Garmin Connect              |
| GET    | /posts                     | Retrieve feed (with filters: friends, public) |
| POST   | /posts                     | Create a new post                             |
| POST   | /posts/:id/comments        | Add a comment                                 |
| POST   | /posts/:id/likes           | Like or unlike a post                         |
| GET    | /groups                    | List or search local chapters                 |
| POST   | /groups                    | Create a group                                |
| POST   | /groups/:id/join           | Join a group                                  |
| GET    | /challenges                | List active challenges                        |
| POST   | /challenges                | Admin: create a new challenge                 |
| POST   | /challenges/:id/join       | User: join a challenge                        |
| GET    | /matching/buddies          | AI-powered matching of buddies/coaches        |
| GET    | /instructors               | Search/filter instructors (premium first)     |
| POST   | /reports                   | Report user or content                        |

## 5. Hosting Solutions

*   **Supabase (managed):** Hosts our Postgres database, auth service, storage, and edge functions.\
    • Reliability: SLA-backed, daily backups\
    • Scalability: Auto-scaling databases and edge functions\
    • Cost-effective: Pay-as-you-grow model
*   **CDN for media:** Using Supabase Storage with integrated CDN (or Cloudflare) for user-uploaded images and videos.

## 6. Infrastructure Components

*   **Load Balancing & API Gateway:** Supabase edge functions auto-scale behind a global edge network.
*   **Caching:**\
    • Postgres query caching via Supabase’s built-in layers\
    • CDN caching for static media
*   **Content Delivery Network (CDN):** Fast delivery of images, icons, and other assets worldwide.
*   **Real-Time Subscriptions:** Supabase Realtime for live feed updates, group chats, and notifications.

## 7. Security Measures

*   **Authentication & Authorization:**\
    • Supabase Auth for email/password and OAuth (Google, Apple)\
    • JWT tokens with automatic refresh
*   **Row-Level Security (RLS):** Postgres policies to restrict reads/writes based on user role and ownership.
*   **Encryption:**\
    • SSL/TLS for data in transit\
    • AES-256 at rest (managed by Supabase)
*   **Input Validation & Sanitization:** All API inputs validated to prevent SQL injection or XSS.
*   **Rate Limiting & WAF:** Edge function rules to throttle abusive requests and block malicious traffic.

## 8. Monitoring and Maintenance

*   **Monitoring Tools:**\
    • Supabase dashboard metrics (CPU, connections, query stats)\
    • Sentry for error tracking\
    • Log aggregation (e.g., Datadog or Logflare)
*   **Health Checks & Alerts:** Automated health pings with notifications via Slack or email.
*   **Maintenance Strategies:**\
    • Regular dependency updates and security patches\
    • Weekly database vacuum/analyze jobs\
    • Scheduled schema migrations during low-traffic windows

## 9. Conclusion and Overall Backend Summary

The DiveTribe backend is built on a scalable, serverless-first platform (Supabase) that covers database, authentication, storage, and functions. Our clear modular architecture supports growth and evolution, while PostgreSQL with RLS ensures data security and privacy. RESTful APIs and edge functions power core features—dive logging, social feeds, AI-driven buddy matching, gamification, and premium listings. Globally distributed CDN and real-time capabilities deliver a responsive user experience. Robust monitoring, automated backups, and strict security measures protect data integrity. This backend setup directly aligns with DiveTribe’s goal to connect freediving enthusiasts, track progress, and foster a vibrant, data-driven community.
