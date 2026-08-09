import { ScrollReveal } from "./ScrollReveal";

/**
 * Two deliberate weights.
 *
 * "major" is for the sections a hiring manager came for (experience, projects).
 * "minor" is for supporting reference material. Giving every section the same
 * 56px title made the page read as one undifferentiated wall.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  size = "major",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  size?: "major" | "minor";
}) {
  const major = size === "major";
  return (
    <ScrollReveal className={major ? "mb-12 sm:mb-14" : "mb-7"}>
      <p
        className={`mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] ${
          major ? "text-accent" : "text-faint"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={major ? "text-display-lg font-semibold" : "text-display-md font-semibold"}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl leading-relaxed text-muted ${
            major ? "text-base sm:text-lg" : "text-sm"
          }`}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
