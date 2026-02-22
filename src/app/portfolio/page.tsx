import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | Small Business Website Results | Hakon Digital",
  description:
    "See before-and-after website results for Sydney and Australian small businesses, focused on clarity, lead quality, and local impact.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
