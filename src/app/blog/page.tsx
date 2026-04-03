"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "The Shift from Conversational AI to Agentic Workflows",
      excerpt: "Why the next evolution of enterprise AI isn't just about answering questions—it's about autonomously executing multi-step business process tasks.",
      author: "Alex Chen, Lead Researcher",
      date: "Oct 12, 2024",
      category: "Agentic AI"
    },
    {
      title: "Securing Large Language Models in Healthcare Environments",
      excerpt: "A deep dive into how Kologic's abstraction layer maintains HIPAA compliance while routing sensitive queries to external foundation models.",
      author: "Sarah Jenkins, VP Engineering",
      date: "Sep 28, 2024",
      category: "Security"
    },
    {
      title: "Optimizing Retrieval-Augmented Generation for Scale",
      excerpt: "Technical patterns for reducing RAG latency and increasing semantic search accuracy across millions of unstructured documents.",
      author: "David Kim, ML Engineer",
      date: "Sep 15, 2024",
      category: "Engineering"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-white">
      <GradientBlob color="primary" className="w-[800px] h-[800px] -right-20 top-20 opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Pioneering the Future of <span className="text-primary">Enterprise AI</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Research, engineering updates, and strategic insights from the Kologic team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
            >
              <GlassCard hoverEffect className="group flex flex-col h-full border border-gray-100 bg-gray-50/50">
                <div className="mb-6 flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors">
                  <Link href="#">{post.title}</Link>
                </h3>
                <p className="text-text-secondary text-base leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
