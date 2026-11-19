import Image from "next/image";
import { site } from "@/content/site.config";

/**
 * The cover: the positioning line set as the cover line, a standfirst, the
 * cover photograph in a frame with its credit line, and the colophon box that
 * answers the logistics a recruiter checks first.
 */
export function Cover() {
  const { coverLine, dek, cover } = site.issue;
  const { available, locations, authorization } = site.lookingFor;

  return (
    <section aria-labelledby="cover-line" className="mx-auto max-w-issue px-4 pb-10 pt-8 sm:px-8 lg:pb-8 lg:pt-9">
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Capped in em so the line always sets as two balanced lines */}
          <h1 id="cover-line" className="print-lift max-w-[6.5em] text-balance font-display text-cover text-ink">
            {coverLine}
          </h1>

          <p className="print-set mt-7 max-w-[34em] text-pretty text-[19px] leading-[1.45] text-ink-2 [animation-delay:120ms] sm:text-[21px] lg:mt-8">
            {dek}
          </p>
          <Colophon
            className="mt-8 hidden lg:block"
            rows={[
              ["Available", available],
              ["Where", locations],
              ["Status", authorization],
            ]}
          />
        </div>

        <figure className="lg:col-span-4 lg:w-full lg:max-w-[21rem] lg:justify-self-end">
          <div className="print-fig border border-rule-strong p-2 sm:p-2.5">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 336px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-[15px] italic leading-snug text-ink-2">{cover.caption}</figcaption>
        </figure>

        <Colophon
          className="lg:hidden"
          rows={[
            ["Available", available],
            ["Where", locations],
            ["Status", authorization],
          ]}
        />
      </div>
    </section>
  );
}

function Colophon({ rows, className }: { rows: [string, string][]; className?: string }) {
  return (
    <aside aria-label="Colophon" className={className}>
      <div className="max-w-[28rem] border border-rule-strong px-5 py-4">
        <p className="caps text-[12px] text-ink">Colophon</p>
        <dl className="mt-3 grid grid-cols-[5.75rem,1fr] gap-x-4 gap-y-1.5 text-[15px] leading-snug">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="data pt-[3px] text-[12px] text-ink-3">{label}</dt>
              <dd className="text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 border-t border-rule pt-3 text-[13px] italic leading-snug text-ink-3">
          Headlines in Instrument Serif, text in Source Serif 4, data in JetBrains Mono. Printed in Ottawa.
        </p>
      </div>
    </aside>
  );
}
