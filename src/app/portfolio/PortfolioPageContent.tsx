"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { portfolioItems } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";

export default function PortfolioPageContent() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary">
        <PageHero
          badge="PORTFOLIO"
          title="Engineered"
          titleAccent="Digital Solutions"
          description="Every project is architected through our perfected AI + human engineering pipeline, delivering 100% reliable, production-grade digital infrastructure."
        />

        {/* Portfolio grid */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1 }}
              className="grid gap-8 md:grid-cols-2"
            >
              {portfolioItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-bg-card"
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium tracking-wide text-accent">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="font-heading text-xl font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm text-accent">
                      <span>Visit Live Site</span>
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Approach section */}
        <section className="border-t border-white/5 bg-bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl font-bold text-text-primary sm:text-4xl"
              >
                Every Project, <span className="gradient-text">Engineered</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-relaxed text-text-secondary"
              >
                Our portfolio reflects a consistent engineering methodology:
                AI-augmented development paired with human oversight, TypeScript-strict
                architecture, security-first deployment, and relentless attention to
                performance. Each project is delivered through the same perfected
                pipeline, ensuring 100% reliable results.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-10 grid gap-6 sm:grid-cols-3"
              >
                {[
                  { stat: "100%", label: "Client Satisfaction" },
                  { stat: "AI + Human", label: "Engineering Pipeline" },
                  { stat: "0", label: "Missed Deadlines" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="font-heading text-3xl font-bold text-accent">
                      {item.stat}
                    </div>
                    <div className="mt-1 text-sm text-text-secondary">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                Your Project Could Be{" "}
                <span className="gradient-text">Next</span>
              </h2>
              <p className="mt-4 text-text-secondary">
                Let&apos;s discuss how we can engineer the perfect digital
                solution for your business.
              </p>
              <a
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim"
              >
                Start a Project
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
