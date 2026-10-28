import Image from "next/image";
import { site } from "@/content/site.config";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[1fr,15rem]">
        <div className="max-w-2xl space-y-5">
          {site.about.map((para, i) => (
            <p key={i} className={i === 0 ? "text-xl leading-relaxed" : "text-[17px] leading-relaxed text-ink-2"}>
              {para}
            </p>
          ))}
        </div>
        <figure className="order-first md:order-none">
          <div className="relative aspect-[4/5] w-40 overflow-hidden rounded md:w-full">
            <Image
              src="/photos/headshot.jpg"
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(max-width: 768px) 160px, 240px"
              className="object-cover"
            />
          </div>
        </figure>
      </div>

      {site.aboutPhotos.length > 0 && (
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {site.aboutPhotos.map((photo) => (
            <li key={photo.src}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                {photo.caption && (
                  <figcaption className="data mt-2 text-[11px] text-ink-3">{photo.caption}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
