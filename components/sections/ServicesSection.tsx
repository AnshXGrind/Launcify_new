"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import AnimateIn from "@/components/AnimateIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

const SERVICES = [
  {
    title: "AI Integration & Orchestration",
    description: "Embed AI into your workflows for classification, routing, and summarization.",
  },
  {
    title: "Backend Systems & APIs",
    description: "Robust server-side systems for reliability and scale — built in TypeScript.",
  },
  {
    title: "Automation & Workflows",
    description: "Design and deploy end-to-end automation pipelines that replace manual work.",
  },
];

export default function ServicesSection() {
  return (
    <Section id="services">
      <AnimateIn direction="up">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">What we do</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text">Services built for operational impact</h2>
        </div>
      </AnimateIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <StaggerItem key={s.title}>
            <Card>
              <h3 className="text-base font-semibold text-text mb-2">{s.title}</h3>
              <p className="text-sm text-muted mb-4">{s.description}</p>
              <div className="mt-4">
                <Button href="/services" variant="secondary" className="text-sm px-4 py-2">Learn more</Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
