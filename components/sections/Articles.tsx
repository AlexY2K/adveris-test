// components/sections/Articles.tsx

import { ArticleCard } from "@/components/ui/ArticleCard";
import { getPosts } from "@/lib/api/posts";
import { Article } from "@/lib/types/article";

export async function Articles() {
  const posts = await getPosts(30);

  // Transform posts to match ArticleCard interface
  const articles: Article[] = posts.slice(0, 3).map((post, index) => ({
    id: post.id,
    title: post.title,
    description: post.body,
    date: new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    tag: post.tags[0]?.toUpperCase() || "TAG",
    image: `/images/article-${index + 1}.png`, // First article uses article-1.jpg, second uses article-2.jpg, etc.
  }));

  return (
    <section className="bg-[#1a1a2e] py-30">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-darker-grotesque text-white text-5xl lg:text-[88px] font-medium lg:leading-[.75] max-w-[600px] mx-auto">
          Lorem ipsum dolor donec sed odio.
        </h2>
        <p className="text-center mb-18 font-open-sans text-white text-normal font-light leading-normal max-w-[600px] mx-auto">
          Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor
          mauris condimentum nibh, ut fermentum massa justo sit amet risus.
        </p>
        <div className="articles-grid grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-[13vw]">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
