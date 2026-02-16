import type { Article } from '../types';
import { toTimeLabel } from '../lib/layout';

interface HomepageContentProps {
  featured: Article | null;
  secondaryStories: Article[];
  liveUpdates: Article[];
}

export const HomepageContent = ({ featured, secondaryStories, liveUpdates }: HomepageContentProps) => (
  <main className="mx-auto mt-4 max-w-[1280px] px-4 pb-10">
    <div className="grid grid-cols-12 gap-4">
      <section className="col-span-12 overflow-hidden bg-black text-white md:col-span-6">
        {featured ? (
          <>
            <img src={featured.imageUrl} alt={featured.title} className="h-[420px] w-full object-cover opacity-80" />
            <div className="-mt-32 bg-gradient-to-t from-black px-6 pb-6 pt-20">
              <p className="text-4xl font-extrabold leading-tight">{featured.title}</p>
            </div>
          </>
        ) : null}
      </section>

      <section className="col-span-12 space-y-4 md:col-span-3">
        {secondaryStories.map((article) => (
          <article key={article.id} className="bg-white p-2">
            <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
            <h2 className="mt-3 text-3xl font-bold leading-tight text-blue-700">{article.title}</h2>
          </article>
        ))}
      </section>

      <aside className="col-span-12 bg-white md:col-span-3">
        <div className="border border-gray-200 p-4">
          <h2 className="text-2xl font-bold">Wil je elke dag de HLN nieuwsbrief?</h2>
          <input className="mt-3 w-full rounded border px-3 py-2" placeholder="E-mail" />
          <button className="mt-3 w-full rounded bg-[#e30613] py-2 font-semibold text-white">Verstuur</button>
        </div>
        <div className="mt-4 border-t">
          <h3 className="inline-block bg-[#e30613] px-4 py-2 text-3xl font-black uppercase text-white">Net Binnen</h3>
          <ul className="space-y-3 p-4">
            {liveUpdates.map((article) => (
              <li key={article.id}>
                <p className="text-lg font-bold text-[#e30613]">{toTimeLabel(article.publishedAt)}</p>
                <p className="text-2xl font-semibold leading-tight text-blue-700">{article.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  </main>
);
