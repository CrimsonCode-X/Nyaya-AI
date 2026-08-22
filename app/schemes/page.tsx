import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SchemesPage() {
  const supabase = await createClient();
  const { data: schemes, error } = await supabase
    .from("schemes")
    .select("id, name, short_name, category, description")
    .eq("active", true)
    .order("category")
    .order("name");

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Nyaya-AI
        </Link>
        <span className="text-sm text-black/50">Scheme Eligibility</span>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-black/45">03 — Scheme Eligibility</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Find schemes you may qualify for.
          </h1>
          <p className="mt-5 text-lg leading-8 text-black/55">
            Start with an official scheme. Nyaya-AI evaluates structured eligibility
            conditions and clearly flags anything that still needs verification.
          </p>
        </div>

        {error ? (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            We couldn&apos;t load the scheme catalogue. Please try again.
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(schemes ?? []).map((scheme) => (
              <article key={scheme.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                  {scheme.category.replaceAll("_", " ")}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{scheme.short_name ?? scheme.name}</h2>
                <p className="mt-3 text-sm leading-6 text-black/55">
                  {scheme.description ?? "Eligibility conditions are evaluated from the scheme's authoritative source data."}
                </p>
                <Link
                  href={`/schemes/${scheme.id}`}
                  className="mt-6 inline-flex rounded-full bg-[#171717] px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80"
                >
                  Check eligibility →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
