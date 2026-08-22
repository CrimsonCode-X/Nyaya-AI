"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const authorities = [
  "Central Government Department / Ministry",
  "State Government Department",
  "Municipal Corporation / Local Authority",
  "Public Sector Undertaking",
  "Government University / Institution",
];

export default function RTIPage() {
  const [authority, setAuthority] = useState(authorities[0]);
  const [subject, setSubject] = useState("");
  const [information, setInformation] = useState("");
  const [period, setPeriod] = useState("");
  const [generated, setGenerated] = useState(false);

  const draft = useMemo(() => {
    return `To,\nThe Public Information Officer\n${authority}\n\nSubject: Request for information under the Right to Information Act, 2005\n\nSir/Madam,\n\nKindly provide the following information under the Right to Information Act, 2005:\n\n1. ${information || "[Specify the information requested]"}\n\nSubject / matter: ${subject || "[Specify the subject]"}\nInformation period: ${period || "[Specify the relevant period]"}\n\nI request that the information be provided in the prescribed form. If any part of this request is held by another public authority, kindly transfer the relevant part as permitted under the Act and inform me accordingly.\n\nPlease communicate the applicable fee or any further requirement through the prescribed process.\n\nYours faithfully,\n[Applicant name]\n[Address / contact details]`;
  }, [authority, information, period, subject]);

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">Nyaya-AI</Link>
        <span className="text-sm text-black/50">RTI Copilot</span>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-12 lg:px-8">
        <p className="text-sm font-medium text-black/45">01 — RTI Copilot</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Turn a question into an RTI request.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/55">
          Choose the public authority and describe the records or information you need.
          Nyaya-AI structures it into a clear RTI request without inventing facts.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold">Build your request</h2>
            <div className="mt-6 space-y-5">
              <label className="block text-sm font-medium">
                Public authority
                <select value={authority} onChange={(e) => setAuthority(e.target.value)} className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black/40">
                  {authorities.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Subject / matter
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. road repair expenditure in Ward 12" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/40" />
              </label>
              <label className="block text-sm font-medium">
                Information requested
                <textarea value={information} onChange={(e) => setInformation(e.target.value)} rows={5} placeholder="Ask for existing records, documents, orders, expenditure details, dates, or other information held by the authority." className="mt-2 w-full resize-none rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/40" />
              </label>
              <label className="block text-sm font-medium">
                Relevant period
                <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g. April 2025 – March 2026" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-black/40" />
              </label>
              <button onClick={() => setGenerated(true)} className="w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80">
                Draft an RTI
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[#171717] p-7 text-white shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-white/45">Draft preview</p>
            {generated ? (
              <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-white/85">{draft}</pre>
            ) : (
              <div className="mt-8 space-y-4 text-white/55">
                <p className="text-lg text-white/80">Your RTI request will appear here.</p>
                <p>Describe the information you want from the public authority. Keep requests focused on records or information held by the authority.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-black/10 bg-white p-7">
          <h2 className="font-semibold">Filing guidance</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-black/60">
            <li>Identify the correct public authority and Public Information Officer.</li>
            <li>Submit the request through the applicable official RTI channel and pay the prescribed application fee where required.</li>
            <li>Keep a copy of the application, payment proof and submission/dispatch record.</li>
            <li>Check the official RTI portal or authority instructions for the current filing procedure.</li>
          </ol>
        </div>

        <p className="mt-8 text-xs leading-5 text-black/40">
          Information assistance, not legal representation. Verify the current filing procedure and applicable rules with the relevant public authority.
        </p>
      </section>
    </main>
  );
}
