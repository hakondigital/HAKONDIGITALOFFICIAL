"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

/* ── Data Node Network ──────────────────────────────── */

function DataNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const { pointsGeo, linesGeo } = useMemo(() => {
    const count = 90;
    const spreadX = Math.max(14, size.width * 0.012);
    const spreadY = Math.max(10, size.height * 0.012);
    const depthSpread = 3;
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          (Math.random() - 0.5) * depthSpread
        )
      );
    }

    const pGeo = new THREE.BufferGeometry().setFromPoints(points);

    const linePoints: THREE.Vector3[] = [];
    const threshold = 2.4;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          linePoints.push(points[i].clone(), points[j].clone());
        }
      }
    }

    const lGeo =
      linePoints.length > 0
        ? new THREE.BufferGeometry().setFromPoints(linePoints)
        : null;

    return { pointsGeo: pGeo, linesGeo: lGeo };
  }, [size]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.018;
    groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.06;

    // Subtle scan plane sweep
    if (scanRef.current) {
      const cycle = (t * 0.08) % 1;
      const y = (cycle - 0.5) * 14;
      scanRef.current.position.y = y;
      const opacity = cycle < 0.05 || cycle > 0.92
        ? Math.min(cycle < 0.5 ? cycle / 0.05 : (1 - cycle) / 0.08, 0.12)
        : 0.06;
      (scanRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  const scanGeo = useMemo(
    () => new THREE.PlaneGeometry(30, 0.012),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Data nodes */}
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.035}
          color="#00c8ff"
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      {linesGeo && (
        <lineSegments geometry={linesGeo}>
          <lineBasicMaterial
            color="#00c8ff"
            transparent
            opacity={0.05}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Scanning plane */}
      <mesh ref={scanRef} geometry={scanGeo} rotation={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00c8ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ── Ambient Glow Particles ─────────────────────────── */

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 28;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.008;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.006) * 0.04;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        color="#0066aa"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Static fallback for reduced-motion ─────────────── */

function StaticGrid() {
  const geo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let x = -8; x <= 8; x += 2) {
      for (let y = -6; y <= 6; y += 2) {
        points.push(new THREE.Vector3(x, y, 0));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.025}
        color="#00c8ff"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Canvas wrapper ─────────────────────────────────── */

export default function TechBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 52 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        {shouldReduceMotion ? (
          <StaticGrid />
        ) : (
          <>
            <DataNetwork />
            <AmbientParticles />
          </>
        )}
      </Canvas>
    </div>
  );
}
