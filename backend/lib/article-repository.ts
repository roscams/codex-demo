import { promises as fs } from 'fs';
import path from 'path';
import type { Article } from './types';
import type { ArticleInput } from './validation';

const filePath = path.join(process.cwd(), 'data', 'articles.json');

const readAll = async (): Promise<Article[]> => {
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file) as Article[];
};

const writeAll = async (articles: Article[]) => {
  await fs.writeFile(filePath, JSON.stringify(articles, null, 2));
};

export const listArticles = async () => readAll();

export const createArticle = async (input: ArticleInput) => {
  const existing = await readAll();
  const created: Article = {
    id: crypto.randomUUID(),
    ...input
  };

  const updated = [created, ...existing];
  await writeAll(updated);
  return created;
};

export const updateArticle = async (id: string, input: ArticleInput) => {
  const existing = await readAll();
  const index = existing.findIndex((article) => article.id === id);

  if (index === -1) {
    return null;
  }

  const updatedArticle: Article = { id, ...input };
  existing[index] = updatedArticle;
  await writeAll(existing);

  return updatedArticle;
};

export const removeArticle = async (id: string) => {
  const existing = await readAll();
  const next = existing.filter((article) => article.id !== id);

  if (next.length === existing.length) {
    return false;
  }

  await writeAll(next);
  return true;
};
