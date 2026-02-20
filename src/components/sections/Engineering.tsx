"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

const principles = [
  {
    title: "AI + Human Code Precision",
    description:
      "We have engineered the perfect combination of advanced AI agents and human expertise. AI accelerates generation while our engineers refine, restructure, and verify every output for structural integrity.",
  },
  {
    title: "Engineered Architecture",
    description:
      "Component hierarchies, state management patterns, and data flow are designed upfront, not retrofitted. We build systems that scale without refactoring.",
  },
  {
    title: "Performance-First Mindset",
    description:
      "Sub-second load times, optimised bundles, lazy-loaded assets, and efficient rendering pipelines. Performance is not an afterthought. It is the foundation.",
  },
  {
    title: "Intelligent Agent Orchestration",
    description:
      "Our proprietary AI agent combination handles code generation, testing, and optimisation in parallel, while human engineers maintain architectural oversight and quality assurance.",
  },
  {
    title: "Scalable Digital Ecosystems",
    description:
      "Built to grow. API-first architecture, microservice-ready backends, and extensible frontend systems that evolve alongside your business requirements.",
  },
];

export default function Engineering() {
  return (
    <section id="engineering" className="relative bg-bg-primary py-24 lg:py-32">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          >
            Engineering Philosophy
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Engineered with{" "}
            <span className="gradient-text">AI-Augmented Precision</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            We have engineered the perfect artificial intelligence agent
            combination to craft highly reliable web infrastructure. AI
            handles velocity; our engineers deliver precision, architectural
            integrity, and unwavering quality control.
          </motion.p>
        </motion.div>

        {/* Principles grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-60px" }}
          className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((p, i) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              className="group bg-bg-card p-8 transition-colors duration-300 hover:bg-bg-card-hover"
            >
              <div className="mb-4 font-heading text-xs font-bold tracking-widest text-accent/50">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {p.description}
              </p>
            </motion.div>
          ))}

          {/* Final cell - accent highlight */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent p-8 sm:col-span-2 lg:col-span-1"
          >
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-accent">
                100%
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Reliable delivery.
                <br />
                AI-augmented. Human-verified.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
