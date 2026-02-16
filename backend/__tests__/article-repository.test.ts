import { mkdtemp, readFile, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, it } from 'vitest';
import { createArticle, listArticles, removeArticle, updateArticle } from '../lib/article-repository';

const seed = [
  {
    id: 'a1',
    title: 'Seed title one',
    section: 'Nieuws',
    summary: 'Seed summary long enough',
    imageUrl: 'https://example.com/seed.jpg',
    featured: true,
    publishedAt: '2025-01-01T00:00:00.000Z'
  }
];

const payload = {
  title: 'Created title from repository',
  section: 'Sport' as const,
  summary: 'Created summary is definitely long enough',
  imageUrl: 'https://example.com/created.jpg',
  featured: false,
  publishedAt: '2025-01-01T10:00:00.000Z'
};

let testFile = '';

beforeEach(async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'articles-test-'));
  testFile = path.join(dir, 'articles.json');
  await writeFile(testFile, JSON.stringify(seed, null, 2));
  process.env.ARTICLES_FILE_PATH = testFile;
});

describe('article-repository', () => {
  it('lists articles', async () => {
    const items = await listArticles();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('a1');
  });

  it('creates a new article', async () => {
    const created = await createArticle(payload);
    expect(created.title).toBe(payload.title);

    const saved = JSON.parse(await readFile(testFile, 'utf8')) as Array<{ id: string }>;
    expect(saved).toHaveLength(2);
    expect(saved[0].id).toBe(created.id);
  });

  it('updates an existing article', async () => {
    const updated = await updateArticle('a1', { ...payload, title: 'Updated title' });
    expect(updated?.title).toBe('Updated title');
  });

  it('removes an article', async () => {
    const removed = await removeArticle('a1');
    expect(removed).toBe(true);

    const saved = JSON.parse(await readFile(testFile, 'utf8')) as Array<{ id: string }>;
    expect(saved).toHaveLength(0);
  });
});
