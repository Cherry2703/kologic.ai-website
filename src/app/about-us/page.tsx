"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import {
  Brain,
  Cpu,
  Database,
  Sparkles,
  ArrowRight,
  Zap,
  Server,
  LineChart,
  Bot,
  PlayCircle,
  Newspaper
} from "lucide-react";

  function HeroNetwork() {
    const groupRef = useRef<THREE.Group>(null);
    const [isMounted, setIsMounted] = useState(false);
    
    // Generate particles in useEffect to prevent hydration mismatch
    const [particles, setParticles] = useState<{pos: [number, number, number], size: number, color: string, speed: number, rotInt: number, floatInt: number}[]>([]);

    useEffect(() => {
      // eslint-disable-next-line
      setParticles(Array.from({ length: 25 }).map(() => ({
        pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number, number],
        size: 0.03 + Math.random() * 0.05,
        color: Math.random() > 0.5 ? "#6EE7B7" : "#c084fc",
        speed: Math.random() * 2 + 1,
        rotInt: Math.random() * 2,
        floatInt: Math.random() * 3
      })));
      setIsMounted(true);
    }, []);
    
    useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial color="#4F46E5" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
      </mesh>
      
      {/* Floating particles */}
      {isMounted && particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={p.rotInt} floatIntensity={p.floatInt}>
          <mesh position={p.pos}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color={p.color} />
          </mesh>
          {i % 3 === 0 && (
            <Line 
              points={[[0, 0, 0], [-p.pos[0]*0.5, -p.pos[1]*0.5, -p.pos[2]*0.5]]}
              color={p.color}
              transparent
              opacity={0.2}
              lineWidth={1}
            />
          )}
        </Float>
      ))}
    </group>
  );
}

