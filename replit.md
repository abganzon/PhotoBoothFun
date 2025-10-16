# Photo Booth Application

## Overview

This is a web-based photo booth application that allows users to capture multiple photos, customize them with various layouts and styling options, and share them via time-limited links. The application provides a fun, interactive experience similar to traditional photo booth strips with modern customization features.

## Recent Changes (October 16, 2025)

### Netlify Deployment Fix
- **Issue**: API endpoints were returning 404 errors on Netlify deployment
- **Solution**: 
  - Installed `serverless-http` package
  - Created Netlify Function wrapper at `netlify/functions/api.ts`
  - Configured `netlify.toml` with proper redirects and build settings
  - API routes now work correctly in serverless environment using basePath configuration

### Gallery Functionality Enhancement
- **Issue**: "Save to Gallery" button was missing, and gallery data structure was mismatched
- **Fixes**:
  - Fixed `saveToGallery` function to use flat data structure matching Gallery page expectations
  - Added `onSaveToGallery` prop to PhotoStrip component
  - Added "Save to Gallery" button in PhotoStrip component (green border button)
  - Gallery page now correctly displays saved photo strips from localStorage
  - Fixed QRCode import to use default import instead of named import

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for the UI layer
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management and API data fetching

**UI Components & Styling**
- **Radix UI** primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom theming
- **shadcn/ui** component patterns built on Radix UI
- Custom theme system with JSON-based configuration (`theme.json`)

**Key Features**
- Multi-step photo capture workflow with countdown timer
- Real-time webcam integration using `react-webcam`
- Canvas-based photo strip rendering for downloads
- QR code generation for sharing (`react-qr-code`)
- Local storage for persisting photo strips client-side

**Application Structure**
- Page-based routing: Landing, Home (photo booth), Gallery, Shared view, Privacy
- Component library organized by domain (photo-booth components, UI primitives)
- Shared schema definitions for type safety across client/server

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the REST API
- **Node.js** with ESM modules
- Development server with Vite middleware integration for HMR
- Production build uses esbuild for server bundling

**API Design**
- RESTful endpoints for photo strips and shared links
- `/api/photo-strips` - Create photo strip records
- `/api/shared-links` - Generate time-limited sharing links (10-minute expiration)
- `/api/shared-links/:id` - Retrieve shared photo strips

**Data Layer Strategy**
- **In-memory storage** (MemStorage) used as default implementation
- Database abstraction via `IStorage` interface for easy swapping
- Drizzle ORM schema defined for PostgreSQL migration path
- Schema includes: `photo_strips`, `shared_links` tables

**Session & State Management**
- Photo strips stored with JSON photo arrays
- Shared links with UUID identifiers and expiration timestamps
- Active/inactive link status tracking

### External Dependencies

**Database & ORM**
- **Drizzle ORM** (v0.39.1) for type-safe database queries
- **@neondatabase/serverless** driver for PostgreSQL (Neon DB)
- **drizzle-zod** for runtime schema validation
- **PostgreSQL** dialect configured (currently unused, in-memory storage active)

**Third-Party Services**
- **Netlify Functions** - Serverless deployment configuration included
- **Replit** - Development platform integration with cartographer plugin

**Key Libraries**
- **Zod** for runtime type validation and schema generation
- **date-fns** for date formatting and manipulation
- **nanoid** for unique ID generation
- **react-webcam** for camera access
- **react-qr-code** for QR code generation

**Development Tools**
- **tsx** for TypeScript execution in development
- **esbuild** for production server bundling
- **TypeScript** with strict mode enabled
- **PostCSS** with Autoprefixer for CSS processing

### Design Patterns & Architecture Decisions

**Storage Abstraction**
- Interface-based storage allows switching between in-memory and database implementations without changing business logic
- Current implementation uses MemStorage for rapid development; PostgreSQL schema prepared for production scale

**Shared Schema Pattern**
- Type definitions shared between client and server via `@shared` path alias
- Drizzle-zod integration generates both database schemas and validation schemas from single source
- Ensures type safety across the full stack

**API Response Strategy**
- Explicit Content-Type headers for all responses
- Structured error handling with status codes
- JSON responses throughout for consistency

**Build & Deployment**
- Dual build process: Vite for client, esbuild for server
- Static assets served from `dist/public`
- Environment-based configuration for database connections
- Support for both Replit and Netlify deployment targets