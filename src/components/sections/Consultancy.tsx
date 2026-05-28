"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const services = [
  {
    code: "C.01",
    title: "Software & Vendor Diagnostics",
    pitch: "Should you buy BuilderTrend, run NextMinute, or have something built?",
    description:
      "An impartial, technical second opinion on the software decisions that quietly cost you tens of thousands. We assess your workflow, evaluate the realistic options — off-the-shelf, hybrid, or custom — and give you a written recommendation you can actually act on.",
    deliverables: ["Vendor shortlist with pros, cons & true total cost", "Build-vs-buy verdict in writing", "Migration risk assessment"],
  },
  {
    code: "C.02",
    title: "Automation & AI Audit",
    pitch: "Map your manual grind. Get a prioritised plan of what's worth automating.",
    description:
      "We walk through your business, document the repetitive work — quoting, intake, reminders, follow-ups, reporting — and rank each process by ROI. You leave with a roadmap that tells you exactly where AI and automation pay back, and where they don't.",
    deliverables: ["Process map of every manual workflow", "Prioritised automation roadmap with ROI estimates", "Fixed-fee — credited toward any build we do together"],
  },
  {
    code: "C.03",
    title: "Tech Stack & Infrastructure Review",
    pitch: "Audit the ten tools you've bolted on over five years. Cut the bloat.",
    description:
      "For businesses running a patchwork of overlapping subscriptions. We catalogue everything you're paying for, identify redundant tools, surface integration gaps, and recommend a consolidated stack that costs less and works better — especially valuable for legal, advisory, and professional services firms.",
    deliverables: ["Full software & licensing inventory", "Redundancy report with annual savings", "Consolidated stack recommendation"],
  },
  {
    code: "C.04",
    title: "Paid Discovery & Scoping",
    pitch: "A structured scoping engagement before any line of code is written.",
    description:
      "A half-day workshop that turns a vague idea into a clearly scoped project — technical architecture, milestones, fixed price. You walk away with a written brief whether you build with us or not. If you proceed, the full fee is credited toward your build.",
    deliverables: ["Half-day scoping workshop", "Written technical brief & cost estimate", "Fee credited if you proceed to build"],
  },
];

export default function Consultancy() {
  return (
    <section id="consultancy" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.standard}
        >
          <motion.div variants={fadeUp} className="section-module mb-5">
            SYS.004 — CONSULTANCY
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Independent technical advice for businesses about to spend{" "}
            <span className="gradient-text">serious money on software.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            Most businesses don&apos;t have anyone impartial and technical to ask
            before they sign a five-figure SaaS contract or commission a custom
            build. We do that work — diagnostics, audits, and paid scoping —
            so the next decision you make is the right one.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-16 grid gap-5 lg:grid-cols-2"
        >
          {services.map((service) => (
            <motion.article
              key={service.code}
              variants={fadeUp}
              className="card-lift corner-marks group flex flex-col rounded-lg border border-border/50 bg-bg-card p-7 transition-all hover:border-accent/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="mono-label rounded-sm border border-accent/20 bg-accent/5 px-2.5 py-1 text-accent"
                  style={{ fontSize: "9px" }}
                >
                  {service.code}
                </span>
                <span className="mono-label" style={{ fontSize: "9px", opacity: 0.4 }}>
                  ENGAGEMENT
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                {service.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent/80">
                {service.pitch}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>

              <div className="mt-6 border-t border-border/40 pt-5">
                <span
                  className="mono-label mb-3 block"
                  style={{ fontSize: "9px", opacity: 0.5 }}
                >
                  WHAT YOU GET
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="mt-1.5 h-px w-2 shrink-0 bg-accent/50" />
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-14 flex flex-col items-center gap-5 text-center"
        >
          <motion.p variants={fadeUp} className="max-w-xl text-sm leading-relaxed text-text-secondary">
            Not sure which engagement fits? Tell us where you&apos;re stuck and we&apos;ll
            recommend the right starting point — no obligation.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold"
            >
              Book a Consultation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
