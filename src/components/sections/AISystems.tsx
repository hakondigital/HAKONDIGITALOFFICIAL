"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const capabilities = [
  {
    title: "Perfected AI Agent Combination",
    description:
      "We have engineered and refined the optimal combination of AI agents that work in concert: code generation, review, testing, and optimisation, all supervised by human engineers who ensure architectural integrity at every stage.",
  },
  {
    title: "AI-Assisted Content Systems",
    description:
      "Intelligent content management layers that leverage AI to generate, moderate, and optimise written content while human oversight maintains brand consistency and strategic alignment.",
  },
  {
    title: "AI-Driven Automation Layers",
    description:
      "Workflow automation powered by AI agents, from lead qualification and scheduling to data processing and customer interaction routing, reducing operational overhead while increasing reliability.",
  },
  {
    title: "Intelligent Support Agents",
    description:
      "Custom-trained AI chat agents embedded directly into your web platform. Trained on your business data for contextual, accurate customer interaction, with human escalation pathways.",
  },
  {
    title: "Custom AI Embedding",
    description:
      "Purpose-built AI components integrated seamlessly into your site architecture: recommendation engines, predictive search, and dynamic content personalisation engineered for your specific use case.",
  },
];

export default function AISystems() {
  return (
    <section id="ai-systems" className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left column: header */}
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
              AI Systems
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
            >
              Intelligence Built{" "}
              <span className="gradient-text">Into the Stack</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-text-secondary lg:text-lg"
            >
              We have engineered the perfect artificial intelligence agent
              combination. AI is not a bolt-on feature; it is woven into
              every layer of the infrastructure, from code generation and
              testing to the user interface, creating systems that are faster
              to build, more reliable to deploy, and smarter to operate.
            </motion.p>

            {/* Decorative element */}
            <motion.div
              variants={fadeUp}
              className="mt-10 hidden lg:block"
            >
              <div className="flex gap-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: 12 + i * 8 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: capabilities */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-60px" }}
            className="space-y-4"
          >
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
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
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
