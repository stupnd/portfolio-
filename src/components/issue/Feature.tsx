import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Feature as FeatureData } from "@/content/features";
import { FeatureFigure } from "./figures";

/**
 * One feature spread: folio line, kicker, headline, dek and byline; then the
 * text column with its drop cap beside a pull quote carrying the key number;
 * then the figure across the measure. Alternate spreads mirror the columns.
 */
export function Feature({ feature, index }: { feature: FeatureData; index: number }) {
  const mirrored = index % 2 === 1;
  const { id, page, kicker, headline, dek, meta, body, pull, caseStudy, repo } = feature;

  return (
    <article id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-issue px-4 py-16 sm:px-8 lg:py-24">
      <header className="border-t-2 border-rule-strong pt-4">
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <p className="caps text-[12px] text-accent">{kicker}</p>
          <p className="data text-[12px] text-ink-3">
            Feature · <span className="sr-only">page </span>p. {page}
          </p>
        </div>

        <div className="grid gap-x-10 lg:grid-cols-12">
          <div className={`lg:col-span-10 ${mirrored ? "lg:col-start-3" : ""}`}>
            <h2 id={`${id}-title`} className="mt-8 max-w-[18em] text-balance font-display text-headline text-ink lg:mt-10">
              {headline}
            </h2>
            <p className="mt-5 max-w-[34em] text-pretty text-[19px] leading-[1.45] text-ink-2 sm:text-[21px]">{dek}</p>
            <p className="data mt-6 text-[12px] leading-relaxed text-ink-3">By Stuti Pandya · {meta}</p>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-x-10 gap-y-10 lg:mt-14 lg:grid-cols-12">
        <div className={`lg:col-span-7 ${mirrored ? "lg:col-start-6" : ""}`}>
          <div className="max-w-[36em] space-y-5 text-[17px] leading-[1.65] text-ink sm:text-[18px]">
            {body.map((para, i) => (
              <p key={i} className={i === 0 ? "dropcap" : undefined}>
                {para}
              </p>
            ))}
          </div>

          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[16px]">
            {caseStudy && (
              <Link
                href={`/projects/${caseStudy}`}
                className="group inline-flex min-h-11 items-center gap-1.5 text-accent underline decoration-accent/40 underline-offset-[5px] hover:decoration-accent"
              >
                Read the full case study
                <ArrowRight size={15} strokeWidth={1.75} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-ink-2 underline decoration-rule-strong/30 underline-offset-[5px] hover:text-ink hover:decoration-rule-strong"
              >
                Source on GitHub
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
              </a>
            )}
          </p>
        </div>

        <aside
          aria-label="Pull quote"
          className={`lg:col-span-4 lg:row-start-1 ${mirrored ? "lg:col-start-1" : "lg:col-start-9"}`}
        >
          <figure className="border-y border-rule-strong py-6 lg:sticky lg:top-28">
            <p className="font-display text-[4.5rem] leading-[0.9] text-accent sm:text-[5.5rem]">{pull.figure}</p>
            <p className="data mt-2 text-[12px] text-ink-3">{pull.label}</p>
            <blockquote className="mt-5 font-display text-[1.75rem] leading-[1.15] text-ink">
              <p>&ldquo;{pull.quote}&rdquo;</p>
            </blockquote>
          </figure>
        </aside>
      </div>

      <div className="mt-14 lg:mt-20">
        <FeatureFigure feature={feature} />
      </div>
    </article>
  );
}
