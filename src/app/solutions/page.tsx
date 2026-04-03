"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { Briefcase, Settings, Database, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Reusable 3D Hover Card Component
function ThreeDCard({ 
  title, 
  desc, 
  icon, 
  href 
}: { 
  title: string; 
  desc: string; 
  icon: React.ReactNode; 
  href: string; 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-2xl border border-gray-100/50 bg-white/60 backdrop-blur-xl p-8 md:p-10 shadow-xl shadow-gray-200/50 group hover:border-primary/20 transition-colors duration-500 flex flex-col"
      >
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center mb-8 border border-primary/10"
        >
          {icon}
        </div>
        
        <h3 
          style={{ transform: "translateZ(40px)" }}
          className="text-2xl font-bold text-text-primary mb-4"
        >
          {title}
        </h3>
        
        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-text-secondary leading-relaxed mb-8 flex-grow"
        >
          {desc}
        </p>

        <div style={{ transform: "translateZ(20px)" }} className="mt-auto">
           <Link href={href} className="inline-flex items-center gap-2 text-primary font-medium group/link">
              Learn More 
              <span className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary/10 transition-colors">
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </span>
           </Link>
        </div>

        {/* Shine effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(1px)" }} />
      </motion.div>
    </motion.div>
  );
}

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/50">
      <GradientBlob color="primary" className="w-[1000px] h-[1000px] -top-20 -right-20 opacity-10" />
      <GradientBlob color="secondary" className="w-[600px] h-[600px] top-1/2 -left-40 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <Briefcase className="w-4 h-4" />
            <span>Enterprise Solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]">
            Fuelling enterprises with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              disruptive AI services
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            A host of solutions for businesses across industries to pursue their disruptive goals with a targeted focus on swift, scalable, and sustainable digital transformation.
          </p>
        </motion.div>

        {/* Overview Section */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Overview</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Welcome to the forefront of innovation and breaking the barriers of legacy operations. Our advanced AI transformation model is designed to empower enterprises with seamless connectivity and productivity. With Kologic&apos;s cutting-edge AI services, we envisage enhanced customer experiences and revenue growth.
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 md:gap-10 perspective-1000">
          <ThreeDCard
            title="AI Custom Solutions"
            desc="Kologic strongly advocates the principles of agility and developing customized solutions. AI Pod-led services embody this philosophy, where our expert teams address intricate obstacles in digital transformation. This ensures the quick implementation of AI solutions tailored to each enterprise's unique requirements."
            icon={<Settings className="w-8 h-8 text-primary" />}
            href="/ai-custom-solutions"
          />
          <ThreeDCard
            title="Industry-Specific Products"
            desc="At Kologic, we prioritize specialization. Our range of products is tailored to industry-specific needs to address the challenges and opportunities in each sector. We leverage our in-depth industry expertise and pioneering AI technologies to provide resolutions for current issues and predict future needs."
            icon={<Database className="w-8 h-8 text-secondary" />}
            href="/industry-specific-products"
          />
          <ThreeDCard
            title="Kore-Led CX"
            desc="Kologic's AI-driven customer service solutions are revolutionizing engagement and satisfaction benchmarks in the customer-centric era. By harnessing artificial intelligence's capabilities, we deliver tailor-made, efficient, and scalable customer service solutions."
            icon={<MessageSquare className="w-8 h-8 text-accent" />}
            href="/ai-led-cx"
          />
        </div>

      </div>
    </div>
  );
}
