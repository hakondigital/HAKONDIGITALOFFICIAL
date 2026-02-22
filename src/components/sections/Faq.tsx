"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const faqs = [
  {
    question: "How much does a small business website cost in Australia?",
    answer:
      "Most small business websites depend on scope, features, and content. At Hakon Digital, website design starts from $960 AUD with clear pricing and no hidden surprises.",
  },
  {
    question: "How much should I pay for a website?",
    answer:
      "You should pay for a site that supports your business goals, not unnecessary complexity. A well-built small business website often starts with a focused package and grows as your needs grow.",
  },
  {
    question: "Do I need a website for my small business?",
    answer:
      "Yes. A professional website helps people find you on Google, builds trust, and makes it easier for customers to contact you at any time.",
  },
  {
    question: "Do you offer website design for tradies near me?",
    answer:
      "Yes. We work with tradies and local services across Sydney and wider Australia, creating practical websites that turn local traffic into real enquiries.",
  },
  {
    question: "Can I get affordable website development in Sydney without paid ads?",
    answer:
      "Yes. We structure websites for organic visibility so you can improve search presence over time without relying only on paid advertising.",
  },
  {
    question: "How long does a small business website take to launch?",
    answer:
      "Most projects launch within a few weeks depending on content readiness and scope. We provide honest timelines and clear milestones before work begins.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section className="relative bg-bg-primary py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Small Business Website Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-secondary"
          >
            Straight answers for small business owners comparing website design
            options in Sydney and across Australia.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-60px" }}
          className="mt-14 space-y-4"
        >
          {faqs.map((faq) => (
            <motion.article
              key={faq.question}
              variants={fadeUp}
              className="rounded-xl border border-border/50 bg-bg-card p-6"
            >
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
