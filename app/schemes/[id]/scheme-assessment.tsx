"use client";

import { useMemo, useState } from "react";
import { evaluateEligibility } from "@/lib/eligibility/evaluate";
import type { ApplicantProfile, EligibilityRule } from "@/lib/eligibility/types";

type Scheme = { id: string; name: string; short_name: string | null; official_url: string | null };

const labels: Record<string, string> = {
  age: "What is your age?",
  family_income: "What is your annual family income?",
  nationality: "What is your nationality?",
  social_category: "Which social category do you belong to?",
};

const help: Record<string, string> = {
  age: "Enter your age in completed years.",
  family_income: "Use the annual family income figure required by the scheme.",
  nationality: "Choose the nationality that applies to you.",
  social_category: "Select the category stated on your relevant certificate, if applicable.",
};

export function SchemeAssessment({ scheme, rules }: { scheme: Scheme; rules: EligibilityRule[] }) {
  const fields = useMemo(() => [...new Set(rules.map((rule) => rule.field_key))], [rules]);
  const [answers, setAnswers] = useState<ApplicantProfile>({});
  const [submitted, setSubmitted] = useState(false);

  const result = submitted ? evaluateEligibility(rules, answers) : null;

  function setAnswer(field: string, value: string) {
    setAnswers((current) => ({ ...current, [field]: field === "age" || field === "family_income" ? Number(value) : value }));
    setSubmitted(false);
  }

  const canSubmit = fields.every((field) => answers[field] !== null && answers[field] !== undefined && answers[field] !== "");

  return (
    <div className="mt-10">
      {!result ? (
        <form
          onSubmit={(event) => { event.preventDefault(); if (canSubmit) setSubmitted(true); }}
          className="space-y-5"
        >
          {fields.map((field) => (
            <label key={field} className="block rounded-2xl border border-black/10 bg-white p-5">
              <span className="font-medium">{labels[field] ?? field.replaceAll("_", " ")}</span>
              <span className="mt-1 block text-sm text-black/45">{help[field] ?? "Answer based on your current circumstances."}</span>

              {field === "nationality" ? (
                <select
                  className="mt-4 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                  value={(answers[field] as string) ?? ""}
                  onChange={(e) => setAnswer(field, e.target.value)}
                >
                  <option value="">Select nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </select>
              ) : field === "social_category" ? (
                <select
                  className="mt-4 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                  value={(answers[field] as string) ?? ""}
                  onChange={(e) => setAnswer(field, e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="OBC">OBC</option>
                  <option value="EBC">EBC</option>
                  <option value="DNT">DNT</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="General">General</option>
                </select>
              ) : (
                <input
                  required
                  min={0}
                  type="number"
                  className="mt-4 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                  value={(answers[field] as number) ?? ""}
                  onChange={(e) => setAnswer(field, e.target.value)}
                />
              )}
            </label>
          ))}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full bg-[#171717] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Check eligibility
          </button>
        </form>
      ) : (
        <section className="space-y-5">
          <div className="rounded-3xl border border-black/10 bg-white p-7">
            <p className="text-sm font-medium text-black/40">Assessment result</p>
            <h2 className="mt-2 text-3xl font-semibold">
              {result.status === "eligible" ? "You appear eligible" : result.status === "not_eligible" ? "You do not appear eligible" : "Verification is still required"}
            </h2>
            <p className="mt-3 leading-7 text-black/55">
              {result.status === "eligible"
                ? "All machine-readable conditions in our current rule set passed."
                : result.status === "not_eligible"
                  ? "At least one machine-readable condition did not pass."
                  : "No definitive condition failed, but one or more requirements require confirmation from an authority or official document."}
            </p>
          </div>

          {result.failed.length > 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h3 className="font-semibold">Conditions that did not pass</h3>
              <ul className="mt-3 space-y-2 text-sm text-red-900">
                {result.failed.map(({ rule }) => <li key={rule.id}>• {rule.explanation ?? rule.field_key}</li>)}
              </ul>
            </div>
          )}

          {result.verification.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold">What you still need to verify</h3>
              <ul className="mt-3 space-y-2 text-sm text-amber-950">
                {result.verification.map(({ rule }) => <li key={rule.id}>• {rule.special_handling ?? rule.explanation ?? rule.field_key}</li>)}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="font-semibold">Authoritative source</h3>
            <p className="mt-2 text-sm text-black/55">This assessment is based on the source attached to the scheme&apos;s eligibility rules.</p>
            {scheme.official_url && (
              <a href={scheme.official_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
                Open official scheme information →
              </a>
            )}
          </div>

          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-sm font-medium underline underline-offset-4">
            Start again
          </button>
        </section>
      )}
    </div>
  );
}
