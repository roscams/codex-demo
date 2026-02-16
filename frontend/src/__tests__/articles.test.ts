import { describe, expect, it } from 'vitest';
import { groupBySection } from '../lib/articles';

describe('groupBySection', () => {
  it('groups articles by section', () => {
    const grouped = groupBySection([
      {
        id: '1',
        title: 'A',
        section: 'Nieuws',
        summary: 'summary',
        imageUrl: 'image',
        featured: false,
        publishedAt: '2025-01-01'
      },
      {
        id: '2',
        title: 'B',
        section: 'Sport',
        summary: 'summary',
        imageUrl: 'image',
        featured: false,
        publishedAt: '2025-01-02'
      }
    ]);

    expect(grouped.Nieuws).toHaveLength(1);
    expect(grouped.Sport).toHaveLength(1);
  });
});
