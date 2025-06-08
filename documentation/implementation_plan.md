# Implementation plan

## Phase 1: Environment Setup

1.  **Prevalidation: Check for existing project**

    *   Action: In the project root, check for `.git`, `package.json`, `expo.config.js`, or `supabase` directory and abort initialization if any exist.
    *   Reference: Project Summary

2.  **Install Node.js v20.2.1**

    *   Action: If `node -v` does not output `v20.2.1`, download and install Node.js v20.2.1 from <https://nodejs.org/dist/v20.2.1/>
    *   Reference: Tech Stack: Core Tools

3.  **Validation: Confirm Node.js installation**

    *   Action: Run `node -v` and verify output is `v20.2.1`.
    *   Reference: Tech Stack: Core Tools

4.  **Install Bolt CLI**

    *   Action: Run `npm install -g bolt` to install the Bolt scaffolding tool.
    *   Reference: Tools: Bolt

5.  **Scaffold Expo React Native project**

    *   Action: Run `bolt create DiveTribeApp --template expo-rn` to generate the initial Expo project.
    *   File: Creates project folder `DiveTribeApp/` with `expo.config.js`, `package.json`.
    *   Reference: Tools: Bolt

6.  **Validation: Verify scaffold**

    *   Action: Confirm presence of `app.json` or `expo.config.js` and `node_modules/` in `DiveTribeApp/`.
    *   Reference: Tools: Bolt

7.  **Install Expo CLI**

    *   Action: Inside `DiveTribeApp/`, run `npm install --save-dev expo-cli`
    *   Reference: Tech Stack: Frontend

8.  **Create cursor_metrics.md**

    *   Action: In `DiveTribeApp/`, create file `cursor_metrics.md`.
    *   Reference: Tools: Cursor Documentation

9.  **Refer to cursor_project_rules.mdc**

    *   Action: Open `cursor_project_rules.mdc` in the root to understand required metrics.
    *   Reference: Tools: Cursor Documentation

10. **Create .cursor directory**

    *   Action: In `DiveTribeApp/`, run `mkdir .cursor`.
    *   Reference: Tools: Cursor Documentation

11. **Create .cursor/mcp.json**

    *   Action: In `.cursor/`, create `mcp.json` with placeholder JSON.
    *   File: `.cursor/mcp.json`
    *   Reference: Tools: Cursor Documentation

12. **Add .cursor/mcp.json to .gitignore**

    *   Action: Append `.cursor/mcp.json` to `DiveTribeApp/.gitignore`.
    *   Reference: Tools: Cursor Documentation

13. **Add Supabase MCP configuration**

    *   Action: In `.cursor/mcp.json`, add:

    `{ "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }`

    *   Reference: Tech Stack: Backend – Supabase

14. **Retrieve Supabase MCP connection string**

    *   Action: Ask user to get the connection string from: <https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp>
    *   Reference: Tech Stack: Backend – Supabase

15. **Connect MCP server and validate**

    *   Action: After inserting `<connection-string>`, run `npx @modelcontextprotocol/server-postgres <connection-string>` and check `Settings > MCP` in IDE for green status.
    *   Reference: Tech Stack: Backend – Supabase

## Phase 2: Frontend Development

1.  **Create Onboarding screen**

    *   Action: Create `DiveTribeApp/src/screens/OnboardingScreen.tsx` with React Native + Expo + Tailwind UI.
    *   Reference: Key User Flows: Sign-up/Onboarding

2.  **Implement Auth buttons**

    *   Action: In `OnboardingScreen.tsx`, add Email, Google, and Apple login buttons wired to Supabase Auth.
    *   Reference: Tech Stack: Auth – Supabase; Core Features Phase 1

3.  **Validation: Run onboarding UI**

    *   Action: Run `expo start`, open on simulator, and verify buttons render and open correct flows.
    *   Reference: Tech Stack: Frontend

4.  **Create DiveLog screen**

    *   Action: Create `DiveTribeApp/src/screens/DiveLogScreen.tsx` with form fields: site name, depth, duration, temp, visibility, equipment, notes.
    *   Reference: Core Features Phase 1 – Dive Logging

5.  **Add map picker**

    *   Action: In `DiveLogScreen.tsx`, integrate `react-native-maps` for optional GPS coordinate picking.
    *   Reference: Important Considerations: Manual Dive Log Details

6.  **Validation: Form state**

    *   Action: Populate all form fields in emulator and verify state updates correctly.
    *   Reference: Tech Stack: Frontend

7.  **Create Community Feed screen**

    *   Action: Create `DiveTribeApp/src/screens/FeedScreen.tsx` displaying posts in card layout using Radix UI styled with Tailwind.
    *   Reference: Core Features Phase 1 – Social Feed + Community

8.  **Implement like/comment UI**

    *   Action: In `FeedScreen.tsx`, add like and comment buttons with dummy handlers.
    *   Reference: Core Features Phase 1 – Social Feed + Community

9.  **Validation: UI interaction**

    *   Action: Tap like/comment in simulator to confirm handler calls.
    *   Reference: Tech Stack: Frontend

