import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getArticles() {
  return prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, color: true, slug: true } },
    },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artikels</h1>
          <p className="text-gray-600">Beheer al je artikels</p>
        </div>
        <Link href="/articles/new" className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nieuw artikel
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Zoek artikels..."
                className="input pl-10"
              />
            </div>
          </div>
          <select className="input w-auto">
            <option value="">Alle categorieën</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <select className="input w-auto">
            <option value="">Alle statussen</option>
            <option value="PUBLISHED">Gepubliceerd</option>
            <option value="DRAFT">Concept</option>
            <option value="REVIEW">In review</option>
            <option value="ARCHIVED">Gearchiveerd</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Titel</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Categorie</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Auteur</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Datum</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {article.breaking && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-hln-red text-white rounded">
                        BREAKING
                      </span>
                    )}
                    {article.featured && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-500 text-white rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 line-clamp-1">{article.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-2 py-1 text-xs font-medium text-white rounded"
                    style={{ backgroundColor: article.category.color }}
                  >
                    {article.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{article.author.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      article.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : article.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-700'
                        : article.status === 'REVIEW'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {article.status === 'PUBLISHED'
                      ? 'Gepubliceerd'
                      : article.status === 'DRAFT'
                      ? 'Concept'
                      : article.status === 'REVIEW'
                      ? 'In review'
                      : 'Gearchiveerd'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(article.createdAt).toLocaleDateString('nl-BE')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`http://localhost:3000/${article.category.slug}/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Bekijk
                    </a>
                    <Link
                      href={`/articles/edit?id=${article.id}`}
                      className="text-hln-red hover:underline text-sm"
                    >
                      Bewerken
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nog geen artikels gevonden.
          </div>
        )}
      </div>
    </div>
  );
}
