// components/ui/CTAButton.tsx

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CircularIcon } from "./CircularIcon";

interface CTAButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

export function CTAButton({
  href = "#",
  text = "Découvrir",
  className = "",
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-4 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <CircularIcon isHovered={isHovered} />
      <span className="text-white text-base leading-6 tracking-[7px] uppercase">
        {text}
      </span>
    </motion.a>
  );
}
