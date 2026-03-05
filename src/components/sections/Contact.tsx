"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, budgetRanges } from "@/lib/data";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  budget: string;
  scope: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", business: "", budget: "", scope: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", business: "", budget: "", scope: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputBase = "w-full rounded-md border border-border/70 bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20";

  return (
    <section id="contact" className="relative bg-bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 line-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport.standard} className="lg:col-span-2">
            <motion.div variants={fadeUp} className="section-module mb-5">SYS.009 — CONTACT</motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Start a Project
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-text-secondary">
              Ready for a website that helps your business grow? Share your details and we will respond within 12 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 space-y-5">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <svg className="h-4 w-4 text-accent/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                {siteConfig.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <svg className="h-4 w-4 text-accent/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                {siteConfig.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <svg className="h-4 w-4 text-accent/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {siteConfig.location}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 rounded-lg border border-border bg-bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="status-dot" />
                <span className="mono-label" style={{ fontSize: "9px", opacity: 0.6 }}>RESPONSE TIME</span>
              </div>
              <p className="text-sm font-semibold text-text-primary">Within 12 hours</p>
              <p className="text-xs text-text-muted mt-1">Mon–Fri, 9am–6pm AEST</p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport.standard} className="lg:col-span-3">
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="corner-marks flex flex-col items-center justify-center rounded-lg border border-accent/20 bg-accent/5 p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-accent/30 bg-accent/15">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div className="mt-3 mono-label" style={{ opacity: 0.6 }}>TRANSMISSION RECEIVED</div>
                <h3 className="mt-3 font-heading text-xl font-semibold text-text-primary">Enquiry Received</h3>
                <p className="mt-2 text-sm text-text-secondary">We&apos;ll respond within 12 hours with clear next steps.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-accent hover:underline">Send another enquiry</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border/50 bg-bg-card p-7 lg:p-8" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
                    { id: "phone", label: "Phone", type: "tel", placeholder: "0400 000 000", required: false },
                    { id: "business", label: "Business Name", type: "text", placeholder: "Your business", required: false },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="mb-1.5 block mono-label" style={{ opacity: 0.55 }}>
                        {f.label.toUpperCase()} {f.required && <span className="text-accent">*</span>}
                      </label>
                      <input id={f.id} name={f.id} type={f.type} value={form[f.id as keyof FormData]} onChange={handleChange} placeholder={f.placeholder}
                        className={`${inputBase} ${errors[f.id as keyof FormData] ? "border-red-500/50" : ""}`} />
                      {errors[f.id as keyof FormData] && <p className="mt-1 text-xs text-red-400">{errors[f.id as keyof FormData]}</p>}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block mono-label" style={{ opacity: 0.55 }}>BUDGET RANGE</label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={`${inputBase} appearance-none`}>
                      <option value="">Select budget range</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="scope" className="mb-1.5 block mono-label" style={{ opacity: 0.55 }}>PROJECT SCOPE</label>
                    <input id="scope" name="scope" type="text" value={form.scope} onChange={handleChange} placeholder="e.g. Full website build" className={inputBase} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block mono-label" style={{ opacity: 0.55 }}>MESSAGE <span className="text-accent">*</span></label>
                  <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your project..."
                    className={`${inputBase} resize-none ${errors.message ? "border-red-500/50" : ""}`} />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>
                {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>}
                <button type="submit" disabled={status === "submitting"}
                  className="btn-primary rounded-md px-8 py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
                  {status === "submitting" ? "Transmitting..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
