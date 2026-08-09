import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/icons";
import { LedgerSim } from "@/components/interactive/LedgerSim";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <article className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div aria-hidden className="glow-field absolute inset-x-0 top-0 h-[32rem]" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="relative max-w-3xl">
        <ScrollReveal>
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[var(--fg)]"
          >
            <ArrowLeft size={14} /> All projects
          </Link>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Case study · {project.year}
          </p>
          <h1 className="mt-3 text-display-lg font-semibold">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="secondary" external>
                <Github size={15} /> View source
              </Button>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} external>
                Live demo
              </Button>
            )}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-faint"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Beat 1: the problem */}
        <ScrollReveal className="mt-16">
          <Beat number="01" title="The problem" />
          <p className="text-base leading-relaxed text-muted sm:text-lg">{cs.problem}</p>
        </ScrollReveal>

        {/* Interactive demo, when the project has one */}
        {project.demo === "ledger-sim" && (
          <ScrollReveal className="mt-10">
            <LedgerSim />
          </ScrollReveal>
        )}

        {/* Beat 2: decisions and their alternatives */}
        <ScrollReveal className="mt-16">
          <Beat number="02" title="Decisions, and what they cost" />
          <p className="mb-6 text-sm text-faint">
            Every architecture is a set of trade-offs. These are the ones I made, the
            alternatives I rejected, and why.
          </p>
        </ScrollReveal>
        <div className="space-y-5">
          {cs.decisions.map((d, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="card p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold">{d.decision}</h3>
                  <span className="font-mono text-xs text-faint">vs. {d.alternative}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.tradeoff}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Beat 3: evidence */}
        <ScrollReveal className="mt-16">
          <Beat number="03" title="Evidence it works" />
        </ScrollReveal>
        <ul className="space-y-3.5">
          {cs.evidence.map((item, i) => (
            <ScrollReveal as="li" key={i} delay={i * 0.04} className="flex gap-3">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              <p className="text-sm leading-relaxed text-muted sm:text-base">{item}</p>
            </ScrollReveal>
          ))}
        </ul>

        {/* Beat 4: retrospective */}
        <ScrollReveal className="mt-16">
          <Beat number="04" title="What I'd do differently" />
          <div className="card border-accent/20 p-6">
            <p className="text-sm leading-relaxed text-muted sm:text-base">{cs.retrospective}</p>
          </div>
        </ScrollReveal>

        {cs.sections?.map((section) => (
          <ScrollReveal key={section.heading} className="mt-16">
            <h2 className="mb-4 text-display-md font-semibold">{section.heading}</h2>
            {section.body.map((para, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed text-muted sm:text-base">
                {para}
              </p>
            ))}
          </ScrollReveal>
        ))}

        {/* Next project */}
        <ScrollReveal className="mt-20">
          <NextProject currentSlug={project.slug} />
        </ScrollReveal>
      </Container>
    </article>
  );
}

function Beat({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-mono text-xs text-accent">{number}</span>
      <h2 className="text-display-md font-semibold">{title}</h2>
    </div>
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
      className="card group flex items-center justify-between p-6 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Next case study</p>
        <p className="mt-1.5 text-lg font-semibold transition-colors group-hover:text-accent">
          {next.title}
        </p>
      </div>
      <ArrowLeft size={18} className="rotate-180 text-muted transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
