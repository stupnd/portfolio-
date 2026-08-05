import { ScrollReveal } from "./ScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <ScrollReveal className="mb-12 sm:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-display-lg font-semibold">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
