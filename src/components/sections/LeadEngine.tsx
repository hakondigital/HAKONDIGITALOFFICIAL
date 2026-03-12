"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const features = [
  {
    label: "AI-Powered Lead Communication",
    description:
      "Intelligent automated outreach that engages prospects the moment they connect — personalised follow-ups, smart scheduling, and conversational AI that nurtures leads while you focus on closing.",
  },
  {
    label: "Intuitive CRM Dashboard",
    description:
      "A clean, powerful interface designed for speed. Manage your entire pipeline at a glance — no steep learning curves, no cluttered screens. Just the data you need, exactly when you need it.",
  },
  {
    label: "Seamless Hakon Digital Integration",
    description:
      "Natively connects with every Hakon Digital website and system. Leads flow directly from your web presence into Odyssey with zero configuration — one ecosystem, fully unified.",
  },
  {
    label: "Automated Pipeline Intelligence",
    description:
      "From lead scoring to task automation, Odyssey learns your workflow and optimises it. Automatic follow-up reminders, deal stage progression, and performance insights — all running in the background.",
  },
];

export default function LeadEngine() {
  return (
    <section id="odyssey" className="relative bg-bg-primary py-24 lg:py-32">
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
            SYS.004 — ODYSSEY
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-8">
            <Image
              src="/images/odyssey-logo.png"
              alt="Odyssey — Powered by Hakon Digital"
              width={420}
              height={210}
              className="mx-auto"
              priority={false}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              Now Available
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-text-primary lg:text-4xl"
          >
            The CRM built for businesses that move fast
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg"
          >
            Odyssey is a next-generation client relationship platform with
            AI at its core. Effortless to navigate, powerful under the hood —
            it automates lead communication, organises your pipeline, and
            turns prospects into clients without the complexity of legacy CRMs.
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
              Odyssey is live and available to all Hakon Digital clients.
              Integrated AI communication features are actively expanding —
              get in touch to onboard your business.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
