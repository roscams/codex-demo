import { describe, expect, it } from 'vitest';
import { buildHomepageLayout, toTimeLabel } from '../lib/layout';

const articles = [
  {
    id: '1',
    title: 'Feature',
    section: 'Nieuws' as const,
    summary: 'summary text long enough',
    imageUrl: 'https://example.com/1.jpg',
    featured: true,
    publishedAt: '2025-01-01T09:10:00.000Z'
  },
  {
    id: '2',
    title: 'Second',
    section: 'Sport' as const,
    summary: 'summary text long enough',
    imageUrl: 'https://example.com/2.jpg',
    featured: false,
    publishedAt: '2025-01-01T09:20:00.000Z'
  },
  {
    id: '3',
    title: 'Third',
    section: 'Tech' as const,
    summary: 'summary text long enough',
    imageUrl: 'https://example.com/3.jpg',
    featured: false,
    publishedAt: '2025-01-01T09:30:00.000Z'
  }
];

describe('buildHomepageLayout', () => {
  it('returns featured, secondary, and live update buckets', () => {
    const layout = buildHomepageLayout(articles);

    expect(layout.featured?.id).toBe('1');
    expect(layout.secondaryStories.map((story) => story.id)).toEqual(['2', '3']);
    expect(layout.liveUpdates).toHaveLength(0);
  });

  it('falls back to first story when no item is featured', () => {
    const withoutFeatured = articles.map((article) => ({ ...article, featured: false }));
    const layout = buildHomepageLayout(withoutFeatured);

    expect(layout.featured?.id).toBe('1');
  });
});

describe('toTimeLabel', () => {
  it('formats timestamp to HH:mm', () => {
    expect(toTimeLabel('2025-01-01T09:07:00.000Z')).toMatch(/^\d{2}:\d{2}$/);
  });
});
