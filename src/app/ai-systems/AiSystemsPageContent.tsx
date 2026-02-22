"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";

const tools = [
  {
    title: "Lead Capture Automation",
    description:
      "Route new enquiries to the right person quickly so leads are not missed.",
  },
  {
    title: "Chatbots for Common Questions",
    description:
      "Give customers instant answers and guide them to your services or contact form.",
  },
  {
    title: "Smart Contact Systems",
    description:
      "Collect better enquiry details so your team can respond with context and confidence.",
  },
  {
    title: "Basic CRM Integrations",
    description:
      "Push leads into your CRM automatically and keep your follow-up process organised.",
  },
];

export default function AiSystemsPageContent() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary">
        <PageHero
          badge="AI TOOLS"
          title="AI Tools for Small Businesses"
          description="Useful automation that helps you save time, respond faster, and keep enquiries organised."
        />

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {tools.map((tool, index) => (
                <motion.article
                  key={tool.title}
                  variants={fadeUp}
                  className="rounded-xl border border-border/50 bg-bg-card p-8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-sm font-bold text-accent">
                    {index + 1}
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-text-primary">
                    {tool.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {tool.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-bg-secondary py-16">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                Practical, Not Overcomplicated
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                We recommend simple AI tools that fit your business today and
                can scale later if needed.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Want AI Tools in Your Website?
              </h2>
              <p className="mt-4 text-text-secondary">
                We can help you choose the right setup and implement it
                without adding complexity.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
