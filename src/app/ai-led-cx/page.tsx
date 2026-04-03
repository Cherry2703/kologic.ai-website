"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { 
  Briefcase,
  HeadphonesIcon,
  Bot,
  Workflow,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export interface FeatureData {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  desc: string;
}

function CarouselCard({ feature, isActive }: { feature: FeatureData; isActive: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white/60 p-8 md:p-14 relative overflow-hidden flex flex-col items-center text-center transition-shadow duration-500 ${isActive ? 'shadow-2xl shadow-primary/10' : 'shadow-lg'}`}
    >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div 
          style={{ transform: isActive ? "translateZ(40px)" : "translateZ(0px)" }}
          className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-8 border border-primary/20 shadow-inner transition-transform duration-500"
        >
          {React.cloneElement(feature.icon, { className: "w-10 h-10" })}
        </div>
        
        <h3 
          style={{ transform: isActive ? "translateZ(30px)" : "translateZ(0px)" }}
          className="text-2xl md:text-4xl font-bold text-text-primary mb-6 leading-tight transition-transform duration-500"
        >
          {feature.title}
        </h3>
        
        <p 
          style={{ transform: isActive ? "translateZ(20px)" : "translateZ(0px)" }}
          className="text-base md:text-lg text-text-secondary leading-relaxed transition-transform duration-500 max-w-2xl"
        >
          {feature.desc}
        </p>
    </motion.div>
  );
}

function CardDeckCarousel({ features }: { features: FeatureData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % features.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);

  // Swipe support Mobile
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStart - touchEndX > 50) next();
    if (touchEndX - touchStart > 50) prev();
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto mb-32 flex flex-col items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-center w-full min-h-[500px] md:min-h-[550px] relative perspective-1000">
          {features.map((feature, i) => {
            const isActive = i === currentIndex;
            const isPrev = i === (currentIndex - 1 + features.length) % features.length;
            const isNext = i === (currentIndex + 1) % features.length;
            
            let xPos = "0%";
            let scaleVal = 1;
            let opacityVal = 1;
            let zIndexVal = 10;
            let visibilityClass = "";

            if (isPrev) {
              xPos = "-80%";
              scaleVal = 0.85;
              opacityVal = 0.6;
              zIndexVal = 5;
              visibilityClass = "hidden md:block"; // hide sides on mobile
            } else if (isNext) {
              xPos = "80%";
              scaleVal = 0.85;
              opacityVal = 0.6;
              zIndexVal = 5;
              visibilityClass = "hidden md:block"; // hide sides on mobile
            } else if (!isActive) {
              // Hide completely if there were more than 3 cards (currently only 3 exist)
              opacityVal = 0;
              zIndexVal = 0;
              visibilityClass = "hidden";
            }
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ x: xPos, scale: scaleVal, opacity: opacityVal, zIndex: zIndexVal }}
                transition={{ duration: 0.45, type: "spring", stiffness: 200, damping: 20 }}
                className={`absolute w-full px-4 md:px-0 md:max-w-xl transition-all duration-300 ${!isActive ? "cursor-pointer filter md:blur-sm hover:blur-none" : ""} ${visibilityClass}`}
                onClick={() => {
                  if (isPrev) prev();
                  if (isNext) next();
                }}
              >
                 <CarouselCard feature={feature} isActive={isActive} />
              </motion.div>
            )
          })}
      </div>
      
      {/* Controls */}
      <CarouselControls onPrev={prev} onNext={next} />
    </div>
  );
}

function CarouselControls({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
  return (
    <div className="flex justify-center gap-6 mt-6 z-20">
      <button 
        onClick={onPrev} 
        className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-primary border border-gray-100 transition-all hover:scale-110 hover:bg-primary/5 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={onNext} 
        className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-primary border border-gray-100 transition-all hover:scale-110 hover:bg-primary/5 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

export default function AiLedCxPage() {
  const features: FeatureData[] = [
    { 
      title: "Transformative AI Customer Service Solutions", 
      icon: <HeadphonesIcon className="w-8 h-8" />, 
      desc: "Our suite of AI-driven tools, platforms, and solutions is designed to elevate service delivery thus enabling CX providers to exceed end-user expectations at a significantly optimized operational cost." 
    },
    { 
      title: "AI-First Customer Experience", 
      icon: <Bot className="w-8 h-8" />, 
      desc: "We embrace a digital-first strategy to ensure all customer interactions are enhanced by AI, resulting in faster resolutions and improved customer engagement. This approach is designed to not only streamline the customer journey by reducing the time spent on each interaction by up to 30% but also enable the customer to seek the service on the go through the preferred engagement channel." 
    },
    { 
      title: "AI-Enabled Agent Assist and Orchestration", 
      icon: <Workflow className="w-8 h-8" />, 
      desc: "We empower the CX agents with smart solutions and utilities that help them automate repetitive tasks, provide real-time insights to enhance personalization, leverage knowledge repositories to arrive at the best possible answers, and recommend the next best actions to improve service effectiveness and customer delight." 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/40">
      <GradientBlob color="accent" className="w-[800px] h-[800px] -top-40 -right-40 opacity-10" />
      <GradientBlob color="primary" className="w-[800px] h-[800px] top-1/2 -left-40 opacity-10" />
      
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
            Kore-Led <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              CX Solutions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Delivering tailor-made, efficient, and scalable customer service solutions to enhance the customer experience and also streamline operational progressions for expansion.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100/50 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary via-secondary to-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Why Choose Us?</h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-4xl">
            As leaders in the AI innovation space, we are committed to untangling complex enterprise challenges with speed and sustainability. Our cutting-edge solutions herald a new era of information, insight, and intelligence into the business ecosystem, enabling enterprises to power through an increasingly dynamic landscape.
          </p>
        </motion.div>

        {/* What Sets Us Apart - Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">What Sets Us Apart</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">See how Kologic&apos;s AI-driven approach elevates customer engagement and satisfaction benchmarks.</p>
        </div>

        {/* Deck Carousel */}
        <CardDeckCarousel features={features} />

        {/* CTA Section */}
        <motion.div 
          className="relative rounded-3xl overflow-hidden bg-text-primary text-white p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
           <GradientBlob color="primary" className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen" />
           
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
