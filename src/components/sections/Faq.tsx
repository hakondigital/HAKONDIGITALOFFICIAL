"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const faqs = [
  { question: "How much does a small business website cost in Australia?", answer: "Most small business websites depend on scope, features, and content. At Hakon Digital, website design starts from $960 AUD with clear pricing and no hidden surprises." },
  { question: "How much should I pay for a website?", answer: "You should pay for a site that supports your business goals, not unnecessary complexity. A well-built small business website often starts with a focused package and grows as your needs grow." },
  { question: "Do I need a website for my small business?", answer: "Yes. A professional website helps people find you on Google, builds trust, and makes it easier for customers to contact you at any time." },
  { question: "Do you offer website design for tradies near me?", answer: "Yes. We work with tradies and local services across Sydney and wider Australia, creating practical websites that turn local traffic into real enquiries." },
  { question: "Can I get affordable website development in Sydney without paid ads?", answer: "Yes. We structure websites for organic visibility so you can improve search presence over time without relying only on paid advertising." },
  { question: "How long does a small business website take to launch?", answer: "Most projects launch within a few weeks depending on content readiness and scope. We provide honest timelines and clear milestones before work begins." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 pr-4">
          <span className="mono-label mt-0.5 shrink-0" style={{ opacity: 0.4, fontSize: "9px" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading text-base font-medium tracking-tight text-text-primary">
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 shrink-0 text-accent/60"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-10 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  return (
    <section className="relative bg-bg-secondary py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pointer-events-none absolute inset-0 line-grid opacity-15" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard}>
          <motion.div variants={fadeUp} className="section-module mb-5">SYS.008 — INTEL</motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Small Business Website Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Straight answers for small business owners comparing website design options in Sydney and across Australia.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.tight}
          className="mt-14 rounded-lg border border-border/50 bg-bg-card px-6 lg:px-8"
        >
          {faqs.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
