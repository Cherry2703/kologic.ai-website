"use client";

import { useState } from "react";

import { motion, Variants } from "framer-motion";
import { ArrowRight, MessageSquare, Database, Settings } from "lucide-react";
import Link from "next/link";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { RobotAssistant } from "@/components/3d/RobotAssistant";
import { ArchitectureTimeline } from "@/components/ui/ArchitectureTimeline";

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-0 pb-32">
        <ParticleBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative mt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              className="text-center lg:text-left"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={STAGGER_CHILD} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <SparklesIcon className="w-4 h-4" />
                <span>Next-Generation Enterprise AI</span>
              </motion.div>
              
              <motion.h1 
                variants={STAGGER_CHILD}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.1] mb-6"
              >
                Pioneering Horizons: <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                  Harnessing the Power of AI
                </span>
              </motion.h1>
              
              <motion.p 
                variants={STAGGER_CHILD}
                className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Ushering in the Gen AI revolution, with a balanced synergy between human capabilities and cutting-edge technology.
              </motion.p>
              
              <motion.div 
                variants={STAGGER_CHILD}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/platform"
                  onMouseEnter={() => setIsHoveringCTA(true)}
                  onMouseLeave={() => setIsHoveringCTA(false)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                >
                  Explore Platform
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  onMouseEnter={() => setIsHoveringCTA(true)}
                  onMouseLeave={() => setIsHoveringCTA(false)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-text-primary border border-gray-200 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  Book Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Robot Assistant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <GradientBlob className="w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="primary" />
              <RobotAssistant hoverState={isHoveringCTA} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. TRUSTED COMPANIES */}
      <section className="py-16 border-y border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-widest mb-8">
            Trusted by Forward-Thinking Enterprises
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {["Kore.ai"].map((i) => (
              <div key={i} className="h-8 w-32 bg-grey-300 rounded-md animate-pulse">{i}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PLATFORM ARCHITECTURE */}
      <section className="py-32 relative">
        <GradientBlob className="w-[800px] h-[800px] -right-40 top-0 opacity-40" color="secondary" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">The Kologic AI Architecture</h2>
            <p className="text-lg text-text-secondary">A unified, secure abstraction layer bridging your enterprise data and state-of-the-art foundation models.</p>
          </div>

          <ArchitectureTimeline />
        </div>
      </section>

      {/* 4. CORE CAPABILITIES */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Core Capabilities</h2>
            <p className="text-lg text-text-secondary max-w-2xl">Deploy enterprise-ready AI solutions across your entire organizational stack.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Kore led CX", icon: <MessageSquare />, desc: "Delivering tailor-made, efficient, and scalable customer service solutions to enhance the customer experience and also streamline operational progressions for expansion." },
              { title: "AI Custom Solutions", icon: <Settings />, desc: "Implementation of AI solutions custom-made using Kore.ai's GALE platform to Experiment, Evaluate, Enhance and deploy Gen AI Agents Energizing your Business." },
              { title: "Industry-Specific Products", icon: <Database />, desc: "Addressing the challenges and plugging the opportunity gap in each sector with pioneering AI technologies and in-depth industry expertise while predicting future demands." },
            ].map((feature, idx) => (
              <GlassCard key={idx} hoverEffect className="bg-white">
                <div className="w-12 h-12 bg-gray-100 text-text-primary rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOLUTIONS & ECOSYSTEM */}
      <section className="py-32 relative">
        <GradientBlob className="w-[600px] h-[600px] -left-40 top-1/2 opacity-30" color="primary" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Built for Every Vertical</h2>
              <p className="text-lg text-text-secondary">Specialized AI agents designed to handle industry-specific complexities and compliance requirements.</p>
            </div>
            <Link href="/solutions" className="text-primary font-medium hover:text-primary/80 flex items-center gap-2 group">
              View all solutions <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard hoverEffect className="bg-white group overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
              <h3 className="font-bold text-2xl text-text-primary mb-2">Customer Support Automation</h3>
              <p className="text-text-secondary mb-8">Reduce ticket volume by 40% with agents that resolves complex issues autonomously.</p>
              <div className="h-40 bg-gray-100/50 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                 <MessageSquare className="w-12 h-12 text-primary/40" />
              </div>
            </GlassCard>
            
            <GlassCard hoverEffect className="bg-white group overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-bl from-secondary/10 to-transparent pointer-events-none" />
              <h3 className="font-bold text-2xl text-text-primary mb-2">Banking & Finance Assistants</h3>
              <p className="text-text-secondary mb-8">Secure, compliant AI that handles transactions, onboarding, and wealth advisory.</p>
              <div className="h-40 bg-gray-100/50 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                 <Database className="w-12 h-12 text-secondary/40" />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-32 bg-text-primary text-white relative overflow-hidden">
        <GradientBlob className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen" color="accent" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Witness the pulse of innovation in the global AI space with Kologic</h2>
          <p className="text-xl text-gray-300 mb-10">Ushering in the Gen AI revolution, with a balanced synergy between human capabilities and cutting-edge technology.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Request a Demo
            </Link>
            <Link
              href="/developers"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Small icon helper
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
