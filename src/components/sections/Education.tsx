import { GraduationCap } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Education() {
  const edu = site.education;
  return (
    <section id="education" className="py-14 sm:py-16">
      <Container>
        <SectionHeading size="minor" eyebrow="06 · Education" title="Where I studied" />
        <ScrollReveal>
          <div className="card p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-hover)] text-accent">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{edu.school}</h3>
                  <p className="mt-1 text-sm text-muted">{edu.degree}</p>
                  <p className="text-sm text-faint">{edu.stream}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-muted">{edu.period}</p>
                <p className="mt-1 font-mono text-sm text-accent">{edu.gpa}</p>
                {edu.honours.map((h) => (
                  <p key={h} className="mt-1 text-xs text-faint">
                    {h}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {edu.coursework.map((group) => (
                <div key={group.label}>
                  <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.courses.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
