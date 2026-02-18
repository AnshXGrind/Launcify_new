import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rateLimiter";
import { validateStrategy } from "@/lib/validators";

export const dynamic = "force-dynamic";

// â”€â”€ Input validation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VALID_SIZES = ["1â€“10 employees", "11â€“50 employees", "51â€“200 employees", "200+ employees"];
const VALID_BOTTLENECKS = [
  "Manual data entry and reporting",
  "Slow or broken sales pipeline",
  "Customer support overload",
  "Disconnected tools with no integrations",
  "Compliance and documentation overhead",
];
const VALID_TOOLS = [
  "HubSpot", "Slack", "Airtable", "Notion",
  "Shopify", "Salesforce", "Google Workspace", "Custom / Internal tools",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// â”€â”€ Groq strategy response shape (validated at runtime) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface StrategyResponse {
  diagnosis: string;
  recommendedSystem: string;
  estimatedHoursSaved: string;
  implementationPlan: { week: string; task: string }[];
  topTools: string[];
  nextStep: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TIMEOUT_MS = 25_000;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://launcify.vercel.app";

const SYSTEM_PROMPT = `You are a Senior Enterprise AI Automation Consultant at Launcify.

Your task: Generate a concise, structured automation strategy based on the user's business inputs.

Output format (strict â€” return valid JSON only, no markdown, no explanation outside JSON):
{
  "diagnosis": "2-3 sentence operational diagnosis",
  "recommendedSystem": "Name and brief description of the specific automation system to build",
  "estimatedHoursSaved": "Xâ€“Y hours per week",
  "implementationPlan": [
    { "week": "Week 1", "task": "..." },
    { "week": "Week 2", "task": "..." },
    { "week": "Week 3", "task": "..." },
    { "week": "Week 4", "task": "..." }
  ],
  "topTools": ["Tool 1", "Tool 2", "Tool 3"],
  "nextStep": "One sentence CTA encouraging a strategy call"
}

Tone: Professional, enterprise-level, specific. No emojis. No hype language. No generic advice.`;

export async function POST(req: NextRequest) {
  // â”€â”€ Rate limiting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, companySize, bottleneck, techStack } = body as Record<string, unknown>;

    // â”€â”€ Validate required fields (whitelist â€” prevents prompt injection) â”€â”€â”€â”€â”€
    if (!VALID_SIZES.includes(companySize as string)) {
      return NextResponse.json({ error: "Invalid company size." }, { status: 400 });
    }
    if (!VALID_BOTTLENECKS.includes(bottleneck as string)) {
      return NextResponse.json({ error: "Invalid bottleneck selection." }, { status: 400 });
    }

    // â”€â”€ Validate optional fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const safeName =
      typeof name === "string" ? name.slice(0, 100).replace(/[<>]/g, "") : null;
    const safeEmail =
      typeof email === "string" && EMAIL_RE.test(email) ? email.slice(0, 254) : null;
    const safeTechStack = Array.isArray(techStack)
      ? (techStack as unknown[])
          .filter((t): t is string => typeof t === "string" && VALID_TOOLS.includes(t))
          .slice(0, 10)
      : [];

    const userMessage = `
Business Profile:
- Company Size: ${companySize}
- Primary Operational Bottleneck: ${bottleneck}
- Current Tech Stack: ${safeTechStack.length ? safeTechStack.join(", ") : "Not specified"}

Generate an automation strategy for this business.`;

    // â”€â”€ Groq call with timeout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

    let groqResponse: Response;
    try {
      groqResponse = await fetch(GROQ_API_URL, {
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
          temperature: 0.35,
          max_tokens: 800,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!groqResponse.ok) {
      const errText = await groqResponse.text().catch(() => "");
      console.error(`Groq API error ${groqResponse.status}:`, errText);
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const rawContent: string = groqData.choices?.[0]?.message?.content ?? "{}";

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = null;
    }

    const validated = await validateStrategy(parsed);
    const strategy =
      validated ?? {
        diagnosis: "We were unable to generate a strategy at this time.",
        recommendedSystem: "Please book a strategy call for a personalised assessment.",
        estimatedHoursSaved: "N/A",
        implementationPlan: [],
        topTools: [],
        nextStep: `Book a free strategy call at ${SITE_URL}/book-call`,
      };

    // â”€â”€ Store lead (non-blocking) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl?.startsWith("http")) {
        const adminClient = createAdminClient();
        await adminClient.from("leads").insert([
          {
            name: safeName,
            email: safeEmail,
            company_size: companySize,
            bottleneck,
            tech_stack: safeTechStack,
            ai_response: JSON.stringify(strategy),
            estimated_hours_saved: strategy.estimatedHoursSaved,
            recommended_system: strategy.recommendedSystem,
          },
        ]);
      }
    } catch (dbError) {
      console.warn("Supabase lead storage skipped:", dbError);
    }

    return NextResponse.json({ strategy });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Strategy generation timed out. Please try again." },
        { status: 504 }
      );
    }
    console.error("Strategy API error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategy. Please try again." },
      { status: 500 }
    );
  }
}