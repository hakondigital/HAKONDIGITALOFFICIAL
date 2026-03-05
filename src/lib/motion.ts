/**
 * HAKON DIGITAL — Centralized Motion Config
 * All animation constants, easing curves, and Framer Motion variants.
 */

import type { Variants } from "framer-motion";

/* ── Easing curves ─────────────────────────────────── */

export const ease = {
  swift: [0.16, 1, 0.3, 1] as const,       // fast entry, natural settle
  out: [0.22, 1, 0.36, 1] as const,         // classic ease-out
  inOut: [0.4, 0, 0.2, 1] as const,         // standard material
  spring: { type: "spring" as const, stiffness: 220, damping: 30, mass: 0.8 },
  springSnap: { type: "spring" as const, stiffness: 380, damping: 36 },
};

/* ── Durations (seconds) ───────────────────────────── */

export const duration = {
  instant: 0.15,
  fast: 0.28,
  normal: 0.55,
  slow: 0.8,
  cinematic: 1.2,
};

/* ── Stagger delays (seconds) ─────────────────────── */

export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.13,
};

/* ── Reusable variants ─────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.swift },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.swift },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.swift },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.swift },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.1,
    },
  },
};

/* ── Viewport defaults ─────────────────────────────── */

export const viewport = {
  standard: { once: true, margin: "-80px" },
  tight: { once: true, margin: "-40px" },
  loose: { once: true, margin: "-120px" },
};
