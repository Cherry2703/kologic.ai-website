"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { Building2, Globe2, Users, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden text-center lg:text-left">
      <GradientBlob color="accent" className="w-[800px] h-[800px] -left-40 top-0 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
              Empowering human <br/><span className="text-accent">potential</span> through AI.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Kologic was founded on a simple premise: foundation models are incredibly capable, but connecting them securely to enterprise data and driving actual business outcomes remains unnecessarily difficult. 
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              We are building the abstraction layer that bridges the gap between state-of-the-art AI research and mission-critical enterprise deployment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: "Founded", value: "2024", icon: <Building2 className="text-primary w-6 h-6" /> },
              { label: "Global Reach", value: "10+ Countries", icon: <Globe2 className="text-secondary w-6 h-6" /> },
              { label: "Team Size", value: "150+ Engineers", icon: <Users className="text-accent w-6 h-6" /> },
              { label: "Patents", value: "24 Pending", icon: <Lightbulb className="text-text-primary w-6 h-6" /> },
            ].map((stat, idx) => (
              <GlassCard key={idx} hoverEffect className="bg-white text-center py-8">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        {/* Leadership Team placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="bg-gray-50/50 p-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <h3 className="font-bold text-xl text-text-primary mb-1">Leader {i}</h3>
                <p className="text-primary font-medium text-sm mb-4">Founder & Executive</p>
                <p className="text-text-secondary text-sm">Passionate about building scalable AI infrastructures and driving enterprise adoption patterns globally.</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
