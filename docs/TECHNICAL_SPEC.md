# Technical Specification: HLN News Website

**Version:** 1.0
**Date:** February 2026
**Project:** HLN-style News Website Clone

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Technology Stack](#2-technology-stack)
3. [Database Schema](#3-database-schema)
4. [API Design](#4-api-design)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Backend Architecture](#7-backend-architecture)
8. [Real-time Features](#8-real-time-features)
9. [Caching Strategy](#9-caching-strategy)
10. [Search Implementation](#10-search-implementation)
11. [Media Handling](#11-media-handling)
12. [Security Considerations](#12-security-considerations)
13. [Performance Requirements](#13-performance-requirements)
14. [Deployment Architecture](#14-deployment-architecture)
15. [Monitoring & Logging](#15-monitoring--logging)
16. [Testing Strategy](#16-testing-strategy)

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENTS                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Browser   │  │   Mobile    │  │     PWA     │                 │
│  │  (Desktop)  │  │  (Browsers) │  │             │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
└─────────┼────────────────┼────────────────┼─────────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CDN (Vercel Edge / Cloudflare)               │
│                     Static Assets, Image Optimization               │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    Frontend     │   │    Backoffice   │   │   API Routes    │
│   (Next.js)     │   │   (Next.js)     │   │   (Next.js)     │
│   Port: 3000    │   │   Port: 3001    │   │                 │
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Shared Services Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Prisma     │  │    Redis     │  │  WebSocket   │              │
│  │    ORM       │  │   (Cache)    │  │   Server     │              │
│  └──────┬───────┘  └──────────────┘  └──────────────┘              │
└─────────┼───────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Layer                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  PostgreSQL  │  │ File Storage │  │   Search     │              │
│  │  (Primary)   │  │ (S3/R2)      │  │  (Algolia)   │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Component Overview

| Component | Purpose | Technology |
|-----------|---------|------------|
| Frontend | Public news website | Next.js 14 (App Router) |
| Backoffice | Admin CMS | Next.js 14 (App Router) |
| API | REST endpoints | Next.js API Routes |
| Database | Data persistence | PostgreSQL / SQLite |
| Cache | Performance optimization | Redis / Vercel KV |
| Search | Full-text search | Algolia / Meilisearch |
| Storage | Media files | S3 / Cloudflare R2 |
| CDN | Asset delivery | Vercel Edge / Cloudflare |

### 1.3 Data Flow

```
User Request → CDN → Next.js Server → Cache Check
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
              Cache Hit                                   Cache Miss
                    │                                           │
                    ▼                                           ▼
              Return Cached                            Query Database
                                                              │
                                                              ▼
                                                       Update Cache
                                                              │
                                                              ▼
                                                       Return Response
```

---

## 2. Technology Stack

### 2.1 Core Technologies

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| **Runtime** | Node.js | 20 LTS | Stable, performant, ecosystem |
| **Framework** | Next.js | 14.x | SSR, SSG, API routes, App Router |
| **Language** | TypeScript | 5.x | Type safety, better DX |
| **Styling** | Tailwind CSS | 3.x | Utility-first, rapid development |
| **Database** | PostgreSQL | 16 | Robust, scalable, full-text search |
| **ORM** | Prisma | 5.x | Type-safe queries, migrations |
| **Auth** | jose + bcrypt | - | JWT handling, password hashing |

### 2.2 Frontend Dependencies

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.300.0",
    "date-fns": "^3.0.0",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@tanstack/react-query": "^5.17.0",
    "next-themes": "^0.2.1",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0"
  }
}
```

### 2.3 Backend Dependencies

```json
{
  "dependencies": {
    "@prisma/client": "^5.8.0",
    "jose": "^5.2.0",
    "bcrypt": "^5.1.0",
    "sharp": "^0.33.0",
    "nodemailer": "^6.9.0",
    "ioredis": "^5.3.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "prisma": "^5.8.0",
    "@types/bcrypt": "^5.0.0",
    "@types/nodemailer": "^6.4.0"
  }
}
```

### 2.4 Third-Party Services

| Service | Purpose | Alternative |
|---------|---------|-------------|
| Vercel | Hosting, Edge functions | Railway, Fly.io |
| Cloudflare R2 | Media storage | AWS S3, Backblaze B2 |
| Algolia | Search | Meilisearch (self-hosted) |
| Resend | Email delivery | SendGrid, Postmark |
| Stripe | Payments | Mollie (Belgium) |
| Sentry | Error tracking | LogRocket |
| Vercel Analytics | Web analytics | Plausible, Fathom |

---

## 3. Database Schema

### 3.1 Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER MODELS
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String
  avatar        String?
  bio           String?   @db.Text
  role          UserRole  @default(READER)
  status        UserStatus @default(ACTIVE)
  emailVerified DateTime?

  // Preferences
  preferences   Json      @default("{}")

  // Relations
  articles      Article[]
  comments      Comment[]
  savedArticles SavedArticle[]
  notifications Notification[]
  sessions      Session[]

  // Audit
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?

  @@index([email])
  @@index([role])
}

enum UserRole {
  READER
  JOURNALIST
  EDITOR
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  userAgent String?
  ipAddress String?
  createdAt DateTime @default(now())

  @@index([token])
  @@index([userId])
}

// ============================================
// CONTENT MODELS
// ============================================

model Article {
  id            String        @id @default(cuid())
  slug          String
  title         String        @db.VarChar(200)
  excerpt       String        @db.VarChar(500)
  content       String        @db.Text

  // Media
  image         String?
  imageCaption  String?
  gallery       Json?         // Array of image URLs
  videoUrl      String?

  // Metadata
  readingTime   Int           @default(0)
  wordCount     Int           @default(0)

  // Flags
  featured      Boolean       @default(false)
  breaking      Boolean       @default(false)
  premium       Boolean       @default(false)
  allowComments Boolean       @default(true)

  // Status
  status        ArticleStatus @default(DRAFT)

  // SEO
  metaTitle       String?     @db.VarChar(70)
  metaDescription String?     @db.VarChar(160)
  metaKeywords    String[]

  // Relations
  authorId      String
  author        User          @relation(fields: [authorId], references: [id])
  categoryId    String
  category      Category      @relation(fields: [categoryId], references: [id])
  tags          TagsOnArticles[]
  comments      Comment[]
  savedBy       SavedArticle[]
  views         ArticleView[]

  // Timestamps
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  publishedAt   DateTime?
  scheduledAt   DateTime?
  archivedAt    DateTime?

  @@unique([categoryId, slug])
  @@index([status])
  @@index([publishedAt])
  @@index([featured])
  @@index([breaking])
  @@index([authorId])
  @@index([categoryId])
}

enum ArticleStatus {
  DRAFT
  PENDING_REVIEW
  PUBLISHED
  ARCHIVED
}

model Category {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  color       String     @default("#E31837")
  icon        String?
  sortOrder   Int        @default(0)

  // Hierarchy
  parentId    String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")

  // Relations
  articles    Article[]

  // Audit
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([slug])
  @@index([parentId])
}

model Tag {
  id        String           @id @default(cuid())
  name      String           @unique
  slug      String           @unique
  articles  TagsOnArticles[]
  createdAt DateTime         @default(now())

  @@index([slug])
}

model TagsOnArticles {
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  tagId     String
  tag       Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([articleId, tagId])
}

// ============================================
// ENGAGEMENT MODELS
// ============================================

model Comment {
  id        String        @id @default(cuid())
  content   String        @db.VarChar(2000)
  status    CommentStatus @default(PENDING)

  // Relations
  authorId  String
  author    User          @relation(fields: [authorId], references: [id])
  articleId String
  article   Article       @relation(fields: [articleId], references: [id], onDelete: Cascade)

  // Threading
  parentId  String?
  parent    Comment?      @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[]     @relation("CommentReplies")

  // Voting
  likes     Int           @default(0)
  dislikes  Int           @default(0)
  votes     CommentVote[]

  // Reports
  reports   CommentReport[]

  // Audit
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  editedAt  DateTime?

  @@index([articleId])
  @@index([authorId])
  @@index([status])
  @@index([parentId])
}

enum CommentStatus {
  PENDING
  APPROVED
  REJECTED
  SPAM
}

model CommentVote {
  id        String   @id @default(cuid())
  userId    String
  commentId String
  comment   Comment  @relation(fields: [commentId], references: [id], onDelete: Cascade)
  value     Int      // 1 for like, -1 for dislike
  createdAt DateTime @default(now())

  @@unique([userId, commentId])
}

model CommentReport {
  id        String   @id @default(cuid())
  userId    String
  commentId String
  comment   Comment  @relation(fields: [commentId], references: [id], onDelete: Cascade)
  reason    String
  createdAt DateTime @default(now())

  @@unique([userId, commentId])
}

model SavedArticle {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, articleId])
  @@index([userId])
}

// ============================================
// ANALYTICS MODELS
// ============================================

model ArticleView {
  id         String   @id @default(cuid())
  articleId  String
  article    Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  sessionId  String?
  userId     String?
  ipHash     String?  // Hashed for privacy
  userAgent  String?
  referrer   String?
  createdAt  DateTime @default(now())

  @@index([articleId])
  @@index([createdAt])
}

// ============================================
// NEWSLETTER MODELS
// ============================================

model Newsletter {
  id            String             @id @default(cuid())
  email         String             @unique
  status        NewsletterStatus   @default(PENDING)
  preferences   Json               @default("{}")

  // Verification
  verifyToken   String?
  verifiedAt    DateTime?

  // Audit
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  unsubscribedAt DateTime?

  @@index([email])
  @@index([status])
}

enum NewsletterStatus {
  PENDING
  ACTIVE
  UNSUBSCRIBED
}

// ============================================
// MEDIA MODELS
// ============================================

model Media {
  id          String    @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int
  url         String
  thumbnailUrl String?

  // Metadata
  width       Int?
  height      Int?
  alt         String?
  caption     String?

  // Organization
  folder      String    @default("uploads")

  // Relations
  uploadedBy  String

  // Audit
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([folder])
  @@index([uploadedBy])
  @@index([mimeType])
}

// ============================================
// NOTIFICATION MODELS
// ============================================

model Notification {
  id        String           @id @default(cuid())
  userId    String
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      NotificationType
  title     String
  message   String
  link      String?
  read      Boolean          @default(false)
  createdAt DateTime         @default(now())

  @@index([userId])
  @@index([read])
}

enum NotificationType {
  COMMENT_REPLY
  ARTICLE_PUBLISHED
  BREAKING_NEWS
  SYSTEM
}

// ============================================
// SUBSCRIPTION MODELS
// ============================================

model Subscription {
  id              String             @id @default(cuid())
  userId          String             @unique
  stripeCustomerId String?
  stripePriceId   String?
  stripeSubscriptionId String?
  status          SubscriptionStatus @default(INACTIVE)
  plan            String             @default("free")

  // Billing
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  cancelAtPeriodEnd  Boolean          @default(false)

  // Metered access
  premiumArticlesRead Int             @default(0)
  premiumArticlesLimit Int            @default(2)

  // Audit
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  @@index([userId])
  @@index([stripeCustomerId])
}

enum SubscriptionStatus {
  INACTIVE
  ACTIVE
  PAST_DUE
  CANCELLED
}
```

### 3.2 Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────┐
│      User        │       │    Category      │
├──────────────────┤       ├──────────────────┤
│ id               │       │ id               │
│ email            │       │ name             │
│ password         │──┐    │ slug             │
│ name             │  │    │ color            │
│ role             │  │    │ parentId ────────┼──┐
│ ...              │  │    │ ...              │  │
└────────┬─────────┘  │    └────────┬─────────┘  │
         │            │             │            │
         │ 1:N        │             │ 1:N        │
         ▼            │             ▼            │
┌──────────────────┐  │    ┌──────────────────┐  │
│     Article      │  │    │   Subcategory    │◄─┘
├──────────────────┤  │    └──────────────────┘
│ id               │  │
│ slug             │◄─┘
│ title            │       ┌──────────────────┐
│ content          │       │       Tag        │
│ authorId ────────┼──────►├──────────────────┤
│ categoryId ──────┼───────│ id               │
│ ...              │   N:M │ name             │
└────────┬─────────┘◄──────│ slug             │
         │                 └──────────────────┘
         │ 1:N
         ▼
┌──────────────────┐       ┌──────────────────┐
│     Comment      │       │   SavedArticle   │
├──────────────────┤       ├──────────────────┤
│ id               │       │ userId           │
│ content          │       │ articleId        │
│ authorId         │       │ ...              │
│ articleId        │       └──────────────────┘
│ parentId (self)  │
│ ...              │
└──────────────────┘
```

---

## 4. API Design

### 4.1 API Conventions

**Base URLs:**
- Frontend API: `/api/...`
- Backoffice API: `/api/admin/...`

**Response Format:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

**HTTP Status Codes:**
| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

### 4.2 Public API Endpoints

#### Articles

```
GET /api/articles
  Query: ?category=sport&limit=20&page=1&featured=true&breaking=true
  Response: { success: true, data: Article[], meta: Pagination }

GET /api/articles/:slug
  Response: { success: true, data: Article }

GET /api/articles/:slug/related
  Response: { success: true, data: Article[] }
```

#### Categories

```
GET /api/categories
  Response: { success: true, data: Category[] }

GET /api/categories/:slug
  Response: { success: true, data: Category }

GET /api/categories/:slug/articles
  Query: ?limit=20&page=1
  Response: { success: true, data: Article[], meta: Pagination }
```

#### Search

```
GET /api/search
  Query: ?q=searchterm&category=sport&from=2024-01-01&limit=20
  Response: { success: true, data: Article[], meta: Pagination }

GET /api/search/suggestions
  Query: ?q=partial
  Response: { success: true, data: string[] }
```

#### Comments

```
GET /api/articles/:slug/comments
  Query: ?sort=newest&limit=20&page=1
  Response: { success: true, data: Comment[], meta: Pagination }

POST /api/articles/:slug/comments
  Auth: Required
  Body: { content: string, parentId?: string }
  Response: { success: true, data: Comment }

PATCH /api/comments/:id
  Auth: Required (owner)
  Body: { content: string }
  Response: { success: true, data: Comment }

DELETE /api/comments/:id
  Auth: Required (owner or editor)
  Response: { success: true }

POST /api/comments/:id/vote
  Auth: Required
  Body: { value: 1 | -1 }
  Response: { success: true }

POST /api/comments/:id/report
  Auth: Required
  Body: { reason: string }
  Response: { success: true }
```

#### User

```
POST /api/auth/register
  Body: { email, password, name }
  Response: { success: true, data: { user, token } }

POST /api/auth/login
  Body: { email, password }
  Response: { success: true, data: { user, token } }

POST /api/auth/logout
  Auth: Required
  Response: { success: true }

GET /api/user/profile
  Auth: Required
  Response: { success: true, data: User }

PATCH /api/user/profile
  Auth: Required
  Body: { name?, avatar?, preferences? }
  Response: { success: true, data: User }

GET /api/user/saved-articles
  Auth: Required
  Response: { success: true, data: Article[] }

POST /api/user/saved-articles/:articleId
  Auth: Required
  Response: { success: true }

DELETE /api/user/saved-articles/:articleId
  Auth: Required
  Response: { success: true }
```

#### Newsletter

```
POST /api/newsletter/subscribe
  Body: { email, preferences? }
  Response: { success: true }

POST /api/newsletter/verify
  Body: { token }
  Response: { success: true }

POST /api/newsletter/unsubscribe
  Body: { email, token }
  Response: { success: true }
```

### 4.3 Admin API Endpoints

#### Articles Management

```
GET /api/admin/articles
  Auth: Required (journalist+)
  Query: ?status=draft&author=me&limit=20&page=1
  Response: { success: true, data: Article[], meta: Pagination }

POST /api/admin/articles
  Auth: Required (journalist+)
  Body: ArticleCreateInput
  Response: { success: true, data: Article }

GET /api/admin/articles/:id
  Auth: Required (journalist+)
  Response: { success: true, data: Article }

PATCH /api/admin/articles/:id
  Auth: Required (author or editor+)
  Body: ArticleUpdateInput
  Response: { success: true, data: Article }

DELETE /api/admin/articles/:id
  Auth: Required (editor+)
  Response: { success: true }

POST /api/admin/articles/:id/publish
  Auth: Required (editor+)
  Response: { success: true, data: Article }

POST /api/admin/articles/:id/unpublish
  Auth: Required (editor+)
  Response: { success: true, data: Article }
```

#### Media Management

```
GET /api/admin/media
  Auth: Required (journalist+)
  Query: ?type=image&folder=uploads&limit=50
  Response: { success: true, data: Media[], meta: Pagination }

POST /api/admin/media/upload
  Auth: Required (journalist+)
  Body: FormData (file)
  Response: { success: true, data: Media }

DELETE /api/admin/media/:id
  Auth: Required (editor+)
  Response: { success: true }
```

#### Users Management

```
GET /api/admin/users
  Auth: Required (admin)
  Query: ?role=journalist&status=active
  Response: { success: true, data: User[], meta: Pagination }

POST /api/admin/users
  Auth: Required (admin)
  Body: UserCreateInput
  Response: { success: true, data: User }

PATCH /api/admin/users/:id
  Auth: Required (admin)
  Body: UserUpdateInput
  Response: { success: true, data: User }

DELETE /api/admin/users/:id
  Auth: Required (admin)
  Response: { success: true }
```

#### Comment Moderation

```
GET /api/admin/comments
  Auth: Required (editor+)
  Query: ?status=pending&limit=50
  Response: { success: true, data: Comment[], meta: Pagination }

PATCH /api/admin/comments/:id/approve
  Auth: Required (editor+)
  Response: { success: true }

PATCH /api/admin/comments/:id/reject
  Auth: Required (editor+)
  Response: { success: true }
```

#### Analytics

```
GET /api/admin/analytics/overview
  Auth: Required (journalist+)
  Query: ?from=2024-01-01&to=2024-01-31
  Response: { success: true, data: AnalyticsOverview }

GET /api/admin/analytics/articles/:id
  Auth: Required (journalist+)
  Response: { success: true, data: ArticleAnalytics }
```

### 4.4 Request/Response Examples

**Create Article Request:**
```typescript
POST /api/admin/articles
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Club Brugge wint met 3-0",
  "excerpt": "Club Brugge heeft vanavond met overtuigende cijfers...",
  "content": "<p>Club Brugge heeft vanavond...</p>",
  "categoryId": "clr1234567890",
  "tags": ["voetbal", "club-brugge", "jupiler-pro-league"],
  "image": "https://cdn.example.com/images/article.jpg",
  "featured": false,
  "breaking": false,
  "premium": false,
  "status": "DRAFT",
  "metaDescription": "Club Brugge won tonight with convincing figures..."
}
```

**Create Article Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "clr9876543210",
    "slug": "club-brugge-wint-met-3-0",
    "title": "Club Brugge wint met 3-0",
    "excerpt": "Club Brugge heeft vanavond met overtuigende cijfers...",
    "content": "<p>Club Brugge heeft vanavond...</p>",
    "image": "https://cdn.example.com/images/article.jpg",
    "readingTime": 3,
    "wordCount": 450,
    "featured": false,
    "breaking": false,
    "premium": false,
    "status": "DRAFT",
    "author": {
      "id": "clr1111111111",
      "name": "Tom Janssen",
      "avatar": "https://cdn.example.com/avatars/tom.jpg"
    },
    "category": {
      "id": "clr2222222222",
      "name": "Sport",
      "slug": "sport",
      "color": "#22C55E"
    },
    "tags": [
      { "id": "clr3333", "name": "voetbal", "slug": "voetbal" }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "publishedAt": null
  }
}
```

---

## 5. Authentication & Authorization

### 5.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      LOGIN FLOW                                  │
└─────────────────────────────────────────────────────────────────┘

User                    Frontend                   Backend
  │                         │                          │
  │ Submit credentials      │                          │
  │ ──────────────────────► │                          │
  │                         │ POST /api/auth/login     │
  │                         │ ────────────────────────►│
  │                         │                          │ Validate credentials
  │                         │                          │ Generate JWT
  │                         │                          │ Create session
  │                         │    { token, user }       │
  │                         │ ◄────────────────────────│
  │                         │ Store token (httpOnly)   │
  │  Redirect to dashboard  │                          │
  │ ◄────────────────────── │                          │
```

### 5.2 JWT Implementation

```typescript
// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

export async function createToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### 5.3 Middleware Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/articles', '/media', '/users'];
const adminRoutes = ['/users', '/settings'];
const editorRoutes = ['/articles/approve', '/comments/moderate'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if route requires authentication
  const isProtected = protectedRoutes.some(route => path.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token
  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role-based access
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
  const isEditorRoute = editorRoutes.some(route => path.startsWith(route));

  if (isAdminRoute && payload.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isEditorRoute && !['ADMIN', 'EDITOR'].includes(payload.role)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/articles/:path*', '/media/:path*', '/users/:path*']
};
```

### 5.4 Role-Based Access Control

```typescript
// lib/permissions.ts
type Permission =
  | 'articles:create'
  | 'articles:edit'
  | 'articles:edit:own'
  | 'articles:delete'
  | 'articles:publish'
  | 'comments:moderate'
  | 'users:manage'
  | 'settings:manage'
  | 'media:upload'
  | 'media:delete';

const rolePermissions: Record<UserRole, Permission[]> = {
  READER: [],
  JOURNALIST: [
    'articles:create',
    'articles:edit:own',
    'media:upload',
  ],
  EDITOR: [
    'articles:create',
    'articles:edit',
    'articles:delete',
    'articles:publish',
    'comments:moderate',
    'media:upload',
    'media:delete',
  ],
  ADMIN: [
    'articles:create',
    'articles:edit',
    'articles:delete',
    'articles:publish',
    'comments:moderate',
    'users:manage',
    'settings:manage',
    'media:upload',
    'media:delete',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function requirePermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
}
```

---

## 6. Frontend Architecture

### 6.1 Project Structure

```
frontend/
├── src/
│   ├── app/                      # App Router pages
│   │   ├── (public)/            # Public routes group
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx     # Category page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Article page
│   │   │   ├── zoeken/
│   │   │   │   └── page.tsx     # Search page
│   │   │   └── video/
│   │   │       └── page.tsx     # Video section
│   │   ├── (auth)/              # Auth routes group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── profiel/             # User profile (protected)
│   │   │   ├── page.tsx
│   │   │   ├── opgeslagen/
│   │   │   └── instellingen/
│   │   ├── api/                 # API routes
│   │   │   ├── articles/
│   │   │   ├── auth/
│   │   │   ├── comments/
│   │   │   └── search/
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   └── error.tsx
│   │
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── articles/            # Article components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleGrid.tsx
│   │   │   ├── ArticleContent.tsx
│   │   │   ├── FeaturedArticle.tsx
│   │   │   └── RelatedArticles.tsx
│   │   ├── comments/            # Comment components
│   │   │   ├── CommentSection.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   ├── CommentCard.tsx
│   │   │   └── CommentThread.tsx
│   │   ├── widgets/             # Reusable widgets
│   │   │   ├── BreakingNews.tsx
│   │   │   ├── TrendingList.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── SocialShare.tsx
│   │   │   └── SearchBar.tsx
│   │   └── providers/           # Context providers
│   │       ├── AuthProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── QueryProvider.tsx
│   │
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   ├── db.ts                # Database queries
│   │   ├── auth.ts              # Auth utilities
│   │   ├── utils.ts             # Helper functions
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useArticles.ts
│   │   ├── useComments.ts
│   │   ├── useSearch.ts
│   │   └── useInfiniteScroll.ts
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   │
│   └── types/
│       ├── article.ts
│       ├── user.ts
│       ├── comment.ts
│       └── api.ts
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── manifest.json
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

### 6.2 Component Hierarchy

```
<RootLayout>
  <AuthProvider>
    <QueryProvider>
      <ThemeProvider>
        <Header />
        <main>
          {children}  <!-- Page content -->
        </main>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  </AuthProvider>
</RootLayout>
```

### 6.3 State Management

**Server State (React Query):**
```typescript
// hooks/useArticles.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export function useArticles(options?: ArticleQueryOptions) {
  return useQuery({
    queryKey: ['articles', options],
    queryFn: () => fetchArticles(options),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useInfiniteArticles(category?: string) {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', category],
    queryFn: ({ pageParam = 1 }) =>
      fetchArticles({ category, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages
        ? lastPage.meta.page + 1
        : undefined,
  });
}
```

**Client State (Zustand):**
```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        const { user, token } = await api.login(email, password);
        set({ user, isLoading: false });
      },
      logout: async () => {
        await api.logout();
        set({ user: null });
      },
      updateUser: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    { name: 'auth-store' }
  )
);
```

### 6.4 Data Fetching Patterns

**Server Components (Default):**
```typescript
// app/[category]/page.tsx
export default async function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  const articles = await getArticlesByCategory(params.category);
  const category = await getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <CategoryHeader category={category} />
      <ArticleGrid articles={articles} />
    </div>
  );
}
```

**Client Components (Interactive):**
```typescript
// components/comments/CommentSection.tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function CommentSection({ articleId }: { articleId: string }) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => fetchComments(articleId),
  });

  const addComment = useMutation({
    mutationFn: (content: string) => postComment(articleId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', articleId]);
    },
  });

  if (isLoading) return <CommentsSkeleton />;

  return (
    <div>
      <CommentForm onSubmit={addComment.mutate} />
      <CommentList comments={comments} />
    </div>
  );
}
```

---

## 7. Backend Architecture

### 7.1 Backoffice Structure

```
backoffice/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   │   ├── page.tsx          # Dashboard overview
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx      # Article list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx  # Create article
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Edit article
│   │   │   ├── media/
│   │   │   │   └── page.tsx      # Media library
│   │   │   ├── categories/
│   │   │   │   └── page.tsx      # Category management
│   │   │   ├── comments/
│   │   │   │   └── page.tsx      # Comment moderation
│   │   │   ├── users/
│   │   │   │   └── page.tsx      # User management
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx      # Analytics dashboard
│   │   │   └── settings/
│   │   │       └── page.tsx      # System settings
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── articles/
│   │   │   ├── media/
│   │   │   ├── users/
│   │   │   └── analytics/
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── TrafficChart.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── articles/
│   │   │   ├── ArticleForm.tsx
│   │   │   ├── ArticleTable.tsx
│   │   │   └── ArticleEditor.tsx
│   │   ├── media/
│   │   │   ├── MediaGrid.tsx
│   │   │   ├── MediaUploader.tsx
│   │   │   └── ImageCropper.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── Breadcrumbs.tsx
│   │
│   └── lib/
│       ├── auth.ts
│       ├── db.ts
│       └── validations.ts
```

### 7.2 API Route Patterns

```typescript
// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, requirePermission } from '@/lib/auth';
import { articleCreateSchema } from '@/lib/validations';

// GET /api/articles
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');
  const category = searchParams.get('category');
  const status = searchParams.get('status');

  const where = {
    ...(category && { category: { slug: category } }),
    ...(status && { status: status as ArticleStatus }),
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true, color: true } },
      },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: articles,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// POST /api/articles
export async function POST(request: NextRequest) {
  // Authenticate
  const user = await requireAuth(request);
  requirePermission(user.role, 'articles:create');

  // Validate
  const body = await request.json();
  const validatedData = articleCreateSchema.parse(body);

  // Generate slug
  const slug = generateSlug(validatedData.title);

  // Calculate reading time
  const wordCount = countWords(validatedData.content);
  const readingTime = Math.ceil(wordCount / 200);

  // Create article
  const article = await prisma.article.create({
    data: {
      ...validatedData,
      slug,
      wordCount,
      readingTime,
      authorId: user.id,
    },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      category: { select: { id: true, name: true, slug: true, color: true } },
    },
  });

  return NextResponse.json({
    success: true,
    data: article,
  }, { status: 201 });
}
```

### 7.3 Service Layer

```typescript
// lib/services/articleService.ts
export class ArticleService {
  async create(data: ArticleCreateInput, userId: string): Promise<Article> {
    const slug = await this.generateUniqueSlug(data.title, data.categoryId);
    const wordCount = countWords(data.content);

    return prisma.article.create({
      data: {
        ...data,
        slug,
        wordCount,
        readingTime: Math.ceil(wordCount / 200),
        authorId: userId,
      },
    });
  }

  async publish(id: string): Promise<Article> {
    return prisma.article.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }

  async getRelated(articleId: string, limit = 5): Promise<Article[]> {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { tags: { include: { tag: true } } },
    });

    if (!article) return [];

    const tagIds = article.tags.map(t => t.tagId);

    return prisma.article.findMany({
      where: {
        id: { not: articleId },
        status: 'PUBLISHED',
        OR: [
          { categoryId: article.categoryId },
          { tags: { some: { tagId: { in: tagIds } } } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }

  private async generateUniqueSlug(title: string, categoryId: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.slugExists(slug, categoryId)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private async slugExists(slug: string, categoryId: string): Promise<boolean> {
    const existing = await prisma.article.findUnique({
      where: { categoryId_slug: { categoryId, slug } },
    });
    return !!existing;
  }
}
```

### 7.4 Validation Schemas

```typescript
// lib/validations.ts
import { z } from 'zod';

export const articleCreateSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(100),
  categoryId: z.string().cuid(),
  tags: z.array(z.string()).max(10).optional(),
  image: z.string().url().optional(),
  imageCaption: z.string().max(200).optional(),
  featured: z.boolean().default(false),
  breaking: z.boolean().default(false),
  premium: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  metaDescription: z.string().max(160).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const articleUpdateSchema = articleCreateSchema.partial();

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain uppercase, lowercase, and number'
  ),
  name: z.string().min(2).max(100),
  role: z.enum(['JOURNALIST', 'EDITOR', 'ADMIN']).default('JOURNALIST'),
});

export const commentSchema = z.object({
  content: z.string().min(1).max(2000),
  parentId: z.string().cuid().optional(),
});
```

---

## 8. Real-time Features

### 8.1 WebSocket Architecture

```typescript
// lib/websocket.ts
import { Server as WebSocketServer } from 'ws';

interface WebSocketMessage {
  type: 'BREAKING_NEWS' | 'ARTICLE_UPDATE' | 'COMMENT_NEW';
  payload: unknown;
}

class RealtimeService {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket> = new Map();

  constructor() {
    this.wss = new WebSocketServer({ port: 3002 });
    this.setupHandlers();
  }

  private setupHandlers() {
    this.wss.on('connection', (ws, req) => {
      const clientId = generateId();
      this.clients.set(clientId, ws);

      ws.on('close', () => {
        this.clients.delete(clientId);
      });
    });
  }

  broadcast(message: WebSocketMessage) {
    const data = JSON.stringify(message);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  notifyBreakingNews(article: Article) {
    this.broadcast({
      type: 'BREAKING_NEWS',
      payload: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        category: article.category.slug,
      },
    });
  }
}

export const realtimeService = new RealtimeService();
```

### 8.2 Server-Sent Events (Alternative)

```typescript
// app/api/events/route.ts
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection
      controller.enqueue(encoder.encode('event: connected\ndata: {}\n\n'));

      // Subscribe to events
      const unsubscribe = eventEmitter.on('breaking-news', (article) => {
        const data = JSON.stringify(article);
        controller.enqueue(encoder.encode(`event: breaking-news\ndata: ${data}\n\n`));
      });

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### 8.3 Client-Side Integration

```typescript
// hooks/useBreakingNews.ts
'use client';

import { useEffect, useState } from 'react';

export function useBreakingNews() {
  const [breakingNews, setBreakingNews] = useState<Article[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.addEventListener('breaking-news', (event) => {
      const article = JSON.parse(event.data);
      setBreakingNews(prev => [article, ...prev.slice(0, 4)]);
    });

    eventSource.onerror = () => {
      eventSource.close();
      // Reconnect after delay
      setTimeout(() => {
        // Reinitialize connection
      }, 5000);
    };

    return () => eventSource.close();
  }, []);

  return breakingNews;
}
```

---

## 9. Caching Strategy

### 9.1 Multi-Layer Caching

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Cache                         │
│            (Static assets, images - 1 year)              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      CDN Cache                           │
│         (HTML pages, ISR - varies by page)               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Redis Cache                           │
│     (API responses, sessions, computed data)             │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      Database                            │
│              (Source of truth)                           │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Next.js Caching

```typescript
// app/[category]/page.tsx

// Static page with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

// Or use on-demand revalidation
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(c => ({ category: c.slug }));
}
```

```typescript
// app/api/articles/route.ts

export async function GET(request: NextRequest) {
  // Cache API response
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### 9.3 Redis Caching Layer

```typescript
// lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 300
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch fresh data
  const data = await fetcher();

  // Store in cache
  await redis.setex(key, ttlSeconds, JSON.stringify(data));

  return data;
}

export async function invalidate(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

// Usage
export async function getTrendingArticles() {
  return cached(
    'trending:articles',
    async () => {
      return prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { views: { _count: 'desc' } },
        take: 10,
      });
    },
    300 // 5 minutes
  );
}
```

### 9.4 Cache Invalidation

```typescript
// lib/services/articleService.ts
import { invalidate } from '@/lib/cache';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function publishArticle(id: string) {
  const article = await prisma.article.update({
    where: { id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
    include: { category: true },
  });

  // Invalidate caches
  await invalidate('trending:*');
  await invalidate(`category:${article.category.slug}:*`);
  await invalidate(`article:${article.slug}`);

  // Revalidate Next.js pages
  revalidatePath('/');
  revalidatePath(`/${article.category.slug}`);
  revalidateTag('articles');

  return article;
}
```

---

## 10. Search Implementation

### 10.1 Algolia Integration

```typescript
// lib/search.ts
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
);

const articlesIndex = client.initIndex('articles');

// Configure index
articlesIndex.setSettings({
  searchableAttributes: [
    'title',
    'excerpt',
    'content',
    'author.name',
    'category.name',
    'tags.name',
  ],
  attributesForFaceting: [
    'category.slug',
    'tags.slug',
    'premium',
  ],
  ranking: [
    'desc(publishedAt)',
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom',
  ],
});

export async function indexArticle(article: Article) {
  await articlesIndex.saveObject({
    objectID: article.id,
    ...article,
    publishedAt: article.publishedAt?.getTime(),
  });
}

export async function removeArticle(id: string) {
  await articlesIndex.deleteObject(id);
}

export async function searchArticles(
  query: string,
  options?: {
    category?: string;
    page?: number;
    hitsPerPage?: number;
  }
) {
  const filters = options?.category
    ? `category.slug:${options.category}`
    : '';

  return articlesIndex.search(query, {
    filters,
    page: options?.page ?? 0,
    hitsPerPage: options?.hitsPerPage ?? 20,
    attributesToHighlight: ['title', 'excerpt'],
  });
}
```

### 10.2 PostgreSQL Full-Text Search (Alternative)

```typescript
// lib/search.ts
import { prisma } from '@/lib/db';

export async function searchArticles(
  query: string,
  options?: {
    category?: string;
    page?: number;
    limit?: number;
  }
) {
  const { category, page = 1, limit = 20 } = options ?? {};

  // Use PostgreSQL full-text search
  const articles = await prisma.$queryRaw<Article[]>`
    SELECT
      a.*,
      ts_rank(
        to_tsvector('dutch', a.title || ' ' || a.excerpt || ' ' || a.content),
        plainto_tsquery('dutch', ${query})
      ) AS rank
    FROM "Article" a
    WHERE
      a.status = 'PUBLISHED'
      ${category ? Prisma.sql`AND a."categoryId" = ${category}` : Prisma.empty}
      AND to_tsvector('dutch', a.title || ' ' || a.excerpt || ' ' || a.content)
          @@ plainto_tsquery('dutch', ${query})
    ORDER BY rank DESC
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}
  `;

  return articles;
}
```

### 10.3 Search API Endpoint

```typescript
// app/api/search/route.ts
import { searchArticles } from '@/lib/search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') ?? '1');

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: false,
      error: { code: 'INVALID_QUERY', message: 'Query too short' },
    }, { status: 400 });
  }

  const results = await searchArticles(query, { category, page });

  return NextResponse.json({
    success: true,
    data: results.hits,
    meta: {
      query,
      page: results.page,
      totalPages: results.nbPages,
      total: results.nbHits,
    },
  });
}
```

---

## 11. Media Handling

### 11.1 Image Upload & Processing

```typescript
// lib/media.ts
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface ImageSizes {
  thumbnail: { width: 150, height: 150 };
  small: { width: 400, height: 300 };
  medium: { width: 800, height: 600 };
  large: { width: 1200, height: 900 };
  full: { width: 1920, height: 1080 };
}

export async function uploadImage(
  file: Buffer,
  filename: string,
  mimeType: string
): Promise<MediaUploadResult> {
  const id = generateId();
  const extension = mimeType.split('/')[1];

  // Process with Sharp
  const metadata = await sharp(file).metadata();

  // Generate sizes
  const sizes = await Promise.all(
    Object.entries(IMAGE_SIZES).map(async ([size, dims]) => {
      const processed = await sharp(file)
        .resize(dims.width, dims.height, { fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer();

      const key = `images/${id}/${size}.webp`;

      await s3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: processed,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
      }));

      return { size, url: `${process.env.CDN_URL}/${key}` };
    })
  );

  // Save to database
  const media = await prisma.media.create({
    data: {
      id,
      filename: `${id}.webp`,
      originalName: filename,
      mimeType: 'image/webp',
      size: file.length,
      url: sizes.find(s => s.size === 'large')!.url,
      thumbnailUrl: sizes.find(s => s.size === 'thumbnail')!.url,
      width: metadata.width,
      height: metadata.height,
      uploadedBy: userId,
    },
  });

  return {
    media,
    sizes: Object.fromEntries(sizes.map(s => [s.size, s.url])),
  };
}
```

### 11.2 Image Optimization with Next.js

```typescript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

```typescript
// components/ArticleImage.tsx
import Image from 'next/image';

export function ArticleImage({
  src,
  alt,
  priority = false
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      priority={priority}
      className="object-cover"
    />
  );
}
```

### 11.3 Video Handling

```typescript
// lib/video.ts
export async function processVideo(
  file: Buffer,
  filename: string
): Promise<VideoUploadResult> {
  const id = generateId();

  // Upload original to S3
  const originalKey = `videos/${id}/original.mp4`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: originalKey,
    Body: file,
    ContentType: 'video/mp4',
  }));

  // Generate thumbnail (using ffmpeg)
  const thumbnailBuffer = await generateThumbnail(file);
  const thumbnailKey = `videos/${id}/thumbnail.jpg`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: thumbnailKey,
    Body: thumbnailBuffer,
    ContentType: 'image/jpeg',
  }));

  // Get duration
  const duration = await getVideoDuration(file);

  // Save to database
  const media = await prisma.media.create({
    data: {
      id,
      filename: `${id}.mp4`,
      originalName: filename,
      mimeType: 'video/mp4',
      size: file.length,
      url: `${process.env.CDN_URL}/${originalKey}`,
      thumbnailUrl: `${process.env.CDN_URL}/${thumbnailKey}`,
      uploadedBy: userId,
    },
  });

  return { media, duration };
}
```

---

## 12. Security Considerations

### 12.1 Input Validation

```typescript
// middleware/validation.ts
import { z } from 'zod';

export function validateBody<T extends z.ZodSchema>(schema: T) {
  return async (request: NextRequest): Promise<z.infer<T>> => {
    const body = await request.json();
    return schema.parse(body);
  };
}

// Sanitize HTML content
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id',
    ],
    ALLOW_DATA_ATTR: false,
  });
}
```

### 12.2 Rate Limiting

```typescript
// middleware/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true,
});

