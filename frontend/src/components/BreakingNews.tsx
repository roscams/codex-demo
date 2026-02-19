import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface BreakingNewsProps {
  articles: Array<{
    slug: string;
    title: string;
    category: {
      slug: string;
    };
  }>;
}

export default function BreakingNews({ articles }: BreakingNewsProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-hln-red text-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-shrink-0">
            <AlertTriangle size={18} className="animate-pulse" />
            <span className="font-bold uppercase text-sm">Breaking</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-flex gap-8 animate-marquee">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.category.slug}/${article.slug}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
