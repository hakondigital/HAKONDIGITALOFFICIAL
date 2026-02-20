import type { Metadata } from "next";
import AiSystemsPageContent from "./AiSystemsPageContent";

export const metadata: Metadata = {
  title: "AI Systems | HAKON DIGITAL",
  description:
    "Discover our perfected AI agent combination. Multi-agent orchestration, intelligent automation, and AI-augmented development that powers every HAKON DIGITAL project.",
};

export default function AiSystemsPage() {
  return <AiSystemsPageContent />;
}
