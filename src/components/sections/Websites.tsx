"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const capabilities = [
  {
    module: "01",
    title: "Custom Web Applications",
    description:
      "Component-driven architecture built with Next.js, React, and TypeScript. Server-side rendering, static generation, and edge deployment for maximum performance.",
    specs: ["Next.js / React", "TypeScript", "Edge-optimised"],
  },
  {
    module: "02",
    title: "Business Platforms",
    description:
      "Scalable business portals, client dashboards, and e-commerce systems engineered to handle real operational demands — not template-based approximations.",
    specs: ["Scalable architecture", "Real-time data", "Secure auth"],
  },
  {
    module: "03",
    title: "Performance Engineering",
    description:
      "Sub-second load times, optimised asset delivery, and SEO-engineered page structures. Every deployment is benchmarked against Core Web Vitals standards.",
    specs: ["< 1.2s avg load", "98+ Lighthouse", "SEO-first"],
  },
];

export default function Websites() {
  return (
    <section id="websites" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.standard}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="section-module mb-5">
            SYS.002 — WEBSITES
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            High-Performance{" "}
            <span className="gradient-text">Web Systems</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            We engineer websites as production-grade systems — not templates.
            Every build is architected for speed, scalability, and long-term
            reliability across devices and markets.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.article
              key={cap.title}
              variants={fadeUp}
              className="card-lift corner-marks group rounded-lg border border-border/60 bg-bg-card p-8 hover:border-accent/20"
            >
              <div className="mb-5 font-heading text-xs font-bold tracking-widest text-accent/40">
                {cap.module}
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {cap.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {cap.specs.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1 text-[11px] font-medium text-accent/70"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
