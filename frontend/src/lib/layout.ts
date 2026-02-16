import type { Article } from '../types';

export interface HomepageLayout {
  featured: Article | null;
  secondaryStories: Article[];
  liveUpdates: Article[];
}

export const buildHomepageLayout = (articles: Article[]): HomepageLayout => {
  const featured = articles.find((article) => article.featured) ?? articles[0] ?? null;
  const remaining = featured ? articles.filter((article) => article.id !== featured.id) : [];

  return {
    featured,
    secondaryStories: remaining.slice(0, 2),
    liveUpdates: remaining.slice(2, 7)
  };
};

export const toTimeLabel = (iso: string): string => {
  const date = new Date(iso);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};