// --- PURPOSE ORBIT 3D COMPONENT ---
function PurposeOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = [
    { name: "Infrastructure", color: "#3b82f6", icon: Server },
    { name: "Data", color: "#10b981", icon: Database },
    { name: "Automation", color: "#f59e0b", icon: Cpu },
    { name: "Insights", color: "#8b5cf6", icon: LineChart },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center AI Node */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} wireframe />
      </mesh>
      <Html center zIndexRange={[100, 0]} className="pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.5)]">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </Html>

      {/* Orbiting Nodes */}
      {nodes.map((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2;
        const radius = 3.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.8; // Bobbing effect

        const Icon = node.icon;

        return (
          <group key={node.name} position={[x, y, z]}>
            <Line 
              points={[[-x, -y, -z], [0, 0, 0]]} 
              color={node.color} 
              transparent 
              opacity={0.4} 
              lineWidth={1.5} 
            />
            
            <Html center zIndexRange={[100, 0]}>
              <div className="flex flex-col items-center gap-2 group transition-transform hover:scale-110 cursor-pointer">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md border border-white/40"
                  style={{ backgroundColor: `${node.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: node.color }} />
                </div>
                <span className="text-xs font-bold bg-white/90 px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap text-gray-800 border border-gray-100">
                  {node.name}
                </span>
              </div>
            </Html>
            
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// --- MAIN PAGE ---
export default function AboutUsPage() {
  const capabilities = [
    { title: "AI Transformation", icon: Brain, desc: "Seamlessly integrate generative AI into your core business models.", color: "from-purple-500 to-indigo-500" },
    { title: "Enterprise Automation", icon: Cpu, desc: "Automate complex workflows and replace repetitive manual processes.", color: "from-cyan-500 to-blue-500" },
    { title: "Conversational AI", icon: Sparkles, desc: "Deploy intelligent agents that understand context and drive engagement.", color: "from-pink-500 to-rose-500" },
    { title: "Data Intelligence", icon: Database, desc: "Unlock actionable insights from unstructured enterprise data.", color: "from-emerald-500 to-teal-500" },
  ];

  const timeline = [
    { title: "Data", desc: "Connecting silos." },
    { title: "AI", desc: "Understanding context." },
    { title: "Automation", desc: "Executing workflows." },
    { title: "Intelligent Enterprises", desc: "Driving innovation." }
  ];

  const frameworkSteps = [
    { id: "01", title: "Infrastructure", desc: "Secure foundation" },
    { id: "02", title: "Data Integration", desc: "Unified knowledge" },
    { id: "03", title: "AI Intelligence", desc: "Cognitive core" },
    { id: "04", title: "Enterprise Automation", desc: "Autonomous workflows" },
  ];

  const demoBots = [
    { title: "Retail Assistant Config", desc: "Test the customer inquiry module.", icon: Bot, color: "from-pink-500 to-rose-500" },
    { title: "Financial Analyst AI", desc: "Interact with real-time logic.", icon: LineChart, color: "from-blue-500 to-indigo-500" },
  ];

  const newsItems = [
    { title: "Kologic Raises Series B", date: "Oct 15, 2025", desc: "Scaling our AI infrastructure further." },
    { title: "New Enterprise Partnerships", date: "Sep 22, 2025", desc: "Joining forces with top Fortune 500s." },
    { title: "Industry Award 2025", date: "Aug 10, 2025", desc: "Recognized as top AI innovator." },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-0 pb-0 relative bg-white selection:bg-primary/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-gray-100">
        <GradientBlob color="primary" className="w-[1000px] h-[1000px] top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-15" />
        <GradientBlob color="secondary" className="w-[800px] h-[800px] bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> About Kologic
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-8 leading-tight">
                Breaking Down the <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
                  Barriers to Innovation
                </span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
                Kologic is an AI innovation company helping businesses transform through generative AI, automation, and intelligent data systems. We bridge the gap between breakthrough technology and enterprise value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center sm:justify-start gap-2 group"
                >
                  Work With Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="h-[500px] lg:h-[700px] w-full relative -z-10 lg:z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotateSpeed={0.5} />
                <HeroNetwork />
              </Canvas>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW (CAPABILITIES) */}
      <section className="py-24 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
            >
              Our Core Capabilities
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-secondary"
            >
              We deliver end-to-end transformation by combining deep domain expertise with state-of-the-art artificial intelligence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <GlassCard hoverEffect className="h-full bg-white relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${cap.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-linear-to-br ${cap.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">{cap.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {cap.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-text-primary text-white" />
        <GradientBlob color="accent" className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block text-accent font-semibold tracking-widest uppercase text-sm mb-6">Our Mission</div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              &quot;Transform businesses into <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">intelligent enterprises</span> where data flows freely and insights drive action.&quot;
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 4. VISION TIMELINE SECTION */}
      <section className="py-24 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Our Vision</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We envision a future where AI is seamlessly integrated across all business domains, creating unprecedented synergy between human creativity and machine intelligence.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting background line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-linear-to-r from-blue-100 via-primary/30 to-purple-100 -translate-y-1/2 rounded-full" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {timeline.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group flex flex-col items-center lg:block"
                >
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-primary/30 transition-all text-center h-full w-full max-w-xs lg:max-w-none">
                    {/* Circle Node */}
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/5 transition-colors border border-gray-100 group-hover:border-primary/20 relative">
                      <div className="text-2xl font-bold text-gray-300 group-hover:text-primary/50 transition-colors">
                        0{idx + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                    <p className="text-text-secondary text-sm">{step.desc}</p>
                  </div>
                  
                  {/* Arrows for mobile/tablet */}
                  {idx < timeline.length - 1 && (
                    <div className="lg:hidden flex justify-center py-4 text-gray-300">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PURPOSE 3D SECTION */}
      <section className="py-32 bg-gray-50/50 border-y border-gray-100 relative overflow-hidden">
        <GradientBlob color="primary" className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">Our Purpose</h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                We exist to unlock infinite efficiency and productivity. By placing AI at the center of your operations, we connect your infrastructure, data, automation, and insights into a single living ecosystem.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-xl text-primary"><Zap className="w-5 h-5"/></div>
                  <div>
                    <h4 className="font-bold text-text-primary">Accelerated Operations</h4>
                    <p className="text-sm text-text-secondary">Reduce task completion times from days to seconds.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-accent/10 p-2 rounded-xl text-accent"><Bot className="w-5 h-5"/></div>
                  <div>
                    <h4 className="font-bold text-text-primary">Cognitive Agents</h4>
                    <p className="text-sm text-text-secondary">Deploy autonomous software that learns and adapts.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            {/* The canvas takes up full width on mobile, right beside content on desktop */}
            <motion.div 
              className="order-2 lg:order-1 h-[500px] w-full bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-primary/5 relative pointer-events-auto!"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-400 border border-gray-100 z-10 select-none pointer-events-none">
                Interactive Engine
              </div>
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }} className="rounded-3xl cursor-grab active:cursor-grabbing">
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.5} minPolarAngle={Math.PI/4} />
                <PurposeOrbit />
              </Canvas>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. AI TRANSFORMATION FRAMEWORK */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">AI Transformation Framework</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our structured approach guarantees seamless AI adoption mapped directly to your business goals.
            </p>
          </motion.div>

          {/* Workflow boxes stacked vertically/horizontally */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6 lg:h-48 group/framework">
            {frameworkSteps.map((step, idx) => (
              <motion.div 
                key={step.id}
                className="flex-1 flex flex-col group/card relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="bg-gray-50 border border-gray-100 hover:border-text-primary transition-colors rounded-2xl p-6 h-full flex flex-col justify-center relative z-10 hover:shadow-xl hover:shadow-gray-200">
                  <div className="text-3xl font-black text-gray-200 group-hover/card:text-primary transition-colors absolute top-4 right-4">{step.id}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 mt-4 z-10">{step.title}</h3>
                  <p className="text-sm text-text-secondary z-10">{step.desc}</p>
                </div>
                {/* Visual connecting pipe for Desktop */}
                {idx < frameworkSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-6 h-[2px] bg-gray-200 z-0 overflow-hidden">
                     <div className="w-full h-full bg-primary -translate-x-full group-hover/card:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>
                )}
                {/* Visual connecting pipe for Mobile */}
                {idx < frameworkSteps.length - 1 && (
                  <div className="lg:hidden mx-auto w-[2px] h-4 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 INTERACTIVE DEMOS & NEWSROOM MERGED SECTION */}
      <section className="py-24 bg-gray-50/50 border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Interactive Demos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-text-primary">Interactive Demos</h2>
              </div>
              <p className="text-text-secondary mb-8">
                Experience our custom conversational agents in a simulated environment. We build specialized bots tailored to distinct enterprise verticals.
              </p>
              
              <div className="flex flex-col gap-4">
                {demoBots.map((bot, idx) => {
                  const Icon = bot.icon;
                  return (
                    <GlassCard key={idx} hoverEffect className="bg-white p-6 flex items-start gap-4 cursor-pointer group">
                      <div className={`w-12 h-12 rounded-xl flex shrink-0 items-center justify-center bg-linear-to-br ${bot.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{bot.title}</h4>
                        <p className="text-sm text-text-secondary">{bot.desc}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>

            {/* Newsroom */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Newspaper className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-text-primary">Press & Newsroom</h2>
              </div>
              <p className="text-text-secondary mb-8">
                Stay updated with the latest from the Kologic team, including product releases, strategic partnerships, and general company news.
              </p>

              <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 relative shadow-lg group">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-colors z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://kologic.ai/images/newsroom-banner_V2.webp" 
                  alt="Kologic Newsroom Banner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {newsItems.map((news, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-primary mb-2 block">{news.date}</span>
                    <h4 className="font-bold text-text-primary text-lg mb-1">{news.title}</h4>
                    <p className="text-sm text-text-secondary">{news.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 relative overflow-hidden bg-text-primary text-white">
        <GradientBlob color="primary" className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 filter blur-3xl mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Transform Your Business <br className="hidden md:block"/> with AI
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the forward-thinking enterprises that are leveraging Kologic to outpace their competition and redefine their industry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 shrink-0 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center sm:justify-start gap-2 group"
                >
                Request Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 font-medium hover:bg-white/20 transition-all text-center flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
