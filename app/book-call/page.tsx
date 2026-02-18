import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "Book a Free Strategy Call | Launcify",
  "Schedule a free 30-minute strategy call with the Launcify team. We will assess your operations and identify the highest-leverage automation opportunities."
);

export default function BookCallPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Strategy Call
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl leading-tight">
            Book a free 30-minute strategy call.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            We will review your current operations, identify the
            highest-leverage automation opportunities in your business, and
            outline exactly what a Launcify engagement would look like for your
            specific situation.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              What to Expect
            </p>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Operations Review",
                  description:
                    "We walk through your current workflows, tools, and the manual processes consuming the most time and creating the most risk.",
                },
                {
                  step: "02",
                  title: "Opportunity Identification",
                  description:
                    "We identify the two or three highest-leverage automation opportunities that would create the most measurable impact within your business.",
                },
                {
                  step: "03",
                  title: "Engagement Outline",
                  description:
                    "We outline what a structured engagement would look like — scope, timeline, and expected outcomes — so you have full clarity before making any commitment.",
                },
              ].map((item) => (
                <div key={item.step} className="border-l-2 border-primary pl-6">
                  <p className="text-xs font-semibold text-primary mb-1">{item.step}</p>
                  <h3 className="text-base font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar embed placeholder — replace with Calendly or Cal.com embed */}
          <div className="bg-surface border border-border rounded-lg p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Scheduling
            </p>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Calendar booking integration will be embedded here. Connect
              Calendly, Cal.com, or a custom scheduling solution to this block.
            </p>
            <Button href="mailto:hello@launcify.io" variant="primary">
              Email Us to Schedule
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
