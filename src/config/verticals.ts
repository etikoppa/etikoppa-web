export type VerticalCategory =
  | "SaaS Products"
  | "Enterprise Platforms"
  | "Developer Tools";

export type VerticalStatus = "Live" | "Beta" | "In Development" | "Coming Soon";

export interface VerticalReleaseNote {
  version: string;
  date: string;
  summary: string;
}

export interface Vertical {
  slug: string;
  name: string;
  shortDescription: string;
  valueProposition: string;
  overview: string;
  category: VerticalCategory;
  status: VerticalStatus;
  statusLabel: string;
  isLive: boolean;
  subdomain: string;
  url: string;
  githubUrl?: string;
  logoPath: string;
  accentColor: string;
  featured?: boolean;
  capabilities: string[];
  architecture: {
    hosting: string;
    stack: string[];
    highlights: string[];
  };
  caseStudy: {
    title: string;
    metric: string;
    summary: string;
  };
  releaseNotes: VerticalReleaseNote[];
}

export const VERTICAL_CATEGORIES: readonly ("All" | VerticalCategory)[] = [
  "All",
  "SaaS Products",
  "Enterprise Platforms",
  "Developer Tools",
] as const;

/**
 * Single source of truth for all *.etikoppa.in product verticals.
 * To add a new subdomain vertical to the Navbar App Launcher, Home Grid,
 * Sitemap, JSON-LD schema, and /verticals/[slug] pages, append one entry here.
 */
