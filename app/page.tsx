"use client";

import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Container from "@/components/Container";
import AnimateIn from "@/components/AnimateIn";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import StrategyAssistant from "@/components/StrategyAssistant";
import Hero from "@/components/Hero";
import WhoWeBuildFor from "@/components/WhoWeBuildFor";
import TrustBanner from "@/components/TrustBanner";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudiesPreview from "@/components/sections/CaseStudiesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ClosingCTA from "@/components/sections/ClosingCTA";

const PROBLEMS = [
  {
    title: "Manual Processes at Scale",
    description:
      "Your team spends hours every week on repetitive tasks — data entry, report generation, client follow-ups — that should be fully automated.",
  },
  {
    title: "Disconnected Systems",
    description:
      "Your tools do not talk to each other. Data moves through spreadsheets and manual handoffs, creating errors and delays that compound over time.",
  },
  {
    title: "Growth Without Infrastructure",
    description:
      "Revenue is growing, but your backend operations are not keeping pace. Every new client adds to your team's load rather than running on autopilot.",
  },
];

const SOLUTIONS = [
  {
    title: "End-to-End Workflow Automation",
    description:
      "We map your highest-cost manual processes and replace them with intelligent automation pipelines built specifically for your business logic.",
  },
  {
    title: "Systems Integration",
    description:
      "We connect your CRM, project management tools, communication platforms, and data sources into a unified automated ecosystem.",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "We implement AI layers that classify, prioritize, summarize, and act on information — so your team focuses only on decisions that require human judgment.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Operations Audit",
    description:
      "We conduct a structured audit of your current workflows, tools, and time allocation to identify the highest-leverage automation opportunities.",
  },
  {
    step: "02",
    title: "System Architecture",
    description:
      "We design a custom automation architecture tailored to your stack, integrating with existing tools and building net-new systems where needed.",
  },
  {
    step: "03",
    title: "Build and Deploy",
    description:
      "We build, test, and deploy your automation systems with full documentation and a structured handover process to ensure long-term reliability.",
  },
];

export default function HomePage() {
  return (
    <>
          <Hero />

          <WhoWeBuildFor />

          <TrustBanner />

          <ServicesSection />

          <ProcessSection />

          {/* AI Strategy Assistant */}
      <Section id="strategy" className="bg-surface">
        <AnimateIn direction="up">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Free Automation Audit
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
              Get your custom automation strategy in 2 minutes.
            </h2>
            <p className="text-muted">
              Answer four questions about your business. Our system generates a
              tailored automation plan specific to your operations and tech stack.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn direction="up" delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <StrategyAssistant />
          </div>
        </AnimateIn>
      </Section>

      <CaseStudiesPreview />

      <TestimonialsSection />

      <FAQSection />

      <ClosingCTA />
    </>
  );
}
