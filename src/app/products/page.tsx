"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { Bot, Workflow, Code, Database, Sparkles } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden">
      <GradientBlob color="accent" className="w-[600px] h-[600px] top-40 left-10 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 border border-accent/20">
            <Sparkles className="w-4 h-4" />
            <span>Product Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Intelligent <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">Products</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Discover our suite of configurable AI products designed to supercharge your workforce.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Kologic ChatBase", icon: <Bot className="text-primary" />, desc: "Deploy contextual customer-facing chatbots." },
            { title: "Kologic Agents", icon: <Database className="text-secondary" />, desc: "Autonomous data-fetching reasoning engines." },
            { title: "Kologic Flow", icon: <Workflow className="text-accent" />, desc: "Visual builder for multi-agent automations." },
            { title: "Kologic Build", icon: <Code className="text-text-primary" />, desc: "Headless SDK for integrating custom logic." },
          ].map((prod, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
            >
              <GlassCard hoverEffect className="group border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-white transition-colors">
                  {prod.icon}
                </div>
                <h3 className="font-semibold text-xl text-text-primary mb-3">{prod.title}</h3>
                <p className="text-text-secondary">{prod.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
