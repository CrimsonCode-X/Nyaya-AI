import { NextResponse } from "next/server";

type RuleOutcome = {
  label?: string;
  passed?: boolean;
  reason?: string;
};

function buildExplanation(scheme: Record<string, unknown>, result: Record<string, unknown>) {
  const status = String(result.status ?? result.assessment ?? "unknown").toLowerCase();
  const outcomes = Array.isArray(result.rules) ? result.rules as RuleOutcome[] : [];
  const failed = Array.isArray(result.failed) ? result.failed.map(String) : [];
  const verification = Array.isArray(result.verification) ? result.verification.map(String) : [];
  const name = String(scheme.name ?? scheme.title ?? "this scheme");

  const passedRules = outcomes.filter((rule) => rule.passed === true).map((rule) => rule.label).filter(Boolean) as string[];
  const failedRules = outcomes.filter((rule) => rule.passed === false).map((rule) => rule.label).filter(Boolean) as string[];

  let why = "The assessment could not establish a final eligibility outcome from the supplied information.";
  if (["eligible", "passed", "qualifies"].includes(status)) {
    why = passedRules.length
      ? `You appear eligible for ${name} because the evaluated conditions passed: ${passedRules.join(", ")}.`
      : `You appear eligible for ${name} because all machine-readable conditions in the current rule set passed.`;
  } else if (["ineligible", "failed", "not eligible"].includes(status)) {
    const reasons = [...failedRules, ...failed].filter(Boolean);
    why = reasons.length
      ? `The current assessment did not pass because of: ${reasons.join(", ")}.`
      : `The current rule evaluation did not pass for ${name}.`;
  }

  const checks = [...verification, ...outcomes.filter((rule) => rule.passed === undefined).map((rule) => rule.label).filter(Boolean) as string[]];
  const before = checks.length
    ? `Before applying, verify: ${checks.join(", ")}. Also confirm the current requirements and procedure with the official scheme source.`
    : "Before applying, confirm the current requirements, documents, deadlines, and procedure with the official scheme source.";

  return `Why this result\n${why}\n\nBefore you apply\n${before}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scheme = body?.scheme;
    const result = body?.result ?? body?.assessment;

    if (!scheme || !result) {
      return NextResponse.json({ error: "Scheme and assessment result are required." }, { status: 400 });
    }

    return NextResponse.json({ explanation: buildExplanation(scheme, result) });
  } catch (error) {
    console.error("Scheme explanation error", error);
    return NextResponse.json({ error: "Could not generate the explanation." }, { status: 500 });
  }
}
