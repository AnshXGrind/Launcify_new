import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "Case Studies | Launcify",
  "Real results from Launcify automation engagements — hours recovered, costs reduced, and operations scaled without added headcount."
);

const CASE_STUDIES = [
  {
    industry: "B2B SaaS — Operations",
    title: "32 hours per week recovered through automated client onboarding.",
    problem:
      "The client's customer success team was manually handling every onboarding task — CRM setup, project creation, welcome communications, and account provisioning — for each new client. At their growth rate, this was becoming unsustainable.",
    solution:
      "We built a fully automated onboarding pipeline triggered on contract signature. The system provisions accounts, sets up projects, assigns team members, sends personalized onboarding sequences, and updates the CRM — without any manual intervention.",
    results: [
      "32 hours per week recovered across the CS team",
      "Time-to-active reduced from 5 days to under 4 hours",
      "Zero manual errors in account provisioning",
      "CS team capacity increased without additional hires",
    ],
  },
  {
    industry: "Professional Services — Finance",
    title: "Monthly reporting reduced from 3 days to 2 hours with AI summarization.",
    problem:
      "The finance team spent the first three days of every month manually pulling data from multiple platforms, compiling reports, writing commentary, and distributing to stakeholders — a process prone to errors and delays.",
    solution:
      "We built an automated reporting pipeline that pulls data from all relevant sources on a schedule, runs AI-powered analysis and commentary generation, formats reports to brand standards, and distributes them to the correct stakeholders automatically.",
    results: [
      "Reporting process reduced from 3 days to under 2 hours",
      "Full elimination of manual data aggregation",
      "AI-generated commentary reviewed and approved in minutes",
      "Real-time dashboards deployed alongside automated reports",
    ],
  },
  {
    industry: "E-commerce — Supply Chain",
    title: "Inventory alerts and reorder workflows automated across 4 platforms.",
    problem:
      "The operations team was manually monitoring inventory levels across four separate platforms, creating purchase orders, and coordinating with suppliers via email — a process that regularly resulted in stockouts and delays.",
    solution:
      "We built a unified inventory monitoring system that aggregates data across all platforms, triggers intelligent reorder alerts based on velocity and lead time, and generates pre-filled purchase orders routed directly to the appropriate suppliers.",
    results: [
      "Stockout incidents reduced by 80% in first quarter",
      "Reorder process reduced from 4 hours to 15 minutes",
      "Supplier communication fully automated for standard orders",
      "Operations team redirected to strategic vendor relationships",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Case Studies
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl">
            Measurable outcomes from real engagements.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Every case study represents a complete engagement — from audit to
            deployment — with documented results against agreed targets.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {CASE_STUDIES.map((cs) => (
            <Card key={cs.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                {cs.industry}
              </p>
              <h2 className="text-xl font-semibold text-text mb-5">{cs.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                    The Problem
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                    The Solution
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{cs.solution}</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Results
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cs.results.map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text mb-4">
            Your operations could be next.
          </h2>
          <p className="text-muted mb-8">
            Each engagement starts with a structured audit of your current
            workflows. We identify the highest-leverage opportunities and build
            from there.
          </p>
          <Button href="/pricing" variant="primary">
            View Engagement Options
          </Button>
        </div>
      </Section>
    </>
  );
}
