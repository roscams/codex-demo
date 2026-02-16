import { NextResponse } from 'next/server';
import { removeArticle, updateArticle } from '../../../../lib/article-repository';
import { articleSchema } from '../../../../lib/validation';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = await request.json();
  const parsed = articleSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await updateArticle(id, parsed.data);

  if (!updated) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const removed = await removeArticle(id);

  if (!removed) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
