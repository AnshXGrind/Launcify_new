import { z } from "zod";

type StrategyShape = {
  diagnosis: string;
  recommendedSystem: string;
  estimatedHoursSaved: string;
  implementationPlan: { week: string; task: string }[];
  topTools: string[];
  nextStep: string;
};

type EstimateShape = { weeks: number; ballpark_usd: string; note: string };

const strategySchema = z.object({
  diagnosis: z.string(),
  recommendedSystem: z.string(),
  estimatedHoursSaved: z.string(),
  implementationPlan: z.array(z.object({ week: z.string(), task: z.string() })),
  topTools: z.array(z.string()),
  nextStep: z.string(),
});

const estimateSchema = z.object({ weeks: z.number(), ballpark_usd: z.string(), note: z.string() });

export async function validateStrategy(obj: unknown): Promise<StrategyShape | null> {
  try {
    const parsed = strategySchema.safeParse(obj);
    if (parsed.success) return parsed.data as StrategyShape;
  } catch (e) {
    // fall through to null
  }
  return null;
}

export async function validateEstimate(obj: unknown): Promise<EstimateShape | null> {
  try {
    const parsed = estimateSchema.safeParse(obj);
    if (parsed.success) return parsed.data as EstimateShape;
  } catch (e) {
    // fall through
  }
  return null;
}
