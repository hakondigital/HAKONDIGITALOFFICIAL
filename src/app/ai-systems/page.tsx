import type { Metadata } from "next";
import AiSystemsPageContent from "./AiSystemsPageContent";

export const metadata: Metadata = {
  title: "AI Tools for Small Businesses | Hakon Digital",
  description:
    "Simple AI tools for small businesses: lead capture automation, chatbots, smart contact systems, and basic CRM integrations.",
};

export default function AiSystemsPage() {
  return <AiSystemsPageContent />;
}
