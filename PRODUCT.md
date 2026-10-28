# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers at large tech companies screening new-grad software engineering candidates, usually on a laptop during the workday, with the resume open in another tab and well under a minute per candidate. Secondary: engineers who interview her and open a case study to decide what to probe.

## Product Purpose

Personal portfolio for Stuti Pandya (BASc Computer Engineering, uOttawa, graduating December 2026). It exists to turn a 30-second scan into an interview for new-grad roles starting January 2027. Success: the visitor knows who she is, what she builds, sees proof, and can reach the resume or her email immediately.

## Positioning

Backend / infrastructure engineer with full-stack range. The proof a neighbouring candidate can't copy: an event-driven Kafka ledger that holds exactly-once effects through crashes (with an in-browser simulation tied to a named test), a RAG agent whose eval harness decided what shipped, and production work at TrendAI (AWS cost recovery, CVE remediation, Go/DuckDB APIs, Helm on EKS).

## Operating Context

Read on desktop first, often beside the PDF resume, and sometimes on a phone from a LinkedIn or email link. Deployed on Vercel at stutipnd.net from `main`.

## Capabilities and Constraints

- Next.js 14 App Router, Tailwind, framer-motion, next-themes; all copy lives in `src/content/site.config.ts`.
- Case studies at `/projects/[slug]`; client-side LedgerSim demo; contact API route with a mailto fallback; ⌘K command palette.
- Resume PDF at `public/resume.pdf`; the build fails without it.
- The resume is canon: no number or claim on the site may exceed or contradict it.

## Evidence on Hand

- Resume: `Stuti_Pandya_Resume.pdf`.
- Four case studies with decisions, trade-offs, evidence and retrospectives; public repos for the ledger, Tinted, traced-research-agent, Bridge.
- Photos in `public/photos/` (headshot, travel, IEEE WIE events).
- No testimonials, certifications, or blog posts exist; never fabricate them.

## Product Principles

1. Proof before personality: show the work doing its job before anything about her.
2. Every number traces to the resume or the code.
3. Honest about limits; the retrospectives' candour is a feature.
4. One target: backend/infra with full-stack range, not four roles.
5. The resume and email are never more than one click away.

## Accessibility & Inclusion

WCAG AA contrast in both themes, full keyboard access, reduced-motion respected.
