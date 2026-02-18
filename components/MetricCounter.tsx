"use client";

import { useEffect, useRef, useState } from "react";

function parseNumber(value: string) {
  const m = value.match(/-?\d+[\d,.]*(?:\.\d+)?/);
  if (!m) return null;
  const raw = m[0].replace(/,/g, "");
  const num = Number(raw);
  if (Number.isNaN(num)) return null;
  return { num, match: m[0], index: m.index ?? 0 };
}

export default function MetricCounter({ value, className }: { value: string; className?: string }) {
  const parsed = parseNumber(value);
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }

    const { num, match } = parsed;
    const duration = 900;
    const start = performance.now();
    const from = 0;

    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (num - from) * eased);
      const formatted = match.includes(".") ? current.toFixed(0) : String(current);
      const replaced = value.replace(match, formatted);
      setDisplay(replaced);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <div className={className}>{display}</div>;
}
