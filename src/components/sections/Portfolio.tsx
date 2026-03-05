"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioItems } from "@/lib/data";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.005 — PORTFOLIO</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Recent Small Business Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Before and after examples showing how clearer messaging and better website structure can improve local business enquiries.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {portfolioItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="card-lift corner-marks group relative overflow-hidden rounded-lg border border-border/50 bg-bg-card"
            >
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                {item.image && (
                  <Image src={item.image} alt={item.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                )}
                <div className="absolute inset-0 bg-bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-sm border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-widest text-white/70 backdrop-blur-sm mono-label" style={{ fontSize: "9px" }}>
                    {item.category.toUpperCase()}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/40 bg-accent/15 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
