'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface ArticleFormProps {
  categories: Category[];
  authorId: string;
  article?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string | null;
    categoryId: string;
    status: string;
    featured: boolean;
    breaking: boolean;
    readingTime: number;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ArticleForm({ categories, authorId, article }: ArticleFormProps) {
  const router = useRouter();
  const isEditing = !!article;

  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    image: article?.image || '',
    categoryId: article?.categoryId || categories[0]?.id || '',
    status: article?.status || 'DRAFT',
    featured: article?.featured || false,
    breaking: article?.breaking || false,
    readingTime: article?.readingTime || 3,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEditing ? `/api/articles/${article.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Er is een fout opgetreden');
      }

      router.push('/articles');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je dit artikel wilt verwijderen?')) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/articles/${article?.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Verwijderen mislukt');
      }

      router.push('/articles');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 space-y-4">
            <div>
              <label htmlFor="title" className="label">
                Titel *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="label">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="label">
                Samenvatting *
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="input"
                rows={2}
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="label">
                Inhoud *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                className="input font-mono text-sm"
                rows={15}
                placeholder="<p>Schrijf je artikel hier... (HTML toegestaan)</p>"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                HTML is toegestaan. Gebruik &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;ol&gt;, etc.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish settings */}
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Publicatie</h3>

            <div>
              <label htmlFor="status" className="label">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="input"
              >
                <option value="DRAFT">Concept</option>
                <option value="REVIEW">In review</option>
                <option value="PUBLISHED">Gepubliceerd</option>
                <option value="ARCHIVED">Gearchiveerd</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="label">
                Categorie
              </label>
              <select
                id="category"
                value={formData.categoryId}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                className="input"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-hln-red focus:ring-hln-red"
                />
                <span className="text-sm">Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.breaking}
                  onChange={(e) => setFormData((prev) => ({ ...prev, breaking: e.target.checked }))}
                  className="rounded border-gray-300 text-hln-red focus:ring-hln-red"
                />
                <span className="text-sm">Breaking</span>
              </label>
            </div>
          </div>

          {/* Media */}
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Media</h3>

            <div>
              <label htmlFor="image" className="label">
                Afbeelding URL
              </label>
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                className="input"
                placeholder="https://..."
              />
            </div>

            {formData.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Reading time */}
          <div className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Extra</h3>

            <div>
              <label htmlFor="readingTime" className="label">
                Leestijd (minuten)
              </label>
              <input
                type="number"
                id="readingTime"
                value={formData.readingTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, readingTime: parseInt(e.target.value) || 1 }))
                }
                className="input"
                min={1}
                max={60}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="card p-6 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? 'Bezig met opslaan...' : isEditing ? 'Opslaan' : 'Aanmaken'}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="btn btn-secondary w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={18} />
                Verwijderen
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
