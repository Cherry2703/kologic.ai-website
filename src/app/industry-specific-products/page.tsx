"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { 
  Briefcase,
  ArrowRight,
  LineChart, 
  Plane, 
  Maximize, 
  Rocket, 
  ShieldCheck, 
  Database,
  Award,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export interface FeatureData {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  desc: string;
}

const features: FeatureData[] = [
  { 
    title: "Dynamic Pricing", 
    icon: <LineChart className="w-6 h-6" />, 
    desc: "Our Dynamic Pricing tool uses machine learning algorithms to analyze multiple data streams, including market demand, competitor pricing, and historical data. Adjust prices in real time, enhancing revenue and reducing the likelihood of unsold inventory." 
  },
  { 
    title: "Turnaround Optimization in Airside Operations", 
    icon: <Plane className="w-6 h-6" />, 
    desc: "Our Turnaround Optimization tool leverages AI to streamline various components of airside operations, from baggage handling and refueling to maintenance checks and crew management. Signficantly reduces downtime." 
  },
  { 
    title: "Scalability & Adaptability", 
    icon: <Maximize className="w-6 h-6" />, 
    desc: "Our AI solutions are designed for scalability, ensuring that as a business grows, its core systems can adapt without the need for constant overhauls, thus reducing long-term technology costs and maintaining competitive agility." 
  },
  { 
    title: "Swift Adoption of Technologies", 
    icon: <Rocket className="w-6 h-6" />, 
    desc: "AIOS focuses on developing user-friendly interfaces that ensure high usability and facilitate swift adoption, helping users to transition smoothly and derive maximum benefit from new technologies without extensive training." 
  },
  { 
    title: "Risk and Compliance", 
    icon: <ShieldCheck className="w-6 h-6" />, 
    desc: "Our products are built with advanced security features and compliance protocols integrated into their design, ensuring that enterprises can mitigate risks effectively and avoid potential fines and reputational damage." 
  },
  { 
    title: "Data Fragmentation and Utilization", 
    icon: <Database className="w-6 h-6" />, 
    desc: "Our industry-specific Data Fabric integrates various data sources into a cohesive, accessible framework, enhancing data interoperability and enabling more effective data-driven decision-making." 
  },
  { 
    title: "Commitment to Excellence", 
    icon: <Award className="w-6 h-6" />, 
    desc: "As our products are being developed, we remain committed to delivering revolutionary, reliable, and robust AI-powered tools designed to empower industries to navigate complex market landscapes and excel." 
  },
];

function FeaturePanel({ feature }: { feature: FeatureData }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

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
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden lg:block w-full h-full relative"
    >
      <GradientBlob color="secondary" className="w-[500px] h-[500px] -bottom-20 -right-20 opacity-30 absolute -z-10 blur-3xl" />
      <GradientBlob color="primary" className="w-[500px] h-[500px] -top-20 -left-20 opacity-20 absolute -z-10 blur-3xl" />
      
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full min-h-[450px] rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-primary/10 p-10 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 flex flex-col h-full"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-8 border border-primary/20 shadow-inner"
          >
            {React.cloneElement(feature.icon, { className: "w-10 h-10" })}
          </motion.div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{feature.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            {feature.desc}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FeatureItem({ 
  feature, 
  isActive, 
  onClick, 
  onMouseEnter 
}: { 
  feature: FeatureData, 
  isActive: boolean, 
  onClick: () => void, 
  onMouseEnter: () => void 
}) {
  return (
    <div className="w-full">
      {/* Desktop/Tablet List Item */}
      <motion.button
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        className={`hidden lg:flex w-full text-left p-5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
          isActive 
            ? "bg-white border border-primary/20 shadow-lg shadow-primary/5" 
            : "hover:bg-white/40 border border-transparent"
        }`}
      >
        {isActive && (
          <motion.div 
            layoutId="activeFeatureIndicator"
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-primary to-secondary rounded-l-2xl"
          />
        )}
        <div className="flex items-center gap-4 relative z-10 w-full">
          <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
          }`}>
            {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
          </div>
          <span className={`text-lg font-bold transition-colors duration-300 grow ${
            isActive ? "text-primary" : "text-gray-600 group-hover:text-gray-900"
          }`}>
            {feature.title}
          </span>
        </div>
        {isActive && (
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent pointer-events-none" />
        )}
      </motion.button>

      {/* Mobile Accordion Item */}
      <div className={`lg:hidden mb-4 rounded-2xl border transition-all duration-300 overflow-hidden ${isActive ? "bg-white border-primary/20 shadow-lg shadow-primary/5" : "bg-white/60 border-gray-100 shadow-sm"}`}>
        <button 
          onClick={onClick}
          className="w-full p-5 text-left flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
               {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
            </div>
            <span className={`font-bold transition-colors ${isActive ? "text-primary" : "text-gray-900"}`}>{feature.title}</span>
          </div>
          <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                {feature.desc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      {/* Left Column - Navigator */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="w-full lg:w-5/12 flex flex-col gap-2 z-10"
      >
        {features.map((feature, idx) => (
          <FeatureItem 
            key={idx}
            feature={feature}
            isActive={activeIndex === idx}
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => setActiveIndex(idx)}
          />
        ))}
      </motion.div>
      
      {/* Right Column - Preview Panel (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden lg:block lg:w-7/12 relative z-0"
      >
        <AnimatePresence mode="wait">
          <FeaturePanel key={activeIndex} feature={features[activeIndex]} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function IndustrySpecificProductsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/40">
      <GradientBlob color="primary" className="w-[800px] h-[800px] -top-40 -right-40 opacity-10" />
      <GradientBlob color="secondary" className="w-[800px] h-[800px] top-1/2 -left-40 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
            <Briefcase className="w-4 h-4" />
            <span>Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-8 leading-[1.1]">
            Industry-Specific <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              Products
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Addressing the challenges and plugging the opportunity gap in each sector with pioneering AI technologies and in-depth industry expertise while predicting future demands.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100/50 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-primary via-secondary to-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Why Choose Us?</h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-4xl">
            As leaders in the AI innovation space, we are committed to untangling complex enterprise challenges with speed and sustainability. Our cutting-edge solutions herald a new era of information, insight, and intelligence into the business ecosystem, enabling enterprises to power through an increasingly dynamic landscape.
          </p>
        </motion.div>

        {/* What Sets Us Apart - Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">What Sets Us Apart</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Discover the core pillars that make Kologic&apos;s industry solutions powerful and robust.</p>
        </div>

        {/* Modern Interactive Feature Navigator Section */}
        <div className="mb-32">
          <FeatureNavigator />
        </div>

        {/* CTA Section */}
        <motion.div 
          className="relative rounded-3xl overflow-hidden bg-text-primary text-white p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
           <GradientBlob color="accent" className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started on Your AI Journey</h2>
             <p className="text-lg text-gray-300 mb-8">
               Are you ready to transform your business through the power of AI? Discover how our transformative solutions can revolutionize your business goals and drive unprecedented growth.
             </p>
             <Link
               href="/contact"
               className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 group"
             >
               Get in touch
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
