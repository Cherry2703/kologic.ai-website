"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  color?: "primary" | "secondary" | "accent";
  animate?: boolean;
}

const colorMaps = {
  primary: "from-primary/20 to-primary/5",
  secondary: "from-secondary/20 to-secondary/5",
  accent: "from-accent/20 to-accent/5",
};

export function GradientBlob({ className, color = "primary", animate = true }: GradientBlobProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full mix-blend-multiply filter blur-3xl opacity-70 bg-linear-to-tr -z-10",
        colorMaps[color],
        className
      )}
      animate={
        animate
          ? {
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }
          : {}
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
