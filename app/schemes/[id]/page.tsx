import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SchemeAssessment } from "./scheme-assessment";

export default async function SchemePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: scheme }, { data: rules }] = await Promise.all([
    supabase
      .from("schemes")
      .select("id, name, short_name, category, description, official_url, source_id")
      .eq("id", id)
      .eq("active", true)
      .single(),
    supabase
      .from("eligibility_rules")
      .select("id, scheme_id, field_key, operator, value, unit, explanation, machine_readable, special_handling, source_id")
      .eq("scheme_id", id),
  ]);

  if (!scheme) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Scheme not found</h1>
          <Link href="/schemes" className="mt-4 inline-block text-sm underline">
            Back to schemes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">Nyaya-AI</Link>
        <Link href="/schemes" className="text-sm text-black/50 hover:text-black">All schemes</Link>
      </nav>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <p className="text-sm font-medium text-black/40">Scheme Eligibility</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">{scheme.short_name ?? scheme.name}</h1>
        <p className="mt-4 leading-7 text-black/55">{scheme.description}</p>
        <div className="mt-5 rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-black/60">
          We evaluate published conditions first. Where government records, certificates, components, or current implementation must be checked, we mark the result for verification.
        </div>
        <SchemeAssessment
          scheme={{ ...scheme, official_url: scheme.official_url }}
          rules={rules ?? []}
        />
      </section>
    </main>
  );
}
