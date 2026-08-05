import { BadgeCheck, ExternalLink } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/** Renders nothing until site.certifications has entries. */
export function Certifications() {
  if (site.certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Certifications" title="Credentials" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.05}>
              <div className="card flex h-full gap-3.5 p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h4 className="text-sm font-semibold leading-snug">{cert.title}</h4>
                  <p className="mt-1 text-xs text-muted">
                    {cert.provider} · {cert.date}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:text-accent-soft"
                    >
                      Verify credential <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
