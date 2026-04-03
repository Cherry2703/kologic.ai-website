"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line, Float } from "@react-three/drei";
import * as THREE from "three";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import {
  Landmark,
  ShoppingCart,
  HeartPulse,
  Utensils,
  Users,
  SearchCode,
  Laptop,
  Headset,
  ArrowRight,
  Zap,
  Activity,
  ShieldCheck,
  Bot,
  BrainCircuit
} from "lucide-react";

// --- DATA ---
const industriesData = [
  { 
    id: "bank",
    title: "Bank Assist", 
    icon: Landmark, 
    desc: "Our revolutionary AI-powered virtual assistants redefine customer interactions within the banking sector. Tailored to your institution's specific needs, Bank Assist enhances customer engagement, streamlines processes, and delivers personalized assistance.",
    color: "from-blue-500 to-indigo-500"
  },
  { 
    id: "retail",
    title: "Retail Assist", 
    icon: ShoppingCart, 
    desc: "Elevate the retail experience with our AI-driven solution designed to provide personalized assistance. Retail Assist not only drives sales but also fosters customer loyalty by delivering tailored recommendations, promotions, and support throughout the shopping journey.",
    color: "from-pink-500 to-rose-500"
  },
  { 
    id: "health",
    title: "Health Assist", 
    icon: HeartPulse, 
    desc: "Transform healthcare delivery with our AI-enabled virtual assistants. Health Assist streamlines patient interactions, assists with appointment scheduling, medication reminders, and provides valuable health information, ultimately improving patient outcomes and satisfaction.",
    color: "from-emerald-500 to-teal-500"
  },
  { 
    id: "food",
    title: "Food Assist", 
    icon: Utensils, 
    desc: "Enhance the dining experience with our suite of AI-driven solutions. From optimizing ordering processes to streamlining delivery logistics and enhancing customer service, Food Assist ensures a seamless and delightful experience for both restaurants and diners.",
    color: "from-orange-500 to-amber-500"
  },
  { 
    id: "search",
    title: "Search Assist", 
    icon: SearchCode, 
    desc: "Empower your customers with seamless browsing and purchasing experiences through our AI-driven Search Assist. By providing intuitive search capabilities, we ensure customers find what they need quickly and effortlessly, boosting satisfaction and conversion rates.",
    color: "from-violet-500 to-purple-500"
  },
  { 
    id: "hr",
    title: "HR Assist", 
    icon: Users, 
    desc: "Simplify HR processes and empower employees with our AI-driven assistance. From onboarding to performance management, HR Assist automates repetitive tasks, provides personalized support, and enhances employee engagement, driving organizational efficiency.",
    color: "from-cyan-500 to-blue-500"
  },
  { 
    id: "it",
    title: "IT Assist", 
    icon: Laptop, 
    desc: "Enhance IT support services with our intelligent virtual assistants. IT Assist troubleshoots issues, provides timely solutions, and empowers employees to resolve technical challenges efficiently, minimizing downtime and disruptions.",
    color: "from-slate-500 to-gray-500"
  },
  { 
    id: "agent",
    title: "Agent Assist", 
    icon: Headset, 
    desc: "Equip your customer service agents with AI-driven tools to enhance productivity and customer satisfaction. Agent Assist streamlines workflows, provides real-time insights, and offers personalized support, enabling agents to deliver exceptional service experiences.",
    color: "from-primary to-accent"
  }
];

const benefits = [
  { title: "Faster Support", value: "40%", desc: "Reduction in average handling time", icon: Zap },
  { title: "Intelligent Automation", value: "24/7", desc: "Always-on conversational AI agents", icon: Bot },
  { title: "Improved Efficiency", value: "3x", desc: "Increase in operational throughput", icon: Activity },
  { title: "Scalable Platforms", value: "100%", desc: "Enterprise-grade security and compliance", icon: ShieldCheck },
];

// --- 3D ECOSYSTEM COMPONENTS ---

