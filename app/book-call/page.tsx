import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "Book a Free Strategy Call | Launcify",
  "Schedule a free 30-minute strategy call with the Launcify team. We will assess your operations and identify the highest-leverage automation opportunities.",
  "/book-call"
);

const EXPECTATIONS = [
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
];

const WHO_FOR = [
  "Operations leaders at teams of 10–200 people",
  "Founders managing manual, high-repetition workflows",
  "Businesses already using 3+ tools that do not talk to each other",
  "Teams ready to invest in building infrastructure, not just tools",
];

export default function BookCallPage({ searchParams }: { searchParams?: { audience?: string } }) {
  const audience = searchParams?.audience;
  const audienceLabel =
    audience === "startups"
      ? "Startups"
      : audience === "personal"
      ? "Personal Brands"
      : audience === "saas"
      ? "SaaS Founders"
      : audience === "business"
      ? "Growing Businesses"
      : null;
  const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;
  const bookingHref = BOOKING_URL
    ? `${BOOKING_URL}${BOOKING_URL.includes("?") ? "&" : "?"}audience=${encodeURIComponent(
        audience ?? ""
      )}`
    : undefined;
  return (
    <>
      {/* Hero */}
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
          {audienceLabel && (
            <p className="mt-4 text-sm text-primary">
              Prefilled for: <strong>{audienceLabel}</strong>
            </p>
          )}
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: What to expect + Who this is for */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              What to Expect
            </p>
            <div className="space-y-6 mb-12">
              {EXPECTATIONS.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-primary flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-primary">✓</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                Who This Call Is For
              </p>
              <ul className="space-y-3">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                    <span className="text-sm text-muted leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="bg-surface border border-border rounded-lg p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Schedule Your Call
            </p>
            <h3 className="text-xl font-semibold text-text mb-6">
              30-minute strategy session — no charge.
            </h3>

            {/* Calendar embed placeholder — swap in Calendly / Cal.com iframe */}
            <div className="bg-background border border-border rounded-md h-64 flex items-center justify-center mb-8">
              <p className="text-sm text-muted text-center px-6">
                Booking widget — embed Calendly or Cal.com here.
              </p>
            </div>

            <div className="text-center">
              {bookingHref ? (
                <Button href={bookingHref} variant="primary">
                  Book via Calendar
                </Button>
              ) : (
                <Button
                  href={`mailto:hello@launcify.io?subject=${encodeURIComponent(
                    `Strategy call — ${audienceLabel ?? "General"}`
                  )}&body=${encodeURIComponent(
                    audienceLabel
                      ? `I'm booking a strategy call as a ${audienceLabel}. Please share available times.`
                      : "I'm interested in a strategy call. Please share available times."
                  )}`}
                  variant="primary"
                >
                  Email Us to Schedule
                </Button>
              )}
              <p className="text-xs text-muted mt-4">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@launcify.io"
                  className="text-primary hover:underline"
                >
                  hello@launcify.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
