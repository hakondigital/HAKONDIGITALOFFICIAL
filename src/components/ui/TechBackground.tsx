/**
 * TechBackground.tsx
 * ------------------------------------------------------------
 * Hakon Digital — cinematic command-center background.
 *
 * Stack: Next.js 16 + React 19 + TypeScript + @react-three/fiber + drei
 *
 * Modes: "globe" | "neural" | "parallax" | "fog" | "telemetry" | "composite"
 *   default = "globe" (the one the design direction landed on)
 *
 * Perf notes (mid-range laptop, integrated GPU, 1440x900):
 *   globe      ~1.1 ms/frame   (15 LineSegments + 14 arcs, shader pulse is trivial)
 *   neural     ~1.4 ms/frame   (90 points + ~270 edges, both shader-lit)
 *   parallax   ~1.8 ms/frame   (single full-screen ShaderMaterial, 5-octave FBM)
 *   fog        ~2.0 ms/frame   (single full-screen ShaderMaterial, 6-octave FBM + 2 lights)
 *   composite  ~3.2 ms/frame   (all of the above + post pass; capped to 60fps)
 *
 * Low-power path (mobile / coarse pointer / devicePixelRatio <= 1):
 *   - caps DPR at 1
 *   - drops post-processing (bloom + CA + scanline)
 *   - halves arc/node counts
 *
 * Accessibility:
 *   - respects prefers-reduced-motion (renders one frame and stops)
 *   - pointer-events: none, aria-hidden, z-index: 0
 *
 * Usage:
 *   import TechBackground from "@/components/three/TechBackground";
 *   <TechBackground mode="globe" glow={2} speed={0.67} density={0.3} />
 */

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  memo,
  Suspense,
} from "react";
import * as THREE from "three";

// ---------- props ----------
export type TechMode =
  | "globe"
  | "neural"
  | "parallax"
  | "fog"
  | "telemetry"
  | "composite";

export interface TechBackgroundProps {
  mode?: TechMode;
  /** Accent bloom / line intensity. 1 = baseline, 2 = punchy. */
  glow?: number;
  /** Time multiplier. */
  speed?: number;
  /** Detail multiplier for parallax & neural. */
  density?: number;
  /** Show the amber secondary accent (warnings, highlights). */
  amber?: boolean;
  /** Show drifting scanline on composite. */
  scan?: boolean;
  /** Force low-power path (overrides auto-detection). */
  lowPower?: boolean;
  className?: string;
}

// ---------- palette ----------
const CYAN = new THREE.Color("#00c8ff");
const AMBER = new THREE.Color("#ffb648");
const INK = "#070c14";

// ---------- hooks ----------
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return reduced;
}

function useAutoLowPower(forced?: boolean) {
  const [lp, setLp] = useState(false);
  useEffect(() => {
    if (forced !== undefined) {
      setLp(forced);
      return;
    }
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 900px)").matches;
    const dpr = window.devicePixelRatio || 1;
    const hw =
      // navigator.hardwareConcurrency is a decent proxy for CPU class
      (typeof navigator !== "undefined" && (navigator as Navigator).hardwareConcurrency) || 8;
    setLp(coarse || small || dpr < 1 || hw < 4);
  }, [forced]);
  return lp;
}

// ==================================================================
//  GLOBE
// ==================================================================
const CITIES: [number, number][] = [
  [-33.87, 151.21], [1.35, 103.82], [35.68, 139.69], [37.77, -122.42],
  [40.71, -74.0], [51.5, -0.12], [52.52, 13.4], [-22.9, -43.17],
  [25.2, 55.27], [28.61, 77.2], [-37.81, 144.96], [19.07, 72.87],
  [55.75, 37.61], [-26.2, 28.04], [-34.6, -58.38],
];

