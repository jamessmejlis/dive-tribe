# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DiveTribe is a mobile-first social platform for freedivers and spearfishers that combines performance tracking with community building - essentially "Strava for the ocean." The project is currently in the documentation/planning phase, with comprehensive product requirements and architecture documentation already established.

## Project Architecture

### Tech Stack & Framework

- **Frontend**: React Native with Expo for cross-platform mobile development
- **UI Components**: Gluestack UI v2 for universal, accessible component library
- **Backend**: Supabase (PostgreSQL) as backend-as-a-service
- **Authentication**: Supabase Auth with Email, Google OAuth, Apple OAuth
- **State Management**: Zustand for lightweight state management
- **Navigation**: Expo Router for file-based routing
- **Database**: PostgreSQL 15.x with real-time subscriptions
- **External APIs**: Garmin Connect API for dive computer integration

### High-Level Architecture Pattern

The application follows a mobile-first serverless architecture with:

- Backend-as-a-Service (BaaS) pattern using Supabase
- Event-driven real-time architecture for social features
- Repository pattern for data access abstraction
- Component-based UI architecture with design system

### Core Business Entities

- **User**: Central entity with profiles, certifications, and preferences
- **Dive**: Core activity tracking (depth, duration, location, photos)
- **DiveSite**: Shared database of diving locations
- **Post**: Social feed content combining dive data with commentary
- **Connection**: Relationship management between users
- **Group**: Local diving communities and interest-based organizations

## Project Structure

Currently, the repository contains only documentation:

```
dive-tribe/
├── docs/                          # Project documentation
│   ├── architecture.md           # Complete fullstack architecture
│   ├── prd.md                    # Product Requirements Document
│   ├── project-brief.md          # High-level product overview
│   ├── product-strategy.md       # Business strategy
│   ├── front-end-spec.md         # Frontend specifications
│   ├── ai-frontend-prompt.md     # AI frontend development guidance
│   └── po-validation-report.md   # Product validation analysis
└── .cursor/rules/                # Cursor AI agent configurations
    ├── dev.mdc                   # Developer agent rules
    ├── architect.mdc             # Architecture agent rules
    └── [other agent configs]
```

## Development Workflow

### Project Initialization Commands

Since this is a greenfield project, the following commands will be needed when development begins:

```bash
# Initialize React Native project with Expo
npx create-expo-app --template

# Install core dependencies
npm install @supabase/supabase-js @gluestack-ui/themed zustand expo-router

# Setup development environment
npx expo install
npx expo run:ios
npx expo run:android
```

### Expected Build & Development Commands

Based on the architecture document, these commands will be standard once the project is implemented:

```bash
# Development
npm run dev              # Start Expo development server
npm start               # Alternative start command

# Testing
npm run test            # Run Jest tests
npm run test:e2e        # Run Maestro E2E tests
npm run lint            # ESLint code checking
npm run type-check      # TypeScript type checking

# Build & Deploy
npx eas build           # Build for app stores
npx eas submit          # Submit to app stores
```

## Key Development Guidelines

### Component Development

- Use Gluestack UI v2 components as base building blocks
- Follow ocean-inspired design system with deep blues and aqua highlights
- Implement responsive design for mobile-first experience
- Ensure WCAG AA accessibility compliance

### Data Management

- Use Supabase client for all database operations
- Implement Row Level Security (RLS) policies for data privacy
- Leverage real-time subscriptions for social features
- Cache dive site information for offline access

### State Management

- Use Zustand stores for different domains (auth, dive, feed)
- Keep stores focused on single responsibilities
- Implement optimistic updates for better UX

### API Integration

- Integrate with Garmin Connect API for automatic dive sync
- Implement proper error handling and retry mechanisms
- Use background sync for large data imports

## Important Notes

### Current Status

- This is a **documentation-only repository** - no code has been implemented yet
- All technical specifications are complete and ready for development
- The project follows a structured agent-based development approach

### Development Approach

- The project uses specialized AI agents (dev, architect, etc.) defined in `.cursor/rules/`
- Development should follow the Epic structure outlined in `docs/prd.md`
- Start with Epic 1 (Foundation & Core Infrastructure) when beginning implementation

### Business Context

- Target beachhead markets: Bali, Hawaii, Mediterranean
- Freemium model with B2B premium listings for instructors/shops
- Focus on serious divers who value both performance tracking and community

### Safety Considerations

- Diving safety is paramount - implement appropriate warnings and disclaimers
- Never encourage unsafe diving practices through gamification
- Include safety verification badges and instructor certifications

## Next Steps for Development

When ready to begin implementation:

1. Initialize the React Native/Expo project structure
2. Set up Supabase backend and database schema
3. Implement Epic 1 stories from the PRD
4. Follow the development agent workflows defined in `.cursor/rules/dev.mdc`
