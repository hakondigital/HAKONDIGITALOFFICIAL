"use client";

import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Websites from "@/components/sections/Websites";
import SoftwareSystems from "@/components/sections/SoftwareSystems";
import LeadEngine from "@/components/sections/LeadEngine";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Guarantees from "@/components/sections/Guarantees";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { CommandPalette, useCommandPalette } from "@/components/ui/CommandPalette";

function HomeContent() {
  const { open, onClose } = useCommandPalette();

  return (
    <>
      <CommandPalette open={open} onClose={onClose} />
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Websites />
        <div className="section-divider" />
        <SoftwareSystems />
        <div className="section-divider" />
        <LeadEngine />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Guarantees />
        <div className="section-divider" />
        <Faq />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  );
}
