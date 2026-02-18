"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import AnimateIn from "@/components/AnimateIn";

export default function CaseStudiesPreview() {
  return (
    <Section id="case-studies">
      <AnimateIn direction="up">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Client Results</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text">Measurable outcomes, not promises.</h2>
        </div>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">B2B SaaS — Operations</p>
          <h3 className="text-xl font-semibold text-text mb-3">32 hours per week recovered through automated client onboarding.</h3>
          <p className="text-sm text-muted leading-relaxed mb-6">Manual onboarding tasks across CRM, project setup, and welcome communications were fully automated, reducing time-to-active from 5 days to under 4 hours.</p>
          <Button href="/case-studies" variant="secondary" className="text-sm px-4 py-2">Read the case study</Button>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Professional Services — Finance</p>
          <h3 className="text-xl font-semibold text-text mb-3">Monthly reporting reduced from 3 days to 2 hours with AI summarization.</h3>
          <p className="text-sm text-muted leading-relaxed mb-6">We built an automated pipeline that pulls data from multiple sources, runs AI analysis, and delivers formatted reports to stakeholders — with zero manual intervention.</p>
          <Button href="/case-studies" variant="secondary" className="text-sm px-4 py-2">Read the case study</Button>
        </Card>
      </div>
    </Section>
  );
}
