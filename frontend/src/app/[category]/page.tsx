import { notFound } from 'next/navigation';
import { getArticles, getCategories } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);

  if (!category) {
    return { title: 'Categorie niet gevonden' };
  }

  return {
    title: `${category.name} - HLN`,
    description: category.description || `Het laatste ${category.name.toLowerCase()} nieuws`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const articles = await getArticles({ categorySlug: params.category });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-2 h-8 rounded"
            style={{ backgroundColor: category.color }}
          />
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        </div>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Geen artikels gevonden in deze categorie.
          </p>
        </div>
      )}
    </div>
  );
}
