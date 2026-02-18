import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "AI Automation Services | Launcify",
  "Explore Launcify's enterprise AI automation services — workflow automation, systems integration, and AI-powered intelligence layers."
);

const SERVICES = [
  {
    title: "Workflow Automation",
    description:
      "We identify and automate your highest-cost manual processes using intelligent pipelines built to your exact business logic. Eliminate repetitive tasks across operations, sales, and client delivery.",
    scope: [
      "CRM and pipeline automation",
      "Client onboarding systems",
      "Internal reporting pipelines",
      "Data sync and transformation",
    ],
  },
  {
    title: "Systems Integration",
    description:
      "We connect your existing tools — CRM, project management, communication platforms, and data warehouses — into a unified, automated ecosystem with no manual handoffs.",
    scope: [
      "API and webhook integrations",
      "Cross-platform data routing",
      "Real-time sync architectures",
      "Legacy system bridging",
    ],
  },
  {
    title: "AI Intelligence Layers",
    description:
      "We build AI-powered layers that classify, prioritize, summarize, and act on information inside your existing workflows — making your systems smarter without replacing them.",
    scope: [
      "Document and data classification",
      "AI-generated summaries and reports",
      "Intelligent routing and prioritization",
      "Natural language interfaces",
    ],
  },
  {
    title: "Operations Audit",
    description:
      "Not sure where to start? Our structured operations audit identifies the highest-leverage automation opportunities in your business and delivers a prioritized implementation roadmap.",
    scope: [
      "Workflow mapping and documentation",
      "Time and cost analysis",
      "Automation feasibility scoring",
      "Implementation roadmap delivery",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl">
            End-to-end automation, built for enterprise operations.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Every engagement is designed around your specific workflows and
            goals. We do not implement generic solutions.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.title}>
              <h2 className="text-xl font-semibold text-text mb-3">
                {service.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text mb-4">
            Every system is built to your exact requirements.
          </h2>
          <p className="text-muted mb-8">
            We scope each engagement carefully to ensure the delivered systems
            are reliable, maintainable, and built to grow with your business.
          </p>
          <Button href="/pricing" variant="primary">
            View Engagement Options
          </Button>
        </div>
      </Section>
    </>
  );
}
