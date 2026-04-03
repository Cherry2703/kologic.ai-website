"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "Global Retailer Automates 50% of Support Volume",
      industry: "Retail",
      metrics: [
        { label: "Resolution Time", value: "-60%", icon: <Clock className="w-5 h-5" /> },
        { label: "CSAT Score", value: "+22%", icon: <TrendingUp className="w-5 h-5" /> }
      ],
      desc: "Implemented a reasoning agent that connects to Shopify and Zendesk, capable of autonomously processing returns, order tracking, and complex policy questions."
    },
    {
      title: "Leading FinTech Accelerates KYC Onboarding",
      industry: "Banking",
      metrics: [
        { label: "Manual Review", value: "-45%", icon: <CheckCircle2 className="w-5 h-5" /> },
        { label: "Approval Speed", value: "3x", icon: <Clock className="w-5 h-5" /> }
      ],
      desc: "Deployed a secure document analysis agent that extracts entities from varied identity documents and cross-references them against global databases in real-time."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/30">
      <GradientBlob color="secondary" className="w-[800px] h-[800px] -left-40 top-40 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Customer <span className="text-secondary">Success</span> Stories
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            See how world-class enterprises use Kologic to drive efficiency, reduce costs, and create exceptional experiences.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {cases.map((cs, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <GlassCard hoverEffect className="bg-white p-8 md:p-10 border-gray-100">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="lg:w-2/3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-4 block">{cs.industry}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{cs.title}</h3>
                    <p className="text-text-secondary text-lg leading-relaxed mb-6">{cs.desc}</p>
                    <Link href="#" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                      Read full case study &rarr;
                    </Link>
                  </div>
                  <div className="lg:w-1/3 w-full grid grid-cols-2 gap-4">
                    {cs.metrics.map((metric, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                        <div className="text-secondary flex justify-center mb-2">{metric.icon}</div>
                        <div className="text-3xl font-bold text-text-primary mb-1">{metric.value}</div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider">{metric.label}</div>
                      </div>
                    ))}
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
