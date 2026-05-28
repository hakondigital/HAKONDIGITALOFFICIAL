"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const TechBackground = dynamic(
  () => import("@/components/ui/TechBackground"),
  { ssr: false }
);

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const frame = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{value}{suffix}</span>;
}

function DataBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  return (
    <div className="data-bar mt-1.5 w-full">
      <motion.div
        className="data-bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function IntelPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-2xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,200,255,0.05) 0%, transparent 70%)" }}
      />
      <div className="corner-marks relative rounded-lg border border-border bg-bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="mono-label">HAKON — SYSTEMS</span>
          </div>
          <span className="mono-label opacity-40">v3.0.0</span>
        </div>
        <div className="divide-y divide-border/50 px-5">
          {[
            { label: "SYSTEMS DEPLOYED", value: 27, suffix: "+", pct: 92 },
            { label: "PERFORMANCE INDEX", value: 98, suffix: "", pct: 98 },
            { label: "CLIENT RETENTION", value: 100, suffix: "%", pct: 100 },
          ].map((m, i) => (
            <div key={m.label} className="py-4">
              <div className="flex items-baseline justify-between">
                <span className="mono-label" style={{ opacity: 0.5, fontSize: "9px" }}>{m.label}</span>
                <span className="font-heading text-xl font-bold text-accent">
                  <Counter to={m.value} suffix={m.suffix} />
                </span>
              </div>
              <DataBar pct={m.pct} delay={0.6 + i * 0.15} />
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 space-y-3">
          {[
            { label: "AVG LOAD TIME", val: "< 1.2s", pct: 96, delay: 1.1 },
            { label: "SYSTEM UPTIME", val: "99.9%", pct: 99.9, delay: 1.25 },
          ].map(m => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="mono-label" style={{ opacity: 0.5, fontSize: "9px" }}>{m.label}</span>
                <span className="mono-label text-secondary" style={{ fontSize: "9px" }}>{m.val}</span>
              </div>
              <DataBar pct={m.pct} delay={m.delay} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="mono-label" style={{ fontSize: "9px", opacity: 0.7 }}>STATUS: OPERATIONAL</span>
          </div>
          <span className="mono-label" style={{ fontSize: "9px", opacity: 0.35 }}>SYD / AU</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion || !headlineRef.current) return;
    const split = new SplitType(headlineRef.current, { types: "words" });
    const words = split.words;
    if (!words) return;
    gsap.set(labelRef.current, { y: 16, opacity: 0 });
    gsap.set(words, { y: 56, opacity: 0 });
    gsap.set(subtextRef.current, { y: 24, opacity: 0 });
    gsap.set(badgeRef.current, { y: 12, opacity: 0 });
    gsap.set(ctaRef.current, { y: 16, opacity: 0 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(labelRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
      .to(words, { y: 0, opacity: 1, duration: 0.85, stagger: 0.055, ease: "power3.out" }, "-=0.3")
      .to(subtextRef.current, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.4")
      .to(badgeRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.25")
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.2");
    return () => { tl.kill(); split.revert(); };
  }, [shouldReduceMotion]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative has-scan-line flex min-h-screen items-center overflow-hidden">
      <TechBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(0,200,255,0.035) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] lg:gap-10">
          <div className="max-w-2xl">
            <div ref={labelRef} className={shouldReduceMotion ? "" : "opacity-0"}>
              <div className="section-module mb-6">SYS.001 — HAKON DIGITAL</div>
            </div>
            <h1
              ref={headlineRef}
              className="text-4xl font-bold text-text-primary sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
              style={{ fontFamily: "var(--font-barlow), var(--font-space-grotesk), sans-serif", letterSpacing: "-0.04em", lineHeight: 1.0, fontWeight: 700 }}
            >
              Engineering Digital{" "}
              <span className="gradient-text">Infrastructure</span> for Modern Businesses.
            </h1>
            <p
              ref={subtextRef}
              className={`mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg ${shouldReduceMotion ? "" : "opacity-0"}`}
            >
              High-performance websites, custom software, AI integration into the tools you already run, and impartial technical advice before you sign the next five-figure software contract.
            </p>
            <div ref={badgeRef} className={`mt-8 ${shouldReduceMotion ? "" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-3 rounded-md border border-accent/20 bg-accent/5 px-4 py-2.5">
                <div className="status-dot" />
                <span className="mono-label" style={{ opacity: 0.65 }}>WEBSITES</span>
                <span className="mx-1 h-3 w-px bg-border-light/40" />
                <span className="mono-label" style={{ opacity: 0.65 }}>SOFTWARE + AI</span>
                <span className="mx-1 h-3 w-px bg-border-light/40" />
                <span className="mono-label" style={{ opacity: 0.65 }}>CONSULTANCY</span>
              </div>
            </div>
            <div ref={ctaRef} className={`mt-10 flex flex-wrap items-center gap-4 ${shouldReduceMotion ? "" : "opacity-0"}`}>
              <button onClick={() => scrollTo("contact")} className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold">Start a Project</button>
              <button onClick={() => scrollTo("portfolio")} className="btn-ghost rounded-md px-8 py-3.5 text-sm font-medium">See Recent Work</button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="mt-16 hidden items-center gap-3 lg:flex"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-9 w-5 items-center justify-center rounded-full border border-border-light/40"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [1, 10, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-0.5 rounded-full bg-accent/50"
                />
              </motion.div>
              <span className="mono-label" style={{ opacity: 0.35, fontSize: "9px" }}>SCROLL TO INITIALIZE</span>
            </motion.div>
          </div>
          <div className="hidden lg:block">
            <IntelPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
