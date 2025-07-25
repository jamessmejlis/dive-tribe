# API Architecture

## Backend Services Architecture

DiveTribe uses **Supabase Edge Functions** for custom business logic while leveraging built-in database, auth, and storage services:

### Core API Services

**1. Authentication Service (Supabase Auth)**

- Email/password registration and login
- OAuth integration (Google, Apple)
- Session management and refresh tokens
- Row Level Security (RLS) policy enforcement

**2. Dive Management Service (Edge Function)**

- Dive logging with validation and enrichment
- Garmin Connect API integration for automatic sync
- Personal analytics calculation and caching
- Achievement detection and milestone tracking

**3. Social Feed Service (Edge Function)**

- Feed algorithm for personalized content
- Post creation with image processing
- Real-time engagement updates via Supabase Realtime
- Content moderation and safety checks

**4. Discovery Service (Edge Function)**

- Buddy matching algorithm based on preferences and location
- Instructor/service provider search and filtering
- Dive site recommendation engine
- Availability and compatibility scoring

**5. Community Service (Edge Function)**

- Group management and membership
- Challenge creation and leaderboard calculation
- Event coordination and attendance tracking
- Safety alert and communication systems

## API Design Patterns

### RESTful Endpoints

**Authentication Flows:**

```typescript
POST /auth/signup - Create new user account
POST /auth/signin - Authenticate user
POST /auth/signout - Invalidate session
GET /auth/user - Get current user profile
```

**Dive Management:**

```typescript
POST /api/dives - Log new dive
GET /api/dives - Get user's dive history (paginated)
PUT /api/dives/{id} - Update dive details
DELETE /api/dives/{id} - Remove dive record
GET /api/analytics/personal - Get user analytics dashboard
```

**Social Features:**

```typescript
GET /api/feed - Get personalized feed (paginated)
POST /api/posts - Create new post
GET /api/posts/{id} - Get specific post with comments
POST /api/posts/{id}/like - Toggle like on post
POST /api/posts/{id}/comments - Add comment to post
```

### Real-time Subscriptions

**Supabase Realtime Channels:**

```typescript
// Feed updates for followed users
supabase.channel('user_feed').on(
  'postgres_changes',
  {
    event: 'INSERT',
    schema: 'public',
    table: 'posts',
    filter: `user_id=in.(${followedUserIds})`,
  },
  handleNewPost
)

// Live challenge leaderboards
supabase.channel('challenge_updates').on(
  'postgres_changes',
  {
    event: 'UPDATE',
    schema: 'public',
    table: 'challenge_participants',
  },
  handleLeaderboardUpdate
)
```

## External API Integrations

### Garmin Connect API

```typescript
interface GarminIntegration {
  authenticateUser(): Promise<GarminAuthToken>
  syncDiveData(userId: string): Promise<GarminDive[]>
  getActivityDetails(activityId: string): Promise<GarminActivity>
  setupWebhook(userId: string): Promise<WebhookConfig>
}
```

### Maps & Location Services

```typescript
interface LocationServices {
  searchDiveSites(query: string, location: LatLng): Promise<DiveSite[]>
  reverseGeocode(location: LatLng): Promise<LocationInfo>
  calculateDistance(from: LatLng, to: LatLng): Promise<number>
  getWeatherConditions(location: LatLng): Promise<WeatherData>
}
```