function EcosystemNode({ 
  data, 
  position 
}: { 
  data: typeof industriesData[0]; 
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = data.icon;

  return (
    <group position={position}>
      {/* Connecting Line to Center */}
      <Line 
        points={[[0, 0, 0], [0, 0, 0]]} // Initial state, we'll animate it if needed, or just static
        color="#4F46E5"
        transparent
        opacity={hovered ? 0.8 : 0.2}
        lineWidth={hovered ? 3 : 1}
      />
      {/* We actually draw the line separately below for better management, but keeping this group structure */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html center zIndexRange={[100, 0]}>
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Pulsing Glow */}
            <div className={`absolute inset-0 rounded-full bg-linear-to-tr ${data.color} blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />
            
            {/* The Node Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-xl flex items-center justify-center relative z-10 transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
              <Icon className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
            </div>

            {/* Hover Tooltip */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white border border-gray-100 rounded-xl p-4 shadow-2xl transition-all duration-300 origin-top pointer-events-none ${hovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}>
              <h4 className="font-bold text-sm text-text-primary mb-1">{data.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{data.desc}</p>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function EcosystemLines({ nodesPos }: { nodesPos: [number, number, number][] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Pulse entire network opacity slightly
      const opacity = 0.2 + Math.sin(clock.elapsedTime * 2) * 0.1;
      groupRef.current.children.forEach((child) => {
        if (child.type === 'Line2') {
          // @ts-expect-error - LineMaterial isn't fully typed in drei exports sometimes
          if (child.material) child.material.opacity = opacity;
        }
      });
      
      // Animate particles along the paths
      const time = clock.elapsedTime * 0.5; // Speed
      nodesPos.forEach((pos, i) => {
        // Find the mesh corresponding to this path
        // We structure it so the Sphere is the next child after the Line
        const particle = groupRef.current?.children[i * 2 + 1] as THREE.Mesh;
        if (particle) {
          // Calculate lerp factor between 0 and 1, repeating
          const t = (time + i * 0.2) % 1; 
          // Lerp position from node (pos) to center (0,0,0)
          particle.position.x = pos[0] * (1 - t);
          particle.position.y = pos[1] * (1 - t);
          particle.position.z = pos[2] * (1 - t);
          
          // Fade out as it reaches center
          const mat = particle.material as THREE.MeshBasicMaterial;
          mat.opacity = Math.sin(t * Math.PI); // Fades in at start, out at end
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nodesPos.map((pos, i) => (
        <React.Fragment key={i}>
          {/* Static Line */}
          <Line 
            points={[[0, 0, 0], pos]}
            color="#4F46E5"
            transparent
            opacity={0.3}
            lineWidth={2}
          />
          {/* Moving Data Particle */}
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#6EE7B7" transparent opacity={0} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

function AI3DEcosystem() {
  const nodesPos = useMemo(() => {
    // Stadium Dimensions
    const straightLength = 6; 
    const radius = 3;
    
    // Total perimeter = Two straight lines + Full circle
    const perimeter = 2 * straightLength + 2 * Math.PI * radius;
    
    return industriesData.map((_, i) => {
      // Find the distance along the perimeter for this node
      const d = (i / industriesData.length) * perimeter;
      
      let x = 0;
      let z = 0;

      // Map distance 'd' to the stadium shape
      if (d < straightLength) {
        // Top straight edge (moving left to right)
        x = -straightLength/2 + d;
        z = -radius;
      } else if (d < straightLength + Math.PI * radius) {
        // Right semi-circle
        const angle = -Math.PI/2 + ((d - straightLength) / (Math.PI * radius)) * Math.PI;
        x = straightLength/2 + Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      } else if (d < 2 * straightLength + Math.PI * radius) {
        // Bottom straight edge (moving right to left)
        x = straightLength/2 - (d - (straightLength + Math.PI * radius));
        z = radius;
      } else {
        // Left semi-circle
        const angle = Math.PI/2 + ((d - (2 * straightLength + Math.PI * radius)) / (Math.PI * radius)) * Math.PI;
        x = -straightLength/2 + Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }
      
      // Keep nodes mostly on a flat plane, but add a tiny bit of floating y offset for 3D feel
      const y = Math.sin(i * 1.5) * 0.5;
      
      return [x, y, z] as [number, number, number];
    });
  }, []);

  return (
    <div className="w-full h-[600px] relative bg-transparent rounded-3xl overflow-hidden border border-gray-100/50 shadow-2xl shadow-primary/5">
      <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 to-white/20 backdrop-blur-3xl -z-10" />
      <GradientBlob color="accent" className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />

        <group>
          {/* Center Platform Node */}
          <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
            <Html center>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-primary to-accent shadow-2xl flex items-center justify-center text-white relative z-10 border border-white/20">
                  <BrainCircuit className="w-10 h-10" />
                </div>
                <div className="absolute top-full mt-4 text-center whitespace-nowrap">
                  <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-primary border border-primary/10 shadow-sm">
                    Kologic AI Core
                  </span>
                </div>
              </div>
            </Html>
          </Float>

          {/* Lines going out */}
          <EcosystemLines nodesPos={nodesPos} />

          {/* Industry Nodes */}
          {industriesData.map((data, i) => (
            <EcosystemNode key={data.id} data={data} position={nodesPos[i]} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}

// --- MAIN PAGE ---

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-0 relative overflow-hidden bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32">
        <GradientBlob color="primary" className="w-[800px] h-[800px] top-0 left-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-6 leading-tight">
              AI Solutions for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Every Industry</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10">
              Kologic delivers AI-powered assistants and automation platforms designed to transform customer and employee experiences across industries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#solutions"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-text-primary border border-gray-200 font-medium hover:bg-gray-50 transition-all shadow-sm"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* XO PLATFORM SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative rounded-3xl overflow-hidden bg-white border border-gray-100/50 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-accent" />
            <GradientBlob color="secondary" className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
                XO Platform
              </h2>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                XO Platform by Kore.ai revolutionizes business interactions, offering advanced tools for customer engagement and employee collaboration. With seamless integration across channels, businesses can nurture relationships, drive revenue, and enhance productivity. Its intuitive interface and intelligent features empower organizations to adapt and thrive in the digital age, fostering innovation and success.
              </p>
              <div className="inline-flex items-center gap-4 flex-wrap justify-center font-semibold text-primary/80">
                Explore XO Platform for Intelligent CX and EX Solutions
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 3D ECOSYSTEM SECTION */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">The Kologic AI Ecosystem</h2>
              <p className="text-text-secondary">A unified core intelligence powering vertical-specific capabilities.</p>
            </div>
            {/* React There Fiber Canvas */}
            <AI3DEcosystem />
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTIONS CARDS SECTION */}
      <section id="solutions" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Vertical Solutions</h2>
            <p className="text-lg text-text-secondary">
              Purpose-built AI agents equipped with domain knowledge to immediately drive value in your specific industry sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <GlassCard hoverEffect className="h-full bg-white flex flex-col group border-gray-100 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${item.color}" />
                    
                    <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-linear-to-br ${item.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section className="py-32 bg-text-primary text-white relative overflow-hidden">
        <GradientBlob color="accent" className="w-[800px] h-[800px] top-0 right-0 opacity-10 filter blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proven Enterprise Impact</h2>
            <p className="text-lg text-gray-400">
              Our AI solutions don&apos;t just innovate—they deliver measurable ROI across all operational verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary mx-auto flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400">{stat.value}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{stat.title}</h4>
                  <p className="text-sm text-gray-400">{stat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-white to-gray-50/50" />
        <GradientBlob color="primary" className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Transform Your Industry <br className="hidden md:block"/> with AI</h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Ready to see how Kologic can optimize your specific workflows? Talk to one of our domain experts today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
              >
                Request Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-text-primary border border-gray-200 font-medium hover:bg-gray-50 transition-all"
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
