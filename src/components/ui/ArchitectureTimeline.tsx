"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, Brain, Cpu, Workflow, LineChart } from "lucide-react";

interface TimelineNodeData {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactElement<{ className?: string }>;
  align: "top" | "bottom";
}

const timelineData: TimelineNodeData[] = [
  { id: 1, title: "Data Layer", desc: "Secure integration & normalization of enterprise data sources into unified formats.", icon: <Database />, align: "bottom" },
  { id: 2, title: "AI Models", desc: "Orchestration of state-of-the-art LLMs, Vision, and custom fine-tuned models.", icon: <Brain />, align: "top" },
  { id: 3, title: "Agents", desc: "Advanced reasoning engines providing context, memory, and cognitive steps.", icon: <Cpu />, align: "bottom" },
  { id: 4, title: "Automation", desc: "Seamless execution of tasks, API integrations, and complex workflows.", icon: <Workflow />, align: "top" },
  { id: 5, title: "Outcomes", desc: "Actionable business ROI, analytics, and measurable metrics.", icon: <LineChart />, align: "bottom" },
];

export function ArchitectureTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative w-full py-10">
      {/* Mobile/Tablet Vertical Timeline */}
      <div className="block lg:hidden relative border-l-2 border-primary/20 ml-6 sm:ml-12 pl-8 pb-10 space-y-12">
        {timelineData.map((node, index) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative"
          >
            {/* Outline Dot */}
            <div className="absolute -left-[41px] top-4 w-5 h-5 bg-white border-4 border-primary rounded-full shadow-lg shadow-primary/30" />
            
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col sm:flex-row items-start gap-4 hover:shadow-primary/10 transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/10">
                {React.cloneElement(node.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <span className="block text-primary text-xs font-bold tracking-widest uppercase mb-1">0{node.id}</span>
                <h3 className="text-xl font-bold text-text-primary mb-2">{node.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{node.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Curved Timeline */}
      <div className="hidden lg:block relative w-full h-[500px]">
        {/* SVG Path */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Background dashed line */}
            <path 
              d="M 0 100 C 50 100, 75 100, 100 100 C 200 100, 200 150, 300 150 C 400 150, 400 50, 500 50 C 600 50, 600 150, 700 150 C 800 150, 800 50, 900 50 C 950 50, 1000 50, 1000 50"
              fill="none"
              stroke="url(#timeline-grad)"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="opacity-30"
            />
            {/* Animated solid line */}
            <motion.path 
              d="M 0 100 C 50 100, 75 100, 100 100 C 200 100, 200 150, 300 150 C 400 150, 400 50, 500 50 C 600 50, 600 150, 700 150 C 800 150, 800 50, 900 50 C 950 50, 1000 50, 1000 50"
              fill="none"
              stroke="url(#timeline-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Floating Nodes */}
        {timelineData.map((node, index) => {
          let leftPercent = 10;
          let topPercent = 50;

          if (index === 0) { leftPercent = 10; topPercent = 50; }
          else if (index === 1) { leftPercent = 30; topPercent = 75; }
          else if (index === 2) { leftPercent = 50; topPercent = 25; }
          else if (index === 3) { leftPercent = 70; topPercent = 75; }
          else if (index === 4) { leftPercent = 90; topPercent = 25; }

          return (
            <TimelineNode 
              key={node.id} 
              node={node} 
              delay={index * 0.4} 
              left={`${leftPercent}%`} 
              top={`${topPercent}%`} 
              isInView={isInView}
            />
          );
        })}
      </div>
    </div>
  );
}

function TimelineNode({ node, delay, left, top, isInView }: { node: TimelineNodeData, delay: number, left: string, top: string, isInView: boolean }) {
  // If align === "top", the expanded panel appears ABOVE the node. So the static label should be grouped BELOW the node.
  const isTop = node.align === 'top';

  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 group"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
    >
      {/* Container for Hover animation (only applying float up and down) */}
      <motion.div 
        className="relative flex items-center justify-center cursor-pointer"
        whileHover="hover"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
      >
        {/* Core Node Icon */}
        <div className="w-16 h-16 rounded-full bg-white shadow-xl shadow-primary/20 border-2 border-primary/20 flex items-center justify-center text-primary relative z-20 group-hover:border-primary group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
          {React.cloneElement(node.icon, { className: "w-7 h-7" })}
        </div>
        
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 opacity-0 group-hover:opacity-100 z-0 pointer-events-none" />

        {/* Node Label (Always Visible) */}
        <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0 ${isTop ? 'top-full mt-4' : 'bottom-full mb-4'}`}>
          <span className="block text-primary/80 text-xs font-black tracking-widest uppercase mb-1 drop-shadow-sm">0{node.id}</span>
          <span className="block font-bold text-text-primary drop-shadow-sm">{node.title}</span>
        </div>

        {/* Interactive Expanded Panel */}
        <motion.div 
          className={`absolute left-1/2 w-64 p-5 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100 z-50 text-left pointer-events-none ${isTop ? 'bottom-full mb-6' : 'top-full mt-6'}`}
          style={{ x: "-50%", originY: isTop ? 1 : 0 }}
          initial={{ opacity: 0, scale: 0.9, y: isTop ? 15 : -15, filter: "blur(4px)" }}
          variants={{
            hover: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 400, damping: 25 } }
          }}
        >
          {/* Caret pointing to Node */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-gray-100 border-b border-r rotate-45 ${isTop ? '-bottom-2' : '-top-2 border-t border-l border-b-0 border-r-0'}`} />
          
          <div className="relative z-10">
            <span className="block text-primary text-xs font-bold tracking-widest uppercase mb-1">Step 0{node.id}</span>
            <h4 className="font-bold text-text-primary mb-2 text-lg">{node.title}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{node.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
