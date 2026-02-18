import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a Senior Enterprise AI Automation Consultant at Launcify.

Your task: Generate a concise, structured automation strategy based on the user's business inputs.

Output format (strict — return valid JSON only, no markdown, no explanation outside JSON):
{
  "diagnosis": "2-3 sentence operational diagnosis",
  "recommendedSystem": "Name and brief description of the specific automation system to build",
  "estimatedHoursSaved": "X–Y hours per week",
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
  try {
    const body = await req.json();
    const { name, email, companySize, bottleneck, techStack } = body;

    if (!companySize || !bottleneck) {
      return NextResponse.json(
        { error: "Missing required fields: companySize and bottleneck" },
        { status: 400 }
      );
    }

    const userMessage = `
Business Profile:
- Company Size: ${companySize}
- Primary Operational Bottleneck: ${bottleneck}
- Current Tech Stack: ${techStack?.length ? techStack.join(", ") : "Not specified"}

Generate an automation strategy for this business.`;

    // Call Groq (LLaMA 3)
    const groqResponse = await fetch(GROQ_API_URL, {
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
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const rawContent = groqData.choices?.[0]?.message?.content || "{}";

    let strategy;
    try {
      strategy = JSON.parse(rawContent);
    } catch {
      strategy = { diagnosis: rawContent, error: "parse_failed" };
    }

    // Store lead in Supabase (non-blocking, skip if env not configured)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && supabaseUrl.startsWith("http")) {
        const adminClient = createAdminClient();
        await adminClient.from("leads").insert([
          {
            name: name || null,
            email: email || null,
            company_size: companySize,
            bottleneck,
            tech_stack: techStack || [],
            ai_response: JSON.stringify(strategy),
            estimated_hours_saved: strategy.estimatedHoursSaved || null,
            recommended_system: strategy.recommendedSystem || null,
          },
        ]);
      }
    } catch (dbError) {
      console.warn("Supabase lead storage skipped:", dbError);
    }

    return NextResponse.json({ strategy });
  } catch (error) {
    console.error("Strategy API error:", error);
    return NextResponse.json(
      { error: "Failed to generate strategy. Please try again." },
      { status: 500 }
    );
  }
}