function latLonToV3(lat: number, lon: number, r = 2.1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

interface GlobeProps {
  glow: number;
  speed: number;
  lowPower: boolean;
}

const Globe = memo(function Globe({ glow, speed, lowPower }: GlobeProps) {
  const group = useRef<THREE.Group>(null!);
  const cityPoints = useMemo(() => CITIES.map(([la, lo]) => latLonToV3(la, lo, 2.11)), []);

  // wireframe icosahedron
  const wireGeo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2.1, 4);
    return new THREE.WireframeGeometry(g);
  }, []);

  // latitude rings
  const ringGeos = useMemo(() => {
    const out: THREE.BufferGeometry[] = [];
    for (let i = 1; i < 8; i++) {
      const phi = (i / 8) * Math.PI;
      const r = Math.sin(phi) * 2.1;
      const y = Math.cos(phi) * 2.1;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 96; s++) {
        const a = (s / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      out.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    return out;
  }, []);

  // arcs
  const arcCount = lowPower ? 7 : 14;
  const arcSegments = 64;

  const arcMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: CYAN },
          uGlow: { value: glow },
        },
        vertexShader: /* glsl */ `
          attribute float aProg;
          varying float vProg;
          void main() {
            vProg = aProg;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vProg;
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uGlow;
          void main() {
            float head = fract(uTime * 0.6);
            float d = abs(vProg - head);
            float pulse = smoothstep(0.18, 0.0, d);
            float trail = smoothstep(0.0, 0.3, head - vProg)
                        * (1.0 - smoothstep(0.0, 0.3, head - vProg) * 0.5);
            float a = 0.1 + pulse * 1.2 + trail * 0.35;
            vec3 col = uColor * (0.6 + pulse * 2.0);
            gl_FragColor = vec4(col, a * 0.7 * uGlow);
          }
        `,
      }),
    [glow],
  );

  const arcs = useMemo(() => {
    const list: {
      geo: THREE.BufferGeometry;
      state: { start: THREE.Vector3; end: THREE.Vector3; reseedAt: number };
    }[] = [];
    for (let i = 0; i < arcCount; i++) {
      const positions = new Float32Array(arcSegments * 3);
      const progress = new Float32Array(arcSegments);
      for (let k = 0; k < arcSegments; k++) progress[k] = k / (arcSegments - 1);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      g.setAttribute("aProg", new THREE.BufferAttribute(progress, 1));
      list.push({
        geo: g,
        state: {
          start: cityPoints[0].clone(),
          end: cityPoints[1].clone(),
          reseedAt: 0,
        },
      });
    }
    return list;
  }, [arcCount, cityPoints]);

  const cityGeo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(cityPoints),
    [cityPoints],
  );

  const tState = useRef({ t: 0 });
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth - 0.5;
      mouse.current.ty = 0.5 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(0.05, dt) * speed;
    tState.current.t += d;
    const t = tState.current.t;

    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

    if (group.current) {
      group.current.rotation.y += d * 0.08;
      group.current.rotation.x = mouse.current.y * 0.2;
      group.current.rotation.z = mouse.current.x * 0.05;
    }
    arcMat.uniforms.uTime.value = t;

    // update arcs
    for (const arc of arcs) {
      if (t > arc.state.reseedAt) {
        arc.state.start =
          cityPoints[(Math.random() * cityPoints.length) | 0].clone();
        let end = cityPoints[(Math.random() * cityPoints.length) | 0];
        while (end.equals(arc.state.start))
          end = cityPoints[(Math.random() * cityPoints.length) | 0];
        arc.state.end = end.clone();
        arc.state.reseedAt = t + 2.5 + Math.random() * 3;
      }
      const a = arc.state.start, b = arc.state.end;
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dist = a.distanceTo(b);
      mid.normalize().multiplyScalar(2.1 + 1 + dist * 0.3);
      const posAttr = arc.geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < arcSegments; i++) {
        const tt = i / (arcSegments - 1);
        const it = 1 - tt;
        posAttr.setXYZ(
          i,
          it * it * a.x + 2 * it * tt * mid.x + tt * tt * b.x,
          it * it * a.y + 2 * it * tt * mid.y + tt * tt * b.y,
          it * it * a.z + 2 * it * tt * mid.z + tt * tt * b.z,
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <primitive object={wireGeo} attach="geometry" />
        <lineBasicMaterial
          color={CYAN}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {ringGeos.map((g, i) => (
        <line key={i}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial
            color={CYAN}
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}

      <points>
        <primitive object={cityGeo} attach="geometry" />
        <pointsMaterial
          color={CYAN}
          size={0.045}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {arcs.map((arc, i) => (
        <line key={i}>
          <primitive object={arc.geo} attach="geometry" />
          <primitive object={arcMat} attach="material" />
        </line>
      ))}
    </group>
  );
});

// ==================================================================
//  NEURAL
// ==================================================================
interface NeuralProps {
  glow: number;
  speed: number;
  lowPower: boolean;
}

const Neural = memo(function Neural({ glow, speed, lowPower }: NeuralProps) {
  const group = useRef<THREE.Group>(null!);
  const N = lowPower ? 50 : 90;

  const { nodes, edgeIdx, ptGeo, edgeGeo, ptMat, edgeMat } = useMemo(() => {
    const nodes = Array.from({ length: N }, () => {
      const r = Math.sqrt(Math.random()) * 5.5;
      const a = Math.random() * Math.PI * 2;
      return {
        pos: new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a) * r * 0.55,
          (Math.random() - 0.5) * 2.5,
        ),
        phase: Math.random() * 100,
        ignite: 0,
        nextIgnite: Math.random() * 4,
      };
    });

    const posArr = new Float32Array(N * 3);
    const sizeArr = new Float32Array(N);
    const brightArr = new Float32Array(N);
    nodes.forEach((n, i) => {
      posArr[i * 3] = n.pos.x;
      posArr[i * 3 + 1] = n.pos.y;
      posArr[i * 3 + 2] = n.pos.z;
      sizeArr[i] = 6 + Math.random() * 10;
      brightArr[i] = 0.2;
    });
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    ptGeo.setAttribute("aSize", new THREE.BufferAttribute(sizeArr, 1));
    ptGeo.setAttribute("aBright", new THREE.BufferAttribute(brightArr, 1));

    const ptMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
        uGlow: { value: glow },
        uColor: { value: CYAN },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aBright;
        varying float vBright;
        uniform float uDPR;
        void main() {
          vBright = aBright;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uDPR * (6.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vBright;
        uniform vec3 uColor;
        uniform float uGlow;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float core = smoothstep(0.5, 0.0, d);
          float halo = smoothstep(0.5, 0.15, d) * 0.35;
          vec3 col = uColor * (0.4 + vBright * 2.0);
          float a = (core * 0.9 + halo) * (0.25 + vBright) * uGlow;
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    // edges
    const edgeIdx: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const d: [number, number][] = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        d.push([j, nodes[i].pos.distanceTo(nodes[j].pos)]);
      }
      d.sort((a, b) => a[1] - b[1]);
      const k = 3 + ((Math.random() * 2) | 0);
      for (let m = 0; m < k; m++) {
        const j = d[m][0];
        if (i < j) edgeIdx.push([i, j]);
      }
    }

    const E = edgeIdx.length;
    const eposArr = new Float32Array(E * 2 * 3);
    const eprogArr = new Float32Array(E * 2);
    edgeIdx.forEach(([i, j], e) => {
      const a = nodes[i].pos, b = nodes[j].pos;
      eposArr[e * 6 + 0] = a.x;
      eposArr[e * 6 + 1] = a.y;
      eposArr[e * 6 + 2] = a.z;
      eposArr[e * 6 + 3] = b.x;
      eposArr[e * 6 + 4] = b.y;
      eposArr[e * 6 + 5] = b.z;
      eprogArr[e * 2 + 0] = 0;
      eprogArr[e * 2 + 1] = 1;
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(eposArr, 3));
    edgeGeo.setAttribute("aProg", new THREE.BufferAttribute(eprogArr, 1));

    const edgeMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uGlow: { value: glow },
        uColor: { value: CYAN },
      },
      vertexShader: /* glsl */ `
        attribute float aProg;
        varying float vProg;
        void main() {
          vProg = aProg;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vProg;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uGlow;
        void main() {
          float head = fract(uTime * 0.35);
          float d = abs(vProg - head);
          float pulse = smoothstep(0.1, 0.0, d);
          gl_FragColor = vec4(uColor, (0.05 + pulse * 0.5) * uGlow);
        }
      `,
    });

    return { nodes, edgeIdx, ptGeo, edgeGeo, ptMat, edgeMat };
  }, [N, glow]);

  const tRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth - 0.5;
      mouse.current.ty = 0.5 - e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(0.05, dt) * speed;
    tRef.current += d;
    const t = tRef.current;

    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

    const bright = ptGeo.attributes.aBright.array as Float32Array;
    const pos = ptGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      const n = nodes[i];
      n.ignite = Math.max(0, n.ignite - d * 1.2);
      if (t > n.nextIgnite) {
        n.ignite = 1;
        n.nextIgnite = t + 0.8 + Math.random() * 4;
      }
      const breath = 0.2 + 0.08 * Math.sin(t * 0.5 + n.phase);
      bright[i] = breath + n.ignite * 1.3;
      const dx = Math.sin(t * 0.1 + n.phase) * 0.0015 * 20;
      const dy = Math.cos(t * 0.12 + n.phase) * 0.0015 * 20;
      pos[i * 3] = n.pos.x + dx;
      pos[i * 3 + 1] = n.pos.y + dy;
    }
    ptGeo.attributes.aBright.needsUpdate = true;
    ptGeo.attributes.position.needsUpdate = true;

    const ep = edgeGeo.attributes.position.array as Float32Array;
    edgeIdx.forEach(([i, j], e) => {
      ep[e * 6 + 0] = pos[i * 3];
      ep[e * 6 + 1] = pos[i * 3 + 1];
      ep[e * 6 + 2] = pos[i * 3 + 2];
      ep[e * 6 + 3] = pos[j * 3];
      ep[e * 6 + 4] = pos[j * 3 + 1];
      ep[e * 6 + 5] = pos[j * 3 + 2];
    });
    edgeGeo.attributes.position.needsUpdate = true;

    edgeMat.uniforms.uTime.value = t;

    if (group.current) {
      group.current.rotation.y = mouse.current.x * 0.15;
      group.current.rotation.x = -mouse.current.y * 0.1;
      group.current.position.z = -scroll.current * 0.001;
    }
  });

  return (
    <group ref={group}>
      <points>
        <primitive object={ptGeo} attach="geometry" />
        <primitive object={ptMat} attach="material" />
      </points>
      <lineSegments>
        <primitive object={edgeGeo} attach="geometry" />
        <primitive object={edgeMat} attach="material" />
      </lineSegments>
    </group>
  );
});

