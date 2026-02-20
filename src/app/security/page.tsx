import type { Metadata } from "next";
import SecurityPageContent from "./SecurityPageContent";

export const metadata: Metadata = {
  title: "Security | HAKON DIGITAL",
  description:
    "Security-first engineering methodology. Encrypted endpoints, server hardening, authentication layers, and AI-powered vulnerability scanning.",
};

export default function SecurityPage() {
  return <SecurityPageContent />;
}
