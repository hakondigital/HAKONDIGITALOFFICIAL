import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | HAKON DIGITAL",
  description:
    "See our portfolio of custom-engineered digital solutions. Web applications, enterprise platforms, and AI-enhanced systems built with 100% reliable delivery.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
