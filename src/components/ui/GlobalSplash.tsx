"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalSplash() {
  const [show, setShow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    const hasShown = sessionStorage.getItem("kologic_splash_shown");
    if (hasShown) {
      setTimeout(() => setShow(false), 0);
    } else {
      // Hide the splash screen after the animation sequence completes
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("kologic_splash_shown", "true");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Avoid hydration mismatch by not rendering anything until mounted
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Glows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-tr from-primary/10 via-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />

          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotateX: [0, 5, -5, 0],
              rotateY: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
            style={{ perspective: 1000 }}
            className="relative flex flex-col items-center justify-center gap-8"
          >
            {/* Animated Logo SVG */}
            <svg 
              width="160" 
              height="160" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" /> {/* Primary */}
                  <stop offset="50%" stopColor="#6EE7B7" /> {/* Secondary */}
                  <stop offset="100%" stopColor="#38BDF8" /> {/* Light Blue */}
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Node */}
              <motion.circle 
                cx="35" 
                cy="50" 
                r="8" 
                fill="url(#logo-gradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
              />

              {/* Top Left Node */}
              <motion.circle 
                cx="15" 
                cy="25" 
                r="5" 
                fill="url(#logo-gradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
              />

              {/* Bottom Left Node */}
              <motion.circle 
                cx="15" 
                cy="75" 
                r="5" 
                fill="url(#logo-gradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
              />

              {/* Top Right Node */}
              <motion.circle 
                cx="75" 
                cy="25" 
                r="7" 
                fill="url(#logo-gradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
              />

              {/* Bottom Right Node */}
              <motion.circle 
                cx="75" 
                cy="75" 
                r="7" 
                fill="url(#logo-gradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, ease: "backOut" }}
              />

              {/* Connecting Lines */}
              <motion.path 
                d="M35 50 L15 25" 
                stroke="url(#logo-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
              />
              <motion.path 
                d="M35 50 L15 75" 
                stroke="url(#logo-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeInOut" }}
              />
              <motion.path 
                d="M35 50 L75 25" 
                stroke="url(#logo-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
              />
              <motion.path 
                d="M35 50 L75 75" 
                stroke="url(#logo-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 1.4, ease: "easeInOut" }}
              />
              
              {/* Outer Connecting Line (defining the K shape) */}
              <motion.path 
                d="M75 25 L50 50 L75 75" 
                stroke="url(#logo-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeInOut" }}
              />
            </svg>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2"
            >
              Kologic <span className="text-primary">AI</span>
            </motion.div>
          </motion.div>
          
          {/* Subtle Loading Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity }}
            className="absolute bottom-12 text-sm font-medium text-text-secondary tracking-widest uppercase"
          >
            Initializing Intelligence
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
