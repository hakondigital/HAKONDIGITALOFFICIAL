"use client";

import Image from "next/image";
import Link from "next/link";
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
          badge="TEMPLATES"
          title="Website"
          titleAccent="Templates"
          description="Example designs showcasing the types of websites we build — from trade businesses to professional services and advisory firms."
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
                <motion.div
                  key={item.title}
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
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
                        EXAMPLE
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
                  </div>
                </motion.div>
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
                Clear Process, Practical Outcomes
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-relaxed text-text-secondary"
              >
                We keep projects simple: understand the business, clean up the
                message, improve structure, then launch with confidence. The
                result is a professional website that is easier for local
                customers to trust and act on.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-10 grid gap-6 sm:grid-cols-3"
              >
                {[
                  { stat: "Custom Built", label: "No Templates or Builders" },
                  { stat: "Sydney + AU", label: "Local Business Coverage" },
                  { stat: "$960+", label: "Starting Website Packages" },
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
                Let&apos;s map out the right website setup for your business.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-dim"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
