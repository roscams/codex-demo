import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { HomepageContent } from './components/HomepageContent';
import { fetchArticles, groupBySection } from './lib/articles';
import { buildHomepageLayout } from './lib/layout';
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

  const layout = useMemo(() => buildHomepageLayout(articles), [articles]);
  const grouped = useMemo(() => groupBySection(articles), [articles]);

  return (
    <div className="min-h-screen bg-[#ececec] text-gray-900">
      <Header />
      <HeroBanner />

      {error ? <p className="mx-auto mt-4 max-w-[1280px] rounded-md bg-red-100 p-4 text-red-700">{error}</p> : null}

      <HomepageContent
        featured={layout.featured}
        secondaryStories={layout.secondaryStories}
        liveUpdates={layout.liveUpdates}
      />

      <section className="mx-auto mb-10 max-w-[1280px] px-4">
        <h2 className="mb-4 inline-block bg-[#e30613] px-4 py-2 text-xl font-bold uppercase text-white">Meer nieuws</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {Object.entries(grouped).map(([section, sectionArticles]) => (
            <article key={section} className="rounded bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-[#e30613]">{section}</h3>
              <ul className="space-y-2">
                {sectionArticles.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-sm font-semibold text-blue-700">
                    {item.title}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
