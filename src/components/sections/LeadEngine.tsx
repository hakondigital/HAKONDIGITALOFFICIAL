"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const features = [
  {
    label: "Automated Lead Capture",
    description:
      "Automatically captures website enquiries and form submissions, routing them into a structured pipeline with zero manual intervention.",
  },
  {
    label: "Intelligent Contact Organisation",
    description:
      "Organises contacts, prospects, and client data intelligently — categorised by source, status, and engagement history.",
  },
  {
    label: "Hakon Digital Integration",
    description:
      "Natively integrates with websites built by Hakon Digital, providing seamless data flow between your web presence and CRM.",
  },
  {
    label: "Growth Automation",
    description:
      "Simple, powerful automation tools for follow-ups, task assignment, and pipeline management — designed to accelerate business growth.",
  },
];

export default function LeadEngine() {
  return (
    <section id="leadengine" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.standard}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="section-module mb-5 justify-center">
            SYS.004 — LEADENGINE
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-8">
            <Image
              src="/images/leadengine-logo.png"
              alt="LeadEngine — Powered by Hakon Digital"
              width={420}
              height={210}
              className="mx-auto"
              priority={false}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              In Development
            </span>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            A next-generation lead capture and client management platform
            engineered for small to medium businesses. LeadEngine transforms
            how you acquire, organise, and convert prospects into clients.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              variants={fadeUp}
              className="card-lift group rounded-lg border border-border/50 bg-bg-card p-7 hover:border-accent/20"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/8 text-[10px] font-bold font-heading text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading text-sm font-semibold tracking-tight text-text-primary">
                  {feature.label}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-14 flex justify-center"
        >
          <motion.div
            variants={fadeUp}
            className="corner-marks rounded-lg border border-border bg-bg-card/80 px-8 py-5 text-center backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="status-dot" />
              <span
                className="mono-label"
                style={{ fontSize: "9px", opacity: 0.6 }}
              >
                PRODUCT STATUS
              </span>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-text-secondary">
              LeadEngine is currently under active development as part of Hakon
              Digital&apos;s expanding software ecosystem. Early access will be
              available to existing clients.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
