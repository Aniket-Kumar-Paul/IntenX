"use client";

import { Canvas } from "@react-three/fiber";
import Particles from "@/components/Particles";

export default function ParticlesBackground() {
  return (
    <div
      className="absolute inset-0 z-[-1]"
      style={{ position: "absolute", height: "90vh", width: "100vw" }} // 👈 Force full screen
    >
      <Canvas>
        <Particles />
      </Canvas>
    </div>
  );
}
