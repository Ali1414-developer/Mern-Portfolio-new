import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ── Floating 3D Geometric Architectural Crystal ─────────────────────────────
function ArchitecturalCrystal({ isHovered }) {
  const crystalRef = useRef();
  const innerRef = useRef();
  const outerRingRef = useRef();
  const secondaryRingRef = useRef();

  // Smooth pointer-based parallax and continuous graceful rotation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const targetSpeed = isHovered ? 0.3 : 0.8;

    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.4 * targetSpeed;
      crystalRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;

      // Gentle responsive pointer parallax
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.25;
      crystalRef.current.position.x = THREE.MathUtils.lerp(crystalRef.current.position.x, targetX, 0.05);
      crystalRef.current.position.y = THREE.MathUtils.lerp(crystalRef.current.position.y, targetY, 0.05);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6 * targetSpeed;
      innerRef.current.rotation.z = Math.cos(t * 0.6) * 0.2;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.25 * targetSpeed;
      outerRingRef.current.rotation.y += delta * 0.35 * targetSpeed;
    }

    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.x -= delta * 0.3 * targetSpeed;
      secondaryRingRef.current.rotation.z += delta * 0.25 * targetSpeed;
    }
  });

  return (
    <group ref={crystalRef}>
      {/* Outer Gyro Ring (Cyan Accent) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.0, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#36C5F0"
          emissive="#2563EB"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Secondary Orbital Ring (Blue Primary) */}
      <mesh ref={secondaryRingRef} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#36C5F0"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Central Translucent Refractive Core (Icosahedron) */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#DCEEFF"
          emissive="#2563EB"
          emissiveIntensity={0.12}
          roughness={0.15}
          metalness={0.1}
          transmission={0.88}
          ior={1.4}
          thickness={1.2}
          transparent
          opacity={0.72}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Holographic Aura */}
      <mesh>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshStandardMaterial
          color="#36C5F0"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// ── WebGL Capabilities Fallback Detector ─────────────────────────────────────
function hasWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

// ── Main Hero 3D Canvas Scene ───────────────────────────────────────────────
export default function Hero3DCanvas({ isPaused = false }) {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!hasWebGLSupport()) {
      setSupported(false);
    }
  }, []);

  if (!supported) {
    // Elegant CSS Fallback if device lacks WebGL
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-[#36C5F0]/25 to-[#2563EB]/25 blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 1.75]} // Optimized pixel ratio for retina screens without GPU overhead
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Balanced Three-Point Studio Lighting in Light-Blue Spectrum */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 3]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, -3, 2]} intensity={1.2} color="#36C5F0" />
        <pointLight position={[3, -4, -2]} intensity={1.0} color="#2563EB" />

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
          <ArchitecturalCrystal isHovered={isPaused} />
        </Float>

        {/* Delicate floating light particles in background */}
        <Sparkles
          count={32}
          scale={5.5}
          size={1.6}
          speed={0.4}
          opacity={0.45}
          color="#36C5F0"
        />
      </Canvas>
    </div>
  );
}
