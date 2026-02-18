import type { CaseStudy } from "@/lib/caseStudies";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Container from "@/components/Container";
import MetricCounter from "@/components/MetricCounter";

interface CaseStudyLayoutProps {
  study: CaseStudy;
}

export default function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-20">
        <Container>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-md bg-surface border border-border text-primary">
              {study.industry}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-md bg-surface border border-border text-muted">
              {study.companySize}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-md bg-surface border border-border text-muted">
              {study.timeline}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold text-text leading-tight max-w-3xl mb-6">
            {study.title}
          </h1>
        </Container>
      </section>

      {/* Results Grid */}
      <section className="py-12 bg-surface border-y border-border">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-8">
            Engagement Results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
            {study.results.map((result) => (
              <div key={result.metric} className="bg-surface px-8 py-8">
                <p className="text-3xl md:text-4xl font-semibold text-text mb-2 leading-none">
                  <MetricCounter value={result.value} />
                </p>
                <p className="text-sm text-muted leading-snug">{result.metric}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section id="problem">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              The Challenge
            </p>
            <h2 className="text-2xl font-semibold text-text mb-5">
              What the client was dealing with
            </h2>
            <p className="text-muted leading-relaxed">{study.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              The Solution
            </p>
            <h2 className="text-2xl font-semibold text-text mb-5">
              What we built
            </h2>
            <p className="text-muted leading-relaxed">{study.solution}</p>
          </div>
        </div>
      </Section>

      {/* Tech Stack + Timeline */}
      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium px-4 py-2 rounded-md bg-background border border-border text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                Engagement Timeline
              </p>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-semibold text-text">{study.timeline}</p>
                <p className="text-sm text-muted leading-snug max-w-xs">
                  From scoping call to production deployment, including testing
                  and handover documentation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial (conditional) */}
      {study.testimonial && (
        <Section id="testimonial">
          <Card className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Client Testimonial
            </p>
            <blockquote className="text-xl md:text-2xl font-medium text-text leading-relaxed mb-8">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-sm font-semibold text-text">
                {study.testimonial.author}
              </p>
              <p className="text-sm text-muted">{study.testimonial.role}</p>
            </div>
          </Card>
        </Section>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-surface border-t border-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Next Step
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-text mb-5">
              Ready to build similar infrastructure?
            </h2>
            <p className="text-muted mb-10 leading-relaxed">
              Every engagement starts with a structured discovery call. We
              assess your operations, identify the highest-leverage automation
              opportunities, and outline exactly what we would build.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-call" variant="primary">
                Book a Free Strategy Call
              </Button>
              <Button href="/case-studies" variant="secondary">
                View All Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}



