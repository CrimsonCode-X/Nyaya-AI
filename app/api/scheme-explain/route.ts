import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const scheme = body?.scheme;
    const result = body?.result ?? body?.assessment;

    if (!scheme || !result) {
      return NextResponse.json({ error: "Scheme and assessment result are required." }, { status: 400 });
    }

    const input = `You are the explanation layer for Nyaya-AI, a civic information assistant. Do not provide legal representation, invent eligibility rules, or change the deterministic assessment.

Explain this already-computed scheme assessment in plain, concise language.

Scheme: ${JSON.stringify(scheme)}
Assessment: ${JSON.stringify(result)}

Rules:
- Treat the supplied assessment status and rule outcomes as authoritative.
- Do not claim the user is legally entitled to a benefit.
- Do not introduce eligibility conditions absent from the supplied data.
- Explain why the supplied answers passed, failed, or still require verification.
- Tell the user to verify current requirements with the official source.
- Return only two short sections headed "Why this result" and "Before you apply".`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input,
        max_output_tokens: 350,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI Responses API error", data);
      return NextResponse.json({ error: "The AI explanation service failed." }, { status: 502 });
    }

    return NextResponse.json({ explanation: data.output_text ?? "No explanation was returned." });
  } catch (error) {
    console.error("Scheme explanation error", error);
    return NextResponse.json({ error: "Could not generate the explanation." }, { status: 500 });
  }
}
