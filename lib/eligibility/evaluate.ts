import type {
  ApplicantProfile,
  EligibilityResult,
  EligibilityRule,
  RuleResult,
} from "./types";

function compare(rule: EligibilityRule, answer: unknown): RuleResult["status"] {
  if (rule.operator === "requires_verification" || !rule.machine_readable) {
    return "verify";
  }

  if (answer === null || answer === undefined) return "verify";

  const expected = rule.value as any;

  switch (rule.operator) {
    case "eq":
      return answer === expected ? "pass" : "fail";
    case "neq":
      return answer !== expected ? "pass" : "fail";
    case "lt":
      return Number(answer) < Number(expected) ? "pass" : "fail";
    case "lte":
      return Number(answer) <= Number(expected) ? "pass" : "fail";
    case "gt":
      return Number(answer) > Number(expected) ? "pass" : "fail";
    case "gte":
      return Number(answer) >= Number(expected) ? "pass" : "fail";
    case "in":
      return Array.isArray(expected) && expected.includes(answer) ? "pass" : "fail";
    case "not_in":
      return Array.isArray(expected) && !expected.includes(answer) ? "pass" : "fail";
    case "between":
      return Array.isArray(expected) && Number(answer) >= Number(expected[0]) && Number(answer) <= Number(expected[1])
        ? "pass"
        : "fail";
    case "contains":
      return Array.isArray(answer) && answer.includes(expected) ? "pass" : "fail";
    default:
      return "verify";
  }
}

export function evaluateEligibility(
  rules: EligibilityRule[],
  applicant: ApplicantProfile,
): EligibilityResult {
  const results = rules.map((rule) => ({
    rule,
    status: compare(rule, applicant[rule.field_key]),
  }));

  const failed = results.filter((r) => r.status === "fail");
  const verification = results.filter((r) => r.status === "verify");
  const passed = results.filter((r) => r.status === "pass");

  return {
    status: failed.length > 0 ? "not_eligible" : verification.length > 0 ? "needs_verification" : "eligible",
    passed,
    failed,
    verification,
  };
}
