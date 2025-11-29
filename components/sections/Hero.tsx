// components/sections/Hero.tsx

"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transform for the waves layer (moves slower than scroll)
  const wavesY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]); // More dramatic

  return (
    <div ref={ref} className="relative h-[125vh] overflow-hidden">
      {/* Static background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src="/images/bg-hero.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Parallax waves layer */}
      <motion.div
        style={{ y: wavesY }}
        className="absolute inset-0 z-10 opacity-40"
      >
        <Image
          src="/images/bg-hero-waves.png"
          alt="Hero waves"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Hero content (text, buttons, etc.) */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <h1 className="font-darker-grotesque text-white text-center text-[128px] font-normal leading-[96px] [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
          Les meilleurs podcasts
          <br />
          <strong className="font-semibold">de musique</strong>
        </h1>
      </div>
    </div>
  );
}
