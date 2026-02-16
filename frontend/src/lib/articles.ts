import type { Article } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/api/articles`, {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Unable to load articles from backend.');
  }

  return (await response.json()) as Article[];
};

export const groupBySection = (articles: Article[]): Record<string, Article[]> =>
  articles.reduce<Record<string, Article[]>>((groups, article) => {
    groups[article.section] = groups[article.section] ?? [];
    groups[article.section].push(article);
    return groups;
  }, {});
