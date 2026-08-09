import Image from "next/image";
import { Award } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Leadership() {
  return (
    <section id="leadership" className="py-14 sm:py-16">
      <Container>
        <SectionHeading size="minor" eyebrow="05 · Beyond the code" title="Leadership & achievements" />

        <div className="grid gap-6 lg:grid-cols-2">
          {site.leadership.map((entry, i) => (
            <ScrollReveal key={entry.org} delay={i * 0.06}>
              <div className="card h-full overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
                {entry.images && entry.images.length > 0 && (
                  <div className="flex h-52 gap-1">
                    {entry.images.slice(0, 3).map((img, j) => (
                      <div
                        key={img}
                        className={`relative h-full ${j === 0 ? "flex-[2]" : "flex-1"}`}
                      >
                        <Image
                          src={img}
                          alt={`${entry.org}, photo ${j + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{entry.org}</h3>
                    <p className="font-mono text-xs text-faint">{entry.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-accent">{entry.role}</p>
                  <ul className="mt-4 space-y-2.5">
                    {entry.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {site.achievements.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.05}>
              <div className="card flex h-full gap-3.5 p-5">
                <Award size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h4 className="text-sm font-semibold leading-snug">{a.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{a.detail}</p>
                  <p className="mt-2 font-mono text-[10px] text-faint">{a.year}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
