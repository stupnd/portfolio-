# stutipnd.net

Personal portfolio for Stuti Pandya. Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Editing content

**Every word on the site lives in one file: [`src/content/site.config.ts`](src/content/site.config.ts).**
Headline, bio, stats, skills, experience, projects, case studies, education, socials. Edit that file and every page updates. Types are in `src/content/types.ts`.

Content rule carried over from the resume master file: nothing goes in the config that isn't defensible in an interview. Skill badges are honest depth tiers (Built / Used / Touched), not percentage bars, and every stat has a source line.

Sections that are currently empty (`testimonials`, `certifications`, `blogPosts`) are hidden automatically. Add an entry to the array and the section appears.

## Before going live: checklist

- [ ] **Resume**: drop the finalized PDF at `public/resume.pdf` (the download buttons 404 until you do)
- [ ] **Headshot**: current photo is `public/photos/headshot.jpg`, so swap the file to change it
- [ ] **Ledger case study assets**: the README of the ledger repo is the deliverable per the master file. Once its architecture diagram or dashboard GIF exist, consider linking or embedding them in the case study (`sections` field supports extra content per project)
- [ ] **Domain**: point `stutipnd.net` at the Vercel deployment (Vercel → Project → Settings → Domains). The old `ports` project should be retired so only one portfolio is live
- [ ] **Contact form (optional)**: set `RESEND_API_KEY` in Vercel env vars to enable direct email sending. Without it the form gracefully falls back to opening the visitor's mail client

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Deploying to Vercel

1. Push this repo to GitHub (`stupnd/portfolio-`).
2. [vercel.com/new](https://vercel.com/new) → import the repo → deploy (defaults are correct; no env vars required).
3. Add the `stutipnd.net` domain in project settings and update your DNS with the records Vercel shows.
4. Optional: add `RESEND_API_KEY` for the contact form.

## Features

- Dark mode by default with persistent light/dark toggle (`next-themes`)
- Cmd+K command palette (cmdk) for navigation, socials, resume, and theme
- Scroll progress bar, scroll-reveal animations, animated stat counters
- Custom cursor glow (desktop only, disabled for `prefers-reduced-motion`)
- Case-study pages with the four-beat structure: problem, decisions and alternatives, evidence, retrospective
- SEO: per-route metadata, Open Graph image generated at the edge, `sitemap.xml`, `robots.txt`, JSON-LD (`Person`, `CreativeWork`)
- Accessibility: skip link, semantic landmarks, focus-visible rings, reduced-motion guards throughout
- Fully static pages (except the contact API route), so it is fast by construction