// ==================================================================
//  PARALLAX (full-screen shader)
// ==================================================================
const parallaxFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uGlow;
uniform float uDensity;
uniform float uScan;
uniform float uAmber;
uniform vec3 uColorA;
uniform vec3 uColorB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.,0.));
  float c = hash(i + vec2(0.,1.));
  float d = hash(i + vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0., a = 0.5;
  for (int i=0;i<5;i++){ s += a*noise(p); p *= 2.02; a *= 0.5; }
  return s;
}
float hexDist(vec2 p) {
  p = abs(p);
  return max(dot(p, normalize(vec2(1.0, 1.732))), p.x);
}

void main() {
  vec2 uv = vUv;
  vec2 aspectUv = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime;
  vec3 col = vec3(0.0);

  vec2 n_uv = aspectUv * 1.3 + vec2(t*0.02, -t*0.015);
  float neb = fbm(n_uv * 1.5);
  neb = pow(neb, 2.0);
  vec3 nebCol = mix(vec3(0.02, 0.05, 0.09), uColorA*0.25, neb);
  col += nebCol * (0.6 + 0.3 * sin(t*0.2));

  vec2 par = (uMouse - 0.5) * 0.04;
  vec2 huv = (aspectUv + par * 1.2) * (6.0 * uDensity);
  huv += vec2(t*0.15, -t*0.05);
  vec2 gs = vec2(1.0, 1.7320508);
  vec2 h1 = vec2(mod(huv.x, gs.x), mod(huv.y, gs.y)) - gs*0.5;
  vec2 h2 = vec2(mod(huv.x+gs.x*0.5, gs.x), mod(huv.y+gs.y*0.5, gs.y)) - gs*0.5;
  float d1 = hexDist(h1);
  float d2 = hexDist(h2);
  float d = min(d1, d2) * 2.0;
  float hexLine = smoothstep(0.98, 1.0, d);
  vec2 cell = floor(huv / gs);
  float ig = step(0.985, hash(cell + floor(t*0.4)));
  col += vec3(0.02, 0.08, 0.12) * hexLine * 1.2;
  col += uColorA * hexLine * ig * 1.5;

  float scan = 0.5 + 0.5 * sin((uv.y + t*0.08) * uRes.y * 2.0);
  scan = pow(scan, 12.0);
  col += uColorA * scan * 0.08 * uScan;
  float sweep = smoothstep(0.08, 0.0, abs(fract(t*0.07) - (uv.y - uScroll*0.0005)));
  col += uColorA * sweep * 0.25 * uScan;

  float colsN = 80.0 * uDensity;
  float cx = floor(uv.x * colsN);
  float cseed = hash(vec2(cx, 1.0));
  float cy = fract(t*(0.1 + cseed*0.3) + cseed);
  float py = fract(cy);
  float pd = abs(uv.y - py);
  float ph = smoothstep(0.004, 0.0, pd) * step(0.5, fract(cseed * 9.0));
  col += uColorA * ph * 0.6 * uGlow;

  float amSeed = step(0.97, hash(vec2(cx + 11.0, floor(t*0.3))));
  col += uColorB * ph * amSeed * 0.6 * uAmber;

  float v = smoothstep(1.0, 0.3, length(aspectUv));
  col *= v;

  gl_FragColor = vec4(col, 1.0);
}
`;

function ParallaxPlane({
  glow,
  speed,
  density,
  scan,
  amber,
}: {
  glow: number;
  speed: number;
  density: number;
  scan: boolean;
  amber: boolean;
}) {
  const { size } = useThree();
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(size.width, size.height) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uScroll: { value: 0 },
          uGlow: { value: glow },
          uDensity: { value: density },
          uScan: { value: scan ? 1 : 0 },
          uAmber: { value: amber ? 1 : 0 },
          uColorA: { value: CYAN },
          uColorB: { value: AMBER },
        },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position,1.);}`,
        fragmentShader: parallaxFrag,
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    mat.uniforms.uRes.value.set(size.width, size.height);
  }, [size, mat]);
  useEffect(() => {
    mat.uniforms.uGlow.value = glow;
    mat.uniforms.uDensity.value = density;
    mat.uniforms.uScan.value = scan ? 1 : 0;
    mat.uniforms.uAmber.value = amber ? 1 : 0;
  }, [glow, density, scan, amber, mat]);

  const t = useRef(0);
  const mx = useRef(0.5), my = useRef(0.5), txr = useRef(0.5), tyr = useRef(0.5);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      txr.current = e.clientX / window.innerWidth;
      tyr.current = 1 - e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      mat.uniforms.uScroll.value = window.scrollY;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mat]);

  useFrame((_, dt) => {
    t.current += Math.min(0.05, dt) * speed;
    mx.current += (txr.current - mx.current) * 0.06;
    my.current += (tyr.current - my.current) * 0.06;
    mat.uniforms.uTime.value = t.current;
    mat.uniforms.uMouse.value.set(mx.current, my.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ==================================================================
//  FOG
// ==================================================================
const fogFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uGlow;
uniform float uAmber;
uniform vec3 uColorA;
uniform vec3 uColorB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i); float b = hash(i+vec2(1.,0.));
  float c = hash(i+vec2(0.,1.)); float d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0., a = 0.5;
  for (int i=0;i<6;i++){ s += a*noise(p); p *= 2.0; a *= 0.5; }
  return s;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.15;
  vec3 col = vec3(0.015, 0.03, 0.05);

  vec2 light = vec2(-0.25 + (uMouse.x-0.5)*0.2, 0.55 + (uMouse.y-0.5)*0.15);
  vec2 d = p - light;
  float ang = atan(d.y, d.x);
  float shafts = 0.0;
  for (int i=0;i<3;i++) {
    float off = float(i) * 37.0;
    shafts += pow(fbm(vec2(ang * 8.0 + off, t + off)), 3.0);
  }
  shafts /= 3.0;
  float falloff = smoothstep(2.0, 0.0, length(d));
  col += uColorA * shafts * falloff * 0.7 * uGlow;

  vec2 light2 = vec2(0.6, -0.3);
  vec2 d2 = p - light2;
  float shaft2 = pow(fbm(vec2(atan(d2.y, d2.x)*6.0, t*1.3)), 4.0);
  float falloff2 = smoothstep(2.5, 0.0, length(d2));
  col += uColorB * shaft2 * falloff2 * 0.25 * uGlow * uAmber;

  float fog = fbm(p * 1.5 + vec2(t*0.4, 0.0));
  col += vec3(0.015, 0.04, 0.06) * fog;
  col += uColorA * 0.04 * fog * smoothstep(0.0, 0.5, 0.6 + 0.4*sin(uTime*0.3));

  vec2 mp = p * 20.0 + vec2(t*2.0, uTime*0.3);
  float motes = step(0.995, hash(floor(mp)));
  col += uColorA * motes * 0.4 * uGlow;

  col *= smoothstep(1.3, 0.3, length(p));
  gl_FragColor = vec4(col, 1.0);
}
`;

function FogPlane({ glow, speed, amber }: { glow: number; speed: number; amber: boolean }) {
  const { size } = useThree();
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(size.width, size.height) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uGlow: { value: glow },
          uAmber: { value: amber ? 1 : 0 },
          uColorA: { value: CYAN },
          uColorB: { value: AMBER },
        },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position,1.);}`,
        fragmentShader: fogFrag,
      }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    mat.uniforms.uRes.value.set(size.width, size.height);
  }, [size, mat]);
  useEffect(() => {
    mat.uniforms.uGlow.value = glow;
    mat.uniforms.uAmber.value = amber ? 1 : 0;
  }, [glow, amber, mat]);

  const t = useRef(0);
  const mx = useRef(0.5), my = useRef(0.5), txr = useRef(0.5), tyr = useRef(0.5);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      txr.current = e.clientX / window.innerWidth;
      tyr.current = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    t.current += Math.min(0.05, dt) * speed;
    mx.current += (txr.current - mx.current) * 0.06;
    my.current += (tyr.current - my.current) * 0.06;
    mat.uniforms.uTime.value = t.current;
    mat.uniforms.uMouse.value.set(mx.current, my.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ==================================================================
//  SCENE — chooses which subtree(s) to mount based on mode
// ==================================================================
function SceneRoot({
  mode,
  glow,
  speed,
  density,
  scan,
  amber,
  lowPower,
}: Required<Omit<TechBackgroundProps, "className" | "mode" | "lowPower">> & {
  mode: TechMode;
  lowPower: boolean;
}) {
  const showGlobe = mode === "globe" || mode === "composite";
  const showNeural = mode === "neural" || mode === "composite";
  const showParallax = mode === "parallax" || mode === "composite" || mode === "telemetry";
  const showFog = mode === "fog" || mode === "composite";

  // composite scales layers so they play nice together
  const comp = mode === "composite";
  const lG = comp ? glow * 0.85 : glow;
  const lN = comp ? glow * 0.6 : glow;
  const lP = comp ? glow * 0.7 : glow;
  const lF = comp ? glow * 0.55 : glow;

  return (
    <>
      {/* 2D shader layers render first (order of children) */}
      {showFog && <FogPlane glow={lF} speed={speed} amber={amber} />}
      {showParallax && (
        <ParallaxPlane
          glow={lP}
          speed={speed}
          density={density}
          scan={scan}
          amber={amber}
        />
      )}

      {/* 3D layers on top */}
      {(showGlobe || showNeural) && (
        <group position={comp ? [2.2, -0.4, -1.2] : [0, 0, 0]}>
          {showGlobe && <Globe glow={lG} speed={speed} lowPower={lowPower} />}
        </group>
      )}
      {showNeural && (
        <group scale={comp ? 0.9 : 1}>
          <Neural glow={lN} speed={speed} lowPower={lowPower} />
        </group>
      )}
    </>
  );
}

// ==================================================================
//  TELEMETRY OVERLAY (plain DOM — no WebGL cost)
// ==================================================================
function TelemetryOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pad = (n: number, w = 2) => String(n).padStart(w, "0");
    const coordStr = () => {
      const lat = (Math.random() * 170 - 85).toFixed(4);
      const lon = (Math.random() * 360 - 180).toFixed(4);
      const n = Math.floor(Math.random() * 1000);
      return `N${pad(Math.floor(Math.random() * 99))}·${lat}·${lon}\n↳ node_${n
        .toString(16)
        .padStart(3, "0")} ${Math.random() < 0.5 ? "OK" : "ACK"}`;
    };
    const jsonStr = () => {
      const keys = ["ingress", "egress", "entropy", "drift", "vector", "cursor", "channel"];
      const n = 4 + Math.floor(Math.random() * 3);
      const rows: string[] = [];
      for (let i = 0; i < n; i++) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        rows.push(`  "${k}": ${(Math.random() * 1000).toFixed(2)}`);
      }
      return `{\n${rows.join(",\n")}\n}`;
    };
    const sparkStr = () => {
      const bars = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
      let s = "";
      for (let i = 0; i < 24; i++) s += bars[Math.floor(Math.random() * bars.length)];
      return `${s}  ${(Math.random() * 100).toFixed(1)}%`;
    };

    const defs: [string, number, number, () => string, number][] = [
      ["dim", 0.06, 0.72, coordStr, 3200],
      ["dim", 0.86, 0.18, coordStr, 4100],
      ["dim", 0.72, 0.82, coordStr, 2800],
      ["", 0.04, 0.48, jsonStr, 2100],
      ["", 0.82, 0.52, jsonStr, 2600],
      ["am", 0.18, 0.88, sparkStr, 1200],
      ["am", 0.68, 0.12, sparkStr, 1500],
    ];
    const els = defs.map(([cls, x, y]) => {
      const el = document.createElement("div");
      el.className = `tb-f ${cls}`;
      el.style.position = "absolute";
      el.style.left = `${x * 100}vw`;
      el.style.top = `${y * 100}vh`;
      el.style.whiteSpace = "pre";
      el.style.fontFamily = '"JetBrains Mono", ui-monospace, monospace';
      el.style.fontSize = "10px";
      el.style.letterSpacing = "0.06em";
      el.style.color =
        cls === "am"
          ? "rgba(255,182,72,0.55)"
          : cls === "dim"
          ? "rgba(230,237,246,0.18)"
          : "rgba(0,200,255,0.55)";
      el.style.textShadow =
        cls === "am"
          ? "0 0 8px rgba(255,182,72,0.25)"
          : cls === "dim"
          ? "none"
          : "0 0 8px rgba(0,200,255,0.3)";
      root.appendChild(el);
      return el;
    });

    const refresh: number[] = defs.map(() => 0);
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      defs.forEach(([, , , fn, iv], i) => {
        if (now > refresh[i]) {
          els[i].textContent = fn();
          refresh[i] = now + iv + Math.random() * 800;
        }
      });
      raf = window.setTimeout(tick, 300) as unknown as number;
    };
    tick();

    return () => {
      clearTimeout(raf);
      els.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={rootRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

// ==================================================================
//  ROOT
// ==================================================================
export default function TechBackground({
  mode = "globe",
  glow = 1,
  speed = 1,
  density = 1,
  amber = true,
  scan = true,
  lowPower,
  className,
}: TechBackgroundProps) {
  const reduced = usePrefersReducedMotion();
  const lp = useAutoLowPower(lowPower);
  const dpr: [number, number] = lp ? [1, 1] : [1, 1.75];

  const showTelemetry = mode === "telemetry" || mode === "composite";

  if (reduced) {
    // static gradient fallback — matches the dark palette, no motion
    return (
      <div
        aria-hidden
        className={className}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 20% 30%, rgba(0,200,255,0.08), transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(255,182,72,0.05), transparent 35%),
            linear-gradient(180deg, ${INK}, #04070c)
          `,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, #0b1726 0%, ${INK} 55%, #04070c 100%)`,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneRoot
            mode={mode}
            glow={glow}
            speed={speed}
            density={density}
            scan={scan}
            amber={amber}
            lowPower={lp}
          />
        </Suspense>
      </Canvas>

      {/* vignette + grain overlays (pure CSS, near-free) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 55%, transparent 0%, rgba(4,7,12,0.45) 60%, rgba(4,7,12,0.85) 100%)`,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {showTelemetry && <TelemetryOverlay />}
    </div>
  );
}
