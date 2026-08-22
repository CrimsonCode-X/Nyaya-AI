import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ConsumerPage() {
  const supabase = await createClient();
  const { data: rights, error } = await supabase
    .from("consumer_rights")
    .select("id, issue_type, remedy, applicable_law, authority, procedure")
    .order("issue_type");

  const defective = (rights ?? []).filter((item) =>
    /defect|refund|replacement|product/i.test(`${item.issue_type} ${item.remedy}`),
  );

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">Nyaya-AI</Link>
        <span className="text-sm text-black/50">Consumer Rights</span>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-12 lg:px-8">
        <p className="text-sm font-medium text-black/45">02 — Consumer Rights</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Seller refused a refund or replacement?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/55">
          Tell us what happened. Nyaya-AI will help you identify the next practical
          step and show the official consumer-rights basis behind it.
        </p>

        <div className="mt-12 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-semibold">Defective product</h2>
          <p className="mt-2 text-sm leading-6 text-black/55">
            This MVP covers the specific case of a defective product where the seller
            refuses a refund or replacement.
          </p>

          {error ? (
            <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-800">
              Consumer-rights data could not be loaded.
            </p>
          ) : defective.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-black/[.03] p-4 text-sm text-black/55">
              No matching consumer-rights guidance is currently available.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {defective.map((item) => (
                <div key={item.id} className="rounded-2xl border border-black/10 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-black/35">Recommended remedy</p>
                  <h3 className="mt-2 font-semibold">{item.remedy}</h3>
                  {item.applicable_law && (
                    <p className="mt-2 text-sm text-black/55">Basis: {item.applicable_law}</p>
                  )}
                  {item.authority && (
                    <p className="mt-1 text-sm text-black/55">Authority: {item.authority}</p>
                  )}
                  {Array.isArray(item.procedure) && item.procedure.length > 0 && (
                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-black/65">
                      {item.procedure.map((step, index) => (
                        <li key={index}>{String(step)}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-xs leading-5 text-black/40">
          Information assistance, not legal representation. Always verify the current
          procedure and applicable rules with the relevant official authority.
        </p>
      </section>
    </main>
  );
}
