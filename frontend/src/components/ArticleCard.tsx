import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';

interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    image: string | null;
    readingTime: number;
    publishedAt: Date | null;
    breaking?: boolean;
    category: {
      name: string;
      slug: string;
      color: string;
    };
  };
  variant?: 'default' | 'featured' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const categoryUrl = `/${article.category.slug}`;
  const articleUrl = `/${article.category.slug}/${article.slug}`;

  if (variant === 'featured') {
    return (
      <article className="relative group">
        <Link href={articleUrl} className="block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            {article.image && (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              {article.breaking && (
                <span className="inline-block bg-hln-red text-white text-xs font-bold px-2 py-1 rounded mb-2 animate-pulse">
                  BREAKING
                </span>
              )}
              <span
                className="category-badge mb-2"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:underline">
                {article.title}
              </h2>
              <p className="text-gray-200 line-clamp-2 hidden md:block">{article.excerpt}</p>
              <div className="flex items-center gap-4 mt-3 text-gray-300 text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {article.readingTime} min
                </span>
                {article.publishedAt && (
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), {
                      addSuffix: true,
                      locale: nl,
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="flex gap-4 group">
        {article.image && (
          <Link href={articleUrl} className="flex-shrink-0">
            <div className="relative w-24 h-24 overflow-hidden rounded">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <Link href={categoryUrl}>
            <span
              className="category-badge text-[10px] mb-1"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
          </Link>
          <Link href={articleUrl}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-hln-red transition-colors">
              {article.title}
            </h3>
          </Link>
          {article.publishedAt && (
            <span className="text-gray-500 text-xs mt-1 block">
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
                locale: nl,
              })}
            </span>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="article-card group">
      <Link href={articleUrl}>
        {article.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article.breaking && (
              <span className="absolute top-2 left-2 bg-hln-red text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                BREAKING
              </span>
            )}
          </div>
        )}
      </Link>
      <div className="p-4">
        <Link href={categoryUrl}>
          <span
            className="category-badge mb-2"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>
        </Link>
        <Link href={articleUrl}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-hln-red transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readingTime} min
          </span>
          {article.publishedAt && (
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
                locale: nl,
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
