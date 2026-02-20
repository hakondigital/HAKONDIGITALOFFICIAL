"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Network Mesh ───────────────────────────────── */

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const { pointsGeo, linesGeo } = useMemo(() => {
    const count = 120;
    const spread = 14;
    const depthSpread = 4;
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * depthSpread
        )
      );
    }

    const pGeo = new THREE.BufferGeometry().setFromPoints(points);

    const linePoints: THREE.Vector3[] = [];
    const threshold = 2.8;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          linePoints.push(points[i].clone(), points[j].clone());
        }
      }
    }

    const lGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

    return { pointsGeo: pGeo, linesGeo: lGeo };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.025;
    groupRef.current.rotation.x = Math.sin(t * 0.015) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ── Floating Glow Particles ────────────────────── */

function GlowParticles() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.08}
        color="#818cf8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Canvas Wrapper ─────────────────────────────── */

export default function TechBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NetworkMesh />
        <GlowParticles />
      </Canvas>
    </div>
  );
}
