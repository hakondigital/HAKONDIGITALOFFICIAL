"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative bg-bg-primary py-24 lg:py-32">
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
            Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            From Strategy to Scale
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary"
          >
            A structured, repeatable methodology that delivers predictable
            outcomes: on time, on spec, every engagement.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent lg:left-1/2 lg:-translate-x-px"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
          viewport={{ margin: "-40px" }}
            className="space-y-12 lg:space-y-16"
          >
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex items-start gap-8 lg:gap-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 -translate-x-1/2 lg:left-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-bg-primary"
                    >
                      <span className="font-heading text-sm font-bold text-accent">
                        {step.step}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 lg:ml-0 lg:w-1/2 ${
                      isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                    }`}
                  >
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
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
