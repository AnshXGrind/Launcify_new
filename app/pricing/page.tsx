import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "Pricing | Launcify",
  "Transparent engagement options for enterprise AI automation. Fixed-scope projects and ongoing retainers available.",
  "/pricing"
);

const TIERS = [
  {
    name: "Operations Audit",
    price: "Fixed Fee",
    description:
      "A structured analysis of your current workflows, tools, and manual processes. Delivered as a prioritized automation roadmap.",
    deliverables: [
      "Full workflow documentation",
      "Automation opportunity scoring",
      "Tool and integration assessment",
      "Prioritized implementation roadmap",
      "Executive summary report",
    ],
    cta: "Book an Audit",
    highlight: false,
  },
  {
    name: "Automation Build",
    price: "Project-Based",
    description:
      "A complete build engagement for one or more automation systems. Scoped, built, tested, and deployed with full documentation.",
    deliverables: [
      "Custom automation architecture",
      "Full system build and testing",
      "Integration with existing tools",
      "Documentation and handover",
      "30-day post-launch support",
    ],
    cta: "Start a Project",
    highlight: true,
  },
  {
    name: "Ongoing Retainer",
    price: "Monthly",
    description:
      "Continuous automation development and optimization. Ideal for businesses with ongoing operational complexity and growth.",
    deliverables: [
      "Monthly automation sprints",
      "System monitoring and maintenance",
      "Continuous optimization",
      "Priority support access",
      "Quarterly strategy reviews",
    ],
    cta: "Discuss Retainer",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl">
            Transparent engagements, clear deliverables.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            All pricing is scoped to your specific requirements. Every
            engagement begins with a discovery conversation.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlight ? "border-primary/50 ring-1 ring-primary/20" : ""}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {tier.price}
              </p>
              <h2 className="text-xl font-semibold text-text mb-3">
                {tier.name}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {tier.description}
              </p>
              <ul className="space-y-2 mb-8">
                {tier.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/book-call"
                variant={tier.highlight ? "primary" : "secondary"}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted">
            All projects are scoped individually. Contact us to discuss your
            specific requirements and receive a tailored proposal.
          </p>
        </div>
      </Section>
    </>
  );
}
