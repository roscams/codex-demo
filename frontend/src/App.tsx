import { useEffect, useMemo, useState } from 'react';
import { NewsCard } from './components/NewsCard';
import { fetchArticles, groupBySection } from './lib/articles';
import type { Article } from './types';

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setArticles(await fetchArticles());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error while loading news.');
      }
    };

    void load();
  }, []);

  const featured = useMemo(() => articles.find((article) => article.featured), [articles]);
  const grouped = useMemo(() => groupBySection(articles), [articles]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-brand text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-3xl font-black tracking-tight">HLN Clone</h1>
          <nav className="flex gap-4 text-sm font-semibold uppercase">
            <a href="#Nieuws">Nieuws</a>
            <a href="#Sport">Sport</a>
            <a href="#Showbizz">Showbizz</a>
            <a href="#Tech">Tech</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6">
        {error ? <p className="rounded-md bg-red-100 p-4 text-red-700">{error}</p> : null}

        {featured ? (
          <section className="overflow-hidden rounded-xl bg-white shadow-md">
            <img src={featured.imageUrl} alt={featured.title} className="h-80 w-full object-cover" />
            <div className="space-y-4 p-6">
              <span className="text-sm font-bold uppercase text-brand">Top story</span>
              <h2 className="text-3xl font-extrabold">{featured.title}</h2>
              <p className="text-gray-700">{featured.summary}</p>
            </div>
          </section>
        ) : null}

        {Object.entries(grouped).map(([section, sectionArticles]) => (
          <section key={section} id={section} className="space-y-4">
            <h2 className="border-l-4 border-brand pl-3 text-2xl font-bold">{section}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {sectionArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
