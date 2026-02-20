"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const securityLayers = [
  {
    title: "Secure Deployment Protocols",
    description:
      "Every deployment follows strict security procedures: environment-isolated builds, encrypted transfer, and zero-downtime rollouts with immediate rollback capability.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: "Encrypted Contact Submissions",
    description:
      "All form submissions are validated server-side, sanitised against injection attacks, and transmitted through encrypted API routes. No client-side data exposure.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Secure API Routing",
    description:
      "Server-side API routes with rate limiting, origin validation, CORS policies, and request authentication. Every endpoint is hardened against abuse.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Data Protection Best Practices",
    description:
      "Compliant data handling with minimal data collection, server-side storage, and clear data lifecycle management. No unnecessary tracking or third-party exposure.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
  },
  {
    title: "Authentication System Implementation",
    description:
      "Multi-layer authentication with session management, JWT tokens, OAuth flows, and role-based access control tailored to your specific application requirements.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
];

export default function Security() {
  return (
    <section id="security" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-80px" }}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          >
            Security
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Security-First Engineering
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary"
          >
            Every deployment follows security-first engineering. Protection is
            not a feature. It is a fundamental requirement built into every
            layer of the stack.
          </motion.p>
        </motion.div>

        {/* Security layers */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-60px" }}
          className="mt-16 space-y-4"
        >
          {securityLayers.map((layer, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="group flex items-start gap-6 rounded-xl border border-border/40 bg-bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:bg-bg-card-hover lg:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent transition-colors group-hover:border-accent/40">
                {layer.icon}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                  {layer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
