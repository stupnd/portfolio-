import { ArrowRight } from "lucide-react";
import { Github } from "@/components/icons";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LedgerSim } from "@/components/interactive/LedgerSim";

/**
 * The flagship gets the page's one inverted band, with the simulation inline:
 * a reviewer can break the ledger before deciding to read about it.
 */
export function Flagship() {
  const project = site.projects.find((p) => p.demo === "ledger-sim");
  if (!project || !project.caseStudy) return null;
  const decisions = project.caseStudy.decisions.slice(0, 4);

  return (
    <section id="work" className="band-ink py-16 sm:py-24">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="data text-[11px] text-ink-3">
              Flagship · {project.year} · {project.stack.slice(0, 4).join(" / ")}
            </p>
            <h2 className="display mt-3 text-display-lg font-extrabold">{project.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">{project.tagline}</p>

            <h3 className="mt-10 text-sm font-semibold">Decisions that carry it</h3>
            <ul className="mt-3 border-t border-rule">
              {decisions.map((d) => (
                <li key={d.decision} className="border-b border-rule py-3">
                  <p className="text-sm font-medium leading-snug">{d.decision}</p>
                  <p className="data mt-1 text-[11px] text-ink-3">instead of {d.alternative}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`/projects/${project.slug}`}>
                Read the case study <ArrowRight size={16} aria-hidden />
              </Button>
              {project.repoUrl && (
                <Button href={project.repoUrl} variant="secondary" external>
                  <Github size={16} aria-hidden /> Source
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <LedgerSim />
          </div>
        </div>
      </Container>
    </section>
  );
}
