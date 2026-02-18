type StrategyShape = {
  diagnosis: string;
  recommendedSystem: string;
  estimatedHoursSaved: string;
  implementationPlan: { week: string; task: string }[];
  topTools: string[];
  nextStep: string;
};

type EstimateShape = { weeks: number; ballpark_usd: string; note: string };

export async function validateStrategy(obj: unknown): Promise<StrategyShape | null> {
  try {
    const zpkg = await import("zod").catch(() => null);
    if (zpkg) {
      const { z } = zpkg as any;
      const schema = z.object({
        diagnosis: z.string(),
        recommendedSystem: z.string(),
        estimatedHoursSaved: z.string(),
        implementationPlan: z.array(z.object({ week: z.string(), task: z.string() })),
        topTools: z.array(z.string()),
        nextStep: z.string(),
      });
      const parsed = schema.safeParse(obj);
      if (parsed.success) return parsed.data as StrategyShape;
      return null;
    }
  } catch (e) {
    // ignore and fallback to JS checks
  }

  // Fallback JS validation
  if (!obj || typeof obj !== "object") return null;
  const s = obj as Record<string, unknown>;
  if (
    typeof s.diagnosis === "string" &&
    typeof s.recommendedSystem === "string" &&
    typeof s.estimatedHoursSaved === "string" &&
    Array.isArray(s.implementationPlan) &&
    Array.isArray(s.topTools) &&
    typeof s.nextStep === "string"
  ) {
    return s as StrategyShape;
  }
  return null;
}

export async function validateEstimate(obj: unknown): Promise<EstimateShape | null> {
  try {
    const zpkg = await import("zod").catch(() => null);
    if (zpkg) {
      const { z } = zpkg as any;
      const schema = z.object({ weeks: z.number(), ballpark_usd: z.string(), note: z.string() });
      const parsed = schema.safeParse(obj);
      if (parsed.success) return parsed.data as EstimateShape;
      return null;
    }
  } catch (e) {
    // fallback
  }

  if (!obj || typeof obj !== "object") return null;
  const o = obj as Record<string, unknown>;
  if (typeof o.weeks === "number" && typeof o.ballpark_usd === "string" && typeof o.note === "string") {
    return o as EstimateShape;
  }
  return null;
}
