export type ServiceIconKey =
  | "bot"
  | "building"
  | "shopping-bag"
  | "users"
  | "trending-up"
  | "lightbulb";

export interface ServiceDivision {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: ServiceIconKey;
  span: "wide" | "normal";
  capabilities: string[];
  relatedVerticalSlug?: string;
}

export const serviceDivisions: ServiceDivision[] = [
  {
    id: "ai-automation",
    title: "AI & Intelligent Automation",
    tagline: "Autonomous Workflows & Agents",
    description:
      "Designing practical AI systems, custom agents, and automated operational pipelines that eliminate repetitive manual work across your organization.",
    icon: "bot",
    span: "wide",
    capabilities: [
      "AI-powered business automation",
      "Intelligent workflows & AI agents",
      "Process automation & API integrations",
      "AI-assisted business operations",
    ],
    relatedVerticalSlug: "reelsmith",
  },
  {
    id: "business-suite",
    title: "Complete Business Suite",
    tagline: "Unified ERP & Operations",
    description:
      "Integrated digital systems that bring core business operations, administration, and enterprise workflows under one cohesive roof.",
    icon: "building",
    span: "normal",
    capabilities: [
      "Business management & ERP systems",
      "Enterprise workflow solutions",
      "Operations & administration portals",
      "Unified internal platforms",
    ],
    relatedVerticalSlug: "suite",
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    tagline: "Modern Digital Commerce",
    description:
      "Creating fast, scalable storefronts with streamlined product catalogs, inventory sync, and reliable checkout & payment integrations.",
    icon: "shopping-bag",
    span: "normal",
    capabilities: [
      "Custom storefront development",
      "Product & inventory management",
      "Order & payment integrations",
      "Conversion-focused shopping UX",
    ],
    relatedVerticalSlug: "commerce",
  },
  {
    id: "crm",
    title: "CRM & Customer Management",
    tagline: "Pipelines & Revenue Intelligence",
    description:
      "Stronger customer relationships through intelligent pipeline management, lead automation, engagement workflows, and BI reporting.",
    icon: "users",
    span: "wide",
    capabilities: [
      "Customer relationship management",
      "Sales pipeline & lead automation",
      "Customer engagement workflows",
      "Business intelligence & reporting",
    ],
    relatedVerticalSlug: "crm",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Growth & Campaign Automation",
    description:
      "Connecting businesses with high-intent customers through technical SEO, automated multi-channel campaigns, and measurable acquisition.",
    icon: "trending-up",
    span: "normal",
    capabilities: [
      "Technical SEO & online visibility",
      "Marketing automation & campaigns",
      "Data-driven growth strategies",
      "Customer acquisition & retention",
    ],
  },
  {
    id: "innovation-tech",
    title: "Innovation & Technology",
    tagline: "R&D & Custom Engineering",
    description:
      "Exploring emerging technologies and turning ambitious product concepts into resilient, production-ready custom software.",
    icon: "lightbulb",
    span: "normal",
    capabilities: [
      "Applied research & development",
      "Emerging technology integration",
      "Custom full-stack software",
      "Architecture & technology consulting",
    ],
    relatedVerticalSlug: "open-core",
  },
];
