import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TierChip } from "@/components/ui/TierChip";

/**
 * Reference material, so it reads as a dense table rather than six more cards.
 * Evidence stays (it's the honest part) but sits inline instead of taking its
 * own paragraph under every skill.
 */
export function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          size="minor"
          eyebrow="05 · Skills"
          title="What I work with"
          description="Honest depth, not percentage bars. Built means I designed and shipped it; Used means I work in it regularly."
        />
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 0.04}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                {cat.label}
              </h3>
              <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium leading-none">{skill.name}</span>
                      <TierChip tier={skill.tier} />
                    </div>
                    {skill.evidence && (
                      <p className="mt-1 text-[11px] leading-snug text-faint">{skill.evidence}</p>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
