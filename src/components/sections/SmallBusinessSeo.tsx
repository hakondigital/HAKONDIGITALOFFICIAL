"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const seoBlocks = [
  {
    module: "01",
    title: "Website Design for Tradies and Local Services",
    description: "Need website design for tradies near Sydney? We build clear service pages, suburb targeting sections, and easy quote forms for electricians, plumbers, builders, and other local operators.",
  },
  {
    module: "02",
    title: "Website Design for Law Firms and Consultants",
    description: "Professional websites for lawyers and consultants who want to build trust quickly. We focus on simple structure, strong service clarity, and enquiry flows that convert.",
  },
  {
    module: "03",
    title: "Small Business Website Packages Australia",
    description: "Our small business website packages in Australia are designed for value, with website design starting from $960 AUD and practical support after launch.",
  },
];

export default function SmallBusinessSeo() {
  return (
    <section className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.standard}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.001 — OVERVIEW</motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Web Development for Small Businesses in Sydney
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg">
            Hakon Digital provides web development for small businesses that want real results without complexity. Affordable website design Sydney businesses can trust — modern sites with clear pricing, strong performance, and practical support.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border/50 bg-border/30 md:grid-cols-3"
        >
          {seoBlocks.map((block) => (
            <motion.article
              key={block.title}
              variants={fadeUp}
              className="card-lift group relative bg-bg-card p-7 hover:bg-bg-card-hover"
            >
              <div className="mb-4 font-heading text-xs font-bold tracking-widest text-accent/40">{block.module}</div>
              <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{block.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
