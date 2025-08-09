# KERVENTZ STATUS - Professional Contact Management

## Overview

KERVENTZ STATUS is a modern full-stack contact management application designed for professional use. The application provides a comprehensive solution for managing contacts with features like VCF export, duplicate validation, and multilingual support. Built with React on the frontend and Express.js on the backend, it offers both a public registration interface and an admin dashboard for contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JWT-based authentication
- **Data Validation**: Zod schemas shared between frontend and backend
- **Session Management**: JWT tokens with bcrypt for password hashing
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot module replacement via Vite middleware

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Data Models**: Users table for authentication, Contacts table with comprehensive contact information

### Authentication and Authorization
- **Authentication Strategy**: JWT-based authentication with configurable secret
- **Password Security**: bcrypt hashing for secure password storage
- **Session Management**: JWT tokens with 24-hour expiration
- **Authorization Middleware**: Token verification for protected routes
- **Default Admin**: Pre-configured admin user for initial setup

### External Dependencies
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **UI Framework**: Radix UI components for accessible, unstyled primitives
- **Styling**: Tailwind CSS with PostCSS processing
- **Form Validation**: Hookform resolvers with Zod schema validation
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: Replit-specific plugins for development environment integration

The application follows a monorepo structure with shared TypeScript schemas between client and server, ensuring type safety across the full stack. The architecture supports both development and production environments with appropriate build processes and static file serving.