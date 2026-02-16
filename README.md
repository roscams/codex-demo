# HLN-inspired News Platform

This repository contains a two-app workspace:

- `frontend`: Public news website built with **React + Tailwind CSS**.
- `backend`: **Next.js** backend that serves article APIs and a backoffice interface.

## What was improved

- Reworked the public UI to much more closely follow the provided HLN-like layout:
  - utility top bar
  - bold red primary navigation
  - secondary category bar
  - large promotional strip
  - three-column main content area (lead story, side stories, "Net Binnen" updates)
- Kept components small and maintainable (`Header`, `HeroBanner`, `HomepageContent`).
- Added layout-specific frontend utilities with dedicated unit tests.
- Expanded backend unit test coverage with CRUD tests for repository functionality.

## Features

### Public frontend
- HLN-inspired visual structure and color palette.
- Fetches articles from backend API.
- Computes homepage layout buckets (`featured`, `secondaryStories`, `liveUpdates`).
- Formats live update timestamps.

### Backoffice (Next.js)
- Read current articles.
- Add an article from a form.
- Delete articles.
- Data persisted in `backend/data/articles.json`.

## Project structure

```
.
├── backend
│   ├── app
│   │   ├── api/articles
│   │   └── backoffice
│   ├── data/articles.json
│   ├── lib
│   └── __tests__
└── frontend
    └── src
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start backend (port `3000`):
   ```bash
   npm run dev:backend
   ```
3. Start frontend (port `5173`):
   ```bash
   npm run dev:frontend
   ```

The frontend uses `http://localhost:3000` by default. Override via `frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000
```

## Testing

Run all unit tests:

```bash
npm test
```

### Frontend tests
- `groupBySection` behavior.
- homepage layout composition (`buildHomepageLayout`).
- time label formatting (`toTimeLabel`).

### Backend tests
- schema validation (`articleSchema`).
- repository CRUD (`listArticles`, `createArticle`, `updateArticle`, `removeArticle`).

## Maintainability notes

- Types are centralized in `frontend/src/types.ts` and `backend/lib/types.ts`.
- Validation is centralized in `backend/lib/validation.ts`.
- File-based repository logic is isolated in `backend/lib/article-repository.ts`.
- Frontend page composition is split into focused components.
