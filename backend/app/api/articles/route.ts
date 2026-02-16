import { NextResponse } from 'next/server';
import { createArticle, listArticles } from '../../../lib/article-repository';
import { articleSchema } from '../../../lib/validation';

export async function GET() {
  const articles = await listArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = articleSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const created = await createArticle(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
