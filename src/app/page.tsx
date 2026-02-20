"use client";

import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Engineering from "@/components/sections/Engineering";
import AISystems from "@/components/sections/AISystems";
import Security from "@/components/sections/Security";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Guarantees from "@/components/sections/Guarantees";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Engineering />
        <div className="section-divider" />
        <AISystems />
        <div className="section-divider" />
        <Security />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Guarantees />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
