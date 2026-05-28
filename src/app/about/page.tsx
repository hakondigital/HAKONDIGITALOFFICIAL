import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About | Hakon Digital — Noah Campbell, Founder & Developer",
  description:
    "Meet Noah Campbell — founder of Hakon Digital. Software engineer building websites, custom software, AI integrations, and providing independent technical consultancy from Sydney.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
