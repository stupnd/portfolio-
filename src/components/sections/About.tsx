import Image from "next/image";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section id="about" className="py-14 sm:py-16">
      <Container>
        <SectionHeading size="minor" eyebrow="01 · About" title="Who I am" />
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

        {/* Personal photo strip */}
        {site.aboutPhotos.length > 0 && (
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {site.aboutPhotos.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 0.06}>
                <figure
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] transition-transform duration-300 hover:-translate-y-1 ${
                    i % 2 === 0 ? "sm:rotate-[-1.2deg]" : "sm:rotate-[1.2deg]"
                  } hover:rotate-0`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 font-mono text-[11px] lowercase tracking-wide text-white/90">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
