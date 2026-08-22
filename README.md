# Nyaya-AI

**Understand. Navigate. Act.**

Nyaya-AI is a civic-information MVP designed to help people understand common public-service and rights-related situations without having to decode complicated procedures on their own.

It turns a supported problem into **structured questions, clear outcomes, practical next steps, and authoritative-source guidance**.

> **Disclaimer:** Nyaya-AI provides information assistance, not legal representation. Always verify the current procedure, eligibility requirements, documents, deadlines, and applicable rules with the relevant official authority.

## Live Demo

**https://nyaya-ai-lemon.vercel.app/**

## What Nyaya-AI does

### 01 — RTI Copilot

Helps users structure a public-information request into a clearer RTI application flow, focusing on what information is being requested and how the request should be presented.

### 02 — Consumer Rights

Provides practical guidance for the current MVP scenario: a **defective product where the seller refuses a refund or replacement**. The flow identifies the recommended remedy, supporting legal basis, relevant authority, and practical escalation steps.

### 03 — Scheme Eligibility

Evaluates structured eligibility rules against information supplied by the user. Results are deliberately separated into:

- Conditions that passed
- Conditions that did not pass
- Requirements that still need verification
- The authoritative source for the scheme, when available

The **Understand this result** feature produces a deterministic plain-language explanation from the same evaluated rules. It does not change the eligibility decision or invent additional requirements.

### 04 — Certificate Assistant

Guides users through the supported certificate-application flow and presents the relevant information in a practical, step-by-step format.

## Why the MVP is structured this way

Nyaya-AI is intentionally **not a generic legal chatbot**.

The core product principle is:

> **Evaluate what can be evaluated deterministically, clearly flag what cannot, and point the user toward the authoritative source.**

This reduces the risk of presenting generated text as law and makes the reasoning behind a result easier for a user to understand.

## Trust & safety model

- Eligibility decisions come from **structured rules**, not free-form generation.
- Verification-required conditions are explicitly surfaced instead of being silently assumed.
- Scheme results can expose the corresponding official source URL.
- The explanation layer only restates information already present in the evaluated result.
- Consumer-rights guidance is limited to the scenarios represented by the MVP.
- The application repeatedly reminds users to verify current procedures with the relevant authority.

## Technology

- **Next.js 16** — App Router and server-rendered application
- **React 19** — UI
- **TypeScript** — application and domain logic
- **Tailwind CSS 4** — styling
- **Supabase** — scheme catalogue and structured eligibility data
- **Vercel** — production deployment
- **GitHub Actions** — production build verification

## Project structure

```text
app/
├── api/
│   └── scheme-explain/       # Deterministic result explanation endpoint
├── schemes/
│   └── [id]/                 # Scheme details + eligibility assessment
├── consumer/                 # Consumer-rights flow
├── rti/                      # RTI flow
└── certificate/              # Certificate flow

lib/
├── eligibility/              # Eligibility types and rule evaluation
└── supabase/                 # Supabase client helpers
```

## Local development

### 1. Clone the repository

```bash
git clone https://github.com/CrimsonCode-X/Nyaya-AI.git
cd Nyaya-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

Create `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

The Supabase publishable key is safe for the browser when used with the project's configured Supabase policies. **Never commit private keys or service-role credentials.**

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production verification

Run the same checks used before deployment:

```bash
npm run build
```

For a local production server:

```bash
npm run start
```

GitHub Actions also runs the production build on pushes and pull requests targeting `main`.

## Environment variables

Only the following public Supabase variables are required by the current MVP:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase browser/server client authentication |

The current MVP does **not** require an OpenAI API key or paid AI credits.

## Current scope & limitations

This is a focused MVP prototype rather than a complete legal or government-services platform. Its coverage is limited to the scenarios and structured rules currently represented in the application.

Information can become outdated when government schemes, procedures, forms, fees, deadlines, or rules change. Users should always verify the latest information with the relevant official authority before taking action.

## Team / Project

**Nyaya-AI — CrimsonCode-X**

Built as a civic-technology MVP focused on making public-service information easier to understand and act on.
