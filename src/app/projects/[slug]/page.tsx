import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { LedgerSim } from "@/components/interactive/LedgerSim";
import { site } from "@/content/site.config";
import { features } from "@/content/features";

export function generateStaticParams() {
  return site.projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = site.projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline, type: "article" },
  };
}

/**
 * The long read behind a feature: problem, the decisions with what each one
 * cost, the evidence, and the retrospective, set as a single-column article.
 */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = site.projects.find((p) => p.slug === params.slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;
  const feature = features.find((f) => f.caseStudy === project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    author: { "@type": "Person", name: site.name, url: site.siteUrl },
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
  };

  return (
    <article className="mx-auto max-w-issue px-4 pb-10 pt-8 sm:px-8 lg:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href={feature ? `/#${feature.id}` : "/#contents"}
        className="inline-flex min-h-11 items-center gap-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} strokeWidth={1.75} aria-hidden /> Back to the issue
      </Link>

      <header className="mt-4 border-t-2 border-rule-strong pt-4">
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <p className="caps text-[12px] text-accent">Case study{feature ? ` · ${feature.kicker}` : ""}</p>
          {feature && (
            <p className="data text-[12px] text-ink-3">
              Continued from <span className="sr-only">page </span>p. {feature.page}
            </p>
          )}
        </div>
        <h1 className="print-set mt-10 max-w-[16em] text-balance font-display text-headline text-ink">{project.title}</h1>
        <p className="mt-5 max-w-[34em] text-pretty text-[19px] leading-[1.45] text-ink-2 sm:text-[21px]">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="data text-[12px] leading-relaxed text-ink-3">
            By Stuti Pandya · {project.year.replace("–", " to ")} · {project.stack.join(", ")}
          </p>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-[15px] text-accent underline decoration-accent/40 underline-offset-[5px] hover:decoration-accent"
            >
              Source on GitHub <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
          )}
        </div>
      </header>

      <Part title="The problem">
        <p className="dropcap max-w-[36em] text-[18px] leading-[1.65] text-ink sm:text-[19px]">{cs.problem}</p>
      </Part>

      {project.demo === "ledger-sim" && (
        <section aria-labelledby="fig-title" className="mt-14">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule-strong pt-3">
            <p className="data text-[12px] text-accent">Fig. 1, interactive</p>
            <h2 id="fig-title" className="font-display text-[1.5rem] leading-tight text-ink">
              Crash the consumer mid-write
            </h2>
          </div>
          <div className="mt-4">
            <LedgerSim />
          </div>
        </section>
      )}

      <Part title="Decisions, and what they cost" lede="The trade-offs I made, the alternatives I turned down, and why.">
        <ol>
          {cs.decisions.map((d, i) => (
            <li key={i} className="grid grid-cols-[2.75rem,1fr] border-b border-rule py-6 first:pt-0 last:border-b-0">
              <span className="font-display text-[2rem] leading-none text-accent">{i + 1}</span>
              <div className="max-w-[38em]">
                <h3 className="font-display text-[1.625rem] leading-[1.15] text-ink">{d.decision}</h3>
                <p className="mt-1.5 text-[16px] italic text-ink-2">Instead of {d.alternative}</p>
                <p className="mt-3 text-[17px] leading-relaxed text-ink">{d.tradeoff}</p>
              </div>
            </li>
          ))}
        </ol>
      </Part>

      <Part title="Evidence it works">
        <ul className="max-w-[38em] space-y-3.5 text-[17px] leading-relaxed text-ink">
          {cs.evidence.map((item, i) => (
            <li key={i} className="grid grid-cols-[1.25rem,1fr]">
              <span aria-hidden className="text-accent">
                ·
              </span>
              <span>{item.replace(/→/g, "to")}</span>
            </li>
          ))}
        </ul>
      </Part>

      <Part title="What I’d do differently">
        <blockquote className="max-w-[34em] border-y border-rule-strong py-6 font-display text-[1.625rem] leading-[1.25] text-ink sm:text-[1.875rem]">
          <p>{cs.retrospective}</p>
        </blockquote>
      </Part>

      <NextProject currentSlug={project.slug} />
    </article>
  );
}

function Part({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 grid gap-x-10 gap-y-6 border-t border-rule-strong pt-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <h2 className="font-display text-[1.75rem] leading-tight text-ink">{title}</h2>
        {lede && <p className="mt-2 max-w-[22em] text-[16px] italic leading-snug text-ink-2">{lede}</p>}
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const studies = site.projects.filter((p) => p.caseStudy);
  const idx = studies.findIndex((p) => p.slug === currentSlug);
  const next = studies[(idx + 1) % studies.length];
  if (!next || next.slug === currentSlug) return null;
  return (
    <Link href={`/projects/${next.slug}`} className="group mt-20 flex items-end justify-between gap-6 border-t-2 border-rule-strong pt-5">
      <span>
        <span className="caps block text-[12px] text-ink-2">Next case study</span>
        <span className="mt-2 block font-display text-[2.25rem] leading-tight text-ink transition-colors group-hover:text-accent sm:text-[3rem]">
          {next.title}
        </span>
      </span>
      <ArrowRight
        size={28}
        strokeWidth={1.5}
        aria-hidden
        className="mb-2 shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
      />
    </Link>
  );
}
