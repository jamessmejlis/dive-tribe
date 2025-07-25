# Authentication & Security

## Authentication Flow

DiveTribe implements **Supabase Auth** with multiple authentication providers and comprehensive security measures:

### Authentication Providers

- **Email/Password:** Traditional signup with email verification
- **Google OAuth:** Streamlined social login
- **Apple OAuth:** Required for iOS App Store compliance
- **Anonymous Sessions:** Guest browsing with upgrade prompts

### Session Management

```typescript
// Automatic token refresh
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // Store session and update app state
    AuthStore.setSession(session)
  }
  if (event === 'TOKEN_REFRESHED') {
    // Update stored session
    AuthStore.updateSession(session)
  }
})

// Row Level Security policies
CREATE POLICY "Users can only see their own dives" ON dives
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public posts" ON posts
FOR SELECT USING (
  visibility = 'public' OR
  user_id = auth.uid() OR
  user_id IN (SELECT addressee_id FROM connections WHERE requester_id = auth.uid())
);
```

## Data Privacy & Security

### Privacy Controls

- **Granular Post Visibility:** Public, Friends-only, Private
- **Location Privacy:** Optional GPS tagging with location fuzzing
- **Profile Privacy:** Configurable profile field visibility
- **Activity Privacy:** Option to hide specific dives or achievements

### Security Measures

- **Row Level Security (RLS):** Database-level access control
- **Input Validation:** All user inputs sanitized and validated
- **Rate Limiting:** API endpoint protection against abuse
- **Content Moderation:** Automated and manual content review
- **Data Encryption:** All data encrypted at rest and in transit

```typescript
// Example RLS policy for dive privacy
CREATE POLICY "Dive visibility control" ON dives
FOR SELECT USING (
  -- Public dives
  privacy_level = 'public' OR
  -- Own dives
  user_id = auth.uid() OR
  -- Friend's dives
  (privacy_level = 'friends' AND
   user_id IN (
     SELECT CASE
       WHEN requester_id = auth.uid() THEN addressee_id
       WHEN addressee_id = auth.uid() THEN requester_id
     END FROM connections
     WHERE status = 'accepted'
   ))
);
```