export async function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';

  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  return null; // Continue to handler
}
```

### 12.3 CSRF Protection

```typescript
// lib/csrf.ts
import { SignJWT, jwtVerify } from 'jose';

const CSRF_SECRET = new TextEncoder().encode(process.env.CSRF_SECRET);

export async function generateCsrfToken(): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(CSRF_SECRET);
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, CSRF_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Middleware
export async function csrfMiddleware(request: NextRequest) {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const token = request.headers.get('X-CSRF-Token');

    if (!token || !await verifyCsrfToken(token)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }

  return null;
}
```

### 12.4 Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://cdn.example.com;
      font-src 'self';
      connect-src 'self' https://api.example.com;
      frame-ancestors 'none';
    `.replace(/\n/g, ''),
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 12.5 SQL Injection Prevention

```typescript
// Always use Prisma's parameterized queries
// BAD - SQL Injection vulnerable
const articles = await prisma.$queryRawUnsafe(
  `SELECT * FROM Article WHERE title LIKE '%${userInput}%'`
);

// GOOD - Parameterized query
const articles = await prisma.$queryRaw`
  SELECT * FROM "Article"
  WHERE title LIKE ${`%${userInput}%`}
`;

// BEST - Use Prisma's built-in methods
const articles = await prisma.article.findMany({
  where: {
    title: { contains: userInput, mode: 'insensitive' },
  },
});
```

