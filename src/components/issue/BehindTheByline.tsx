import Image from "next/image";
import { bylineHero, bylineLede, bylinePhotos, type BylinePhoto } from "@/content/byline";

/**
 * The personal spread. One large plate and five smaller ones, set on an
 * asymmetric grid with staggered drops, the way a magazine lays out a
 * photo essay. Frames match the cover portrait. Phones get a single
 * full-bleed column.
 */

// Placement on the 12-column desktop grid, per photo
const place: Record<string, { cell: string; aspect: string; sizes: string }> = {
  headshot: {
    cell: "lg:col-start-8 lg:col-span-5 lg:row-start-1",
    aspect: "aspect-[5/4]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 510px",
  },
  canal: {
    cell: "lg:col-start-9 lg:col-span-4 lg:row-start-2 lg:mt-2",
    aspect: "aspect-square",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  kayaks: {
    cell: "lg:col-start-1 lg:col-span-5 lg:row-start-3 lg:mt-4",
    aspect: "aspect-[4/3]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 510px",
  },
  moraine: {
    cell: "lg:col-start-6 lg:col-span-3 lg:row-start-3 lg:mt-28",
    aspect: "aspect-[2/3]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 290px",
  },
  flamingos: {
    cell: "lg:col-start-9 lg:col-span-4 lg:row-start-3 lg:mt-12",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
};

export function BehindTheByline() {
  return (
    <section
      id="behind-the-byline"
      aria-labelledby="byline-title"
      data-folio="46"
      data-folio-title="Behind the byline"
      className="mx-auto max-w-issue px-4 py-16 sm:px-8 lg:py-24"
    >
      <div className="border-t-2 border-rule-strong pt-6">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="byline-title" className="font-display text-headline text-ink lg:col-span-7">
            Behind the byline
          </h2>
          <div className="lg:col-span-5 lg:pb-2">
            {bylineLede ? (
              <p className="max-w-[34em] text-[19px] leading-[1.45] text-ink-2 sm:text-[21px]">{bylineLede}</p>
            ) : (
              <p className="max-w-[34em] border border-dashed border-ink-3 px-4 py-3 text-[17px] leading-[1.45] text-ink-3">
                Lede to come: one or two sentences about Stuti outside of code.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-y-12">
          <Plate
            photo={bylineHero}
            className="sm:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1"
            aspect="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 730px"
            large
          />
          {bylinePhotos.map((p) => (
            <Plate key={p.id} photo={p} className={place[p.id].cell} aspect={place[p.id].aspect} sizes={place[p.id].sizes} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Plate({
  photo,
  className,
  aspect,
  sizes,
  large,
}: {
  photo: BylinePhoto;
  className?: string;
  aspect: string;
  sizes: string;
  large?: boolean;
}) {
  return (
    <figure className={`-mx-4 sm:mx-0 ${className ?? ""}`}>
      {/* Full-bleed on phones: the frame keeps only its top and bottom rules */}
      <div className="border-y border-rule-strong py-2 sm:border sm:p-2.5">
        <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: photo.focus ?? "50% 50%" }}
          />
        </div>
      </div>
      <figcaption
        className={`mt-3 px-4 italic leading-snug text-ink-2 sm:px-0 ${large ? "text-[17px]" : "text-[15px]"}`}
      >
        {photo.caption}
      </figcaption>
    </figure>
  );
}
