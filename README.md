# Nyaya-AI

**Understand. Navigate. Act.**

Nyaya-AI is a civic-information MVP that turns complicated government schemes, consumer-rights situations, RTI requests, and certificate procedures into clear, actionable steps.

> Information assistance, not legal representation. Always verify the current procedure and applicable rules with the relevant official authority.

## MVP modules

- **01 — RTI Copilot** — structures a user's public-information request into an RTI draft.
- **02 — Consumer Rights** — provides practical next steps for the supported defective-product dispute flow.
- **03 — Scheme Eligibility** — evaluates structured eligibility rules and clearly separates machine-readable results from requirements that still need verification.
- **04 — Certificate Assistant** — guides users through the supported certificate application flow.

## Trust model

Nyaya-AI does not treat generated text as the source of law. Scheme eligibility is evaluated from structured rules stored in Supabase, and the scheme result exposes the authoritative source link when available. The explanation layer only restates the evaluated outcome in plain language and does not alter the deterministic assessment.

## Tech stack

- Next.js 16 / App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase

## Local development

Create `.env.local` with the Supabase values used by the project:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Then:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm run start
```

## Scope

This is an MVP prototype. Coverage is intentionally limited to the flows and structured rules currently represented in the application. Always verify current requirements, documents, deadlines, and procedures with the relevant official authority.
