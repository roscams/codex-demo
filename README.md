# HLN News Website Clone

A news website similar to HLN.be, built with Next.js, Tailwind CSS, and Prisma.

## Project Structure

```
├── frontend/          # Public news website (port 3000)
├── backoffice/        # Admin CMS (port 3001)
└── shared/            # Shared database & Prisma schema
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Create database and apply schema
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Run development servers

```bash
# Run both frontend and backoffice
npm run dev

# Or run individually
npm run dev:frontend   # http://localhost:3000
npm run dev:backoffice # http://localhost:3001
```

## Demo Credentials

**Backoffice login:**
- Email: `admin@hln.be`
- Password: `admin123`

## Features

### Frontend (Public Website)
- Homepage with featured and breaking news
- Category pages (Nieuws, Sport, Showbizz, etc.)
- Article detail pages
- Search functionality
- Responsive design

### Backoffice (CMS)
- Dashboard with statistics
- Article management (create, edit, delete)
- Category management
- User management
- Media library (placeholder)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** SQLite (via Prisma)
- **Authentication:** JWT (jose)
- **Icons:** Lucide React
