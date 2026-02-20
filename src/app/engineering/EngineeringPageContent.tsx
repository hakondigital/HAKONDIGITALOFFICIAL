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

const principles = [
  {
    number: "01",
    title: "AI + Human Code Precision",
    description:
      "Every line of code is produced through an engineered combination of advanced AI agents and expert human review. The result: cleaner syntax, fewer edge-case bugs, and production-grade reliability that surpasses either approach alone.",
    details: [
      "AI-generated code scaffolding with human verification",
      "Automated linting and type-safety enforcement",
      "Zero-tolerance for technical debt",
      "Version-controlled with atomic commit discipline",
    ],
  },
  {
    number: "02",
    title: "Intelligent Agent Orchestration",
    description:
      "We have perfected the combination of specialised AI agents, each tuned for different engineering tasks. Code generation, testing, security analysis, and documentation all run in parallel through our orchestration pipeline.",
    details: [
      "Multi-agent pipeline for development lifecycle",
      "Specialised agents for security, testing & docs",
      "Continuous integration with AI-powered review",
      "Automated regression detection",
    ],
  },
  {
    number: "03",
    title: "TypeScript-Strict Architecture",
    description:
      "Every project runs under TypeScript strict mode with zero tolerance for 'any' types. This ensures compile-time guarantees, self-documenting interfaces, and robust refactoring across the entire codebase.",
    details: [
      "Strict mode with noImplicitAny",
      "Interface-first design patterns",
      "Compile-time contract enforcement",
      "Discriminated union type safety",
    ],
  },
  {
    number: "04",
    title: "Performance-First Engineering",
    description:
      "Sub-second load times, optimal bundle sizes, and efficient rendering pipelines. Every component is profiled and optimised before it ships, powered by AI-driven performance analysis.",
    details: [
      "Core Web Vitals optimisation",
      "Code-splitting and lazy loading",
      "Image optimisation pipeline",
      "Runtime performance profiling",
    ],
  },
  {
    number: "05",
    title: "Security-First Methodology",
    description:
      "Security is not an afterthought. Encryption, server-side validation, authentication layers, and penetration testing are embedded into every phase of the engineering process.",
    details: [
      "OWASP Top 10 compliance",
      "Server-side validation at every endpoint",
      "Encrypted data in transit and at rest",
      "Regular dependency auditing via AI agents",
    ],
  },
];

export default function EngineeringPageContent() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary">
        <PageHero
          badge="ENGINEERING"
          title="AI-Augmented"
          titleAccent="Precision Engineering"
          description="We've engineered the perfect combination of advanced AI agents and human expertise. The result is production-grade code that is 100% reliable, rigorously tested, and built to scale."
        />

        {/* Principles deep-dive */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <FloatingGrid />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col gap-20">
              {principles.map((p, i) => (
                <motion.article
                  key={p.number}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  className="grid gap-8 md:grid-cols-[100px_1fr]"
                >
                  <motion.div
                    variants={fadeUp}
                    className="flex items-start"
                  >
                    <span className="font-heading text-5xl font-bold text-accent/20">
                      {p.number}
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <h3 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {p.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-3 text-sm text-text-secondary"
                        >
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats ribbon */}
        <section className="border-y border-white/5 bg-bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { stat: "100%", label: "Reliable Delivery" },
                { stat: "<1s", label: "Average Load Time" },
                { stat: "0", label: "Tolerance for Tech Debt" },
                { stat: "24/7", label: "Support Treatment" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="font-heading text-4xl font-bold text-accent">
                    {item.stat}
                  </div>
                  <div className="mt-2 text-sm text-text-secondary">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Experience the <span className="gradient-text">Difference</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                See how AI-augmented precision engineering delivers results your
                business can rely on.
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