---

## 13. Performance Requirements

### 13.1 Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **FCP** | < 1.5s | First Contentful Paint |
| **TTFB** | < 600ms | Time to First Byte |
| **TTI** | < 3.5s | Time to Interactive |

### 13.2 Performance Optimizations

```typescript
// app/page.tsx
// Use Suspense for streaming SSR
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <BreakingNews />

      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedArticles />
      </Suspense>

      <Suspense fallback={<LatestSkeleton />}>
        <LatestArticles />
      </Suspense>
    </>
  );
}
```

```typescript
// components/ArticleCard.tsx
// Lazy load non-critical components
import dynamic from 'next/dynamic';

const SocialShare = dynamic(() => import('./SocialShare'), {
  loading: () => null,
  ssr: false,
});
```

### 13.3 Bundle Optimization

```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    // Bundle analyzer (dev only)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      );
    }
    return config;
  },
};
```

### 13.4 Database Performance

```typescript
// Optimize queries with select
const articles = await prisma.article.findMany({
  select: {
    id: true,
    slug: true,
    title: true,
    excerpt: true,
    image: true,
    publishedAt: true,
    readingTime: true,
    category: {
      select: {
        name: true,
        slug: true,
        color: true,
      },
    },
  },
  where: { status: 'PUBLISHED' },
  orderBy: { publishedAt: 'desc' },
  take: 20,
});

// Use connection pooling
// DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=10"
```

