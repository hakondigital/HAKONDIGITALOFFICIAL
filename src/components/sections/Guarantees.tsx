"use client";

import { motion } from "framer-motion";
import { guarantees } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

function GuaranteeIcon({ type }: { type: string }) {
  const base = "h-6 w-6 text-accent";

  switch (type) {
    case "pricing":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
        </svg>
      );
    case "contract":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-7.5A2.25 2.25 0 0017.25 4.5h-10.5A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h4.5m3.75-6.75l1.5 1.5 3-3" />
        </svg>
      );
    case "australia":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7.5-4.108 7.5-11.25a7.5 7.5 0 10-15 0C4.5 16.892 12 21 12 21z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "communication":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      );
    case "timeline":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2.25m5.25-.75a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Guarantees() {
  return (
    <section className="relative bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            Commitments
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            What You Can Expect
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary"
          >
            We keep every project straightforward, transparent, and focused on
            practical outcomes for small businesses.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-60px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {guarantees.map((commitment) => (
            <motion.article
              key={commitment.title}
              variants={fadeUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-border/40 bg-bg-card p-8 transition-all duration-300 hover:border-accent/20"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 transition-colors group-hover:border-accent/40">
                <GuaranteeIcon type={commitment.icon} />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                {commitment.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {commitment.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
