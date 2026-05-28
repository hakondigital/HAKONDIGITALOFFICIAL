"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerContainerSlow, viewport } from "@/lib/motion";

const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "Git / CI/CD",
  "AI / ML",
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

export default function About() {
  return (
    <section id="about" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,200,255,0.04)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.010 — ABOUT</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Meet the Founder
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            The person behind every line of code at Hakon Digital.
          </motion.p>
        </motion.div>

        {/* Founder card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-16 grid items-start gap-12 lg:grid-cols-5 lg:gap-16"
        >
          {/* Photo — 2 cols */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <div className="relative">
              <div className="corner-marks relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-lg border border-border/50">
                <Image
                  src="/images/noah-campbell.jpg"
                  alt="Noah Campbell — Founder of Hakon Digital"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
              </div>
              {/* Status tag */}
              <div className="absolute -bottom-3 left-4 right-4 flex items-center gap-3 rounded-md border border-border/60 bg-bg-card/90 px-4 py-3 backdrop-blur-sm max-w-[400px]">
                <div className="status-dot" style={{ width: "6px", height: "6px" }} />
                <div>
                  <span className="mono-label block" style={{ fontSize: "9px", opacity: 0.5 }}>STATUS</span>
                  <span className="text-xs font-medium text-text-primary">Available for projects</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio — 3 cols */}
          <motion.div variants={slideInRight} className="lg:col-span-3">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Noah Campbell
            </h3>
            <p className="mt-1 text-base font-medium text-accent">
              Founder & Chief Technology Officer
            </p>

            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              I&apos;m a software engineer and web developer based in Sydney, Australia. I founded Hakon Digital to help businesses get professional, high-performance digital solutions — without the agency overhead or complexity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              I have practical experience across full-stack development — from building fast-loading business websites to custom software platforms. I write the code myself — no outsourcing, no templates, no shortcuts.
            </p>

            {/* Skills tags */}
            <div className="mt-8">
              <span className="mono-label mb-3 block" style={{ fontSize: "9px", opacity: 0.5 }}>TECH STACK</span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-sm border border-border/60 bg-bg-elevated/50 px-3 py-1.5 text-xs font-medium text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold"
              >
                Work With Me
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-24 space-y-5"
        >
          <motion.div variants={fadeUp}>
            <span className="mono-label" style={{ fontSize: "9px", opacity: 0.5 }}>BACKGROUND</span>
          </motion.div>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card-lift group rounded-lg border border-border/50 bg-bg-card p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-accent/20 bg-accent/5 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="mono-label text-accent" style={{ fontSize: "10px" }}>{item.year.toUpperCase()}</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-text-primary">{item.title}</h4>
                  <p className="mt-0.5 text-sm font-medium text-accent/70">{item.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