---

## 14. Deployment Architecture

### 14.1 Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL                                   │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │    Frontend     │  │   Backoffice    │                       │
│  │   (Edge/Node)   │  │     (Node)      │                       │
│  └────────┬────────┘  └────────┬────────┘                       │
│           │                    │                                 │
│           └─────────┬──────────┘                                │
│                     │                                            │
│           ┌─────────▼─────────┐                                 │
│           │   Vercel KV       │                                 │
│           │   (Redis Cache)   │                                 │
│           └───────────────────┘                                 │
└───────────────────────────────────────────────────────────────── │
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Neon       │ │ Cloudflare   │ │   Algolia    │
│ PostgreSQL   │ │     R2       │ │   Search     │
│  (Database)  │ │  (Storage)   │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 14.2 Environment Configuration

```bash
# .env.local (development)
DATABASE_URL="postgresql://localhost:5432/hln_dev"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="dev-secret-change-in-production"
CSRF_SECRET="dev-csrf-secret"

# Production (Vercel Environment Variables)
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."
JWT_SECRET="<secure-random-32-chars>"
CSRF_SECRET="<secure-random-32-chars>"

# Third-party services
ALGOLIA_APP_ID="..."
ALGOLIA_API_KEY="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET="hln-media-production"
CDN_URL="https://cdn.example.com"
RESEND_API_KEY="..."
STRIPE_SECRET_KEY="..."
```

