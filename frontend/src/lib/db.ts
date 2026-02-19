import { prisma } from 'shared';

export { prisma };

export async function getArticles(options?: {
  categorySlug?: string;
  limit?: number;
  featured?: boolean;
  breaking?: boolean;
}) {
  const where: Record<string, unknown> = {
    status: 'PUBLISHED',
  };

  if (options?.categorySlug) {
    where.category = { slug: options.categorySlug };
  }

  if (options?.featured !== undefined) {
    where.featured = options.featured;
  }

  if (options?.breaking !== undefined) {
    where.breaking = options.breaking;
  }

  return prisma.article.findMany({
    where,
    include: {
      category: true,
      author: {
        select: { name: true },
      },
    },
    orderBy: { publishedAt: 'desc' },
    take: options?.limit,
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      author: {
        select: { name: true, avatar: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function searchArticles(query: string) {
  return prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
      ],
    },
    include: {
      category: true,
      author: {
        select: { name: true },
      },
    },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });
}
