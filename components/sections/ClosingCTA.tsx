"use client";

import Section from "@/components/Section";
import Button from "@/components/Button";

export default function ClosingCTA() {
  return (
    <Section id="cta" className="bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Get Started</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-text mb-5">Ready to eliminate manual work from your operations?</h2>
        <p className="text-muted mb-10 leading-relaxed">We work with a limited number of clients each quarter to ensure quality. If you are ready to build systems that scale, let us talk.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/pricing" variant="primary">View Engagement Options</Button>
          <Button href="/about" variant="secondary">Learn About Launcify</Button>
        </div>
      </div>
    </Section>
  );
}
