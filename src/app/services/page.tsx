import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | HAKON DIGITAL",
  description:
    "Custom web applications, AI-enhanced systems, secure infrastructure, API development and enterprise UX engineering. Explore our full range of digital engineering services.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
