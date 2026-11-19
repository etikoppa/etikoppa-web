export const siteConfig = {
  name: "etikoppa Inc.",
  shortName: "etikoppa",
  domain: "etikoppa.in",
  url: "https://etikoppa.in",
  tagline: "Digital Innovation. Intelligent Automation. Business Growth.",
  description:
    "etikoppa Inc. is an AI-first parent technology holding company and digital services house headquartered in Hyderabad, building intelligent SaaS verticals and enterprise automation platforms.",
  hq: "Hyderabad, India",
  email: "hello@etikoppa.in",
  githubOrg: "https://github.com/etikoppa",
  githubRepo: "https://github.com/etikoppa/etikoppa-web",
  ogImage: "/og-image.png",
  navLinks: [
    { label: "Verticals", href: "/#verticals" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  mission:
    "To empower businesses of every scale with accessible, intelligent, and innovative digital solutions that simplify complexity and unlock new opportunities.",
  vision:
    "To build an interconnected digital ecosystem where businesses can operate smarter, grow faster, and innovate continuously.",
  principles: [
    {
      title: "Innovation First",
      description:
        "Continuously explore better ways to solve real-world problems with modern AI and cloud primitives.",
    },
    {
      title: "Automation Driven",
      description:
        "Eliminate repetitive operational work through intelligent workflows and autonomous agents.",
    },
    {
      title: "Business Focused",
      description:
        "Engineer every product and engagement around measurable commercial outcomes and ROI.",
    },
    {
      title: "Scalable by Design",
      description:
        "Architect modular, edge-ready systems that grow effortlessly from startup to enterprise scale.",
    },
    {
      title: "Customer Centric",
      description:
        "Prioritize clarity, speed, reliability, and intuitive experiences across every touchpoint.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
