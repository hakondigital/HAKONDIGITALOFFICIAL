"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SplitType from "split-type";
import { siteConfig } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const timeout = setTimeout(() => {
      const split = new SplitType(headingRef.current!, {
        types: "words",
      });

      if (split.words) {
        gsap.set(split.words, { y: 60, opacity: 0 });
        gsap.to(split.words, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-charcoal"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/50" />
      </div>

      {/* Decorative subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Large "M" watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-heading text-[28rem] leading-none text-white sm:text-[36rem] lg:text-[48rem]">
          M
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Brand wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-heading text-5xl tracking-[0.15em] text-white/90 sm:text-6xl md:text-7xl lg:text-8xl">
              MATIERE
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-[2px] w-32 origin-left bg-accent-light sm:w-48"
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent-light"
          >
            Carpentry &amp; Handyman — Northern Beaches, Sydney
          </motion.p>

          {/* Heading — animated with SplitType + GSAP */}
          <h1
            ref={headingRef}
            className="font-heading text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {siteConfig.tagline}
          </h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-8 max-w-xl text-lg leading-relaxed text-cream-dark/80"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => handleScrollTo("contact")}
              className="rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark focus-visible:outline-accent"
            >
              Request a Quote
            </button>
            <button
              type="button"
              onClick={() => handleScrollTo("work")}
              className="rounded-md border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              View Recent Projects
            </button>
          </motion.div>

          {/* Quick trust indicators */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Projects Completed", value: "500+" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl text-white">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-warm-gray-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/40">
            Scroll
          </span>
          <svg
            className="h-5 w-5 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
