export const siteConfig = {
  name: "HAKON DIGITAL",
  founder: "Noah Campbell",
  location: "Balgowlah, Northern Beaches, Sydney, Australia",
  abn: "37 601 051 522",
  phone: "0431 210 436",
  email: "noahcampbell10027@outlook.com",
  url: "https://hakondigital.com.au",
  socials: {
    instagram: "https://www.instagram.com/hakondigitalofficial/",
    facebook: "https://www.facebook.com/profile.php?id=61587687684275",
  },
};

export const navLinks = [
  { label: "Home", href: "#home", page: "/" },
  { label: "Services", href: "#services", page: "/services" },
  { label: "Engineering", href: "#engineering", page: "/engineering" },
  { label: "AI Systems", href: "#ai-systems", page: "/ai-systems" },
  { label: "Security", href: "#security", page: "/security" },
  { label: "Portfolio", href: "#portfolio", page: "/portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Custom Web Application Development",
    description:
      "Advanced JSX & React architecture with type-safe TypeScript builds, API integrations, and meticulous performance optimisation.",
    features: [
      "Advanced JSX & React architecture",
      "Type-safe TypeScript builds",
      "API integrations",
      "Performance optimisation",
    ],
    icon: "code" as const,
  },
  {
    title: "AI-Enhanced Web Systems",
    description:
      "Intelligent digital infrastructure through AI agent integrations, automation workflows, conversational AI embedding, and smart business logic.",
    features: [
      "AI agent integrations",
      "Automation workflows",
      "Conversational AI embedding",
      "Intelligent business logic",
    ],
    icon: "ai" as const,
  },
  {
    title: "Secure Infrastructure Deployment",
    description:
      "Security-first engineering with encrypted endpoints, server hardening, authentication layers, and secure form handling.",
    features: [
      "Encrypted endpoints",
      "Server security hardening",
      "Authentication layers",
      "Secure form handling",
    ],
    icon: "shield" as const,
  },
  {
    title: "API Development & Integration",
    description:
      "Robust endpoint architecture including REST & custom APIs, CRM integrations, social platform APIs, and payment gateways.",
    features: [
      "REST & custom endpoints",
      "CRM integrations",
      "Social platform APIs",
      "Payment gateways",
    ],
    icon: "api" as const,
  },
  {
    title: "Enterprise UX/UI Engineering",
    description:
      "High-conversion architecture through precision layout structuring and interaction micro-optimisation.",
    features: [
      "High-conversion architecture",
      "Precision layout structuring",
      "Interaction micro-optimisation",
    ],
    icon: "layout" as const,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Strategy & System Architecture",
    description:
      "Comprehensive analysis of business requirements, technical constraints, and strategic objectives to blueprint the optimal system architecture.",
  },
  {
    step: "02",
    title: "Design Engineering",
    description:
      "Every interface is engineered for precision: structured layouts, deliberate typography, and interaction patterns designed for conversion and usability.",
  },
  {
    step: "03",
    title: "Development & Integration",
    description:
      "AI-accelerated development paired with human engineering oversight. TypeScript-strict component systems integrated with APIs, databases, and third-party services, verified for zero technical debt.",
  },
  {
    step: "04",
    title: "Security Hardening",
    description:
      "Encrypted endpoints, authenticated routes, server-side validation, and deployment protocols that follow security-first engineering principles.",
  },
  {
    step: "05",
    title: "Launch & Monitoring",
    description:
      "Optimised deployment with performance monitoring, error tracking, and real-time analytics to ensure stability from day one.",
  },
  {
    step: "06",
    title: "Continuous Support",
    description:
      "Ongoing maintenance, iterative improvements, and 24/7 support treatment to ensure your digital infrastructure evolves with your business.",
  },
];

export const portfolioItems = [
  {
    title: "Matiere Carpentry",
    category: "Business Website",
    description:
      "High-conversion website for a precision carpentry business, featuring a portfolio showcase, service breakdowns, and integrated booking system.",
    image: "/images/matiere-carpentry.png",
    gradient: "from-amber-500/20 to-orange-500/20",
    url: "https://matiere-exemplar.vercel.app/",
  },
  {
    title: "Anthony Hamer & Associates",
    category: "Legal Practice Platform",
    description:
      "Full-service legal website with client intake automation, secure document handling, practice area pages, and professional credibility architecture.",
    image: "/images/anthony-hamer-associates.png",
    gradient: "from-blue-500/20 to-cyan-500/20",
    url: "https://hamer-legal-exemplar.vercel.app/",
  },
  {
    title: "irX Advisors",
    category: "Advisory Platform",
    description:
      "Professional advisory firm website with service showcases, team profiles, and a streamlined enquiry pipeline engineered for lead conversion.",
    image: "/images/irx-advisors.png",
    gradient: "from-emerald-500/20 to-teal-500/20",
    url: "https://irx-advisors.vercel.app/",
  },
];

export const guarantees = [
  {
    title: "24/7 Support Treatment",
    description:
      "Every client receives dedicated support access. Your digital infrastructure is monitored and maintained around the clock.",
    icon: "clock" as const,
  },
  {
    title: "12-Hour Response Guarantee",
    description:
      "Every enquiry receives a substantive response within a maximum of 12 hours. No automated replies. Direct communication.",
    icon: "response" as const,
  },
  {
    title: "Money Back Guarantee",
    description:
      "If the delivered product does not meet the agreed specifications, we offer a full refund. No ambiguity.",
    icon: "guarantee" as const,
  },
  {
    title: "Precision Delivery",
    description:
      "Every project is delivered on the agreed timeline with the exact specifications discussed. Scope clarity from day one.",
    icon: "target" as const,
  },
];

export const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
];
