// app/articles/[id]/page.tsx

import { getPostById, getPosts } from "@/lib/api/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts(30);
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="container mx-auto px-4 py-20">
        <Link
          href="/"
          className="inline-block mb-8 text-white/70 hover:text-white transition-colors"
        >
          ← Retour
        </Link>

        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 text-white/70">
            <span>Tags: {post.tags.join(", ")}</span>
            <span>•</span>
            <span>{post.reactions} réactions</span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
              {post.body}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

