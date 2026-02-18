"use client";

import { useState, useRef } from "react";
import Button from "./Button";

type Props = { open: boolean; onClose(): void };

const VALID_SIZES = ["1–10 employees", "11–50 employees", "51–200 employees", "200+ employees"];
const VALID_BOTTLENECKS = [
  "Manual data entry and reporting",
  "Slow or broken sales pipeline",
  "Customer support overload",
  "Disconnected tools with no integrations",
  "Compliance and documentation overhead",
];

export default function EstimatorModal({ open, onClose }: Props) {
  const [companySize, setCompanySize] = useState(VALID_SIZES[0]);
  const [bottleneck, setBottleneck] = useState(VALID_BOTTLENECKS[0]);
  const [tech, setTech] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companySize, bottleneck, techStack: tech ? tech.split(",").map(s => s.trim()) : [] }),
        signal: controller.signal,
      });
      const json = await res.json();
      if (res.ok) setResult(json.estimate || JSON.stringify(json));
      else setResult(json.error || "Failed to get estimate");
    } catch (err) {
      if ((err as any)?.name === "AbortError") setResult("Request cancelled");
      else setResult("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-background rounded-2xl shadow-xl w-full max-w-xl p-6">
        <h3 className="text-lg font-semibold">Instant Project Estimate</h3>
        <p className="text-sm text-muted mt-1">Get a ballpark timeline & cost estimate.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-muted">Company size</label>
            <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full mt-1">
              {VALID_SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted">Primary bottleneck</label>
            <select value={bottleneck} onChange={(e) => setBottleneck(e.target.value)} className="w-full mt-1">
              {VALID_BOTTLENECKS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted">Tech stack (comma separated)</label>
            <input value={tech} onChange={(e) => setTech(e.target.value)} className="w-full mt-1" />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button type="submit" variant="primary" disabled={loading} className="px-5 py-2">{loading ? "Estimating…" : "Get Estimate"}</Button>
            <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2">Close</Button>
          </div>

          {result && <div className="mt-4 p-3 bg-card rounded-md text-sm"><pre className="whitespace-pre-wrap">{result}</pre></div>}
        </form>
      </div>
    </div>
  );
}
