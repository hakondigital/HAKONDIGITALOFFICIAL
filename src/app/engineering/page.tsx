import type { Metadata } from "next";
import EngineeringPageContent from "./EngineeringPageContent";

export const metadata: Metadata = {
  title: "Engineering | HAKON DIGITAL",
  description:
    "AI-augmented precision engineering. Learn about our development principles, code quality standards, and the engineering methodology behind every project.",
};

export default function EngineeringPage() {
  return <EngineeringPageContent />;
}