### 14.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm run test
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 14.4 Database Migrations

```bash
# prisma/migrations workflow

# Development: Create migration
npx prisma migrate dev --name add_feature

# Production: Apply migrations
npx prisma migrate deploy

# Seed production data
npx prisma db seed
```

---

## 15. Monitoring & Logging

### 15.1 Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
```

```typescript
// lib/logger.ts
import * as Sentry from '@sentry/nextjs';

export function captureError(error: Error, context?: Record<string, any>) {
  console.error(error);
  Sentry.captureException(error, { extra: context });
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  Sentry.captureMessage(message, level);
}
```

### 15.2 Application Logging

```typescript
// lib/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export function logRequest(req: NextRequest, res: NextResponse, duration: number) {
  logger.info({
    method: req.method,
    url: req.url,
    status: res.status,
    duration: `${duration}ms`,
    userAgent: req.headers.get('user-agent'),
  });
}

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({
    message: error.message,
    stack: error.stack,
    ...context,
  });
}
```

### 15.3 Analytics

```typescript
// lib/analytics.ts
export function trackPageView(page: string) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', 'page_view', {
      page_path: page,
    });
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Usage
trackEvent('article_read', 'engagement', articleId);
trackEvent('comment_posted', 'engagement');
trackEvent('newsletter_signup', 'conversion');
```

### 15.4 Health Checks

```typescript
// app/api/health/route.ts
import { prisma } from '@/lib/db';
import { redis } from '@/lib/cache';

