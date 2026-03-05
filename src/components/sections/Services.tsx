"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

function ServiceIcon({ type }: { type: string }) {
  const base = "h-5 w-5 text-accent";
  switch (type) {
    case "layout":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      );
    case "ai":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case "support":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Services() {
  return (
    <section id="services" className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.standard}
        >
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.002 — SERVICES</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What We Do
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Clear services designed for small businesses that want a strong website, better lead flow, and reliable support.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              className="card-lift corner-marks group rounded-lg border border-border/60 bg-bg-card p-8 hover:border-accent/20"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-accent/20 bg-accent/8">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-[13px] text-text-muted">
                    <span className="h-px w-3 bg-accent/40 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
