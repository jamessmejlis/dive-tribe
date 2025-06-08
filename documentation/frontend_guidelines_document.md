# Frontend Guideline Document

This document outlines the frontend architecture, design principles, and technologies used in the DiveTribe project. It’s written in everyday language to ensure clarity and ease of understanding for everyone on the team.

## 1. Frontend Architecture

### 1.1 Overall Structure

*   **Framework:** React Native with Expo for iOS and Android builds.
*   **UI Library:** Radix UI for accessible, unstyled building blocks.
*   **Styling:** Tailwind CSS via `tailwindcss-react-native` (utility-first approach).

All screens and components live under a clear folder structure (see Component Structure). Expo handles bundling, build pipelines, and easy testing on devices or simulators.

### 1.2 Scalability, Maintainability, Performance

*   **Modular code:** Each feature (feed, dive logs, challenges) lives in its own folder with screens, components, and hooks. This keeps code organized as the app grows.
*   **Reusable components:** Shared UI pieces (buttons, cards, inputs) ensure we don’t copy/paste code.
*   **Lazy loading:** Screens are loaded on demand to keep the app startup fast.
*   **Code splitting:** We split large feature modules so users download only what they need.

## 2. Design Principles

### 2.1 Usability

*   Clear, touch-friendly controls.
*   Prominent dive stats, simple forms for logs.
*   Consistent navigation patterns (bottom tab + stack).

### 2.2 Accessibility

*   All text meets WCAG contrast ratios (using our deep navy and white palette).
*   Screen-reader labels on buttons and images.
*   Focus indicators on interactive elements.

### 2.3 Responsiveness & Mobile-First

*   Designed primarily for phones; tablet layouts adapt via flex and grid utilities.
*   Components resize and reflow gracefully on different screen sizes.

### 2.4 Consistency

*   Shared design tokens: colors, fonts, spacing defined in Tailwind config.
*   Radix UI patterns ensure consistent behavior (modals, tooltips).

## 3. Styling and Theming

### 3.1 Styling Approach

*   **Utility-first:** Tailwind CSS classes for margin, padding, colors, fonts.
*   No custom CSS files—styles are co-located via className.

### 3.2 Theming

*   Single theme baked into Tailwind config.
*   Future-proofed for dark mode by using CSS variables in `tailwind.config.js`.

### 3.3 Visual Style

*   **Look & Feel:** Modern, slight glassmorphism touches on cards (translucent backgrounds with subtle blur).
*   **Card-based UI:** Feeds, logs, and profile sections are presented as cards with rounded corners and shadows.

### 3.4 Color Palette

*   **Deep Navy:** #1E3F66 (primary)
*   **Turquoise Sea:** #3FBAC2 (secondary)
*   **Sand Beige:** #F5F1EA
*   **Light Gray:** #ECECEC
*   **White:** #FFFFFF
*   **Accent Yellow:** #FFD166 (for badges, highlights)

### 3.5 Fonts

*   **Primary:** Inter (sans-serif) for all text.
*   Headings are medium to bold weight; body text is regular.

## 4. Component Structure

### 4.1 Folder Layout

`/src /components # Reusable UI pieces (Button, Card, Input) /screens # Full-screen views (FeedScreen, DiveLogScreen) /navigation # React Navigation stacks & tabs /hooks # Custom hooks (useAuth, useDives) /context # React Context providers (AuthContext) /services # API calls (supabase.js, garminApi.js) /assets # Images, icons, fonts /utils # Helpers and constants`

### 4.2 Reusable Components

*   **Button:** Customizable variants (primary, secondary, outline).
*   **Card:** Wraps content in a styled container.
*   **InputField:** Standard text input with label and error message.
*   **Avatar, Badge, Modal:** Built on Radix primitives.

Component-based architecture means each piece is self-contained, easy to test, and simple to update.

## 5. State Management

### 5.1 Libraries & Patterns

*   **React Context + Reducers:** For global UI state (theme, auth status).
*   **React Query:** For server data (dives, profile, feed). Automatically handles caching, background refresh, and retries.

### 5.2 Data Flow

1.  **Fetch:** useReactQuery (e.g., `useDives`) calls Supabase/Garmin API.
2.  **Cache:** Data stays fresh in the cache; components re-render on updates.
3.  **Mutations:** Submitting a new dive log or comment triggers a mutation and optimistically updates the UI.

This approach keeps UI snappy and minimizes manual state boilerplate.

## 6. Routing and Navigation

### 6.1 React Navigation

*   **Bottom Tabs:** Main sections (Feed, Dive Log, Discover, Profile).
*   **Stack Navigator:** Within each tab for deeper flows (Log Details, Challenge Details, Admin Tools).

### 6.2 Navigation Patterns

*   **Onboarding Flow:** Separate stack before main tabs.
*   **Modal Presentation:** For quick actions (create post, new log).
*   **Deep Linking:** Handles external links (WhatsApp contact links).

Users move seamlessly between profiles, feeds, and logs with familiar mobile patterns.

## 7. Performance Optimization

### 7.1 Lazy Loading & Code Splitting

*   Screens loaded via `React.lazy` or dynamic `import()`.

### 7.2 Asset Optimization

*   Optimize images using Expo’s `Asset` module.
*   Use vector icons (React Native SVG) instead of PNGs.

### 7.3 Bundling

*   Expo’s production build minimizes JS bundle size.
*   Tree-shaking unused code from Radix and other libraries.

### 7.4 List Performance

*   Use `FlatList` with `keyExtractor`, `getItemLayout`, and `initialNumToRender` for long feeds.

## 8. Testing and Quality Assurance

### 8.1 Unit Tests

*   **Jest:** Test individual functions and components.
*   **React Native Testing Library:** Render components, simulate taps, and verify behavior.

### 8.2 Integration Tests

*   Test component interactions (e.g., submitting a dive log updates dashboard).

### 8.3 End-to-End (E2E)

*   **Detox:** Automate user flows on real devices/simulators (login, feed scroll, log dive).

### 8.4 Quality Tools

*   **ESLint & Prettier:** Enforce code style and catch errors early.
*   **TypeScript:** Strict typing for props, state, and API responses.

## 9. Conclusion and Overall Frontend Summary

DiveTribe’s frontend is built with React Native and Expo, styled by Tailwind CSS, and powered by Radix UI for accessibility. Its component-based architecture, combined with React Context and React Query, ensures scalable, maintainable, and high-performance code. We follow clear design principles—usability, accessibility, and mobile-first responsiveness—to provide freedivers and spearfishers with a smooth, engaging experience. Testing at every level (unit, integration, E2E) keeps quality high as we grow the platform. Together, these guidelines align with our goal: a modern, data-driven community app that helps users track progress, connect safely, and dive deeper.
