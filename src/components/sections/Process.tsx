"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: lineRef.current, start: "top 80%", end: "bottom 40%", scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard} className="text-center">
          <motion.div variants={fadeUp} className="section-module mb-5 justify-center">SYS.006 — PROCESS</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Our 4-Step Process
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            A clear path from first conversation to launch: Strategy, Design, Build, and Launch.
          </motion.p>
        </motion.div>

        <div className="relative mt-20">
          <div
            ref={lineRef}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/30 to-transparent lg:left-1/2 lg:-translate-x-px"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.tight}
            className="space-y-12 lg:space-y-16"
          >
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex items-start gap-8 lg:gap-0 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 -translate-x-1/2 lg:left-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="corner-marks flex h-11 w-11 items-center justify-center rounded-md border border-accent/30 bg-bg-primary"
                    >
                      <span className="font-heading text-xs font-bold text-accent">{step.step}</span>
                    </motion.div>
                  </div>
                  <div className={`ml-14 lg:ml-0 lg:w-1/2 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className="mb-2">
                      <span className="mono-label" style={{ fontSize: "9px", opacity: 0.5 }}>PHASE {step.step}</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-text-primary">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
