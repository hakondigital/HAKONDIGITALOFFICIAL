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
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.005 — TEMPLATES</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What We Can Build for You
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Example templates showcasing the types of websites we design and develop — from trade businesses to professional services and advisory firms.
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
            <motion.div
              key={i}
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
                <div className="absolute top-4 right-4">
                  <span className="rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-medium tracking-widest text-accent backdrop-blur-sm mono-label" style={{ fontSize: "9px" }}>
                    EXAMPLE
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
