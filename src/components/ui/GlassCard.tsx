"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 bg-white/60 relative overflow-hidden",
        hoverEffect && "hover:shadow-xl hover:bg-white/80 transition-all duration-300",
        className
      )}
      whileHover={hoverEffect ? { y: -5 } : {}}
      {...props}
    >
      {hoverEffect && (
        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
}
