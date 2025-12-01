// components/sections/Statistics.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { getNumbers } from "@/lib/api/numbers";

interface NumbersData {
  year: number;
  podcasts: number;
  episodes: number;
  listeners: number;
}

interface AnimatedNumberProps {
  value: number;
  delay?: number;
}

function AnimatedNumber({ value, delay = 0 }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate from 0 to value with linear easing
      const controls = animate(motionValue, value, {
        duration: 2, // 2 seconds
        ease: "linear", // Linear animation - constant speed
        delay: 0,
      });

      return () => controls.stop();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, motionValue]);

  return (
    <motion.div
      className="font-darker-grotesque text-9xl font-normal text-white mb-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span>{display}</motion.span>
    </motion.div>
  );
}

export function Statistics() {
  const [numbers, setNumbers] = useState<NumbersData | null>(null);

  useEffect(() => {
    getNumbers().then(setNumbers);
  }, []);

  if (!numbers) {
    return (
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white">0</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[linear-gradient(270deg,#B551D9_18.63%,#D40A95_50%)] py-30">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-24 font-darker-grotesque text-white text-[88px] font-medium leading-[.75]">
          Nos chiffres clés
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <AnimatedNumber value={numbers.year} delay={0.1} />
            <div className="font-open-sans font-light">Année</div>
          </div>
          <div className="text-center">
            <AnimatedNumber value={numbers.podcasts} delay={0.2} />
            <div className="font-open-sans font-light">Podcasts</div>
          </div>
          <div className="text-center">
            <AnimatedNumber value={numbers.episodes} delay={0.3} />
            <div className="font-open-sans font-light">Épisodes</div>
          </div>
          <div className="text-center">
            <AnimatedNumber value={numbers.listeners} delay={0.4} />
            <div className="font-open-sans font-light">Auditeurs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
