import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/** Real numbers only. Every stat's source line comes from the content config. */
export function Stats() {
  return (
    <section className="border-y border-[var(--border)] py-12 sm:py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {site.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.05}>
              <div>
                <dd className="font-mono text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-3xl">
                  <AnimatedCounter value={stat.value} />
                </dd>
                <dt className="mt-2 text-sm font-medium text-muted">{stat.label}</dt>
                <p className="mt-1 text-xs leading-relaxed text-faint">{stat.source}</p>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
