# HLN-inspired News Platform

This repository contains a two-app workspace:

- `frontend`: Public news website built with **React + Tailwind CSS**.
- `backend`: **Next.js** backend that serves article APIs and a backoffice interface.

## Features

### Public frontend
- HLN-inspired visual layout (red header, featured story, section blocks).
- Fetches articles from backend API.
- Groups stories by section (`Nieuws`, `Sport`, `Showbizz`, `Tech`).

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
│   └── lib
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

### Covered functionality
- Frontend data grouping utility (`groupBySection`).
- Backend article input validation (`articleSchema`).

## Maintainability notes

- Types are centralized in `frontend/src/types.ts` and `backend/lib/types.ts`.
- Validation is centralized in `backend/lib/validation.ts`.
- File-based repository logic is isolated in `backend/lib/article-repository.ts`.
- Presentation components are kept small (`NewsCard`) and composed in `App.tsx`.
