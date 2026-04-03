"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { LineChart, Plane, Maximize, Rocket, ShieldCheck, Database, Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// -------------------------------------------------------------
// DATA
// -------------------------------------------------------------
const features = [
  { id: 0, title: "Dynamic Pricing", icon: LineChart, desc: "Our Dynamic Pricing tool uses machine learning algorithms to analyze demand patterns, competitor pricing, and historical data to adjust prices in real time and maximize revenue.", color: "#4F46E5" },
  { id: 1, title: "Turnaround Optimization", icon: Plane, desc: "Our Turnaround Optimization tool leverages AI to streamline various components of airside operations, significantly reducing downtime.", color: "#6EE7B7" },
  { id: 2, title: "Scalability", icon: Maximize, desc: "Our AI solutions are designed for scalability, ensuring that as a business grows, its core systems can adapt without the need for constant overhauls.", color: "#F59E0B" },
  { id: 3, title: "Swift Adoption", icon: Rocket, desc: "AIOS focuses on developing user-friendly interfaces that ensure high usability and facilitate swift adoption derived from maximum benefit.", color: "#ec4899" },
  { id: 4, title: "Risk & Compliance", icon: ShieldCheck, desc: "Our products are built with advanced security features and compliance protocols integrated into their design to mitigate risks effectively.", color: "#14b8a6" },
  { id: 5, title: "Data Fabric", icon: Database, desc: "Our industry-specific Data Fabric integrates various data sources into a cohesive, accessible framework, enhancing data interoperability.", color: "#8b5cf6" },
  { id: 6, title: "Commitment to Excellence", icon: Award, desc: "We remain committed to delivering revolutionary, reliable, and robust AI-powered tools designed to empower industries.", color: "#f43f5e" },
];

// Determine positions for the 7 branches/leaves spread around a tree
const leafPositions = [
  [-2.5, 2.5,  0.5], // Left mid
  [ 2.5, 3.0, -0.5], // Right mid
  [-1.5, 4.5, -1.0], // Top left back
  [ 1.5, 5.0,  1.5], // Top right front
  [ 0.0, 6.0, -0.0], // Top center
  [-3.0, 1.0, -1.5], // Bottom left far
  [ 3.0, 1.5,  1.0], // Bottom right far
].map(p => new THREE.Vector3(p[0], p[1], p[2]));

// -------------------------------------------------------------
// COMPONENTS
// -------------------------------------------------------------

function TreeBranch({ start, end, hovered, index }: { start: THREE.Vector3, end: THREE.Vector3, hovered: boolean, index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  // Create a proper curved cylinder from start to end
  const path = useMemo(() => {
    // Add a slight curve by creating a quadratic bezier from trunk to leaf
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    // Push the curve outward slightly based on index
    mid.x += Math.sin(index) * 0.5;
    mid.y -= 0.5;
    mid.z += Math.cos(index) * 0.5;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end, index]);

  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(path, 20, 0.08, 8, false), [path]);

  // Animate the branch pulsing if its leaf is hovered
  useFrame(() => {
    if (ref.current) {
      const targetColor = hovered ? new THREE.Color("#6EE7B7") : new THREE.Color("#4F46E5");
      const targetEmissive = hovered ? new THREE.Color("#6EE7B7") : new THREE.Color("#000000");
      
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.color.lerp(targetColor, 0.1);
      mat.emissive.lerp(targetEmissive, 0.1);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 1 : 0, 0.1);
    }
  });

  return (
    <mesh ref={ref} geometry={tubeGeometry}>
      <meshStandardMaterial color="#4F46E5" roughness={0.7} metalness={0.2} transparent opacity={0.6} />
    </mesh>
  );
}

