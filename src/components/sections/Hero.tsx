"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import dynamic from "next/dynamic";
import { Playfair_Display } from "next/font/google";
import HakonLogo from "@/components/ui/HakonLogo";

const TechBackground = dynamic(
  () => import("@/components/ui/TechBackground"),
  { ssr: false }
);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothLogoX = useSpring(logoX, {
    stiffness: 170,
    damping: 20,
    mass: 0.8,
  });
  const smoothLogoY = useSpring(logoY, {
    stiffness: 170,
    damping: 20,
    mass: 0.8,
  });

  const logoRotateX = useTransform(smoothLogoY, [-20, 20], [8, -8]);
  const logoRotateY = useTransform(smoothLogoX, [-28, 28], [-10, 10]);
  const logoGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(56,189,248,0.36), rgba(56,189,248,0.08) 35%, rgba(5,8,16,0) 68%)`;

  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const priceBadgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!headlineRef.current) return;

    const split = new SplitType(headlineRef.current, { types: "words" });
    const words = split.words;
    if (!words) return;

    const tl = gsap.timeline({ delay: 0.3 });

    gsap.set(logoRef.current, { y: 32, scale: 0.9, opacity: 0, filter: "blur(16px)" });
    gsap.set(words, { y: 60, opacity: 0 });
    gsap.set(subtextRef.current, { y: 30, opacity: 0 });
    gsap.set(priceBadgeRef.current, { y: 16, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });

    tl.to(logoRef.current, {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
    })
      .to(
        words,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.55"
      )
      .to(
        subtextRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )
      .to(
        priceBadgeRef.current,
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.15"
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

  const resetLogoMotion = () => {
    logoX.set(0);
    logoY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const handleLogoMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    logoX.set((px - 0.5) * 28);
    logoY.set((py - 0.5) * 20);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <TechBackground />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.05)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        <div className="mb-8 flex justify-center [perspective:1400px]">
          <motion.div
            ref={logoRef}
            onMouseMove={handleLogoMove}
            onMouseLeave={resetLogoMotion}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: smoothLogoX,
                    y: smoothLogoY,
                    rotateX: logoRotateX,
                    rotateY: logoRotateY,
                  }
            }
            className="group relative w-fit will-change-transform"
          >
            <motion.div
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.25, 0.55, 0.25], scale: [0.98, 1.04, 0.98] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ backgroundImage: logoGlow }}
              className="pointer-events-none absolute -inset-10 rounded-[2.5rem] blur-2xl"
            />
            <div className="relative rounded-2xl border border-accent/30 bg-bg-secondary/50 px-6 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.45)] backdrop-blur-sm">
              <HakonLogo size="lg" />
              <motion.div
                aria-hidden="true"
                style={{ backgroundImage: logoGlow }}
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen"
              />
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
                  animate={{ top: ["20%", "80%", "20%"], opacity: [0.25, 0.9, 0.25] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs font-medium tracking-wider text-accent">
            SYDNEY SMALL BUSINESS WEBSITES
          </span>
        </motion.div>

        <h1
          ref={headlineRef}
          className={`${playfair.className} text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl`}
        >
          Professional Websites for Small Businesses
        </h1>

        <p
          ref={subtextRef}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          We design modern, high-performing websites for small businesses
          across Sydney and Australia. Clear pricing. No complexity. Just
          results.
        </p>

        <div ref={priceBadgeRef} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-lg border border-accent/35 bg-accent/10 px-5 py-3 shadow-[0_12px_36px_rgba(56,189,248,0.16)] backdrop-blur-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent/90">
              Starting From
            </span>
            <span className="font-heading text-lg font-bold text-text-primary">
              $960 AUD
            </span>
          </div>
        </div>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handleScroll("contact")}
            className="group relative rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20"
          >
            <span className="relative z-10">Start a Project</span>
          </button>
          <button
            onClick={() => handleScroll("portfolio")}
            className="rounded-lg border border-border-light/60 px-8 py-3.5 text-sm font-medium text-text-secondary transition-all hover:border-accent/40 hover:text-accent"
          >
            See Recent Work
          </button>
        </div>

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



