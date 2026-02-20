"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);

  const { positions, edges } = useMemo(() => {
    const count = 60;
    const spread = 10;
    const pos: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * 4
        )
      );
    }

    const edgePoints: THREE.Vector3[] = [];
    const threshold = 3.2;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pos[i].distanceTo(pos[j]) < threshold) {
          edgePoints.push(pos[i].clone(), pos[j].clone());
        }
      }
    }

    return { positions: pos, edges: edgePoints };
  }, []);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.06, 8, 8), []);
  const sphereMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#38bdf8",
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const edgesGeo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(edges),
    [edges]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || !nodesRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.02;

    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * 0.3 + i) * 0.15,
        p.y + Math.cos(t * 0.25 + i * 0.5) * 0.15,
        p.z
      );
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[sphereGeo, sphereMat, positions.length]}
      />
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function FloatingGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <FloatingNodes />
      </Canvas>
    </div>
  );
}
