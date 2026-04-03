"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// NOTE: To use a custom GLB model as requested, you can uncomment the following line and replace the procedural groups with nodes:
// import { useGLTF } from "@react-three/drei";
// const { nodes, materials } = useGLTF('/models/robot.glb');

export function ProceduralRobot({ hoverState, chatbotOpen }: { hoverState: boolean, chatbotOpen: boolean }) {
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredElementRect, setHoveredElementRect] = useState<DOMRect | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isBlinking, setIsBlinking] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === 'function') {
        const clickable = target.closest('button, a, [role="button"], .chatbot-toggle, [data-interactive]');
        if (clickable) {
          setHoveredElementRect(clickable.getBoundingClientRect());
        }
      }
    };
    const handleMouseOut = () => {
      setHoveredElementRect(null);
    };
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Random blinking loop (3-5 seconds)
    let blinkTimeout: NodeJS.Timeout;
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      blinkTimeout = setTimeout(blinkLoop, 3000 + Math.random() * 2000);
    };
    blinkTimeout = setTimeout(blinkLoop, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(blinkTimeout);
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Breathing (idle)
    const breathingScale = 1 + Math.sin(time * 2) * 0.02;
    if (torsoRef.current) torsoRef.current.scale.set(1, breathingScale, 1);

    // Floating motion
    const floatY = Math.sin(time) * 0.05;

    if (!isMobile) {
      let targetHeadX = 0;
      let targetHeadY = 0;
      let targetEyesX = 0;
      let targetEyesY = 0;

      let targetTorsoY = -mousePos.x * 0.15;

      let targetLeftArmX = 0;
      let targetLeftArmZ = 0;
      let targetRightArmX = 0;
      let targetRightArmZ = 0;

      const isHovering = hoverState || !!hoveredElementRect;

      if (chatbotOpen) {
        // Chatbot open at bottom right
        targetHeadX = -0.3; // Look down
        targetHeadY = 0.6; // Look right
        
        targetRightArmX = -Math.PI / 2; // Arm raised
        targetRightArmZ = Math.sin(time * 10) * 0.2 + 0.5; // Waving
        
        targetEyesX = 0.05;
        targetEyesY = -0.05;
      } else if (isHovering) {
        let hoverX = mousePos.x;
        let hoverY = mousePos.y;
        
        if (hoveredElementRect) {
          const centerX = hoveredElementRect.left + hoveredElementRect.width / 2;
          const centerY = hoveredElementRect.top + hoveredElementRect.height / 2;
          hoverX = (centerX / window.innerWidth) * 2 - 1;
          hoverY = -(centerY / window.innerHeight) * 2 + 1;
        }

        // Look at hovered element with curiosity
        targetHeadX = hoverY * 0.3 - 0.1; // Slight downward curiosity tilt
        targetHeadY = -hoverX * 0.7;
        
        // Point down/left depending on position
        if (hoverX < 0) {
           targetLeftArmX = -Math.PI / 4;
           targetLeftArmZ = -0.2;
        } else {
           targetRightArmX = -Math.PI / 4;
           targetRightArmZ = 0.2;
        }

        targetEyesX = hoverX * 0.05;
        targetEyesY = hoverY * 0.05;
      } else {
        // Normal cursor follow
        targetHeadX = mousePos.y * 0.3;
        targetHeadY = -mousePos.x * 0.7;
        
        targetEyesX = mousePos.x * 0.08;
        targetEyesY = mousePos.y * 0.08;
      }

      // Clamp Head range
      targetHeadX = THREE.MathUtils.clamp(targetHeadX, -0.3, 0.3);
      targetHeadY = THREE.MathUtils.clamp(targetHeadY, -0.8, 0.8);
      
      // Clamp Eyes range
      targetEyesX = THREE.MathUtils.clamp(targetEyesX, -0.1, 0.1);
      targetEyesY = THREE.MathUtils.clamp(targetEyesY, -0.1, 0.1);

      // Scroll Reaction (Tilt forward)
      const scrollTilt = Math.min(scrollY * 0.001, 0.5);
      if (torsoRef.current) {
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, scrollTilt, delta * 2);
        torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, targetTorsoY, delta * 2);
        torsoRef.current.position.y = THREE.MathUtils.lerp(torsoRef.current.position.y, floatY, delta * 2);
      }

      // Head interpolation with micro-movements
      if (headRef.current) {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, delta * 5);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, delta * 5);
        
        // Idle micro-movements (curiosity tilt)
        const idleZ = Math.sin(time * 0.5) * 0.05;
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, idleZ + (isHovering ? 0.08 : 0), delta * 4);
      }

      // Eyes interpolation
      if (eyesRef.current) {
        eyesRef.current.position.x = THREE.MathUtils.lerp(eyesRef.current.position.x, targetEyesX, delta * 15);
        eyesRef.current.position.y = THREE.MathUtils.lerp(eyesRef.current.position.y, targetEyesY, delta * 15);
        // Blinking
        eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y, isBlinking ? 0.05 : 1, delta * 30);
      }

      // Arms interpolation
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, targetLeftArmX, delta * 5);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, targetLeftArmZ, delta * 5);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetRightArmX, delta * 5);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetRightArmZ, delta * 5);
      }
    }
  });

  const isHovering = hoverState || !!hoveredElementRect;
  const eyeColor = chatbotOpen ? "#4F46E5" : isHovering ? "#F59E0B" : "#6EE7B7";

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[0.1, 0.4]}>
      <group position={[0, -0.5, 0]}>
        {/* Torso */}
        <group ref={torsoRef} position={[0, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.8, 0.6, 1.5, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.6]}>
             <boxGeometry args={[0.4, 0.4, 0.1]} />
             <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Head */}
        <group ref={headRef} position={[0, 0.7, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.2, 1.4]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.1, 0.71]}>
            <boxGeometry args={[1.3, 0.6, 0.1]} />
            <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.5} />
          </mesh>
          <group ref={eyesRef} position={[0, 0.1, 0.76]}>
            <mesh position={[-0.3, 0, 0]}>
              <capsuleGeometry args={[0.08, 0.1, 4, 8]} />
              <meshBasicMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <capsuleGeometry args={[0.08, 0.1, 4, 8]} />
              <meshBasicMaterial color={eyeColor} />
            </mesh>
          </group>
          <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
            <meshStandardMaterial color="#4F46E5" />
          </mesh>
          <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
            <meshStandardMaterial color="#4F46E5" />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-1.1, 0, 0]}>
          <mesh position={[-0.2, -0.4, 0]}>
            <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[1.1, 0, 0]}>
          <mesh position={[0.2, -0.4, 0]}>
            <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        {/* Floating Ring */}
        <mesh position={[0, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#6EE7B7" emissive="#6EE7B7" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export function RobotAssistant({ hoverState = false }: { hoverState?: boolean }) {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    const handleChatbotEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setChatbotOpen(customEvent.detail);
    };
    window.addEventListener("chatbot-toggled", handleChatbotEvent);
    return () => window.removeEventListener("chatbot-toggled", handleChatbotEvent);
  }, []);

  return (
    <div className="w-full h-[600px] relative pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />
        <ProceduralRobot hoverState={hoverState} chatbotOpen={chatbotOpen} />
        <Environment preset="city" />
        <Preload all />
      </Canvas>
    </div>
  );
}
