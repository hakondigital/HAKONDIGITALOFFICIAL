"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const tools = [
  {
    title: "Lead Capture Automation",
    description:
      "Automatically route new website enquiries so you respond faster and miss fewer leads.",
  },
  {
    title: "Small Business Chatbots",
    description:
      "Give visitors instant answers and direct them to the right service with a simple, brand-aligned chatbot.",
  },
  {
    title: "Smart Contact Systems",
    description:
      "Improve forms and booking flows so the right information reaches your team from day one.",
  },
  {
    title: "Basic CRM Integrations",
    description:
      "Connect enquiries to your CRM so your team can track follow-ups and keep opportunities moving.",
  },
];

export default function AISystems() {
  return (
    <section id="ai-systems" className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-80px" }}
            className="lg:sticky lg:top-32"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
            >
              AI Tools
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
            >
              AI Tools for Small Businesses
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg"
            >
              We keep AI practical and easy to use. No heavy jargon. Just
              useful tools that help you respond faster, organise leads, and
              save time each week.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-60px" }}
            className="space-y-4"
          >
            {tools.map((tool, i) => (
              <motion.article
                key={tool.title}
                variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group rounded-xl border border-border/40 bg-bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:bg-bg-card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/10 text-xs font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {tool.description}
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
