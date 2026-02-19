import { FileText, Users, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [articleCount, userCount, publishedCount, draftCount] = await Promise.all([
    prisma.article.count(),
    prisma.user.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'DRAFT' } }),
  ]);

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, color: true } },
    },
  });

  return {
    articleCount,
    userCount,
    publishedCount,
    draftCount,
    recentArticles,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      name: 'Totaal artikels',
      value: stats.articleCount,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Gepubliceerd',
      value: stats.publishedCount,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Concepten',
      value: stats.draftCount,
      icon: Eye,
      color: 'bg-yellow-500',
    },
    {
      name: 'Gebruikers',
      value: stats.userCount,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welkom terug! Hier is een overzicht van je content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recente artikels</h2>
            <Link href="/articles" className="text-hln-red hover:underline text-sm">
              Bekijk alles
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentArticles.map((article) => (
            <div key={article.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2 py-0.5 text-xs font-medium text-white rounded"
                      style={{ backgroundColor: article.category.color }}
                    >
                      {article.category.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        article.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : article.status === 'DRAFT'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {article.status === 'PUBLISHED' ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-500">
                    Door {article.author.name} &bull;{' '}
                    {new Date(article.createdAt).toLocaleDateString('nl-BE')}
                  </p>
                </div>
                <Link
                  href={`/articles/edit?id=${article.id}`}
                  className="btn btn-secondary text-sm"
                >
                  Bewerken
                </Link>
              </div>
            </div>
          ))}

          {stats.recentArticles.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nog geen artikels. Maak je eerste artikel aan!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
