import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(5),
  section: z.enum(['Nieuws', 'Sport', 'Showbizz', 'Tech']),
  summary: z.string().min(10),
  imageUrl: z.string().url(),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime()
});

export type ArticleInput = z.infer<typeof articleSchema>;
