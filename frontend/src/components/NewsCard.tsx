import type { Article } from '../types';

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => (
  <article className="overflow-hidden rounded-lg bg-white shadow-sm">
    <img src={article.imageUrl} alt={article.title} className="h-40 w-full object-cover" />
    <div className="space-y-2 p-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand">{article.section}</span>
      <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
      <p className="text-sm text-gray-600">{article.summary}</p>
    </div>
  </article>
);