export async function GET() {
  const checks = {
    database: false,
    cache: false,
    timestamp: new Date().toISOString(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (e) {
    console.error('Database health check failed', e);
  }

  try {
    await redis.ping();
    checks.cache = true;
  } catch (e) {
    console.error('Cache health check failed', e);
  }

  const healthy = checks.database && checks.cache;

  return NextResponse.json(checks, {
    status: healthy ? 200 : 503,
  });
}
```

---

## 16. Testing Strategy

### 16.1 Testing Pyramid

```
         ┌─────────────┐
         │    E2E      │  ← 10% (Critical flows)
         │ (Playwright)│
         ├─────────────┤
         │ Integration │  ← 30% (API, DB)
         │   (Vitest)  │
         ├─────────────┤
         │    Unit     │  ← 60% (Components, Utils)
         │  (Vitest)   │
         └─────────────┘
```

### 16.2 Unit Testing

```typescript
// __tests__/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { slugify, calculateReadingTime, truncate } from '@/lib/utils';

describe('slugify', () => {
  it('converts title to URL-safe slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Café België')).toBe('cafe-belgie');
    expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });
});

describe('calculateReadingTime', () => {
  it('calculates reading time based on word count', () => {
    expect(calculateReadingTime(200)).toBe(1);
    expect(calculateReadingTime(400)).toBe(2);
    expect(calculateReadingTime(1000)).toBe(5);
  });
});
```

### 16.3 Component Testing

```typescript
// __tests__/components/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ArticleCard from '@/components/ArticleCard';

