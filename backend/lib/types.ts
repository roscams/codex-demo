export type Section = 'Nieuws' | 'Sport' | 'Showbizz' | 'Tech';

export interface Article {
  id: string;
  title: string;
  section: Section;
  summary: string;
  imageUrl: string;
  featured: boolean;
  publishedAt: string;
}
