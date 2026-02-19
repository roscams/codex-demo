import { getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import BreakingNews from '@/components/BreakingNews';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featuredArticles, breakingArticles, latestArticles] = await Promise.all([
    getArticles({ featured: true, limit: 3 }),
    getArticles({ breaking: true, limit: 5 }),
    getArticles({ limit: 12 }),
  ]);

  const mainFeatured = featuredArticles[0];
  const sideFeatured = featuredArticles.slice(1, 3);
  const restArticles = latestArticles.filter(
    (a) => !featuredArticles.some((f) => f.id === a.id)
  );

  return (
    <>
      <BreakingNews articles={breakingArticles} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main featured article */}
            {mainFeatured && (
              <div className="lg:col-span-2">
                <ArticleCard article={mainFeatured} variant="featured" />
              </div>
            )}

            {/* Side featured articles */}
            <div className="space-y-6">
              {sideFeatured.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}

              {/* Trending section */}
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Trending</h3>
                <div className="space-y-4">
                  {latestArticles.slice(0, 4).map((article, index) => (
                    <div key={article.id} className="flex gap-3">
                      <span className="text-2xl font-bold text-hln-red">{index + 1}</span>
                      <a
                        href={`/${article.category.slug}/${article.slug}`}
                        className="text-sm font-medium text-gray-900 hover:text-hln-red transition-colors line-clamp-2"
                      >
                        {article.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Laatste nieuws</h2>
            <a href="/nieuws" className="text-hln-red hover:underline font-medium">
              Bekijk alles
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Category Sections */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sport section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-green-500 rounded"></span>
                Sport
              </h2>
              <a href="/sport" className="text-hln-red hover:underline text-sm font-medium">
                Meer sport
              </a>
            </div>
            <div className="space-y-4">
              {latestArticles
                .filter((a) => a.category.slug === 'sport')
                .slice(0, 3)
                .map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
            </div>
          </div>

          {/* Showbizz section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded"></span>
                Showbizz
              </h2>
              <a href="/showbizz" className="text-hln-red hover:underline text-sm font-medium">
                Meer showbizz
              </a>
            </div>
            <div className="space-y-4">
              {latestArticles
                .filter((a) => a.category.slug === 'showbizz')
                .slice(0, 3)
                .map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
