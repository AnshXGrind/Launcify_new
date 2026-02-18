"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Card from "./Card";

// --- Types ---

type StrategyResult = {
  diagnosis: string;
  recommendedSystem: string;
  estimatedHoursSaved: string;
  implementationPlan: { week: string; task: string }[];
  topTools: string[];
  nextStep: string;
};

// --- Step Data ---

const COMPANY_SIZES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];

const BOTTLENECKS = [
  "Manual data entry & reporting",
  "Slow or broken sales pipeline",
  "Customer support overload",
  "Disconnected tools & no integrations",
  "Compliance & documentation overhead",
];

const TECH_STACK_OPTIONS = [
  "HubSpot",
  "Slack",
  "Airtable",
  "Notion",
  "Shopify",
  "Salesforce",
  "Google Workspace",
  "Custom / Internal tools",
];

const TOTAL_STEPS = 4;

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function StrategyAssistant() {
  const [step, setStep] = useState(1);
  const [companySize, setCompanySize] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<StrategyResult | null>(null);
  const [error, setError] = useState("");

  function toggleTech(tech: string) {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }

  function canProceed(): boolean {
    if (step === 1) return companySize !== "";
    if (step === 2) return bottleneck !== "";
    if (step === 3) return true; // tech stack is optional
    return true;
  }

  async function generateStrategy() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, companySize, bottleneck, techStack }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStrategy(data.strategy);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setStep(1);
    setCompanySize("");
    setBottleneck("");
    setTechStack([]);
    setName("");
    setEmail("");
    setStrategy(null);
    setError("");
  }

  // --- Result Panel ---

  if (strategy) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="bg-surface border border-border rounded-lg p-8 md:p-12"
      >
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-text mb-2">
            Your Automation Strategy
          </h2>
          <p className="text-sm text-muted">
            Generated based on your business profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Diagnosis */}
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Diagnosis
            </p>
            <p className="text-sm text-muted leading-relaxed">
              {strategy.diagnosis}
            </p>
          </Card>

          {/* Recommended System */}
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Recommended System
            </p>
            <p className="text-sm text-muted leading-relaxed">
              {strategy.recommendedSystem}
            </p>
          </Card>
        </div>

        {/* Hours Saved — stat block */}
        <div className="bg-background border border-border rounded-lg p-8 text-center mb-8">
          <p className="text-4xl md:text-5xl font-semibold text-text mb-2">
            {strategy.estimatedHoursSaved}
          </p>
          <p className="text-sm text-muted">Estimated hours saved per week</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Implementation Plan */}
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              4-Week Implementation Plan
            </p>
            <div className="space-y-4">
              {strategy.implementationPlan?.map((phase) => (
                <div key={phase.week} className="border-l-2 border-primary pl-4">
                  <p className="text-xs font-semibold text-primary mb-1">
                    {phase.week}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {phase.task}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Tools */}
          <Card>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Recommended Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {strategy.topTools?.map((tool) => (
                <span
                  key={tool}
                  className="text-sm font-medium px-4 py-2 rounded-md bg-background border border-border text-text"
                >
                  {tool}
                </span>
              ))}
            </div>
            {strategy.nextStep && (
              <p className="text-sm text-muted leading-relaxed mt-6">
                {strategy.nextStep}
              </p>
            )}
          </Card>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-8 text-center">
          <h3 className="text-xl font-semibold text-text mb-3">
            Ready to implement this system?
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button href="/book-call" variant="primary">
              Book a Free Strategy Call
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Start Over
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- Multi-step Form ---

  return (
    <div className="bg-surface border border-border rounded-lg p-8 md:p-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>
        <div className="h-1 w-full bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.35, ease }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease }}
        >
          {/* Step 1 — Company Size */}
          {step === 1 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-8">
                How large is your team?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompanySize(size)}
                    className={`text-left border rounded-md p-4 transition-all duration-200 cursor-pointer ${
                      companySize === size
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40"
                    }`}
                  >
                    <span className="text-sm font-medium">{size}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Bottleneck */}
          {step === 2 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-8">
                What is your biggest operational bottleneck?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {BOTTLENECKS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setBottleneck(item)}
                    className={`text-left border rounded-md p-4 transition-all duration-200 cursor-pointer ${
                      bottleneck === item
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40"
                    }`}
                  >
                    <span className="text-sm font-medium">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Tech Stack */}
          {step === 3 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-8">
                Which tools does your team currently use?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TECH_STACK_OPTIONS.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`text-left border rounded-md p-4 transition-all duration-200 cursor-pointer ${
                      techStack.includes(tech)
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40"
                    }`}
                  >
                    <span className="text-sm font-medium">{tech}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">
                Select all that apply. This helps tailor your automation strategy.
              </p>
            </div>
          )}

          {/* Step 4 — Contact */}
          {step === 4 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-8">
                Where should we send your full strategy report?
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-widest text-muted mb-2"
                  >
                    Name (optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-widest text-muted mb-2"
                  >
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={generateStrategy}
                className="text-xs text-primary hover:underline mt-4 cursor-pointer"
              >
                Skip — just show me the strategy
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 mt-4">{error}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
        <div>
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
        </div>
        <div>
          {step < TOTAL_STEPS ? (
            <Button
              variant="primary"
              onClick={() => setStep(step + 1)}
              className={!canProceed() ? "opacity-50 pointer-events-none" : ""}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={generateStrategy}
              className={loading ? "opacity-70 pointer-events-none" : ""}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Strategy"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
