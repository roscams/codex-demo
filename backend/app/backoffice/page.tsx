'use client';

import { FormEvent, useEffect, useState } from 'react';

type Section = 'Nieuws' | 'Sport' | 'Showbizz' | 'Tech';

interface Article {
  id: string;
  title: string;
  section: Section;
  summary: string;
  imageUrl: string;
  featured: boolean;
  publishedAt: string;
}

const emptyForm = {
  title: '',
  section: 'Nieuws' as Section,
  summary: '',
  imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
  featured: false,
  publishedAt: new Date().toISOString()
};

const BackofficePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState(emptyForm);

  const refresh = async () => {
    const response = await fetch('/api/articles');
    setArticles(await response.json());
  };

  useEffect(() => {
    void refresh();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm(emptyForm);
    await refresh();
  };

  const remove = async (id: string) => {
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    await refresh();
  };

  return (
    <main className="container">
      <h1>Backoffice</h1>
      <p>Create and remove homepage stories.</p>

      <form onSubmit={submit} className="card">
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Headline"
          required
        />
        <textarea
          value={form.summary}
          onChange={(event) => setForm({ ...form, summary: event.target.value })}
          placeholder="Summary"
          required
        />
        <select
          value={form.section}
          onChange={(event) => setForm({ ...form, section: event.target.value as Section })}
        >
          <option>Nieuws</option>
          <option>Sport</option>
          <option>Showbizz</option>
          <option>Tech</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm({ ...form, featured: event.target.checked })}
          />
          Featured
        </label>
        <button type="submit">Save article</button>
      </form>

      <section>
        <h2>Current articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="card list-item">
              <div>
                <strong>{article.title}</strong>
                <p>{article.section}</p>
              </div>
              <button type="button" onClick={() => remove(article.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default BackofficePage;
