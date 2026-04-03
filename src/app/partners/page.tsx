"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame, AnimatePresence, MotionValue } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { 
  Handshake, 
  Workflow, 
  Zap, 
  Lightbulb, 
  TrendingUp 
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Benefit {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  desc: string;
}

interface OrbitNodeProps {
  benefit: Benefit;
  idx: number;
  total: number;
  rotation: MotionValue<number>;
  radius: number;
}

function OrbitNode({ benefit, idx, total, rotation, radius }: OrbitNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const angleOffset = (idx * 360) / total;

  const x = useTransform(rotation, (r) => {
    const angleInRads = ((r + angleOffset) * Math.PI) / 180;
    return Math.cos(angleInRads) * radius;
  });

  const y = useTransform(rotation, (r) => {
    const angleInRads = ((r + angleOffset) * Math.PI) / 180;
    return Math.sin(angleInRads) * radius;
  });

  return (
    <motion.div
      style={{
        x, y,
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: isHovered ? 50 : 30
      }}
      className="flex items-center justify-center cursor-pointer pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
          {/* Circle Icon */}
          <motion.div 
            className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-2xl border border-primary/20 flex flex-col items-center justify-center text-primary z-10 relative overflow-hidden group"
            animate={{ scale: isHovered ? 1.15 : 1, borderColor: isHovered ? "#4F46E5" : "rgba(79, 70, 229, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            {React.cloneElement(benefit.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
          </motion.div>

          {/* Expanded Content Card */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-1/2 mt-12 md:mt-16 w-[280px] md:w-80 bg-white/95 backdrop-blur-3xl p-6 rounded-2xl shadow-2xl border border-gray-100 left-1/2 pointer-events-none z-[100] text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/95 rotate-45 border-l border-t border-gray-100" />
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-2 relative z-10">{benefit.title}</h4>
                <p className="text-sm md:text-base text-text-secondary relative z-10 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </motion.div>
  )
}

function OrbitingBenefits({ benefits }: { benefits: Benefit[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const rotation = useMotionValue(0);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setRadius(Math.max((width / 2) * 0.75, 120)); 
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useAnimationFrame((time, delta) => {
    if (!isPaused) {
      rotation.set((rotation.get() + delta * 0.015) % 360);
    }
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[340px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] aspect-square mx-auto mt-20 mb-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Dashed Orbit Ring */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/20 border-dashed pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      
      {/* Central Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl pointer-events-none" 
      />

      {/* Central Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary via-[#5D55F0] to-accent z-20 flex flex-col items-center justify-center p-6 text-center shadow-[0_0_50px_rgba(79,70,229,0.3)] border-[6px] border-white backdrop-blur-md text-white hover:scale-105 transition-transform duration-500 cursor-pointer">
        <Handshake className="w-12 h-12 md:w-16 md:h-16 mb-2 opacity-90 drop-shadow-md" />
        <span className="font-bold text-lg md:text-2xl leading-tight tracking-wide drop-shadow-sm">Kologic.ai <br/><span className="text-white/80">+</span><br/>Kore.ai</span>
      </div>

      {/* Orbiting Nodes */}
      {benefits.map((benefit, idx) => (
        <OrbitNode 
          key={idx} 
          benefit={benefit} 
          idx={idx} 
          total={benefits.length} 
          rotation={rotation} 
          radius={radius} 
        />
      ))}
    </div>
  );
}

export default function PartnersPage() {
  const benefits = [
    { 
      title: "Seamless Integration", 
      icon: <Workflow className="w-8 h-8" />, 
      desc: "Kologic and Kore.ai seamlessly integrate their expertise to provide end-to-end solutions tailored to your specific business needs." 
    },
    { 
      title: "Enhanced Efficiency", 
      icon: <Zap className="w-8 h-8" />, 
      desc: "Leveraging Kologic's deep technical expertise and Kore.ai's AI-driven solutions, businesses can streamline operations and achieve unprecedented levels of efficiency." 
    },
    { 
      title: "Innovative Solutions", 
      icon: <Lightbulb className="w-8 h-8" />, 
      desc: "Together, Kologic and Kore.ai push the boundaries of innovation, delivering cutting-edge solutions that anticipate and address the evolving demands of the digital landscape." 
    },
    { 
      title: "Measurable Results", 
      icon: <TrendingUp className="w-8 h-8" />, 
      desc: "Our partnership is built on a foundation of delivering tangible business benefits. Expect measurable results that drive growth, productivity, and customer satisfaction." 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/40">
      <GradientBlob color="primary" className="w-[1000px] h-[1000px] -top-60 -right-60 opacity-10" />
      <GradientBlob color="accent" className="w-[800px] h-[800px] top-1/2 -left-40 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
            <Handshake className="w-4 h-4" />
            <span>Partnership</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-8 leading-[1.1] uppercase">
            Kologic.ai & Kore.ai <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Collaboration
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-medium">
            Combining deep technical expertise with pioneering conversational AI to deliver measurable business benefits.
          </p>
        </motion.div>

        {/* About Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100/50 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">About Kologic</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Kologic is a global IT services company with a widespread presence across the USA and India. With a commitment to delivering measurable business benefits through cutting-edge technical expertise, Kologic serves enterprise-level clients across various industries. Kologic stands as your trusted partner in navigating the Conversational & Generative AI landscape.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100/50 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-secondary to-accent" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">About Kore.ai</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              With over a decade of experience, Kore.ai has been a pioneer in the realm of artificial intelligence, specializing in conversational virtual assistants and generative AI applications. From customer engagement to employee support, Kore.ai empowers organizations with a suite of AI-driven solutions that redefine efficiency and customer experience.
            </p>
          </motion.div>
        </div>

        {/* Benefits Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 uppercase tracking-wide">Partnership Benefits</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Discover the advantages of our joint enterprise offerings.</p>
        </div>

        {/* Interactive 3D Orbit Layout */}
        <OrbitingBenefits benefits={benefits} />

      </div>
    </div>
  );
}
