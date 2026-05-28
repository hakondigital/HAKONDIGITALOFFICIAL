"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerContainerSlow, viewport } from "@/lib/motion";

const skills = [
  { label: "TypeScript / JavaScript", level: 95 },
  { label: "React / Next.js", level: 95 },
  { label: "Node.js / Express", level: 90 },
  { label: "Python", level: 85 },
  { label: "Tailwind CSS / UI Design", level: 90 },
  { label: "PostgreSQL / Databases", level: 85 },
  { label: "Git / CI/CD / DevOps", level: 80 },
  { label: "AI / Machine Learning", level: 75 },
];

const timeline = [
  {
    year: "Present",
    title: "Founder & Chief Technology Officer",
    org: "Hakon Digital",
    description:
      "Running a software engineering and consultancy studio from Sydney. Building high-performance websites, custom software, AI integrations into existing CRMs, and providing independent technical advice to businesses about to make serious software decisions.",
  },
];

export default function AboutPageContent() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-bg-primary pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.06)_0%,_transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              {/* Text */}
              <motion.div variants={slideInLeft}>
                <div className="section-module mb-5">SYS.010 — ABOUT</div>
                <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                  Noah Campbell
                </h1>
                <p className="mt-2 text-lg font-medium text-accent">
                  Founder & Chief Technology Officer
                </p>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary">
                  I&apos;m a software engineer and web developer based in Sydney, Australia. I founded Hakon Digital to help businesses get professional, high-performance digital solutions — without the agency overhead or complexity.
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
                  I have practical experience across full-stack development — from building fast-loading business websites to custom software platforms. I write the code myself — no outsourcing, no templates, no shortcuts.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact-cta"
                    className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold"
                  >
                    Work With Me
                  </a>
                  <a
                    href="/#portfolio"
                    className="btn-ghost rounded-md px-8 py-3.5 text-sm font-medium"
                  >
                    View Templates
                  </a>
                </div>
              </motion.div>

              {/* Photo */}
              <motion.div variants={slideInRight} className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="corner-marks relative h-[420px] w-[340px] overflow-hidden rounded-lg border border-border/50 sm:h-[500px] sm:w-[400px]">
                    <Image
                      src="/images/noah-campbell.jpg"
                      alt="Noah Campbell — Founder of Hakon Digital"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 340px, 400px"
                      priority
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                  </div>
                  {/* Status tag */}
                  <div className="absolute -bottom-3 left-4 right-4 flex items-center gap-3 rounded-md border border-border/60 bg-bg-card/90 px-4 py-3 backdrop-blur-sm sm:left-6 sm:right-6">
                    <div className="status-dot" style={{ width: "6px", height: "6px" }} />
                    <div>
                      <span className="mono-label block" style={{ fontSize: "9px", opacity: 0.5 }}>STATUS</span>
                      <span className="text-xs font-medium text-text-primary">Available for projects</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Background & Timeline */}
        <section className="relative bg-bg-primary py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
              <motion.div variants={fadeUp} className="section-module mb-5">SYS.011 — BACKGROUND</motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Background & Experience
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                A snapshot of where I&apos;m at and what I&apos;m building right now.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.tight}
              className="mt-16 space-y-6"
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="card-lift group rounded-lg border border-border/50 bg-bg-card p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2 rounded-sm border border-accent/20 bg-accent/5 px-3 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="mono-label text-accent" style={{ fontSize: "10px" }}>{item.year.toUpperCase()}</span>
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-text-primary">{item.title}</h3>
                      <p className="mt-1 text-sm font-medium text-accent/70">{item.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Technical Skills */}
        <section className="relative bg-bg-primary py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
              <motion.div variants={fadeUp} className="section-module mb-5">SYS.012 — SKILLS</motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Technical Skills
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                The technologies and tools I work with daily to build fast, reliable digital products.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.tight}
              className="mt-16 grid gap-5 sm:grid-cols-2"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-lg border border-border/50 bg-bg-card p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-text-primary">{skill.label}</span>
                    <span className="mono-label text-accent" style={{ fontSize: "10px" }}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Values / What I Bring */}
        <section className="relative bg-bg-primary py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
              <motion.div variants={fadeUp} className="section-module mb-5">SYS.013 — VALUES</motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                How I Work
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.tight}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Code-First Approach",
                  description: "I write every line of code myself. No drag-and-drop builders, no outsourcing — just clean, handcrafted engineering.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  ),
                },
                {
                  title: "Direct Communication",
                  description: "You work directly with me — no account managers, no middlemen. Straight answers and practical solutions.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  ),
                },
                {
                  title: "Performance Obsessed",
                  description: "Every site I build is optimised for speed, accessibility, and search engines. Fast sites convert better.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="card-lift corner-marks rounded-lg border border-border/50 bg-bg-card p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-text-primary">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* CTA */}
        <section id="contact-cta" className="relative bg-bg-primary py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.04)_0%,_transparent_70%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
              <motion.div variants={fadeUp} className="section-module mb-5 justify-center">SYS.014 — START</motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Ready to Build Something?
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Whether you need a website, a custom software system, or just want to chat about your ideas — I&apos;d love to hear from you.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="/#contact" className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold">
                  Get in Touch
                </a>
                <a href={`mailto:noahcampbell10027@outlook.com`} className="btn-ghost rounded-md px-8 py-3.5 text-sm font-medium">
                  Email Directly
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
