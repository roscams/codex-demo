import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User, Share2, Facebook, Twitter } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { getArticleBySlug, getArticles } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return { title: 'Artikel niet gevonden' };
  }

  return {
    title: `${article.title} - HLN`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article || article.category.slug !== params.category) {
    notFound();
  }

  const relatedArticles = await getArticles({
    categorySlug: article.category.slug,
    limit: 4,
  });

  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-hln-red">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/${article.category.slug}`} className="hover:text-hln-red">
              {article.category.name}
            </Link>
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <span
          className="category-badge mb-4"
          style={{ backgroundColor: article.category.color }}
        >
          {article.category.name}
        </span>

        {article.breaking && (
          <span className="ml-2 bg-hln-red text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
            BREAKING
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-y border-gray-200 py-4">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{article.author.name}</span>
          </div>
          {article.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={article.publishedAt.toISOString()}>
                {format(new Date(article.publishedAt), 'd MMMM yyyy, HH:mm', { locale: nl })}
              </time>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{article.readingTime} min leestijd</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full" title="Delen">
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-blue-600" title="Facebook">
              <Facebook size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-sky-500" title="Twitter">
              <Twitter size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {article.image && (
        <figure className="mb-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {article.imageAlt && (
            <figcaption className="text-sm text-gray-500 mt-2">
              {article.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(({ tag }) => (
              <Link
                key={tag.id}
                href={`/zoeken?tag=${tag.slug}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerelateerde artikels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRelated.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
