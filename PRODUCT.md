# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers at large tech companies screening new-grad software engineering candidates, usually on a laptop during the workday, with the resume open in another tab and well under a minute per candidate. Secondary: engineers who interview her and open a case study to decide what to probe.

## Product Purpose

Personal portfolio for Stuti Pandya (BASc Computer Engineering, uOttawa, graduating December 2026). It exists to turn a 30-second scan into an interview for new-grad roles starting January 2027. Success: the visitor knows who she is, what she builds, sees proof, and can reach the resume or her email immediately.

## Positioning

"I build AI that holds up." An applied AI and backend engineer: the AI is measured, and the systems under it survive failure. The proof a neighbouring candidate can't copy: an eval harness that decided what shipped in a RAG agent (0.641 to 0.831 over nine recorded runs, two of Stuti's own ideas rejected), an honest real-photo evaluation of a vision pipeline (15% within one Monk level on 1,356 MST-E photos, against 84 to 86% in simulation), a Kafka ledger that holds exactly-once effects through crashes, and production work at TrendAI (AWS cost recovery, CVE remediation, Go/DuckDB APIs, Helm on EKS).

## Operating Context

Read on desktop first, often beside the PDF resume, and sometimes on a phone from a LinkedIn or email link. Deployed on Vercel at stutipnd.net from `main`.

## Capabilities and Constraints

- Next.js 14 App Router, Tailwind, next-themes, cmdk; no animation library.
- Copy lives in `src/content/`: `site.config.ts` (issue frame, experience, projects, case studies), `features.ts` (the five features and their chart data), `byline.ts` (the photo spread).
- Case studies at `/projects/[slug]`; the client-side LedgerSim is Fig. 1 of the ledger feature; ⌘K palette is a real dialog. No contact form: the back page is a mailto.
- Resume PDF at `public/resume.pdf`; the build fails without it.
- The resume and the project repos are canon: no number may exceed or contradict them. Chart data is copied from the repos' committed eval output, with the source named in the caption.
- iPhone originals in `public/photos/` carry GPS data and stay untracked; only stripped web copies are committed.

## Evidence on Hand

- Resume: `Stuti_Pandya_Resume.pdf`.
- Four case studies with decisions, trade-offs, evidence and retrospectives; public repos for the ledger, Tinted, traced-research-agent, Bridge.
- Photos in `public/photos/` (headshot, travel, IEEE WIE events).
- No testimonials, certifications, or blog posts exist; never fabricate them.

## Product Principles

1. Proof before personality: every feature leads with the work doing its job, and the personal spread comes after the features.
2. Every number traces to the resume or the code, and figures cite their source.
3. Honest about limits: rejected ideas, stubs and the 15% real-photo result are features, not footnotes.
4. One target: applied AI and backend, new grad, starting 2027.
5. The resume and email are never more than one click away (Resume sits in the sticky masthead; the back page is the email).

## Design Principles

1. The site is a magazine issue, not a template: masthead, cover, contents with folios, features, departments, back page.
2. Day edition on warm paper (#F5F0E6), night edition on warm black (#15130F) with cream ink, never inverted; defaults to the system setting.
3. One spot colour, oxblood, for folios, kickers, drop caps, key numbers and links. Nothing else is coloured except live states inside figures.
4. Three faces with fixed jobs: Instrument Serif for headlines, Source Serif 4 (with its real italic) for reading text, JetBrains Mono only for data, folios and figure labels. Self-hosted, Latin subset, under 100 KB together.
5. Every feature has kicker, headline, dek, drop cap, a pull quote carrying the key number, and exactly one figure with a cited caption.
6. Motion is print-like (rules draw, type sets, figures rise) and off under reduced motion.
7. No em dashes in site copy.

## Accessibility & Inclusion

WCAG AA contrast in both themes, full keyboard access, reduced-motion respected.
