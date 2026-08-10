import Link from "next/link";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { Github } from "@/components/icons";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectMotif } from "@/components/ui/ProjectMotif";

/** Per-project accent hues for the card headers (keeps cards distinct without images). */
const hues: Record<string, string> = {
  "transaction-ledger": "from-accent/25 to-accent-cyan/10",
  "traced-research-agent": "from-accent-violet/25 to-accent/10",
  tinted: "from-rose-400/20 to-accent-violet/10",
  bridge: "from-accent-cyan/20 to-emerald-400/10",
};

export function Projects() {
  const featured = site.projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="04 · Projects"
          title="Selected work"
          description="Four projects, four full case studies: the problem, the trade-offs, the proof."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Visual header: gradient panel carrying the project's system motif */}
                <div
                  className={`relative flex h-44 items-end overflow-hidden bg-gradient-to-br p-6 sm:h-52 ${
                    hues[project.slug] ?? "from-accent/20 to-accent-cyan/10"
                  }`}
                >
                  <ProjectMotif slug={project.slug} />
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 font-mono text-xs text-faint"
                  >
                    {project.year}
                  </span>
                  {project.demo && (
                    <span className="absolute left-6 top-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                      <MousePointerClick size={10} /> Interactive demo
                    </span>
                  )}
                  <h3 className="relative text-display-md font-semibold">{project.title}</h3>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-faint"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-soft">
                      Read the case study
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                    {project.repoUrl && (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-faint">
                        <Github size={13} /> Source
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Smaller mentions: one line each, deliberately not expanded */}
        {site.miniProjects.length > 0 && (
          <ScrollReveal delay={0.1} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {site.miniProjects.map((mini) => (
                <div key={mini.title} className="card p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold">{mini.title}</h4>
                    {mini.repoUrl && (
                      <a
                        href={mini.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mini.title} on GitHub`}
                        className="text-faint transition-colors hover:text-[var(--fg)]"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{mini.description}</p>
                  <p className="mt-3 font-mono text-[10px] text-faint">{mini.stack.join(" · ")}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