function TreeLeaf({ 
  position, 
  data, 
  isHovered, 
  setHoveredNode 
}: { 
  position: THREE.Vector3; 
  data: typeof features[0]; 
  isHovered: boolean;
  setHoveredNode: (id: number | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Gentle breathing rotation
      ref.current.rotation.x = Math.sin(t * 0.5 + data.id) * 0.1;
      ref.current.rotation.y = Math.cos(t * 0.6 + data.id) * 0.1;
      
      // Scale up when hovered
      const targetScale = isHovered ? 1.4 : 1.0;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (glowRef.current) {
      const targetScale = isHovered ? 2.5 : 1.5;
      const targetOpacity = isHovered ? 0.6 : 0.2;
      glowRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity, 
        targetOpacity, 
        0.1
      );
    }
  });

  const Icon = data.icon;

  return (
    <group position={position}>
      {/* Interactive Core */}
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredNode(data.id); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredNode(null); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); setHoveredNode(data.id); }}
      >
        <icosahedronGeometry args={[0.4, 2]} />
        <meshPhysicalMaterial 
          color={isHovered ? "#ffffff" : data.color} 
          emissive={data.color}
          emissiveIntensity={isHovered ? 2 : 0.5}
          roughness={0.2} 
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>

      {/* Glow Halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Info Panel UI overlay on hover */}
      {isHovered && (
        <Html center position={[0, 1.2, 0]} zIndexRange={[100, 0]}>
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="w-72 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-5 flex flex-col pointer-events-none"
           >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-md shadow-primary/20" style={{ backgroundColor: data.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{data.desc}</p>
           </motion.div>
        </Html>
      )}
    </group>
  );
}

function TreeStructure({ hoveredNode, setHoveredNode }: { hoveredNode: number | null, setHoveredNode: (id: number | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Subtle overall tree sway
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
      groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.4, 4, 32]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.8} metalness={0.1} transparent opacity={0.3} />
        {/* Core glowing line */}
        <mesh position={[0,0,0]}>
           <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
           <meshBasicMaterial color="#6EE7B7" />
        </mesh>
      </mesh>

      {/* Base floor light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
         <planeGeometry args={[10, 10]} />
         <meshBasicMaterial color="#4F46E5" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Branches and Leaves */}
        {features.map((feature, i) => {
          const isHovered = hoveredNode === feature.id;
          const leafPos = leafPositions[i];
          // Branch starts around middle of trunk
          const startPos = new THREE.Vector3(0, Math.min(leafPos.y * 0.5, 2), 0);
          
          return (
            <group key={feature.id}>
              <TreeBranch start={startPos} end={leafPos} hovered={isHovered} index={i} />
              <TreeLeaf position={leafPos} data={feature} isHovered={isHovered} setHoveredNode={setHoveredNode} />
            </group>
          );
        })}
      </Float>
    </group>
  );
}

function Particles() {
  const count = 100;
  const [positions, setPositions] = useState<Float32Array | null>(null);

  React.useEffect(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    setPositions(arr);
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  if (!positions) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6EE7B7" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export function IndustryTree3D() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden bg-linear-to-b from-gray-900 via-indigo-950 to-gray-900 border border-indigo-900/50 shadow-2xl shadow-primary/20 cursor-crosshair">
      
      {/* Scene overlay texts */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 font-medium text-xs border border-white/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Interactive Ecosystem
        </div>
      </div>
      <div className="absolute bottom-6 right-8 z-10 pointer-events-none hidden sm:block">
        <p className="text-white/40 text-sm font-medium">Hover over nodes to explore capabilities</p>
      </div>

      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 2]} // High DPI optimization
      >
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 5, 20]} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#4F46E5" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#6EE7B7" />

        {/* The Tree */}
        <TreeStructure hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
        
        {/* Ambient Particles */}
        <Particles />

        <ContactShadows position={[0, -2.2, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000000" />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
          autoRotate={hoveredNode === null}
          autoRotateSpeed={0.5}
        />
        
        <Environment preset="city" />
      </Canvas>

      {/* Mobile-only expanded panel overlay fallback (since HTML overlays in canvas can be tiny on mobile) */}
      <div className="block lg:hidden absolute bottom-0 left-0 w-full p-4 pointer-events-none">
        <AnimatePresence>
          {hoveredNode !== null && (
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-gray-100 pointer-events-auto w-full max-w-sm mx-auto"
             >
               <div className="flex justify-between items-start mb-3">
                 <div 
                   className="w-10 h-10 rounded-xl flex items-center justify-center text-white" 
                   style={{ backgroundColor: features[hoveredNode].color }}
                 >
                   {React.createElement(features[hoveredNode].icon, { className: "w-5 h-5" })}
                 </div>
                 <button 
                   onClick={() => setHoveredNode(null)}
                   className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">{features[hoveredNode].title}</h3>
               <p className="text-sm text-gray-600 leading-relaxed font-medium line-clamp-3">{features[hoveredNode].desc}</p>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
