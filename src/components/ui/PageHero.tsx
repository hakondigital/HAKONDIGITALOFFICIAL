"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface PageHeroProps {
  badge: string;
  title: string;
  titleAccent?: string;
  description: string;
}

export default function PageHero({
  badge,
  title,
  titleAccent,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-bg-primary pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium tracking-wider text-accent">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="gradient-text">{titleAccent}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
