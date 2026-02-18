"use client";

import { useRef, useState } from "react";
import Button from "./Button";

// ── Types ──────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

interface StrategyResult {
  diagnosis: string;
  recommendedSystem: string;
  estimatedHoursSaved: string;
  implementationPlan: { week: string; task: string }[];
  topTools: string[];
  nextStep: string;
}

// ── Option data ────────────────────────────────────────
const COMPANY_SIZES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];

const BOTTLENECKS = [
  "Manual data entry and reporting",
  "Slow or broken sales pipeline",
  "Customer support overload",
  "Disconnected tools with no integrations",
  "Compliance and documentation overhead",
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

// ── Main component ─────────────────────────────────────
export default function StrategyAssistant() {
  const [step, setStep] = useState<Step>(1);
  const [companySize, setCompanySize] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<StrategyResult | null>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  function toggleTech(tool: string) {
    setTechStack((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  }

  async function generateStrategy() {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, companySize, bottleneck, techStack }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStrategy(data.strategy);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Progress bar width
  const progress = `${(step / 4) * 100}%`;

  // ── RESULT VIEW ──────────────────────────────────────
  if (strategy) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Your Automation Strategy
        </p>
        <h3 className="text-2xl font-semibold text-text mb-10">
          Generated based on your business profile.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Diagnosis */}
          <div className="bg-background border border-border rounded-lg p-6 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Operational Diagnosis
            </p>
            <p className="text-muted leading-relaxed">{strategy.diagnosis}</p>
          </div>

          {/* Recommended System */}
          <div className="bg-background border border-border rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Recommended System
            </p>
            <p className="text-text font-medium leading-relaxed">
              {strategy.recommendedSystem}
            </p>
          </div>

          {/* Hours Saved */}
          <div className="bg-background border border-border rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Estimated Hours Recovered
            </p>
            <p className="text-4xl font-semibold text-text leading-none">
              {strategy.estimatedHoursSaved}
            </p>
          </div>
        </div>

        {/* Implementation Plan */}
        <div className="bg-background border border-border rounded-lg p-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            4-Week Implementation Plan
          </p>
          <div className="space-y-4">
            {strategy.implementationPlan?.map((item) => (
              <div key={item.week} className="flex gap-4 items-start">
                <span className="text-xs font-semibold text-primary shrink-0 mt-0.5 w-14">
                  {item.week}
                </span>
                <p className="text-sm text-muted leading-relaxed">{item.task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        {strategy.topTools?.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
              Recommended Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {strategy.topTools.map((tool) => (
                <span
                  key={tool}
                  className="text-sm px-3 py-1 rounded-md bg-background border border-border text-text"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button href="/book-call" variant="primary">
            Book a Free Strategy Call
          </Button>
          <button
            onClick={() => {
              setStrategy(null);
              setStep(1);
              setCompanySize("");
              setBottleneck("");
              setTechStack([]);
              setName("");
              setEmail("");
            }}
            className="text-sm text-muted hover:text-text transition-colors duration-150"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  // ── FORM VIEW ────────────────────────────────────────
  return (
    <div className="bg-surface border border-border rounded-lg p-8 md:p-12">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Step {step} of 4
        </p>
      </div>
      <div className="w-full h-0.5 bg-border rounded-full mb-10">
        <div
          className="h-0.5 bg-primary rounded-full transition-all duration-500"
          style={{ width: progress }}
        />
      </div>

      <div>
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
                    className={`text-left px-5 py-4 rounded-md border transition-all duration-150 text-sm font-medium ${
                      companySize === size
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40 hover:text-text"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => companySize && setStep(2)}
                  disabled={!companySize}
                >
                  Continue
                </Button>
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
                    className={`text-left px-5 py-4 rounded-md border transition-all duration-150 text-sm font-medium ${
                      bottleneck === item
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40 hover:text-text"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  &larr; Back
                </button>
                <Button
                  variant="primary"
                  onClick={() => bottleneck && setStep(3)}
                  disabled={!bottleneck}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — Tech Stack (multi-select) */}
          {step === 3 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-2">
                Which tools does your team currently use?
              </h3>
              <p className="text-sm text-muted mb-8">Select all that apply.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TECH_STACK_OPTIONS.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => toggleTech(tool)}
                    className={`text-left px-4 py-3 rounded-md border transition-all duration-150 text-sm font-medium ${
                      techStack.includes(tool)
                        ? "border-primary bg-primary/5 text-text"
                        : "border-border text-muted hover:border-primary/40 hover:text-text"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  &larr; Back
                </button>
                <Button variant="primary" onClick={() => setStep(4)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4 — Contact (optional) */}
          {step === 4 && (
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-2">
                Where should we send your strategy report?
              </h3>
              <p className="text-sm text-muted mb-8">
                Optional — skip to see results immediately.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary transition-colors duration-150"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border border-border rounded-md px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary transition-colors duration-150"
                />
              </div>

              {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  &larr; Back
                </button>
                <div className="flex items-center gap-4">
                  <button
                    onClick={generateStrategy}
                    className="text-sm text-muted hover:text-text transition-colors duration-150"
                  >
                    Skip — show me the strategy
                  </button>
                  <Button
                    variant="primary"
                    onClick={generateStrategy}
                    loading={loading}
                  >
                    {loading ? "Generating..." : "Generate My Strategy"}
                  </Button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
