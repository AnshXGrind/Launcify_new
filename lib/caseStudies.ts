export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  companySize: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  techStack: string[];
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-onboarding-automation",
    title: "Automating FinTech Client Onboarding Infrastructure",
    industry: "FinTech",
    companySize: "42 Employees",
    problem:
      "Manual onboarding workflows caused compliance delays and operational bottlenecks. Each new client required 5–7 days of coordination across legal, compliance, and operations teams — creating escalating overhead as the business grew.",
    solution:
      "Built an automated onboarding pipeline integrating CRM, compliance verification APIs, document management, and internal dashboards. The system orchestrates every onboarding step — from KYC checks through to account provisioning — without manual intervention.",
    results: [
      { metric: "Onboarding Time Reduction", value: "70%" },
      { metric: "Manual Data Entry Eliminated", value: "100%" },
      { metric: "Annual Labor Savings", value: "$120,000" },
      { metric: "Time to Active Client", value: "48 hrs" },
    ],
    techStack: ["Next.js", "Supabase", "n8n", "Stripe API"],
    timeline: "4 Weeks",
    testimonial: {
      quote:
        "Launcify transformed our onboarding process into a scalable automation engine. What used to take a week now runs itself.",
      author: "Sarah Jenkins",
      role: "COO",
    },
  },
  {
    slug: "saas-reporting-automation",
    title: "Eliminating Manual Reporting Across a B2B SaaS Operations Team",
    industry: "B2B SaaS",
    companySize: "68 Employees",
    problem:
      "The operations team spent the first three business days of every month manually aggregating data from four platforms, writing commentary, and distributing reports to leadership — a process prone to error and completely non-scalable.",
    solution:
      "Designed and deployed an automated reporting pipeline that pulls data from all source platforms on a defined schedule, applies AI-powered analysis and commentary generation, formats reports to brand standards, and delivers them directly to stakeholders.",
    results: [
      { metric: "Reporting Cycle Reduction", value: "3 days → 2 hrs" },
      { metric: "Manual Aggregation Eliminated", value: "100%" },
      { metric: "Stakeholder Distribution Time", value: "Automated" },
      { metric: "Error Rate Post-Automation", value: "0%" },
    ],
    techStack: ["n8n", "OpenAI API", "Google Sheets API", "Slack API"],
    timeline: "3 Weeks",
    testimonial: {
      quote:
        "Our leadership team now receives accurate, formatted reports before 8am on the first of every month. The operations team has not touched the process since launch.",
      author: "Marcus Reid",
      role: "VP of Operations",
    },
  },
  {
    slug: "ecommerce-inventory-automation",
    title: "Unified Inventory and Reorder Automation for E-commerce Operations",
    industry: "E-commerce",
    companySize: "24 Employees",
    problem:
      "The operations team was manually monitoring inventory levels across four separate platforms, creating purchase orders by hand, and coordinating with suppliers through email chains — a process that regularly resulted in stockouts and fulfillment delays.",
    solution:
      "Built a unified inventory monitoring system that aggregates real-time data across all platforms, triggers intelligent reorder alerts using velocity and lead time calculations, and auto-generates pre-filled purchase orders routed directly to the correct suppliers.",
    results: [
      { metric: "Stockout Incidents (Q1)", value: "-80%" },
      { metric: "Reorder Processing Time", value: "4 hrs → 15 min" },
      { metric: "Supplier Coordination", value: "Fully Automated" },
      { metric: "Ops Team Hours Recovered", value: "22 hrs/week" },
    ],
    techStack: ["Zapier", "Shopify API", "Airtable", "Gmail API"],
    timeline: "2 Weeks",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
