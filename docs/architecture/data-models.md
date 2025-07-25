# Data Models

## Core Business Entities

Based on the PRD requirements, DiveTribe's data model centers around diving activities, social interactions, and community building:

### User

- **Purpose:** Central entity representing divers with profiles, preferences, and authentication
- **Key Attributes:** id, email, profile (name, bio, certifications, gear), privacy_settings, location, diving_goals
- **Relationships:** one-to-many with Dives, Posts, Connections; many-to-many with Groups

### Dive

- **Purpose:** Core activity tracking entity storing dive performance and metadata
- **Key Attributes:** id, user_id, depth, duration, location (GPS), dive_site, discipline, temperature, visibility, equipment, notes, photos, created_at
- **Relationships:** belongs to User, belongs to DiveSite, has many DivePhotos
- **Data Types:** depth (decimal), duration (interval), location (geography), photos (array)

### DiveSite

- **Purpose:** Shared database of diving locations with community-contributed information
- **Key Attributes:** id, name, location (GPS), description, depth_range, difficulty_level, dive_type, conditions, facilities
- **Relationships:** has many Dives, has many DiveSiteReviews

### Post

- **Purpose:** Social feed content combining dive data with photos and commentary
- **Key Attributes:** id, user_id, dive_id (optional), content, photos, visibility, created_at, engagement_stats
- **Relationships:** belongs to User, optionally belongs to Dive, has many Comments and Likes

### Connection

- **Purpose:** Relationship management between users (buddies, instructors, followers)
- **Key Attributes:** id, requester_id, addressee_id, connection_type, status, created_at
- **Relationships:** belongs to two Users
- **Types:** buddy, instructor_student, follower

### Group

- **Purpose:** Local diving communities and interest-based organizations
- **Key Attributes:** id, name, description, location, group_type, privacy_level, member_count
- **Relationships:** has many GroupMembers, belongs to creator User

## Database Relationships

```mermaid
erDiagram
    User ||--o{ Dive : logs
    User ||--o{ Post : creates
    User ||--o{ Connection : initiates
    User ||--o{ GroupMember : joins

    Dive }o--|| DiveSite : occurs_at
    Dive ||--o{ DivePhoto : contains

    Post ||--o{ Comment : receives
    Post ||--o{ Like : gets
    Post }o--|| Dive : optionally_features

    DiveSite ||--o{ DiveSiteReview : has

    Group ||--o{ GroupMember : contains
    Group ||--o{ GroupPost : hosts

    User {
        uuid id PK
        string email
        jsonb profile
        jsonb privacy_settings
        geography location
        timestamp created_at
    }

    Dive {
        uuid id PK
        uuid user_id FK
        uuid dive_site_id FK
        decimal depth_meters
        interval duration
        geography location
        string discipline
        jsonb conditions
        text notes
        string[] photo_urls
        timestamp dive_time
    }

    DiveSite {
        uuid id PK
        string name
        geography location
        text description
        jsonb depth_range
        string difficulty_level
        string[] dive_types
        jsonb facilities
    }

    Post {
        uuid id PK
        uuid user_id FK
        uuid dive_id FK
        text content
        string[] photo_urls
        string visibility
        jsonb engagement_stats
        timestamp created_at
    }
```
