import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About | Hakon Digital — Noah Campbell, Founder & Developer",
  description:
    "Meet Noah Campbell — founder of Hakon Digital. Software engineer, web developer, and St Aloysius' College Kirribilli alumnus building digital solutions from Sydney.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
