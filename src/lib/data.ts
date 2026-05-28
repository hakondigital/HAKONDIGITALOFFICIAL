export const siteConfig = {
  name: "HAKON DIGITAL",
  founder: "Noah Campbell",
  location: "Sydney, Australia",
  abn: "37 601 051 522",
  phone: "0431 210 436",
  email: "noahcampbell@hakondigital.com",
  url: "https://www.hakondigital.com",
  socials: {
    instagram: "https://www.instagram.com/hakondigitalofficial/",
    facebook: "https://www.facebook.com/profile.php?id=61587687684275",
  },
};

export const navLinks = [
  { label: "Home", href: "#home", page: "/" },
  { label: "Websites", href: "#websites", page: "/websites" },
  { label: "Software", href: "#software-systems", page: "/software" },
  { label: "Consultancy", href: "#consultancy", page: "/consultancy" },
  { label: "Templates", href: "#portfolio", page: "/portfolio" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Web Application Engineering",
    description:
      "High-performance web applications built with modern frameworks, optimised for speed, reliability, and seamless user experience.",
    features: [
      "Next.js and React architecture",
      "Sub-second load performance",
      "SEO-engineered structure",
    ],
    icon: "layout" as const,
  },
  {
    title: "Custom Software Development",
    description:
      "Bespoke software systems designed to automate workflows, capture data, and scale alongside your business operations.",
    features: [
      "Business process automation",
      "API design and integrations",
      "Dashboard and reporting systems",
    ],
    icon: "ai" as const,
  },
  {
    title: "Infrastructure & Support",
    description:
      "Continuous deployment pipelines, uptime monitoring, and engineering support to keep your systems running at peak performance.",
    features: [
      "CI/CD and deployment automation",
      "Performance monitoring",
      "Ongoing engineering support",
    ],
    icon: "support" as const,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Strategy",
    description:
      "We learn about your business, services, and local audience so the website has a clear purpose from day one.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We design a professional, easy-to-use layout that reflects your brand and helps visitors take action.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We build your site with clean structure, fast loading speed, and the right tools for enquiries and lead capture.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Once approved, we launch your new site and provide clear support so you can keep moving forward confidently.",
  },
];

export const portfolioItems = [
  {
    title: "Trades & Construction",
    category: "Business Website",
    description:
      "A modern template for trade businesses — showcasing completed projects, services, and making quote requests easy for local homeowners.",
    image: "/images/carpentry-showcase.jpg",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Legal & Professional Services",
    category: "Professional Website",
    description:
      "A clean, trust-building template for law firms and professional services — clear service pages, client testimonials, and enquiry flows.",
    image: "/images/anthony-hamer-associates.jpg",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Advisory & Consulting",
    category: "Advisory Website",
    description:
      "A polished template for advisory and consulting firms — simplified positioning, strong calls to action, and optimised lead capture.",
    image: "/images/irx-advisors.jpg",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export const guarantees = [
  {
    title: "Transparent Pricing",
    description:
      "Simple, upfront pricing with clear inclusions, including website design starting from $960 AUD.",
    icon: "pricing" as const,
  },
  {
    title: "No Lock-In Contracts",
    description:
      "We earn your trust through results and service quality, not long-term contract pressure.",
    icon: "contract" as const,
  },
  {
    title: "Australian-Based Team",
    description:
      "We are based in Sydney and work with small businesses across Australia.",
    icon: "australia" as const,
  },
  {
    title: "Clear Communication",
    description:
      "Straight answers, practical advice, and regular updates throughout your project.",
    icon: "communication" as const,
  },
  {
    title: "Honest Timelines",
    description:
      "Realistic delivery plans with clear milestones so you always know what is happening next.",
    icon: "timeline" as const,
  },
];

export const budgetRanges = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
];
