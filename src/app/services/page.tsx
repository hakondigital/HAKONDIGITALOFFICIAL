import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "What We Do | Hakon Digital",
  description:
    "Website Design & Development, AI Tools & Automation, and Ongoing Support for small businesses in Sydney and across Australia.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
