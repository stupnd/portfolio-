import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Github } from "@/components/icons";
import { LedgerSim } from "@/components/interactive/LedgerSim";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = site.projects.find((p) => p.slug === params.slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    author: { "@type": "Person", name: site.name, url: site.siteUrl },
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
  };

  return (
    <article className="pb-24 pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <Link
          href="/#projects"
          className="inline-flex min-h-9 items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} aria-hidden /> All projects
        </Link>

        <header className="mt-6 border-b border-ink pb-10">
          <h1 className="display max-w-4xl text-display-xl font-extrabold">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">{project.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {project.repoUrl && (
              <Button href={project.repoUrl} external>
                <Github size={16} aria-hidden /> View source
              </Button>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="secondary" external>
                Live demo
              </Button>
            )}
            <p className="data text-[11px] leading-relaxed text-ink-3">
              {project.year} · {project.stack.join(" / ")}
            </p>
          </div>
        </header>

        <Part title="The problem">
          <p className="max-w-[68ch] text-lg leading-relaxed">{cs.problem}</p>
        </Part>
      </Container>

      {project.demo === "ledger-sim" && (
        <div className="band-ink py-12 sm:py-16">
          <Container>
            <div className="lg:ml-[17rem] lg:max-w-3xl">
              <LedgerSim />
            </div>
          </Container>
        </div>
      )}

      <Container>
        <Part
          title="Decisions, and what they cost"
          lede="The trade-offs I made, the alternatives I rejected, and why."
        >
          <ol className="border-t border-ink">
            {cs.decisions.map((d, i) => (
              <li key={i} className="border-b border-rule py-6">
                <h3 className="text-lg font-semibold leading-snug">{d.decision}</h3>
                <p className="data mt-1.5 text-[11px] text-ink-3">instead of {d.alternative}</p>
                <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-ink-2">{d.tradeoff}</p>
              </li>
            ))}
          </ol>
        </Part>

        <Part title="Evidence it works">
          <ul className="space-y-4">
            {cs.evidence.map((item, i) => (
              <li key={i} className="grid max-w-[72ch] grid-cols-[1.75rem,1fr]">
                <span
                  aria-hidden
                  className="mt-1 flex h-4 w-4 items-center justify-center rounded-sm bg-ack text-paper"
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <p className="text-[15px] leading-relaxed sm:text-base">{item}</p>
              </li>
            ))}
          </ul>
        </Part>

        <Part title="What I'd do differently">
          <p className="max-w-[68ch] rounded bg-raised p-6 text-[15px] leading-relaxed sm:text-base">
            {cs.retrospective}
          </p>
        </Part>

        {cs.sections?.map((section) => (
          <Part key={section.heading} title={section.heading}>
            {section.body.map((para, i) => (
              <p key={i} className="mb-4 max-w-[68ch] text-[15px] leading-relaxed text-ink-2 sm:text-base">
                {para}
              </p>
            ))}
          </Part>
        ))}

        <NextProject currentSlug={project.slug} />
      </Container>
    </article>
  );
}

function Part({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-x-12 gap-y-5 border-b border-rule py-12 lg:grid-cols-[14rem,1fr]">
      <div>
        <h2 className="display text-xl font-bold leading-tight sm:text-2xl">{title}</h2>
        {lede && <p className="mt-2 text-sm leading-relaxed text-ink-2">{lede}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const featured = site.projects.filter((p) => p.caseStudy);
  const idx = featured.findIndex((p) => p.slug === currentSlug);
  const next = featured[(idx + 1) % featured.length];
  if (!next || next.slug === currentSlug) return null;
  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group mt-12 flex items-end justify-between gap-6 border-t border-ink pt-6"
    >
      <div>
        <p className="text-sm text-ink-2">Next case study</p>
        <p className="display mt-1 text-display-md font-bold transition-colors group-hover:text-accent">
          {next.title}
        </p>
      </div>
      <ArrowRight
        size={28}
        aria-hidden
        className="shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
      />
    </Link>
  );
}
