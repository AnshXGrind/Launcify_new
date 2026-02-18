import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rateLimiter";
import { validateEstimate } from "@/lib/validators";

export const dynamic = "force-dynamic";

const VALID_SIZES = ["1–10 employees", "11–50 employees", "51–200 employees", "200+ employees"];
const VALID_BOTTLENECKS = [
  "Manual data entry and reporting",
  "Slow or broken sales pipeline",
  "Customer support overload",
  "Disconnected tools with no integrations",
  "Compliance and documentation overhead",
];

type EstimateShape = { weeks: number; ballpark_usd: string; note: string };

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TIMEOUT_MS = 20_000;

const SYSTEM_PROMPT = `You are an expert AI automation estimator for a boutique engineering agency. Given a short business profile, return a strict JSON object with: {"weeks": number, "ballpark_usd": string, "note": string}. Keep estimates conservative and brief. Return JSON only.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "60" } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { companySize, bottleneck, techStack } = body as Record<string, unknown>;
  if (!VALID_SIZES.includes(companySize as string) || !VALID_BOTTLENECKS.includes(bottleneck as string)) {
    return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
  }

  const userMessage = `Profile:\n- Company Size: ${companySize}\n- Bottleneck: ${bottleneck}\n- Tech Stack: ${Array.isArray(techStack) ? (techStack as string[]).join(", ") : "Not specified"}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

  try {
    const resp = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.15,
        max_tokens: 200,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      console.error(`Estimator LLM error ${resp.status}:`, t);
      throw new Error("LLM error");
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    const validated = await validateEstimate(parsed);
    const estimate: EstimateShape = validated ?? { weeks: Math.max(2, Math.round((2 + (VALID_SIZES.indexOf(companySize as string) + 1) * 1.5))), ballpark_usd: "$8k", note: "Fallback conservative estimate. Book a call for precision." };

    // persist lead (non-blocking)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && supabaseUrl.startsWith("http")) {
        const client = createAdminClient();
        await client.from("leads").insert([{ company_size: companySize, bottleneck, tech_stack: Array.isArray(techStack) ? techStack : [], ai_estimate: JSON.stringify(estimate) }]);
      }
    } catch (e) {
      console.warn("Estimator: lead storage skipped", e);
    }

    return NextResponse.json({ estimate });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ error: "Estimator timed out" }, { status: 504 });
    }
    console.error("Estimator error:", err);
    return NextResponse.json({ error: "Failed to generate estimate" }, { status: 500 });
  }
}
