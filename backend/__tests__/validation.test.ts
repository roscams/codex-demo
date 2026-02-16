import { describe, expect, it } from 'vitest';
import { articleSchema } from '../lib/validation';

describe('articleSchema', () => {
  it('accepts a valid payload', () => {
    const result = articleSchema.safeParse({
      title: 'Breaking update from Brussels',
      section: 'Nieuws',
      summary: 'This payload has enough text to be valid.',
      imageUrl: 'https://example.com/image.jpg',
      featured: true,
      publishedAt: '2025-01-01T00:00:00.000Z'
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid payload', () => {
    const result = articleSchema.safeParse({
      title: 'Bad',
      section: 'Invalid',
      summary: 'short',
      imageUrl: 'not-an-url',
      featured: true,
      publishedAt: 'invalid-date'
    });

    expect(result.success).toBe(false);
  });
});
