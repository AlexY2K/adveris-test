// app/articles/[id]/page.tsx

import { getPostById, getPosts } from "@/lib/api/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CircularIcon } from "@/components/ui/CircularIcon";

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

  // Format date (using current date as fallback since API doesn't provide one)
  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Map post ID to image (cycle through available images)
  const imageIndex = ((Number(id) - 1) % 3) + 1;
  const articleImage = `/images/article-${imageIndex}.png`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#1a1a2e] pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-12 text-white/70 hover:text-white transition-colors group"
          >
            <div className="transform group-hover:-translate-x-1 transition-transform">
              <CircularIcon isHovered={false} size={24} />
            </div>
            <span className="font-open-sans text-sm tracking-[2px] uppercase">
              Retour
            </span>
          </Link>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto">
            {/* Metadata */}
            <div className="mb-8">
              <p className="text-white/70 text-xs lg:text-sm mb-4 font-open-sans tracking-[2px] leading-6">
                {formattedDate} • {post.tags[0]?.toUpperCase() || "ARTICLE"}
              </p>
            </div>

            {/* Title */}
            <h1 className="text-white text-4xl lg:text-6xl font-medium mb-8 font-darker-grotesque leading-tight article-title">
              {post.title}
            </h1>

            {/* Article Image */}
            <div className="relative aspect-4/5 lg:aspect-video mb-12 overflow-hidden">
              <Image
                src={articleImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 text-white/80 text-xs font-open-sans tracking-[1px] uppercase rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <div className="prose prose-invert max-w-none">
              <div className="text-white/90 text-base lg:text-lg leading-relaxed font-open-sans space-y-6">
                {post.body.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Reactions */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👍</span>
                  <span className="font-open-sans text-sm">
                    {post.reactions.likes} likes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">👎</span>
                  <span className="font-open-sans text-sm">
                    {post.reactions.dislikes} dislikes
                  </span>
                </div>
              </div>
            </div>

            {/* Back to Home CTA */}
            <div className="mt-16">
              <Link
                href="/"
                className="inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <CircularIcon isHovered={false} size={32} />
                <span className="font-open-sans text-sm tracking-[2px] uppercase">
                  Voir tous les articles
                </span>
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
