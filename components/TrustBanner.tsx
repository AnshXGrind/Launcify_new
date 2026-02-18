"use client";

import MetricCounter from "@/components/MetricCounter";

export default function TrustBanner() {
  return (
    <section className="py-8 border-t border-border bg-background/20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-sm text-muted">Avg time saved</div>
            <div className="text-2xl font-semibold text-white"><MetricCounter value="24 hrs" /></div>
          </div>

          <div>
            <div className="text-sm text-muted">Avg ROI (6 months)</div>
            <div className="text-2xl font-semibold text-white"><MetricCounter value="3.4x" /></div>
          </div>
        </div>

        <div className="text-sm text-muted">
          <div>Security: SOC2-ready practices • Least-privilege integrations</div>
          <div>Performance: Production-grade observability & CI checks</div>
        </div>
      </div>
    </section>
  );
}
