// components/ui/ArticleCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CircularIcon } from "@/components/ui/CircularIcon";
import { useState } from "react";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    description: string;
    date: string;
    tag: string;
    image: string;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.article
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/articles/${article.id}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Gradient Overlay */}
        <div className="relative aspect-[4/5] mb-8 overflow-hidden article-image">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Metadata */}
        <p className="text-white/70 text-sm mb-2 font-open-sans tracking-[2px] leading-6">
          {article.date} - {article.tag}
        </p>

        {/* Title */}
        <h3 className="text-white text-5xl leading-8 font-medium mb-6 font-darker-grotesque tracking-[2px] leading-6 article-title">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm mb-6 line-clamp-3">
          {article.description}
        </p>

        {/* Circular Icon */}
        <div className="flex justify-start">
          <CircularIcon isHovered={isHovered} />
        </div>
      </Link>
    </motion.article>
  );
}
