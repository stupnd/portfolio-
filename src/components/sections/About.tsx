import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="01 · About" title="Who I am" />
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-5">
            {site.about.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{para}</p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.1}>
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                At a glance
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li>🎓 {site.education.degree.replace("Bachelor of Applied Science, ", "BASc ")}</li>
                <li>📍 {site.location}</li>
                <li>🗓 {site.education.period}</li>
                <li>💼 Currently @ Trend Micro (container security)</li>
                <li>🏛 Chair, IEEE WIE uOttawa</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
