"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";

const TESTIMONIALS = [
  { quote: "Launcify transformed our onboarding — from 5 days to under 4 hours.", author: "Head of Ops, Acme Co" },
  { quote: "Their engineering and product thinking saved us dozens of hours per week.", author: "COO, FintechX" },
];

export default function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">What clients say</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-text">Trusted by teams that scale</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i}>
            <blockquote className="text-sm text-muted">“{t.quote}”</blockquote>
            <div className="mt-4 text-xs font-medium">{t.author}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
