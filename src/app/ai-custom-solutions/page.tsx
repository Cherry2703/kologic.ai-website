"use client"

import React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Brain, Zap, Layers, Cpu, ArrowRight } from "lucide-react"
import { GradientBlob } from "@/components/ui/GradientBlob"

export interface FeatureData {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  desc: string;
}

const features: FeatureData[] = [
  {
    icon: <Brain />,
    title: "Industry-Focused Teams",
    desc: "Each AI Pod consists of experts in AI, machine learning, and deep domain expertise ensuring solutions align perfectly with industry challenges."
  },
  {
    icon: <Zap />,
    title: "Rapid Prototyping & Deployment",
    desc: "Our agile approach enables faster concept-to-deployment cycles, with some clients experiencing up to 50% reduction in deployment time."
  },
  {
    icon: <Layers />,
    title: "Scalable & Adaptable Solutions",
    desc: "AI Pods scale solutions as your business grows while adapting to evolving market conditions."
  },
  {
    icon: <Cpu />,
    title: "Intelligent Operations",
    desc: "Gain AI-driven insights that enhance both cloud and on-prem operations for improved efficiency."
  }
];

function CenterNode() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-24 h-24 pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] z-10"
      >
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md shadow-inner" />
      </motion.div>
    </div>
  );
}

function ConnectionLines() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="line-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Vertical Line */}
        <motion.line 
          x1="50%" y1="16%" x2="50%" y2="84%"
          stroke="url(#line-gradient-v)" strokeWidth="2" strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Horizontal Line */}
        <motion.line 
          x1="16%" y1="50%" x2="84%" y2="50%"
          stroke="url(#line-gradient-h)" strokeWidth="2" strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

function DiamondCard({ feature, index }: { feature: FeatureData, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="h-full w-full"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: index * 0.8 }}
        className="h-full w-full"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          className="h-full w-full relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div 
            style={{ transform: "translateZ(40px)" }}
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 border border-primary/20 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
          >
            {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
          </div>
          
          <h3 
            style={{ transform: "translateZ(30px)" }}
            className="text-2xl font-bold text-text-primary mb-4"
          >
            {feature.title}
          </h3>
          
          <p 
            style={{ transform: "translateZ(20px)" }}
            className="text-base md:text-lg text-text-secondary leading-relaxed"
          >
            {feature.desc}
          </p>

          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-tr from-white/0 via-white/60 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(1px)" }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ConnectedDiamondSystem({ features }: { features: FeatureData[] }) {
  return (
    <div className="w-full relative py-10">
      {/* Desktop Diamond Layout */}
      <div className="hidden xl:grid grid-cols-3 grid-rows-3 gap-6 relative items-center justify-items-center max-w-[1200px] mx-auto min-h-[800px]">
        <ConnectionLines />
        <CenterNode />
        
        <div className="col-start-2 row-start-1 w-full max-w-sm z-10">
          <DiamondCard feature={features[0]} index={0} />
        </div>
        <div className="col-start-1 row-start-2 w-full max-w-sm z-10">
          <DiamondCard feature={features[1]} index={1} />
        </div>
        <div className="col-start-3 row-start-2 w-full max-w-sm z-10">
          <DiamondCard feature={features[2]} index={2} />
        </div>
        <div className="col-start-2 row-start-3 w-full max-w-sm z-10">
          <DiamondCard feature={features[3]} index={3} />
        </div>
      </div>

      {/* Tablet 2x2 Grid */}
      <div className="hidden md:grid xl:hidden grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
        {features.map((item, i) => (
          <DiamondCard key={i} feature={item} index={i} />
        ))}
      </div>

      {/* Mobile Stack layout (no complex tilts for perf) */}
      <div className="md:hidden flex flex-col gap-6 mt-10">
        {features.map((item, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-primary/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 border border-primary/20">
                {React.cloneElement(item.icon, { className: "w-7 h-7" })}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F9FAFB] text-[#111827]">

      {/* HERO */}

      <section className="py-24 px-6 text-center">

        <motion.h1
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          AI Custom Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:.2 }}
          className="mt-6 max-w-3xl mx-auto text-lg text-[#6B7280]"
        >
          Leveraging GALE of Kore.ai, our AI Pod-Led Services deliver tailored
          digital transformation through precision-engineered AI solutions,
          accelerating your AI journey.
        </motion.p>

      </section>


      {/* WHAT SETS US APART */}

      <section className="py-20 px-6 relative overflow-hidden">
        <GradientBlob color="primary" className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl pointer-events-none" />
        <GradientBlob color="secondary" className="w-[400px] h-[400px] absolute top-0 right-0 opacity-10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 text-text-primary"
          >
            What Sets Us Apart
          </motion.h2>

          <ConnectedDiamondSystem features={features} />

        </div>

      </section>


      {/* WHY CHOOSE US */}

      <section className="py-24 px-6 bg-white">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose Us
          </h2>

          <p className="text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            As leaders in the AI innovation space, we focus on solving complex
            enterprise challenges with speed and sustainability. Our solutions
            introduce a new era of information, insight, and intelligence that
            empowers enterprises to thrive in a rapidly evolving digital
            ecosystem.
          </p>

        </div>

      </section>


      {/* CTA */}

      <section className="py-24 px-6 text-center">

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Started on Your AI Journey
          </h2>

          <p className="text-[#6B7280] mb-8">
            Are you ready to transform your business through the power of AI?
            Discover how our solutions can revolutionize your goals and drive
            unprecedented growth.
          </p>

          <button className="bg-[#4F46E5] text-white px-8 py-4 rounded-xl flex items-center gap-2 mx-auto hover:scale-105 transition">
            Get In Touch
            <ArrowRight size={18}/>
          </button>

        </div>

      </section>

    </main>
  )
}