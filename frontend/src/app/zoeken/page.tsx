import { searchArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: searchParams.q ? `Zoeken: ${searchParams.q} - HLN` : 'Zoeken - HLN',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const articles = query ? await searchArticles(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Zoeken</h1>

        {/* Search form */}
        <form action="/zoeken" method="GET" className="max-w-xl">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Zoek artikels..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hln-red focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-hln-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Zoeken
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {query && (
        <div>
          <p className="text-gray-600 mb-6">
            {articles.length} resultaten voor &ldquo;{query}&rdquo;
          </p>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Geen artikels gevonden voor &ldquo;{query}&rdquo;.
              </p>
              <p className="text-gray-400 mt-2">
                Probeer andere zoektermen of blader door onze categorieën.
              </p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            Voer een zoekterm in om artikels te vinden.
          </p>
        </div>
      )}
    </div>
  );
}
