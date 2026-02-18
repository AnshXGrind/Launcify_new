"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import EstimatorModal from "./EstimatorModal";
import MetricCounter from "./MetricCounter";

const ROTATING = ["90% manual work", "2–4 hrs/day", "cost & time"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<"startups" | "personal" | "saas" | "business">("startups");

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse at 10% 10%, rgba(124,92,255,0.08), transparent 20%), linear-gradient(90deg, rgba(0,229,168,0.04), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 text-sm text-muted mb-6">
              <span className="font-medium text-muted">Trusted by</span>
              <div className="flex items-center gap-3">
                <img src="/logos/logo-a.svg" alt="" className="h-6 opacity-60" />
                <img src="/logos/logo-b.svg" alt="" className="h-6 opacity-60" />
                <img src="/logos/logo-c.svg" alt="" className="h-6 opacity-60" />
              </div>
            </div>

            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              We build AI automation that reduces operational load by
              <span className="inline-block ml-3 text-accent-500">{ROTATING[wordIndex]}</span>
            </h1>

            <p className="mt-6 text-muted max-w-xl">We convert manual processes into testable, reliable automation — built by engineers and product designers for scale.</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 bg-surface rounded-md p-1">
                <button
                  onClick={() => setAudience("startups")}
                  className={`px-3 py-1 rounded text-sm ${audience === "startups" ? "bg-accent text-white" : "text-muted"}`}
                >Startups</button>
                <button
                  onClick={() => setAudience("personal")}
                  className={`px-3 py-1 rounded text-sm ${audience === "personal" ? "bg-accent text-white" : "text-muted"}`}
                >Personal</button>
                <button
                  onClick={() => setAudience("saas")}
                  className={`px-3 py-1 rounded text-sm ${audience === "saas" ? "bg-accent text-white" : "text-muted"}`}
                >SaaS</button>
                <button
                  onClick={() => setAudience("business")}
                  className={`px-3 py-1 rounded text-sm ${audience === "business" ? "bg-accent text-white" : "text-muted"}`}
                >Business</button>
              </div>

              <div className="ml-4 flex items-center gap-4">
                <Button href={`/book-call?audience=${audience}`} variant="primary" className="px-6 py-3">Book Strategy Call</Button>
                <Button onClick={() => setOpen(true)} variant="secondary" className="px-5 py-3">Get Instant Estimate</Button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-8 text-sm text-muted">
              <div>
                <div className="text-white font-semibold"><MetricCounter value="24 hrs" /></div>
                <div>Avg weekly time saved</div>
              </div>
              <div>
                <div className="text-white font-semibold"><MetricCounter value="3.4x" /></div>
                <div>Avg ROI in 6 months</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card p-6 rounded-2xl shadow-lg">
              <div className="h-64 bg-gradient-to-br from-[#071026] to-[#0b1630] rounded-xl flex items-center justify-center text-muted">Live demo preview</div>
            </div>
          </div>
        </div>
      </div>

      <EstimatorModal open={open} onClose={() => setOpen(false)} initialAudience={audience} />
    </section>
  );
}
