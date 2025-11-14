# Flappy Modi - Game Project

## Overview

Flappy Modi is a browser-based Flappy Bird-style game built with modern web technologies. The game features a canvas-based rendering engine running at 60 FPS, complete with procedurally generated obstacles, collision detection, particle effects, and sound integration. Players control a character (Modi) navigating through pipes while attempting to achieve high scores that persist locally.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3 with TypeScript for type safety and modern component patterns
- Vite as the build tool for fast development and optimized production builds
- Canvas-based game rendering for optimal performance at 60 FPS

**State Management**
- Zustand for global state management with middleware support
- Two primary stores:
  - `useGame`: Manages game phases (ready, playing, ended) with state transitions
  - `useAudio`: Handles audio elements and mute state across the application
- Chose Zustand over Redux for simpler API and smaller bundle size

**UI Component Library**
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom component library in `client/src/components/ui/` for consistent design patterns

**Game Architecture**
- Core game loop implemented in `FlappyGame.tsx` using requestAnimationFrame
- Canvas-based rendering with HTML5 Canvas API
- Particle system (`ParticleSystem.tsx`) for visual effects (explosions, score particles)
- Physics simulation with gravity and velocity calculations
- Collision detection between bird and pipes using bounding box algorithm

**Game State Flow**
1. **Ready Phase**: Initial menu, waiting for user input
2. **Playing Phase**: Active gameplay with physics simulation
3. **Ended Phase**: Game over screen with score display

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Development mode uses Vite middleware for hot module replacement
- Production mode serves static built assets

**Development vs Production**
- Development: Vite dev server integrated via middleware for HMR
- Production: Pre-built static files served from `dist/public`
- Custom error logging middleware tracks API response times and payloads

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for user data
- Interface-based design (`IStorage`) allows easy swapping to database implementation
- Currently uses Map-based storage, designed to be replaced with database when needed

### External Dependencies

**Database Configuration**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema defined in `shared/schema.ts` with Zod validation
- Migration system configured to output to `./migrations`
- Database credentials expected via `DATABASE_URL` environment variable
- Note: Database integration is configured but not actively used in current game implementation

**Audio Assets**
- Background music loop (`/audio/music.mp3`)
- Sound effects for hit, success, and swing actions
- Audio playback controlled via Zustand store with mute toggle

**Third-Party Libraries**
- `@react-three/fiber` and `@react-three/drei`: 3D rendering capabilities (configured but not used in current 2D game)
- `@tanstack/react-query`: Async state management for API calls
- `date-fns`: Date manipulation utilities
- `class-variance-authority`: Type-safe component variant generation
- `cmdk`: Command menu component

**Asset Management**
- Vite configured to handle GLTF/GLB models and audio files (mp3, ogg, wav)
- GLSL shader support via `vite-plugin-glsl`
- Static assets served from `client/public/`

**Local Storage**
- High scores persisted using browser localStorage
- Custom utility functions `getLocalStorage` and `setLocalStorage` for type-safe storage operations

**Deployment**
- Configured for Vercel deployment via `vercel.json`
- SPA routing with catch-all rewrite to `index.html`
- Separate build output for client (`dist/public`) and server (`dist`)