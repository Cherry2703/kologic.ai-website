"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { Terminal, Code, BookOpen, Key } from "lucide-react";

export default function DevelopersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden">
      <GradientBlob color="primary" className="w-[600px] h-[600px] top-20 right-20 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <Terminal className="w-4 h-4" />
            <span>Developer Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Build with <span className="text-primary">Kologic API</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Integrate agentic reasoning and conversational AI directly into your applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GlassCard className="bg-text-primary text-gray-300 font-mono text-sm leading-relaxed overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-gray-400">agent-request.ts</span>
            </div>
            <pre className="overflow-x-auto text-xs sm:text-sm text-green-400">
              <code>
{`import { Kologic } from '@kologic/sdk';

const client = new Kologic({ apiKey: process.env.KOLOGIC_API_KEY });

async function executeWorkflow() {
  const response = await client.agents.run({
    agentId: 'ag_customer_support',
    input: 'Process refund for order #4829',
    tools: ['stripe_api', 'internal_crm']
  });
  
  console.log(response.status); // SUCCESS
  console.log(response.actions); // [Refunded $40.00]
}

executeWorkflow();`}
              </code>
            </pre>
          </GlassCard>

          <div className="flex flex-col gap-6 justify-center">
            <GlassCard hoverEffect>
              <div className="flex gap-4 items-start">
                <BookOpen className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">Read the Docs</h3>
                  <p className="text-sm text-text-secondary">Explore comprehensive guides, API references, and SDK documentation.</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard hoverEffect>
              <div className="flex gap-4 items-start">
                <Code className="w-6 h-6 text-secondary shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">SDK Quickstart</h3>
                  <p className="text-sm text-text-secondary">Libraries available for Node.js, Python, Go, and Ruby.</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard hoverEffect>
              <div className="flex gap-4 items-start">
                <Key className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">Get API Keys</h3>
                  <p className="text-sm text-text-secondary">Sign up for a developer account to get access to your sandbox keys.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
