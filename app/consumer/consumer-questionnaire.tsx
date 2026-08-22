"use client";

import { useState } from "react";

type FormState = {
  product: string;
  purchaseDate: string;
  defect: string;
  contactedSeller: string;
  sellerResponse: string;
  proofOfPurchase: string;
};

const initialState: FormState = {
  product: "",
  purchaseDate: "",
  defect: "",
  contactedSeller: "",
  sellerResponse: "",
  proofOfPurchase: "",
};

export default function ConsumerQuestionnaire() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  const complete = Object.values(form).every(Boolean);

  return (
    <div className="mt-8 rounded-3xl border border-black/10 bg-[#fafaf8] p-6 sm:p-7">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-black/35">Tell us what happened</p>
        <h2 className="mt-2 text-xl font-semibold">A few questions before we recommend the next step</h2>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="text-sm font-medium">What did you purchase?</span>
          <input value={form.product} onChange={(e) => update("product", e.target.value)} placeholder="e.g. smartphone" className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30" />
        </label>

        <label>
          <span className="text-sm font-medium">When did you purchase it?</span>
          <input type="date" value={form.purchaseDate} onChange={(e) => update("purchaseDate", e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30" />
        </label>

        <label>
          <span className="text-sm font-medium">What is wrong with it?</span>
          <input value={form.defect} onChange={(e) => update("defect", e.target.value)} placeholder="e.g. stopped working" className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30" />
        </label>

        <fieldset>
          <legend className="text-sm font-medium">Did you contact the seller?</legend>
          <div className="mt-2 flex gap-3">
            {['Yes', 'No'].map((value) => (
              <button type="button" key={value} onClick={() => update("contactedSeller", value)} className={`rounded-xl border px-4 py-2.5 text-sm ${form.contactedSeller === value ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>{value}</button>
            ))}
          </div>
        </fieldset>

        <label>
          <span className="text-sm font-medium">What did the seller do?</span>
          <select value={form.sellerResponse} onChange={(e) => update("sellerResponse", e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none">
            <option value="">Select one</option>
            <option>Refused refund</option>
            <option>Refused replacement</option>
            <option>Offered repair</option>
            <option>No response</option>
          </select>
        </label>

        <fieldset>
          <legend className="text-sm font-medium">Do you have proof of purchase?</legend>
          <div className="mt-2 flex gap-3">
            {['Yes', 'No'].map((value) => (
              <button type="button" key={value} onClick={() => update("proofOfPurchase", value)} className={`rounded-xl border px-4 py-2.5 text-sm ${form.proofOfPurchase === value ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>{value}</button>
            ))}
          </div>
        </fieldset>
      </div>

      <button type="button" disabled={!complete} onClick={() => setSubmitted(true)} className="mt-7 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-30">
        See my next steps
      </button>

      {submitted && (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-black/35">Your situation</p>
          <h3 className="mt-2 font-semibold">This matches our defective-product MVP scenario.</h3>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Keep your purchase records and evidence of the defect, retain your communication with the seller, and follow the guidance below if the seller refuses to resolve the issue.
          </p>
        </div>
      )}
    </div>
  );
}
