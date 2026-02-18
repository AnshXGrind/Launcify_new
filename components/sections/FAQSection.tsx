"use client";

import Section from "@/components/Section";

const FAQ = [
  { q: "How long does a typical engagement take?", a: "Most projects range from 4–12 weeks depending on scope. We provide a timeline in the audit." },
  { q: "How do you handle security and data?", a: "We operate least-privilege, encrypt data in transit, and can sign NDAs. We also avoid sending PII to third-party models unless explicitly agreed." },
  { q: "What is the pricing model?", a: "We offer fixed-scope projects and retainer-based optimization. Pricing is scoped after the audit and estimator." },
];

export default function FAQSection() {
  return (
    <Section id="faq" className="bg-surface">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-text">Questions we get asked most</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FAQ.map((f) => (
          <div key={f.q} className="p-4 bg-card rounded-lg">
            <div className="font-medium mb-2">{f.q}</div>
            <div className="text-sm text-muted">{f.a}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
