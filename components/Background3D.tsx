"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { mouse } = useThree();

  const count = 100;
  const [positions, lineGeometry] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const geometry = new THREE.BufferGeometry();
    return [pos, geometry];
  }, []);

  useFrame((state) => {
    // R3F still provides elapsedTime in a consistent way across versions
    const time = state.clock.getElapsedTime() * 0.1;

    // Interactive mouse movement (Parallax effect)
    const targetX = (mouse.x * 0.5);
    const targetY = (mouse.y * 0.5);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time + targetX;
      pointsRef.current.rotation.x = time * 0.5 - targetY;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time + targetX;
      linesRef.current.rotation.x = time * 0.5 - targetY;
    }

    // Dynamic connections
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 4) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#facc15" // accent color
          transparent
          opacity={0.8}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          transparent
          color="#facc15"
          opacity={0.3}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        dpr={1}
      >
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
