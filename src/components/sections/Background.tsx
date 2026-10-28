import Image from "next/image";
import { site } from "@/content/site.config";
import { Section } from "@/components/ui/Section";

/** Education, leadership and recognition: supporting record, one ruled section. */
export function Background() {
  const edu = site.education;

  return (
    <Section id="background" title="School & community">
      <div className="grid gap-x-8 gap-y-3 pb-8 sm:grid-cols-[11rem,1fr]">
        <div>
          <p className="data text-xs text-ink-2">{edu.period.replace("Graduating ", "Grad ")}</p>
          <p className="data mt-1 text-[11px] text-ink-3">{edu.gpa}</p>
        </div>
        <div>
          <h3 className="display text-2xl font-bold leading-tight">{edu.school}</h3>
          <p className="mt-1 text-[15px] text-ink-2">{edu.degree}</p>
          <p className="text-[15px] text-ink-2">{edu.stream}</p>
          <dl className="mt-5 grid max-w-3xl gap-y-2 text-[15px] sm:grid-cols-[7rem,1fr]">
            {edu.coursework.map((group) => (
              <div key={group.label} className="contents">
                <dt className="data pt-0.5 text-[11px] uppercase tracking-wide text-ink-3">{group.label}</dt>
                <dd className="leading-relaxed">{group.courses.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {site.leadership.map((entry) => (
        <div key={entry.org} className="grid gap-x-8 gap-y-3 border-t border-rule py-8 sm:grid-cols-[11rem,1fr]">
          <p className="data text-xs text-ink-2">{entry.period}</p>
          <div className="min-w-0">
            <h3 className="display text-2xl font-bold leading-tight">{entry.org}</h3>
            <p className="mt-1 text-[15px] text-ink-2">{entry.role}</p>
            <ul className="mt-5 max-w-3xl space-y-2.5">
              {entry.bullets.map((b, i) => (
                <li key={i} className="grid grid-cols-[1rem,1fr] text-[15px] leading-relaxed">
                  <span aria-hidden className="text-ink-3">–</span>
                  {b}
                </li>
              ))}
            </ul>
            {entry.images && entry.images.length > 0 && (
              <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {entry.images.slice(0, 3).map((img, j) => (
                  <li key={img} className="relative aspect-[4/3] overflow-hidden rounded">
                    <Image
                      src={img}
                      alt={`${entry.org} event, photo ${j + 1}`}
                      fill
                      sizes="(max-width: 1024px) 33vw, 260px"
                      className="object-cover object-top"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      <div className="grid gap-x-8 gap-y-3 border-t border-rule pt-8 sm:grid-cols-[11rem,1fr]">
        <p className="data text-xs text-ink-2">Recognition</p>
        <ul className="max-w-3xl">
          {site.achievements.map((a) => (
            <li key={a.title} className="grid gap-x-6 border-b border-rule py-3 first:pt-0 sm:grid-cols-[1fr,auto]">
              <div>
                <p className="font-semibold leading-snug">{a.title}</p>
                <p className="mt-0.5 text-sm text-ink-2">{a.detail}</p>
              </div>
              <p className="data mt-1 text-[11px] text-ink-3">{a.year}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
