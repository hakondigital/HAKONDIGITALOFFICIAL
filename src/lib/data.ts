export const siteConfig = {
  name: "HAKON DIGITAL",
  founder: "Noah Campbell",
  location: "Balgowlah, Northern Beaches, Sydney, Australia",
  abn: "37 601 051 522",
  phone: "0431 210 436",
  email: "noahcampbell10027@outlook.com",
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
  { label: "Odyssey", href: "#odyssey", page: "/odyssey" },
  { label: "Portfolio", href: "#portfolio", page: "/portfolio" },
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
    title: "Precision Carpentry",
    category: "Business Website",
    description:
      "Before: no clear online showcase. After: a modern site highlighting completed jobs and making quote requests easier for Sydney homeowners.",
    image: "/images/carpentry-showcase.png",
    gradient: "from-amber-500/20 to-orange-500/20",
    url: "https://www.hakondigital.com/portfolio",
  },
  {
    title: "Anthony Hamer & Associates",
    category: "Legal Practice Website",
    description:
      "Before: dated pages with unclear service flow. After: a clear legal website that improved trust, service clarity, and local enquiry quality.",
    image: "/images/anthony-hamer-associates.png",
    gradient: "from-blue-500/20 to-cyan-500/20",
    url: "https://www.hakondigital.com/portfolio",
  },
  {
    title: "irX Advisors",
    category: "Advisory Website",
    description:
      "Before: complex messaging and low conversion. After: simplified positioning, stronger calls to action, and better lead flow for an Australian advisory audience.",
    image: "/images/irx-advisors.png",
    gradient: "from-emerald-500/20 to-teal-500/20",
    url: "https://www.hakondigital.com/portfolio",
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
