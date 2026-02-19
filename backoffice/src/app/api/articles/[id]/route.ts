import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { name: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Artikel niet gevonden' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    const data = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      image,
      categoryId,
      status,
      featured,
      breaking,
      readingTime,
    } = data;

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artikel niet gevonden' },
        { status: 404 }
      );
    }

    // Check if slug is unique (if changed)
    if (slug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Deze slug bestaat al' },
          { status: 400 }
        );
      }
    }

    // Determine publishedAt
    let publishedAt = existingArticle.publishedAt;
    if (status === 'PUBLISHED' && !existingArticle.publishedAt) {
      publishedAt = new Date();
    } else if (status !== 'PUBLISHED') {
      publishedAt = null;
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || null,
        categoryId,
        status,
        featured,
        breaking,
        readingTime,
        publishedAt,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artikel niet gevonden' },
        { status: 404 }
      );
    }

    await prisma.article.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}
