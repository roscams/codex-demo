import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export const dynamic = 'force-dynamic';

async function getArticle(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

interface EditArticlePageProps {
  searchParams: { id?: string };
}

export default async function EditArticlePage({ searchParams }: EditArticlePageProps) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (!searchParams.id) {
    redirect('/articles');
  }

  const [article, categories] = await Promise.all([
    getArticle(searchParams.id),
    getCategories(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Artikel bewerken</h1>
        <p className="text-gray-600">Bewerk het artikel</p>
      </div>

      <ArticleForm
        categories={categories}
        authorId={session.id}
        article={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          image: article.image,
          categoryId: article.categoryId,
          status: article.status,
          featured: article.featured,
          breaking: article.breaking,
          readingTime: article.readingTime,
        }}
      />
    </div>
  );
}