10. **Create Buddy Discovery screen**

    *   Action: Create `DiveTribeApp/src/screens/BuddyDiscoveryScreen.tsx` with filter inputs (distance, certification, languages, etc.) and profile card list.
    *   Reference: Core Features Phase 1 – Buddy + Coach Discovery

11. **Validation: Filter UI**

    *   Action: Enter filter values and ensure UI updates candidates list.
    *   Reference: Tech Stack: Frontend

## Phase 3: Backend Development

1.  **Set up Supabase project**

    *   Action: Create a new Supabase project in `us-east-1` and obtain `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
    *   Reference: Tech Stack: Backend – Supabase

2.  **Define Postgres schema**

    *   Action: In Supabase SQL editor, create tables: `users`, `dives`, `posts`, `challenges`, `businesses`, `reports`, with relations and privacy RLS (public/friends-only/private).
    *   Reference: Core Features Phase 1 – Dive Logging; Privacy Settings

3.  **Validation: Schema existence**

    *   Action: Run `SELECT * FROM information_schema.tables WHERE table_schema='public';` in Supabase SQL editor and confirm tables.
    *   Reference: Tech Stack: Backend – Supabase

4.  **Enable Supabase Auth**

    *   Action: In Supabase Settings > Auth, enable Email, Google, and Apple OAuth.
    *   Reference: Tech Stack: Auth – Supabase

5.  **Validation: Test sign-up**

    *   Action: From Postman or frontend, call Supabase Auth sign-up endpoint and confirm user record creation.
    *   Reference: Tech Stack: Auth – Supabase

6.  **Implement REST API routes**

    *   Action: In `DiveTribeApp/backend/routes/`, create `dive.js`, `feed.js`, `buddy.js` using Supabase client for CRUD.
    *   Reference: App Flow: Steps 2–4

7.  **Validation: API smoke test**

    *   Action: Run `curl http://localhost:3000/api/v1/dives` and expect JSON array.
    *   Reference: App Flow: Dive Logging

8.  **Integrate Garmin Connect API**

    *   Action: In `DiveTribeApp/backend/services/garmin.js`, implement OAuth flow and data sync endpoints per Garmin Connect API docs.
    *   Reference: Important Considerations: Garmin Integration

9.  **Validation: Garmin sync**

    *   Action: Simulate a Garmin webhook payload to `/api/v1/garmin-sync` and verify dive records inserted.
    *   Reference: Important Considerations: Garmin Integration

10. **Implement moderation tools**

    *   Action: Add `admin.js` routes in `/backend/routes/` for removing posts, banning users, reviewing reports, with RLS checks.
    *   Reference: Core Features Phase 1 – Core Settings + Admin

11. **Validation: Admin API**

    *   Action: As a test admin, call `DELETE /api/v1/posts/:id` and confirm post removal.
    *   Reference: Core Features Phase 1 – Core Settings + Admin

## Phase 4: Integration

1.  **Connect frontend to backend**

    *   Action: In `src/services/api.ts`, configure Supabase client with `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
    *   Reference: Tech Stack: Backend – Supabase

2.  **Validation: Auth persistence**

    *   Action: Log in via frontend and verify JWT stored securely (e.g., `SecureStore`).
    *   Reference: Core Features Phase 1

3.  **Implement data fetching**

    *   Action: In each screen (`FeedScreen.tsx`, `DiveLogScreen.tsx`, `BuddyDiscoveryScreen.tsx`), replace dummy handlers with real Supabase calls.
    *   Reference: App Flow: Steps 2–5

4.  **Validation: End-to-end interaction**

    *   Action: Create a dive log, verify it appears in Feed and Dashboard.
    *   Reference: App Flow: Dive Logging & Community Feed

5.  **Configure CORS**

    *   Action: In Supabase Settings > API, ensure CORS allows `exp://*` and `http://localhost:19006`.
    *   Reference: Tech Stack: Backend

6.  **Validation: CORS test**

    *   Action: Attempt API call from emulator and confirm no CORS errors.
    *   Reference: Tech Stack: Backend

## Phase 5: Deployment

1.  **Set up CI/CD pipeline**

    *   Action: Create GitHub Actions workflow `.github/workflows/ci.yml` to run `npm test` and `expo build`.
    *   Reference: Tech Stack: Deployment

2.  **Validation: CI run**

    *   Action: Push a commit and confirm CI passes on GitHub.
    *   Reference: Tech Stack: Deployment

3.  **Deploy backend**

    *   Action: Use Supabase’s hosted Postgres; ensure production keys in GitHub Secrets.
    *   Reference: Tech Stack: Backend – Supabase

4.  **Deploy mobile app to Expo**

    *   Action: Run `expo publish --release-channel production`.
    *   Reference: Tech Stack: Frontend

5.  **Validation: Production QA**

    *   Action: Install from Expo link, perform sign-up, dive log, feed, and buddy discovery flows.
    *   Reference: Key User Flows

6.  **Configure monitoring & analytics**

    *   Action: Integrate Sentry for crash reporting and Firebase Analytics for user events.
    *   Reference: Tech Stack: Subsidiary Tools

7.  **Post-launch review**

    *   Action: Collect user feedback on Phase 1 features and prepare Phase 2 backlog (AI matching, additional dive computers, payments).
    *   Reference: Project Summary – Phase 2
