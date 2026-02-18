import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import { caseStudies } from "@/lib/caseStudies";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = generateSEO(
  "Case Studies | Launcify",
  "Real automation engagements with documented results — hours recovered, processes eliminated, and operations scaled without added headcount."
);

export default function CaseStudiesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Case Studies
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 max-w-2xl leading-tight">
            Documented outcomes from every engagement.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Each case study represents a complete build engagement — from
            operations audit through to production deployment — with results
            measured against agreed targets.
          </p>
        </div>
      </section>

      {/* Case Study Grid */}
      <Section>
        {/* Prepared for future filter bar insertion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => {
            const highlight = study.results[0];

            return (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="block group"
              >
                <Card className="h-full flex flex-col group-hover:border-primary/40 transition-colors duration-200">
                  {/* Industry + Size */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {study.industry}
                    </span>
                    <span className="text-xs text-muted">&middot;</span>
                    <span className="text-xs text-muted">{study.companySize}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-text leading-snug mb-4 flex-1">
                    {study.title}
                  </h2>

                  {/* Highlight metric */}
                  <div className="pt-4 border-t border-border mt-auto">
                    <p className="text-2xl font-semibold text-text leading-none mb-1">
                      {highlight.value}
                    </p>
                    <p className="text-xs text-muted">{highlight.metric}</p>
                  </div>

                  {/* Timeline */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      Timeline: {study.timeline}
                    </span>
                    <span className="text-xs font-medium text-primary group-hover:underline">
                      Read case study &rarr;
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-text mb-4">
              Your operations could be next.
            </h2>
            <p className="text-muted mb-8 leading-relaxed">
              Each engagement starts with a structured audit. We identify the
              highest-leverage automation opportunities and deliver a
              prioritized roadmap before any build begins.
            </p>
            <Button href="/book-call" variant="primary">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
