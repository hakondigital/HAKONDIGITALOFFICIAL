"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";

const FloatingGrid = dynamic(() => import("@/components/ui/FloatingGrid"), {
  ssr: false,
});

const capabilities = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    title: "Perfected AI Agent Combination",
    description:
      "We have engineered the perfect combination of specialised AI agents, each purpose-built for a specific engineering task. Code generation, testing, security scanning, documentation, and performance optimisation agents work in orchestrated harmony.",
    highlights: [
      "Purpose-built specialised agents",
      "Orchestrated multi-agent workflows",
      "Continuous quality feedback loops",
      "Self-improving pipeline",
    ],
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Intelligent Automation Workflows",
    description:
      "From client enquiry to deployment, intelligent automation handles repetitive tasks, freeing human engineers to focus on architecture, strategy, and creative problem-solving.",
    highlights: [
      "Automated code scaffolding",
      "CI/CD pipeline integration",
      "Auto-generated documentation",
      "Intelligent dependency management",
    ],
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Conversational AI Embedding",
    description:
      "Deploy custom-trained conversational AI directly into client websites to handle customer enquiries, qualify leads, and provide instant support with brand-aligned personality.",
    highlights: [
      "Custom-trained chatbot deployment",
      "Natural language understanding",
      "Lead qualification automation",
      "Multi-language support",
    ],
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "AI-Driven Analytics & Insights",
    description:
      "Going beyond standard analytics, our AI systems process user behaviour data to surface actionable insights, predict churn, and recommend UX improvements backed by data.",
    highlights: [
      "Behavioural pattern analysis",
      "Predictive engagement models",
      "Automated A/B test analysis",
      "Real-time anomaly detection",
    ],
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "AI Security Scanning",
    description:
      "Automated security agents continuously scan code, dependencies, and infrastructure for vulnerabilities, catching issues before they reach production.",
    highlights: [
      "Continuous vulnerability scanning",
      "Dependency risk assessment",
      "Code injection detection",
      "Compliance monitoring",
    ],
  },
];

export default function AiSystemsPageContent() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary">
        <PageHero
          badge="AI SYSTEMS"
          title="The Perfected"
          titleAccent="AI Agent Combination"
          description="We don't just use AI. We've engineered a sophisticated multi-agent orchestration system where specialised AI agents handle distinct engineering tasks in orchestrated harmony, with human oversight at every critical checkpoint."
        />

        {/* Agent pipeline visual */}
        <section className="border-y border-white/5 bg-bg-secondary py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1 }}
              className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {[
                "Code Generation",
                "Testing",
                "Security Scan",
                "Documentation",
                "Optimisation",
              ].map((stage, i) => (
                <div
                  key={stage}
                  className="flex flex-col items-center gap-3 rounded-xl border border-accent/10 bg-bg-card p-6 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {stage}
                  </span>
                  <span className="text-[11px] text-text-secondary">
                    AI Agent
                  </span>
                </div>
              ))}
            </motion.div>
            <p className="mt-6 text-center text-xs text-text-secondary">
              Each stage is powered by a specialised AI agent with human
              engineering oversight
            </p>
          </div>
        </section>

        {/* Capabilities deep-dive */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <FloatingGrid />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col gap-20">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  className={`flex flex-col gap-8 lg:flex-row ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <motion.div
                    variants={fadeUp}
                    className="flex w-full flex-shrink-0 items-start justify-center lg:w-1/3"
                  >
                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-accent/10 bg-accent/5 text-accent">
                      {cap.icon}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex-1">
                    <h3 className="font-heading text-2xl font-bold text-text-primary">
                      {cap.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      {cap.description}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {cap.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-3 text-sm text-text-secondary"
                        >
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Leverage the <span className="gradient-text">AI Advantage</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                Experience the reliability of AI-augmented engineering backed by
                human expertise.
              </p>
              <a
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim"
              >
                Start a Project
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
