"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const systems = [
  {
    title: "AI Integration into Existing Tools",
    description:
      "Plug AI directly into the CRM, project management, or accounting tools you already run — HubSpot, Salesforce, BuilderTrend, NextMinute, Xero — without replacing your stack. Smarter triage, auto-summaries, draft replies, and data enrichment.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: "Custom Internal Software",
    description:
      "Bespoke web apps and internal tools designed around your actual workflow — quoting engines, document triage, client portals, intake systems — built when off-the-shelf software genuinely doesn't fit.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: "API Bridges & Integrations",
    description:
      "Connect the systems that don't talk to each other today. Secure API layers between your CRM, website, payment gateway, accounting platform, and any third-party service — so data flows automatically instead of through copy-paste.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description:
      "End-to-end automation for the repetitive grind — quoting, client intake, follow-ups, reminders, reporting. Eliminate manual data entry, reduce errors, and free up hours every week without changing the tools your team already uses.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Operational Dashboards",
    description:
      "Single-pane-of-glass dashboards that pull data from every tool you run — sales, ops, finance — into one real-time view. Built so you can make decisions from numbers instead of from spreadsheets and gut feel.",
    icon: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
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
              Custom Software &{" "}
              <span className="gradient-text">AI Integration</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg"
            >
              We build custom software and plug AI into the tools your business
              already runs. Connect APIs to your existing CRM, automate the
              manual grind, and ship internal systems that move faster than
              your team can update a spreadsheet.
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
                  "AI into existing CRMs",
                  "Custom internal apps",
                  "Workflow automation",
                  "API integrations",
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
