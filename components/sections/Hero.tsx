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

  // Parallax transforms for different layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Background moves down
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]); // Text moves up (slowest)

  return (
    <div ref={ref} className="relative h-[125vh] overflow-hidden">
      {/* Parallax background layer (moves down) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src="/images/bg-hero.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Static waves layer */}
      <div className="absolute inset-0 z-10 opacity-40">
        <Image
          src="/images/bg-hero-waves.png"
          alt="Hero waves"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Parallax text layer (moves up, slowest) */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 flex items-center justify-center h-full"
      >
        <h1 className="font-darker-grotesque text-white text-center text-5xl lg:text-9xl font-normal leading-10 lg:leading-[96px] [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]">
          <span className="block">Les meilleurs podcasts</span>
          <strong className="font-semibold block">de musique</strong>
        </h1>
      </motion.div>
    </div>
  );
}
