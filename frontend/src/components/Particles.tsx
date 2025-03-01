"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const { gl } = useThree();

  // Generate circular alpha map dynamically
  const alphaMap = useMemo(() => {
    const size = 64; // Resolution of the texture
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    
    // Draw a smooth circular gradient
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorArray = [new THREE.Color("#a855f7"), new THREE.Color("#7c3aed"), new THREE.Color("#9333ea")];

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.position.y += Math.sin(Date.now() * 0.0001) * 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={particles.positions} itemSize={3} count={particles.positions.length / 3} />
        <bufferAttribute attach="attributes-color" array={particles.colors} itemSize={3} count={particles.colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        alphaMap={alphaMap} // Use generated circular alphaMap
        transparent
        vertexColors
        size={0.07}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
