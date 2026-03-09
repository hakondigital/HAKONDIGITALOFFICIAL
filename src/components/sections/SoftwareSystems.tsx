"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const systems = [
  {
    title: "CRM Systems",
    description:
      "Custom client relationship management platforms designed around your actual workflow — not a generic tool you have to work around.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Automation Pipelines",
    description:
      "End-to-end business process automation that eliminates manual data entry, reduces errors, and accelerates operational throughput.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Lead Generation Infrastructure",
    description:
      "Integrated lead capture, routing, and qualification systems that connect your website to your sales pipeline with zero manual intervention.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Business Dashboards",
    description:
      "Real-time operational dashboards that aggregate data from multiple sources into a single, actionable interface for informed decision-making.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
  {
    title: "API Integrations",
    description:
      "Secure, well-documented API layers that connect your systems to third-party services, payment gateways, and external data sources.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
];

export default function SoftwareSystems() {
  return (
    <section id="software-systems" className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.standard}
            className="lg:sticky lg:top-32"
          >
            <motion.div variants={fadeUp} className="section-module mb-5">
              SYS.003 — SOFTWARE SYSTEMS
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
            >
              Custom Software{" "}
              <span className="gradient-text">Engineering</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg"
            >
              We engineer custom software solutions designed to automate
              workflows, capture data, and improve operational efficiency.
              Every system is built for reliability, maintainability, and
              long-term scalability.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 rounded-lg border border-border bg-bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="status-dot" />
                <span
                  className="mono-label"
                  style={{ fontSize: "9px", opacity: 0.6 }}
                >
                  SOFTWARE DIVISION — ACTIVE
                </span>
              </div>
              <div className="space-y-2">
                {[
                  "Custom applications",
                  "Process automation",
                  "Data pipelines",
                  "System integrations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-px w-2 bg-accent/50" />
                    <span className="text-xs text-text-muted">{item}</span>
                    <div className="ml-auto h-1 w-12 rounded-full bg-accent/20">
                      <div className="h-full w-4/5 rounded-full bg-accent/60" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.tight}
            className="space-y-4"
          >
            {systems.map((system, i) => (
              <motion.article
                key={system.title}
                variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group rounded-lg border border-border/50 bg-bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:bg-bg-card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/8">
                    {system.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary">
                      {system.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {system.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