const mockArticle = {
  slug: 'test-article',
  title: 'Test Article Title',
  excerpt: 'This is a test excerpt',
  image: '/test.jpg',
  readingTime: 5,
  publishedAt: new Date('2024-01-15'),
  category: {
    name: 'Sport',
    slug: 'sport',
    color: '#22C55E',
  },
};

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
    expect(screen.getByText('Sport')).toBeInTheDocument();
    expect(screen.getByText('5 min')).toBeInTheDocument();
  });

  it('links to correct article URL', () => {
    render(<ArticleCard article={mockArticle} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/sport/test-article');
  });
});
```

### 16.4 API Integration Testing

```typescript
// __tests__/api/articles.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import { GET, POST } from '@/app/api/articles/route';

describe('Articles API', () => {
  describe('GET /api/articles', () => {
    it('returns paginated articles', async () => {
      const request = new Request('http://localhost/api/articles?limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeInstanceOf(Array);
      expect(data.meta).toHaveProperty('page');
      expect(data.meta).toHaveProperty('total');
    });

    it('filters by category', async () => {
      const request = new Request('http://localhost/api/articles?category=sport');
      const response = await GET(request);
      const data = await response.json();

      data.data.forEach((article: any) => {
        expect(article.category.slug).toBe('sport');
      });
    });
  });

  describe('POST /api/articles', () => {
    it('requires authentication', async () => {
      const request = new Request('http://localhost/api/articles', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test' }),
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
    });
  });
});
```

### 16.5 E2E Testing (Playwright)

```typescript
// e2e/article.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Article Reading', () => {
  test('user can read an article', async ({ page }) => {
    await page.goto('/');

    // Click on first article
    const firstArticle = page.locator('.article-card').first();
    const title = await firstArticle.locator('h3').textContent();
    await firstArticle.click();

    // Verify article page
    await expect(page.locator('h1')).toContainText(title);
    await expect(page.locator('.article-content')).toBeVisible();
  });

  test('user can search for articles', async ({ page }) => {
    await page.goto('/');

    // Open search
    await page.click('[data-testid="search-button"]');
    await page.fill('[data-testid="search-input"]', 'voetbal');
    await page.keyboard.press('Enter');

    // Verify results
    await expect(page).toHaveURL(/\/zoeken\?q=voetbal/);
    await expect(page.locator('.search-result')).toHaveCount(20);
  });

  test('user can comment on article', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('[type="submit"]');

    // Navigate to article
    await page.goto('/sport/test-article');

    // Post comment
    await page.fill('[data-testid="comment-input"]', 'Great article!');
    await page.click('[data-testid="submit-comment"]');

    // Verify comment appears
    await expect(page.locator('.comment').last()).toContainText('Great article!');
  });
});
```

### 16.6 Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Appendix A: API Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Appendix B: Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_articles_status_published ON "Article"(status, "publishedAt" DESC);
CREATE INDEX idx_articles_category ON "Article"("categoryId", "publishedAt" DESC);
CREATE INDEX idx_articles_featured ON "Article"(featured, "publishedAt" DESC) WHERE featured = true;
CREATE INDEX idx_comments_article ON "Comment"("articleId", "createdAt" DESC);
CREATE INDEX idx_article_views_date ON "ArticleView"("createdAt", "articleId");

-- Full-text search
CREATE INDEX idx_articles_search ON "Article" USING GIN(
  to_tsvector('dutch', title || ' ' || excerpt || ' ' || content)
);
```

## Appendix C: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 2026 | - | Initial technical specification |

---

*End of Technical Specification*
