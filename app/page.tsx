const modules = [
  {
    number: "01",
    title: "RTI Copilot",
    description:
      "Turn a question for a public authority into a clear, properly structured RTI request.",
    action: "Draft an RTI",
  },
  {
    number: "02",
    title: "Consumer Rights",
    description:
      "Understand your options when a seller refuses a refund, replacement, or other remedy.",
    action: "Resolve a dispute",
  },
  {
    number: "03",
    title: "Scheme Eligibility",
    description:
      "Answer a few questions and discover government schemes you may be eligible for.",
    action: "Check eligibility",
  },
  {
    number: "04",
    title: "Certificate Assistant",
    description:
      "Navigate government certificate applications through a simple conversational process.",
    action: "Fill a form",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-sm font-semibold text-white">
            N
          </div>
          <span className="text-lg font-semibold tracking-tight">Nyaya-AI</span>
        </div>

        <span className="hidden text-sm text-black/50 sm:block">
          Civic & Legal Empowerment
        </span>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-black/60 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Understand. Navigate. Act.
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Government shouldn&apos;t be this difficult.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
            Nyaya-AI turns complicated government procedures, legal rights, and
            public schemes into clear, actionable steps — grounded in
            authoritative sources.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {modules.map((module) => (
            <button
              key={module.number}
              type="button"
              className="group min-h-64 rounded-3xl border border-black/10 bg-white p-7 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-black/20 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-black/35">
                  {module.number}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {module.title}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-black/55">
                  {module.description}
                </p>

                <p className="mt-5 text-sm font-medium">
                  {module.action} <span className="ml-1">→</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-black/10 px-6 py-8 text-sm text-black/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>Nyaya-AI — Civic empowerment through accessible technology.</span>
        <span>Information assistance, not legal representation.</span>
      </footer>
    </main>
  );
}