import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export const dynamic = 'force-dynamic';

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export default async function NewArticlePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const categories = await getCategories();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nieuw artikel</h1>
        <p className="text-gray-600">Maak een nieuw artikel aan</p>
      </div>

      <ArticleForm categories={categories} authorId={session.id} />
    </div>
  );
}
