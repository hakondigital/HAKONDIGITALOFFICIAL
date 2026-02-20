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

const layers = [
  {
    number: "01",
    title: "Encrypted Communication",
    description:
      "Every data exchange is encrypted end-to-end. TLS 1.3 enforcement, HSTS headers, secure cookie policies, and encrypted API payloads ensure data integrity at every point of transmission.",
    details: [
      "TLS 1.3 enforcement across all endpoints",
      "HSTS with preload and subdomains",
      "Secure, HttpOnly, SameSite cookies",
      "Certificate pinning where applicable",
    ],
  },
  {
    number: "02",
    title: "Server-Side Validation",
    description:
      "Never trust the client. Every input is validated, sanitised, and type-checked on the server before processing. Rate limiting, CSRF protection, and request-size limits prevent abuse.",
    details: [
      "Schema-based input validation (Zod/Yup)",
      "HTML and SQL injection sanitisation",
      "CSRF token verification",
      "Rate limiting per-IP and per-endpoint",
    ],
  },
  {
    number: "03",
    title: "Authentication & Access Control",
    description:
      "Multi-layer authentication with JWTs, refresh token rotation, role-based access control, and optional multi-factor authentication for administrative access.",
    details: [
      "JWT with automatic rotation",
      "Role-based access control (RBAC)",
      "Multi-factor authentication support",
      "Session invalidation and audit logging",
    ],
  },
  {
    number: "04",
    title: "AI-Powered Vulnerability Scanning",
    description:
      "Specialised security AI agents continuously scan the codebase and dependencies for known vulnerabilities, zero-day patterns, and configuration weaknesses before they reach production.",
    details: [
      "Automated dependency vulnerability scanning",
      "Code pattern analysis for injection risks",
      "Configuration auditing",
      "Real-time alerting on critical findings",
    ],
  },
  {
    number: "05",
    title: "Infrastructure Hardening",
    description:
      "Production environments are hardened with strict Content-Security-Policy headers, environment variable isolation, minimal container images, and network-level firewall rules.",
    details: [
      "Content-Security-Policy enforcement",
      "Environment variable isolation & rotation",
      "Minimal Docker images (distroless)",
      "Network-level access control lists",
    ],
  },
  {
    number: "06",
    title: "Monitoring & Incident Response",
    description:
      "Real-time error tracking, uptime monitoring, and anomaly detection provide immediate visibility into production health. Incident response protocols ensure rapid remediation.",
    details: [
      "Real-time error tracking (Sentry)",
      "Uptime monitoring with instant alerts",
      "Anomaly detection on traffic patterns",
      "Documented incident response playbooks",
    ],
  },
];

export default function SecurityPageContent() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary">
        <PageHero
          badge="SECURITY"
          title="Security-First"
          titleAccent="Infrastructure"
          description="Security is embedded into every phase of our engineering process, not bolted on as an afterthought. AI-powered scanning and human oversight work together to protect your digital assets."
        />

        {/* Security layers */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <FloatingGrid />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col gap-16">
              {layers.map((layer) => (
                <motion.article
                  key={layer.number}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  className="rounded-2xl border border-white/5 bg-bg-card p-8 lg:p-10"
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      variants={fadeUp}
                      className="hidden h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-accent/10 bg-accent/5 sm:flex"
                    >
                      <span className="font-heading text-xl font-bold text-accent">
                        {layer.number}
                      </span>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
                        <span className="mr-3 text-accent sm:hidden">
                          {layer.number}
                        </span>
                        {layer.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-text-secondary">
                        {layer.description}
                      </p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {layer.details.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-3 text-sm text-text-secondary"
                          >
                            <svg className="h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.article>
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
                Secure Your <span className="gradient-text">Digital Assets</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                Build on infrastructure that&apos;s engineered for security from the
                ground up.
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
