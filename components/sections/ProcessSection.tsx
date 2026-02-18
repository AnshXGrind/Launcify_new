"use client";

import Section from "@/components/Section";
import AnimateIn from "@/components/AnimateIn";

const STEPS = [
  { step: "01", title: "Operations Audit", description: "Structured audit to identify the highest-leverage automation opportunities." },
  { step: "02", title: "System Architecture", description: "Design a custom automation architecture integrating with your stack." },
  { step: "03", title: "Build & Deploy", description: "Build, test, and deploy with monitoring and documentation." },
];

export default function ProcessSection() {
  return (
    <Section id="process">
      <AnimateIn direction="up">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How we work</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text">A structured engagement, start to finish.</h2>
        </div>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((s) => (
          <div key={s.step} className="border-l-2 border-primary pl-6">
            <p className="text-xs font-semibold text-primary mb-2">{s.step}</p>
            <h3 className="text-base font-semibold text-text mb-2">{s.title}</h3>
            <p className="text-sm text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
