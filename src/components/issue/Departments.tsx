import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site.config";
import wieStage from "../../../public/photos/wie-team-stage.jpg";

/**
 * The back of the book: short takes, contributors' notes, off the page and
 * the letters page. Departments are set quieter than features: smaller
 * headlines, tighter measure, the same rules and folios.
 */

function DeptHeader({ id, title, page, lede }: { id: string; title: string; page?: string; lede?: string }) {
  return (
    <header className="border-t-2 border-rule-strong pt-4">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
        <p className="caps text-[12px] text-ink-2">Department</p>
        {page && (
          <p className="data text-[12px] text-ink-3">
            <span className="sr-only">page </span>p. {page}
          </p>
        )}
      </div>
      <div className="mt-8 grid gap-x-10 gap-y-4 lg:grid-cols-12 lg:items-end">
        <h2 id={`${id}-title`} className="font-display text-headline text-ink lg:col-span-7">
          {title}
        </h2>
        {lede && <p className="max-w-[34em] text-[17px] leading-relaxed text-ink-2 lg:col-span-5 lg:pb-2">{lede}</p>}
      </div>
    </header>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const quietLink =
  "inline-flex min-h-11 items-center gap-1 text-ink-2 underline decoration-rule-strong/30 underline-offset-[5px] hover:text-ink hover:decoration-rule-strong";

/* ── Short takes: the smaller builds ─────────────────────────────── */

export function ShortTakes() {
  return (
    <section aria-labelledby="short-takes-title" className="mx-auto max-w-issue px-4 py-12 sm:px-8 lg:py-16">
      <div className="border-t border-rule-strong pt-4">
        <h2 id="short-takes-title" className="caps text-[12px] text-ink-2">
          Short takes
        </h2>
        <ul className="mt-6 grid gap-y-8 md:grid-cols-3 md:gap-x-0">
          {site.miniProjects.map((m) => (
            <li key={m.title} className="md:px-6 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-rule">
              <h3 className="font-display text-[1.75rem] leading-tight text-ink">{m.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{m.description}</p>
              <p className="data mt-3 text-[12px] text-ink-3">{m.stack.join(" · ")}</p>
              {m.repoUrl && (
                <a href={m.repoUrl} {...ext} className={`${quietLink} text-[15px]`}>
                  Source <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Contributors' notes: experience, newest first ───────────────── */

export function ContributorsNotes() {
  const { education } = site;
  return (
    <section id="notes" aria-labelledby="notes-title" className="mx-auto max-w-issue px-4 py-16 sm:px-8 lg:py-24">
      <DeptHeader
        id="notes"
        title="Contributors’ notes"
        page="40"
        lede="Where the editor has worked, newest first. Every number here is on the resume."
      />

      <ol className="mt-10">
        {site.experience.map((e) => (
          <li key={e.company} className="grid gap-x-10 gap-y-3 border-b border-rule py-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="data text-[12px] text-ink-3">{e.period.replace(" – ", " to ")}</p>
              <p className="data text-[12px] text-ink-3">{e.location}</p>
            </div>
            <div className="lg:col-span-9">
              <h3 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.375rem]">{e.company}</h3>
              <p className="mt-1 text-[17px] italic text-ink-2">{e.role}</p>
              <ul className="mt-4 max-w-[40em] space-y-2.5 text-[17px] leading-relaxed text-ink">
                {[...e.highlights, ...(e.details ?? [])].map((h) => (
                  <li key={h} className="grid grid-cols-[1.25rem,1fr]">
                    <span aria-hidden className="text-accent">
                      ·
                    </span>
                    <span>{h.replace(/–/g, " to ").replace("$6 to 9K", "$6–9K")}</span>
                  </li>
                ))}
              </ul>
              <p className="data mt-4 text-[12px] leading-relaxed text-ink-3">{e.stack.join(" · ")}</p>
            </div>
          </li>
        ))}
        <li className="grid gap-x-10 gap-y-3 py-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="data text-[12px] text-ink-3">{education.period}</p>
            <p className="data text-[12px] text-ink-3">Ottawa</p>
          </div>
          <div className="lg:col-span-9">
            <h3 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.375rem]">{education.school}</h3>
            <p className="mt-1 text-[17px] italic text-ink-2">{education.degree}</p>
            <p className="mt-4 max-w-[40em] text-[17px] leading-relaxed text-ink">
              {education.stream}. {education.gpa}, {education.honours.join(", ").replace("×2", "twice")}. Coursework in{" "}
              {education.coursework.flatMap((c) => c.courses).join(", ")}.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
}

/* ── Off the page: community and recognition ─────────────────────── */

export function OffThePage() {
  const wie = site.leadership[0];
  return (
    <section id="off-the-page" aria-labelledby="off-the-page-title" className="mx-auto max-w-issue px-4 py-16 sm:px-8 lg:py-24">
      <DeptHeader id="off-the-page" title="Off the page" page="44" lede="Away from the keyboard: a chapter to run, hackathons to host, and the people in them." />

      <div className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <figure className="-mx-4 sm:mx-0 lg:col-span-6">
          <div className="border-y border-rule-strong py-2 sm:border sm:p-2.5">
            <div className="relative aspect-[3/2] overflow-hidden bg-paper-2">
              <Image
                src={wieStage}
                alt="Six members of the uOttawa IEEE Women in Engineering team standing on stage at a chapter event"
                fill
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 px-4 text-[15px] italic leading-snug text-ink-2 sm:px-0">
            The IEEE Women in Engineering team at uOttawa, on stage.
          </figcaption>
        </figure>

        <div className="lg:col-span-6">
          <p className="data text-[12px] text-ink-3">{wie.period.replace(" – ", " to ")}</p>
          <h3 className="mt-2 font-display text-[2rem] leading-tight text-ink sm:text-[2.375rem]">
            IEEE Women in Engineering, uOttawa
          </h3>
          <p className="mt-1 text-[17px] italic text-ink-2">{wie.role.replace(" · previously", ", previously")}</p>
          <ul className="mt-4 space-y-2.5 text-[17px] leading-relaxed text-ink">
            {wie.bullets.map((b) => (
              <li key={b} className="grid grid-cols-[1.25rem,1fr]">
                <span aria-hidden className="text-accent">
                  ·
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h3 className="caps mt-10 text-[12px] text-ink-2">Also on record</h3>
          <ul className="mt-2">
            {site.achievements.map((a) => (
              <li key={a.title} className="grid grid-cols-[5.5rem,1fr] gap-x-4 border-b border-rule py-3 last:border-b-0">
                <span className="data pt-1 text-[12px] text-ink-3">{a.year.replace("–", " to ")}</span>
                <span>
                  <span className="block text-[17px] leading-snug text-ink">{a.title.replace("×2", "twice")}</span>
                  <span className="block text-[15px] italic leading-snug text-ink-2">{a.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Letters to the editor: the back page ─────────────────────────── */

export function Letters() {
  const { number, season } = site.issue;
  const github = site.socials.find((s) => s.label === "GitHub")?.url;
  const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.url;
  const links = [
    { label: "Resume", href: site.resumeUrl, note: "PDF, opens in your browser" },
    ...(linkedin ? [{ label: "LinkedIn", href: linkedin, note: "Profile" }] : []),
    ...(github ? [{ label: "GitHub", href: github, note: "stupnd" }] : []),
  ];

  return (
    <section id="letters" aria-labelledby="letters-title" className="mx-auto max-w-issue px-4 pb-10 pt-16 sm:px-8 lg:pt-24">
      <DeptHeader
        id="letters"
        title="Letters to the editor"
        page="48"
        lede={`Hiring for a new grad role in applied AI or backend, starting ${site.lookingFor.available}? Write in.`}
      />

      <p className="mt-12">
        <a
          href={`mailto:${site.email}`}
          className="break-all font-display text-[clamp(2rem,6.4vw,6rem)] leading-none text-accent underline decoration-accent/30 decoration-2 underline-offset-[0.12em] transition-colors hover:decoration-accent sm:break-normal"
        >
          {site.email}
        </a>
      </p>

      <ul className="mt-12 grid border-t border-rule-strong sm:grid-cols-3">
        {links.map((l) => (
          <li key={l.label} className="border-b border-rule sm:border-b-0 sm:[&+li]:border-l sm:[&+li]:border-rule">
            <a href={l.href} {...ext} className="group flex min-h-11 items-baseline justify-between gap-4 py-5 sm:px-6 sm:first:pl-0">
              <span>
                <span className="block font-display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-accent">
                  {l.label}
                </span>
                <span className="data block text-[12px] text-ink-3">{l.note}</span>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden className="shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-20">
        <div className="rule-double" />
        <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="data text-[12px] text-ink-3">
            Issue {number} · {season} · Printed in Ottawa
          </p>
          <p className="caps text-[12px] text-ink-2">{site.name}</p>
          <p className="data text-[12px] text-ink-3">© 2026 · ⌘K or Ctrl+K to find anything</p>
        </div>
      </footer>
    </section>
  );
}
