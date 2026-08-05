import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TierChip } from "@/components/ui/TierChip";

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="02 · Skills"
          title="What I work with"
          description="No percentage bars. Each skill carries its honest depth — Built means I designed and implemented it, Used means I worked in it regularly — and where that depth came from."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 0.05}>
              <div className="card h-full p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  {cat.label}
                </h3>
                <ul className="space-y-3">
                  {cat.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <TierChip tier={skill.tier} />
                      </div>
                      {skill.evidence && (
                        <p className="mt-0.5 text-xs leading-relaxed text-faint">
                          {skill.evidence}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
