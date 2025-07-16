# Exam_Mate Backend Architecture

## Overview

The Exam_Mate backend is built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript for type safety and follows a modular architecture pattern. The application connects to a PostgreSQL database using Prisma ORM.

## Directory Structure

```
backend/
├── prisma/                 # Prisma ORM configuration and schema
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Database schema definition
│   └── seed*.ts            # Seed scripts for populating the database
├── src/                    # Source code
│   ├── auth/               # Authentication module
│   │   ├── dto/            # Data Transfer Objects for auth
│   │   ├── guards/         # JWT authentication guards
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.module.ts      # Auth module definition
│   │   ├── auth.service.ts     # Auth business logic
│   │   └── jwt.strategy.ts     # JWT strategy for Passport
│   ├── exams/              # Exams module (core functionality)
│   │   ├── dto/            # Data Transfer Objects for exams
│   │   ├── exams.controller.ts # Exam endpoints
│   │   ├── exams.module.ts     # Exams module definition
│   │   └── exams.service.ts    # Exams business logic
│   ├── prisma/             # Prisma module for database connection
│   │   ├── prisma.module.ts    # Prisma module definition
│   │   └── prisma.service.ts   # Prisma service for database access
│   ├── app.controller.ts   # Main app controller
│   ├── app.module.ts       # Main app module
│   ├── app.service.ts      # Main app service
│   └── main.ts             # Application entry point
```

## Core Components

### 1. Main Application

- **main.ts**: Entry point of the application. Sets up the NestJS application, enables CORS, and starts the server on port 5000.
- **app.module.ts**: Root module that imports all other modules (PrismaModule, ExamsModule, AuthModule).
- **app.controller.ts**: Basic controller for the root endpoint.
- **app.service.ts**: Basic service for the root endpoint.

### 2. Database Layer (Prisma)

- **prisma/schema.prisma**: Defines the database schema with the following models:
  - `Admin`: Admin users for the system
  - `Exam`: Certification exams
  - `Question`: Exam questions with options and answers
  - `ExamResult`: Results of exam attempts
  - `QuestionAnswer`: Individual question answers for each exam attempt

- **prisma/prisma.service.ts**: Provides database access to other services, handling connection lifecycle.
- **prisma/prisma.module.ts**: Makes the PrismaService available throughout the application.

- **prisma/seed*.ts**: Scripts for populating the database with initial data:
  - `seed.ts`: General seed script
  - `seed-gcp-digital-leader.ts`: Google Cloud Digital Leader exam questions
  - `seed-gcp-ace.ts`: Google Cloud Associate Cloud Engineer exam questions

### 3. Authentication Module

- **auth/auth.service.ts**: Handles admin authentication, password validation, JWT token generation, and admin creation.
- **auth/auth.controller.ts**: Exposes endpoints for login and admin creation.
- **auth/jwt.strategy.ts**: Implements JWT authentication strategy using Passport.
- **auth/guards/jwt-auth.guard.ts**: Guard to protect admin-only routes.
- **auth/dto/**:
  - `login.dto.ts`: Data structure for login requests
  - `create-admin.dto.ts`: Data structure for admin creation

### 4. Exams Module (Core Business Logic)

- **exams/exams.service.ts**: Core business logic for:
  - Managing exams (CRUD operations)
  - Managing questions (CRUD operations)
  - Processing exam results
  - Generating statistics and analytics
  - Bulk operations for questions

- **exams/exams.controller.ts**: Exposes endpoints for:
  - Public routes: Getting exams, questions, submitting results
  - Protected routes: Creating/updating/deleting exams and questions

- **exams/dto/**:
  - `create-exam.dto.ts`: Data structure for exam creation
  - `update-exam.dto.ts`: Data structure for exam updates
  - `create-question.dto.ts`: Data structure for question creation
  - `update-question.dto.ts`: Data structure for question updates
  - `create-exam-result.dto.ts`: Data structure for submitting exam results

## API Endpoints

### Public Endpoints

- `GET /exams`: Get all available exams
- `GET /exams/:id`: Get a specific exam by ID
- `GET /exams/:examId/questions`: Get all questions for a specific exam
- `POST /exams/:id/results`: Submit results for an exam attempt
- `GET /exams/:id/results`: Get all results for a specific exam
- `GET /exams/results/:resultId`: Get a specific exam result by ID
- `GET /exams/:id/statistics`: Get statistics for a specific exam

### Protected Endpoints (Admin Only)

- `POST /auth/login`: Admin login
- `POST /auth/register`: Create a new admin (only if no admins exist)

- `POST /exams`: Create a new exam
- `PUT /exams/:id`: Update an existing exam
- `DELETE /exams/:id`: Delete an exam

- `POST /exams/:examId/questions`: Create a new question for an exam
- `PUT /exams/questions/:id`: Update an existing question
- `DELETE /exams/questions/:id`: Delete a question
- `POST /exams/:examId/questions/bulk`: Bulk create questions for an exam

## Authentication Flow

1. Admin users authenticate via `/auth/login` endpoint
2. Upon successful authentication, a JWT token is issued
3. This token must be included in the Authorization header for all protected endpoints
4. The JwtAuthGuard validates the token for protected routes

## Database Models

### Admin
- Stores admin user credentials
- Fields: id, username, password (hashed), createdAt, updatedAt

### Exam
- Represents a certification exam
- Fields: id, title, createdAt, updatedAt
- Relations: questions (one-to-many), results (one-to-many)

### Question
- Represents an exam question
- Fields: id, section, question, options, correct, explanation, category, examId, createdAt, updatedAt
- Relations: exam (many-to-one), answers (one-to-many)

### ExamResult
- Represents a completed exam attempt
- Fields: id, examId, score, totalQuestions, examMode, timeSpent, createdAt, updatedAt
- Relations: exam (many-to-one), questionAnswers (one-to-many)

### QuestionAnswer
- Represents an answer to a specific question in an exam attempt
- Fields: id, examResultId, questionId, selectedAnswer, isCorrect, timeSpent, createdAt, updatedAt
- Relations: examResult (many-to-one), question (many-to-one)

## Data Flow

1. **Exam Creation**:
   - Admin creates an exam via the admin interface
   - Admin adds questions to the exam (individually or in bulk)

2. **Exam Taking**:
   - User selects an exam from the frontend
   - Frontend fetches questions for the selected exam
   - User answers questions and submits the exam
   - Backend processes the answers, calculates the score, and stores the result

3. **Result Analysis**:
   - Frontend fetches exam results and statistics
   - Backend provides detailed analysis of performance

## Development Guidelines

### Adding a New Feature

1. Determine which module the feature belongs to (exams, auth, etc.)
2. Create any necessary DTOs in the appropriate dto/ directory
3. Add business logic in the relevant service
4. Expose endpoints in the relevant controller
5. Update the module file if necessary to import any new dependencies

### Database Changes

1. Modify the schema.prisma file
2. Run `npx prisma migrate dev --name <migration-name>` to generate a migration
3. Update any affected services to use the new schema

### Security Considerations

- All admin routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive information
- CORS is enabled for frontend access 