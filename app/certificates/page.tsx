"use client";

import Link from "next/link";
import { useState } from "react";

const certificates = ["Income Certificate", "Caste Certificate", "Domicile Certificate", "Birth Certificate"];

export default function CertificatesPage() {
  const [certificate, setCertificate] = useState(certificates[0]);
  const [district, setDistrict] = useState("");
  const [step, setStep] = useState(0);

  const steps = [
    "Confirm the certificate you need and the purpose of the application.",
    "Keep identity proof, address proof, photographs and supporting documents ready as applicable.",
    "Apply through the relevant state e-District / citizen services portal or designated office.",
    "Save the application acknowledgement and track the application status.",
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">Nyaya-AI</Link>
        <span className="text-sm text-black/50">Certificate Assistant</span>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-12 lg:px-8">
        <p className="text-sm font-medium text-black/45">04 — Certificate Assistant</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Need a government certificate?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/55">
          Choose a certificate and your district. Nyaya-AI will turn the application
          process into a short, practical checklist.
        </p>

        <div className="mt-12 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
          <label className="block text-sm font-medium">Certificate</label>
          <select value={certificate} onChange={(e) => setCertificate(e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30">
            {certificates.map((item) => <option key={item}>{item}</option>)}
          </select>

          <label className="mt-6 block text-sm font-medium">District</label>
          <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Mathura" className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none placeholder:text-black/30 focus:border-black/30" />

          <button onClick={() => setStep(1)} className="mt-6 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80">
            Show application steps
          </button>

          {step > 0 && (
            <div className="mt-8 rounded-2xl bg-black/[.03] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-black/35">Your checklist</p>
              <h2 className="mt-2 text-xl font-semibold">{certificate}</h2>
              {district && <p className="mt-1 text-sm text-black/50">District: {district}</p>}
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-black/65">
                {steps.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
          )}
        </div>

        <p className="mt-8 text-xs leading-5 text-black/40">
          Information assistance, not legal representation. Requirements and portals vary
          by state and certificate type; verify the current process with the relevant authority.
        </p>
      </section>
    </main>
  );
}
