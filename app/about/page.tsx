import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "About Launcify | Enterprise AI Automation Consulting",
  "Launcify is an enterprise AI automation consulting firm helping scaling businesses eliminate manual operations and build systems that compound."
);

const VALUES = [
  {
    title: "Precision over volume",
    description:
      "We take on a limited number of clients per quarter to ensure each engagement receives full attention and delivers measurable results.",
  },
  {
    title: "Systems thinking",
    description:
      "We do not solve isolated problems. We build interconnected systems that improve every part of your operations simultaneously.",
  },
  {
    title: "Long-term reliability",
    description:
      "Every system we deploy is built to be maintained, extended, and understood by your team — not locked to us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-3xl">
            We build operational infrastructure for businesses that can not afford to stay manual.
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-text mb-5">
              Why Launcify exists
            </h2>
            <div className="space-y-5 text-muted leading-relaxed text-sm">
              <p>
                Most growing businesses reach a point where operational
                complexity outpaces the team&apos;s capacity. Tasks multiply,
                systems disconnect, and the only solution leadership can see is
                hiring more people.
              </p>
              <p>
                Launcify was built to solve a different way. We design and
                deploy AI automation systems that absorb operational load
                without growing your headcount — so your team spends their time
                on work that actually requires human intelligence.
              </p>
              <p>
                We work exclusively with scaling businesses that have reached
                the point where manual operations are a genuine constraint on
                growth. Every engagement is scoped precisely, built to last,
                and measured against real outcomes.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {VALUES.map((value) => (
              <div key={value.title} className="border-l-2 border-primary pl-6">
                <h3 className="text-base font-semibold text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text mb-4">
            Ready to build systems that scale?
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            We work with a small number of clients at a time. If your business
            is ready to eliminate manual operations, we want to hear from you.
          </p>
          <Button href="/pricing" variant="primary">
            View Engagement Options
          </Button>
        </div>
      </Section>
    </>
  );
}
