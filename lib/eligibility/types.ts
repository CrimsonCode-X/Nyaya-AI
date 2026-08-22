export type EligibilityAnswer = string | number | boolean | string[] | null;

export type ApplicantProfile = Record<string, EligibilityAnswer>;

export type EligibilityRule = {
  id: string;
  scheme_id: string;
  field_key: string;
  operator:
    | "eq"
    | "neq"
    | "lt"
    | "lte"
    | "gt"
    | "gte"
    | "in"
    | "not_in"
    | "between"
    | "contains"
    | "requires_verification";
  value: unknown;
  unit: string | null;
  explanation: string | null;
  machine_readable: boolean;
  special_handling: string | null;
  source_id: string | null;
};

export type RuleResult = {
  rule: EligibilityRule;
  status: "pass" | "fail" | "verify";
};

export type EligibilityResult = {
  status: "eligible" | "not_eligible" | "needs_verification";
  passed: RuleResult[];
  failed: RuleResult[];
  verification: RuleResult[];
};
