import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/icons";
import { site } from "@/content/site.config";
import { Section } from "@/components/ui/Section";

/**
 * An index, not a card grid: each project is one ruled row a reviewer can scan
 * in a line, and the whole row opens the case study.
 */
export function Projects() {
  const rest = site.projects.filter((p) => p.featured && p.demo !== "ledger-sim");

  return (
    <Section
      id="projects"
      title="More projects"
      lede="Each one has a full case study: the problem, the trade-offs, the evidence, and what I'd change."
    >
      <ol>
        {rest.map((project) => (
          <li key={project.slug} className="border-b border-rule [&:first-child>a]:pt-0">
            <Link
              href={`/projects/${project.slug}`}
              className="group grid gap-x-8 gap-y-2 py-6 transition-colors duration-150 hover:bg-ink/[0.03] sm:grid-cols-[5rem,1fr,auto] sm:px-2"
            >
              <span className="data pt-1.5 text-xs text-ink-3">{project.year}</span>
              <div className="min-w-0">
                <h3 className="display text-2xl font-bold leading-tight group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">{project.tagline}</p>
                <p className="data mt-3 text-[11px] leading-relaxed text-ink-3">
                  {project.stack.join(" / ")}
                </p>
              </div>
              <span className="flex items-center gap-1.5 self-start pt-1.5 text-sm font-semibold text-accent">
                Case study
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {site.miniProjects.length > 0 && (
        <div className="mt-12">
          <h3 className="text-sm font-semibold">Also built</h3>
          <ul className="mt-3 grid border-t border-rule sm:grid-cols-3 sm:gap-x-8">
            {site.miniProjects.map((mini) => (
              <li key={mini.title} className="border-b border-rule py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold">{mini.title}</p>
                  {mini.repoUrl && (
                    <a
                      href={mini.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${mini.title} on GitHub`}
                      className="-m-2 p-2 text-ink-3 transition-colors hover:text-ink"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{mini.description}</p>
                <p className="data mt-2 text-[11px] text-ink-3">{mini.stack.join(" / ")}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
