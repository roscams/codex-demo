export * from '@prisma/client';

import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Resolve database path - find the shared package directory
function getDatabaseUrl(): string {
  const cwd = process.cwd();

  // Possible database locations in order of preference
  const possiblePaths = [
    path.resolve(cwd, 'shared/prisma/dev.db'),           // From root
    path.resolve(cwd, '../shared/prisma/dev.db'),         // From frontend/backoffice
    path.resolve(cwd, 'prisma/dev.db'),                   // From shared
  ];

  // Try require.resolve first (works in Node.js)
  try {
    const sharedPkgPath = require.resolve('shared/package.json');
    const sharedDir = path.dirname(sharedPkgPath);
    const dbPath = path.resolve(sharedDir, 'prisma', 'dev.db');
    if (fs.existsSync(dbPath)) {
      return `file:${dbPath}`;
    }
  } catch {
    // Ignore - fallback to checking paths
  }

  // Check each possible path
  for (const dbPath of possiblePaths) {
    if (fs.existsSync(dbPath)) {
      return `file:${dbPath}`;
    }
  }

  // Fallback to environment variable
  return process.env.DATABASE_URL || 'file:./prisma/dev.db';
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = getDatabaseUrl();
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
