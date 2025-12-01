// components/sections/Statistics.tsx

"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { NumbersData } from "@/lib/api/numbers";
import { useNumbers } from "@/hooks/useNumbers";

// Animation constants
const ANIMATION_DURATION = 2; // seconds
const TRANSITION_DURATION = 0.5; // seconds
const VIEWPORT_MARGIN = "-100px";
const INITIAL_Y_OFFSET = 20;
const INITIAL_OPACITY = 0;
const FINAL_OPACITY = 1;

interface AnimatedNumberProps {
  value: number;
  delay?: number;
}

interface StatisticConfig {
  key: keyof NumbersData;
  label: string;
  delay: number;
}

const statisticsConfig: StatisticConfig[] = [
  { key: "year", label: "Année", delay: 0.1 },
  { key: "podcasts", label: "Podcasts", delay: 0.2 },
  { key: "episodes", label: "Épisodes", delay: 0.3 },
  { key: "listeners", label: "Auditeurs", delay: 0.4 },
];

function AnimatedNumber({ value, delay = 0 }: AnimatedNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      // Animate from 0 to value with linear easing
      const controls = animate(motionValue, value, {
        duration: ANIMATION_DURATION,
        ease: "linear", // Linear animation - constant speed
        delay: 0,
      });

      return () => controls.stop();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, motionValue, isInView]);

  return (
    <motion.div
      ref={ref}
      className="font-darker-grotesque text-5xl lg:text-9xl font-normal text-white mb-7"
      initial={{ opacity: INITIAL_OPACITY, y: INITIAL_Y_OFFSET }}
      animate={
        isInView
          ? { opacity: FINAL_OPACITY, y: 0 }
          : { opacity: INITIAL_OPACITY, y: INITIAL_Y_OFFSET }
      }
      transition={{ duration: TRANSITION_DURATION, delay }}
    >
      <motion.span>{display}</motion.span>
    </motion.div>
  );
}

export function Statistics() {
  const numbers = useNumbers();

  if (!numbers) {
    return (
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from(
              { length: statisticsConfig.length },
              (_, i) => i + 1
            ).map((i) => (
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
        <h2 className="text-center mb-24 font-darker-grotesque text-white text-5xl lg:text-[88px] font-medium lg:leading-[.75]">
          Nos chiffres clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsConfig.map((stat) => (
            <div key={stat.key} className="text-center">
              <AnimatedNumber value={numbers[stat.key]} delay={stat.delay} />
              <div className="font-open-sans font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
