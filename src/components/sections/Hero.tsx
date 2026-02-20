"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const TechBackground = dynamic(
  () => import("@/components/ui/TechBackground"),
  { ssr: false }
);

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const split = new SplitType(headlineRef.current, { types: "words" });
    const words = split.words;
    if (!words) return;

    const tl = gsap.timeline({ delay: 0.3 });

    gsap.set(words, { y: 60, opacity: 0 });
    gsap.set(subtextRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });

    tl.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.06,
      ease: "power3.out",
    })
      .to(
        subtextRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )
      .to(
        ctaRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Three.js animated background */}
      <TechBackground />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.06)_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs font-medium tracking-wider text-accent">
            DIGITAL ENGINEERING FIRM · SYDNEY
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Highly Engineered Digital Infrastructure
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Hakon Digital delivers precision-built web platforms powered by an
          engineered combination of advanced AI agents and expert human
          oversight, architected through JSX frameworks, intelligent
          automation, and meticulous code refinement.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handleScroll("contact")}
            className="group relative rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20"
          >
            <span className="relative z-10">Start a Project</span>
          </button>
          <button
            onClick={() => handleScroll("engineering")}
            className="rounded-lg border border-border-light/60 px-8 py-3.5 text-sm font-medium text-text-secondary transition-all hover:border-accent/40 hover:text-accent"
          >
            Explore Engineering
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-10 w-5 rounded-full border border-border-light/50"
          >
            <motion.div
              animate={{ y: [2, 14, 2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-accent/60"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