export const verticals: Vertical[] = [
  {
    slug: "reelsmith",
    name: "ReelSmith",
    shortDescription: "AI-powered short-form media & content automation studio.",
    valueProposition:
      "Automate script-to-reel video production, captioning, and multi-channel publishing with AI pipelines built for creators and growth teams.",
    overview:
      "ReelSmith is etikoppa Inc.'s flagship content and media automation vertical. Designed for marketing teams, agencies, and creators, it transforms raw briefs, articles, and brand assets into polished short-form video reels ready for distribution—cutting production turnaround from days to minutes.",
    category: "SaaS Products",
    status: "Live",
    statusLabel: "Live on reelsmith.etikoppa.in",
    isLive: true,
    subdomain: "reelsmith.etikoppa.in",
    url: "https://reelsmith.etikoppa.in",
    githubUrl: "https://github.com/etikoppa/reelsmith",
    logoPath: "/logos/reelsmith.svg",
    accentColor: "from-indigo-500 to-violet-500",
    featured: true,
    capabilities: [
      "Automated script generation and storyboard pacing",
      "Dynamic kinetic captions and brand-kit styling",
      "Batch rendering pipelines for high-volume campaigns",
      "Direct export presets for Reels, Shorts, and LinkedIn",
    ],
    architecture: {
      hosting: "Vercel Edge Network (reelsmith.etikoppa.in)",
      stack: ["Next.js", "TypeScript", "AI Media Pipelines", "Edge Functions"],
      highlights: [
        "Decoupled media orchestration with resumable job status tracking",
        "Zero-cold-start web studio backed by edge caching",
        "Independent Vercel deployment isolated from parent hub",
      ],
    },
    caseStudy: {
      title: "High-Velocity Campaign Production",
      metric: "8× faster turnaround",
      summary:
        "Enables lean marketing teams to produce consistent, brand-aligned short-form video series without dedicated post-production bottlenecks.",
    },
    releaseNotes: [
      {
        version: "v1.0",
        date: "2026-Q4",
        summary:
          "Public launch on reelsmith.etikoppa.in with AI storyboard workflows and instant studio previews.",
      },
      {
        version: "v0.9",
        date: "2026-Q3",
        summary:
          "Private beta rollout featuring automated caption timing and reusable brand presets.",
      },
    ],
  },
  {
    slug: "suite",
    name: "etikoppa Suite",
    shortDescription: "Unified business operations, ERP & administration platform.",
    valueProposition:
      "Consolidate finance, HR, approvals, and internal workflows into a single modular operating system engineered for growing enterprises.",
    overview:
      "etikoppa Suite eliminates fragmented spreadsheets and disconnected back-office tools. Built as a modular enterprise platform, it connects operations, team administration, project delivery, and executive reporting under one unified permissions and audit layer.",
    category: "Enterprise Platforms",
    status: "In Development",
    statusLabel: "In Development • suite.etikoppa.in",
    isLive: false,
    subdomain: "suite.etikoppa.in",
    url: "https://suite.etikoppa.in",
    githubUrl: "https://github.com/etikoppa",
    logoPath: "/logos/suite.svg",
    accentColor: "from-sky-500 to-cyan-500",
    capabilities: [
      "Modular ERP for finance, procurement, and resource planning",
      "Role-based approval chains and automated compliance logs",
      "Cross-department operational dashboards in real time",
      "API-first webhooks for third-party accounting & payroll tools",
    ],
    architecture: {
      hosting: "Vercel Project: etikoppa-suite (suite.etikoppa.in)",
      stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Event Workflows"],
      highlights: [
        "Multi-tenant workspace isolation with granular RBAC",
        "Composable module registry so teams activate only what they need",
        "Unified SSO roadmap across all *.etikoppa.in verticals",
      ],
    },
    caseStudy: {
      title: "Unified Back-Office Operations",
      metric: "60% less manual ops overhead",
      summary:
        "Designed to replace 5+ disconnected internal tools with a single source of truth for leadership and operations teams.",
    },
    releaseNotes: [
      {
        version: "v0.4-alpha",
        date: "2026-Q4",
        summary:
          "Core workspace tenancy, approval workflow engine, and operations dashboard architecture underway.",
      },
    ],
  },
  {
    slug: "crm",
    name: "etikoppa CRM",
    shortDescription: "AI-driven CRM, sales pipeline & lead intelligence platform.",
    valueProposition:
      "Automate lead scoring, follow-up sequences, and pipeline forecasting with an AI-native CRM tailored for B2B revenue teams.",
    overview:
      "etikoppa CRM brings intelligence directly into the customer lifecycle. From inbound lead capture and enrichment to deal-stage automation and BI forecasting, every interaction is structured to help sales and account teams close faster with zero manual data entry.",
    category: "Enterprise Platforms",
    status: "Coming Soon",
    statusLabel: "Coming Soon • crm.etikoppa.in",
    isLive: false,
    subdomain: "crm.etikoppa.in",
    url: "https://crm.etikoppa.in",
    githubUrl: "https://github.com/etikoppa",
    logoPath: "/logos/crm.svg",
    accentColor: "from-emerald-500 to-teal-500",
    capabilities: [
      "Visual drag-and-drop deal pipelines with SLA alerts",
      "AI-assisted lead qualification and email follow-up drafts",
      "Automated activity logging across email and web touchpoints",
      "Executive revenue forecasting and conversion analytics",
    ],
    architecture: {
      hosting: "Vercel Project: etikoppa-crm (crm.etikoppa.in)",
      stack: ["Next.js 15", "TypeScript", "AI Agents", "Analytics Pipeline"],
      highlights: [
        "Real-time pipeline state with optimistic UI updates",
        "Native lead ingestion from etikoppa.in and partner web forms",
        "Extensible automation triggers for marketing and billing sync",
      ],
    },
    caseStudy: {
      title: "Automated B2B Revenue Pipeline",
      metric: "3× faster lead response",
      summary:
        "Built to ensure every qualified B2B inquiry receives structured routing, enrichment, and timely follow-up automatically.",
    },
    releaseNotes: [
      {
        version: "Roadmap",
        date: "2027-Q1",
        summary:
          "Scheduled private preview for early design partners across Hyderabad and India SMBs.",
      },
    ],
  },
  {
    slug: "commerce",
    name: "etikoppa Commerce",
    shortDescription: "Headless e-commerce storefronts, inventory & payment engine.",
    valueProposition:
      "Launch fast, conversion-optimized digital storefronts with unified inventory sync, order management, and seamless payment gateways.",
    overview:
      "etikoppa Commerce equips modern retail and D2C brands with an edge-rendered storefront architecture paired with resilient inventory, order fulfillment, and regional/global payment integrations.",
    category: "SaaS Products",
    status: "Coming Soon",
    statusLabel: "Coming Soon • commerce.etikoppa.in",
    isLive: false,
    subdomain: "commerce.etikoppa.in",
    url: "https://commerce.etikoppa.in",
    githubUrl: "https://github.com/etikoppa",
    logoPath: "/logos/commerce.svg",
    accentColor: "from-amber-500 to-orange-500",
    capabilities: [
      "Edge-cached storefronts with sub-second page transitions",
      "Real-time multi-warehouse catalog and inventory sync",
      "Razorpay, Stripe, and UPI checkout integrations",
      "Automated order tracking, invoicing, and customer notifications",
    ],
    architecture: {
      hosting: "Vercel Edge Network (commerce.etikoppa.in)",
      stack: ["Next.js 15", "ISR / Edge Cache", "Payment Webhooks", "Headless API"],
      highlights: [
        "Static & ISR catalog delivery for peak flash-sale traffic",
        "Idempotent checkout and webhook reconciliation",
        "Tight integration path with etikoppa Suite & CRM",
      ],
    },
    caseStudy: {
      title: "High-Conversion Headless Retail",
      metric: "99.98% storefront uptime",
      summary:
        "Engineered for high-growth commerce teams needing custom storefront flexibility without legacy platform bloat.",
    },
    releaseNotes: [
      {
        version: "Roadmap",
        date: "2027-Q1",
        summary:
          "Storefront starter kit and checkout orchestration modules currently in specification.",
      },
    ],
  },
  {
    slug: "open-core",
    name: "etikoppa Open Core",
    shortDescription: "Open-source AI automation kits, templates & engineering standards.",
    valueProposition:
      "Explore public repositories, reusable automation primitives, and production architecture templates maintained by etikoppa engineering.",
    overview:
      "etikoppa Open Core is our public engineering commons on GitHub. We share battle-tested Next.js patterns, AI agent utilities, and automation blueprints so developers and partner teams can inspect our standards and collaborate directly with us.",
    category: "Developer Tools",
    status: "Beta",
    statusLabel: "Active on GitHub",
    isLive: true,
    subdomain: "github.com/etikoppa",
    url: "https://github.com/etikoppa",
    githubUrl: "https://github.com/etikoppa",
    logoPath: "/logos/open-core.svg",
    accentColor: "from-fuchsia-500 to-purple-500",
    capabilities: [
      "Open-source TypeScript & Next.js production starters",
      "Reusable AI workflow and agent orchestration templates",
      "Strict security, linting, and CI/CD reference configs",
      "Community issue tracking and partner contribution guides",
    ],
    architecture: {
      hosting: "GitHub Organization (github.com/etikoppa)",
      stack: ["TypeScript", "Next.js", "Tailwind CSS", "Zod"],
      highlights: [
        "Public-by-default engineering documentation and standards",
        "Zero-vendor-lock-in packages built for Vercel & Node.js",
        "Direct collaboration channel for developers and technical partners",
      ],
    },
    caseStudy: {
      title: "Transparent Engineering Standards",
      metric: "100% TypeScript-first",
      summary:
        "Gives enterprise evaluators and external developers direct visibility into how etikoppa Inc. architects reliable software.",
    },
    releaseNotes: [
      {
        version: "2026.11",
        date: "2026-Q4",
        summary:
          "Published etikoppa-web parent ecosystem hub architecture and vertical registry pattern.",
      },
    ],
  },
];

export function getVerticalBySlug(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}
