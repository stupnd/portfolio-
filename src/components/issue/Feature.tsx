import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import type { Feature as FeatureData } from "@/content/features";
import { CountUp, InView } from "@/components/motion/InView";
import { FeatureFigure } from "./figures";

/**
 * One feature, built for a reader with thirty seconds: the headline, a
 * three-line brief beside three big numbers, then the figure doing the
 * explaining. The full article waits behind "Read the whole story" (a native
 * <details>, so it is in the HTML and searchable). Each feature prints in
 * its own spot colour.
 */
export function Feature({ feature, index }: { feature: FeatureData; index: number }) {
  const mirrored = index % 2 === 1;
  const { id, page, kicker, headline, dek, meta, body, pull, caseStudy, repo, plate, brief, stats } = feature;
  const minutes = Math.max(1, Math.round(body.join(" ").split(/\s+/).length / 230));

  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      data-folio={page}
      data-folio-title={headline}
      data-plate={plate}
      className={`plate-${plate} mx-auto max-w-issue px-4 py-16 sm:px-8 lg:py-24`}
    >
      <InView as="header">
        <div className="rv-bar h-[3px] bg-accent" />
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 pt-3">
          <p className="caps text-[12px] text-accent">{kicker}</p>
          <p className="data text-[12px] text-ink-3">
            Feature · <span className="sr-only">page </span>p. {page}
          </p>
        </div>

        <h2 id={`${id}-title`} className="rv mt-8 max-w-[18em] text-balance font-display text-headline text-ink lg:mt-10">
          {headline}
        </h2>
        <p className="rv mt-5 max-w-[34em] text-pretty text-[19px] leading-[1.45] text-ink-2 [--i:1] sm:text-[21px]">{dek}</p>
        <p className="data mt-6 text-[12px] leading-relaxed text-ink-3">By Stuti Pandya · {meta}</p>
      </InView>

      {/* The 30-second version */}
      <InView className="mt-10 border-y border-accent/50 bg-accent/[0.07] px-4 py-7 sm:px-8 lg:mt-12 lg:py-9">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className={`lg:col-span-7 ${mirrored ? "lg:order-last" : ""}`}>
            <p className="caps text-[12px] text-accent">The 30-second version</p>
            <ol className="mt-4 space-y-3">
              {brief.map((line, i) => (
                <li key={i} className="rv grid grid-cols-[2rem,1fr] text-[18px] leading-snug text-ink sm:text-[20px]" style={{ ["--i" as string]: i }}>
                  <span className="font-display text-[1.5rem] leading-none text-accent">{i + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[16px]">
              {caseStudy && (
                <Link
                  href={`/projects/${caseStudy}`}
                  className="group inline-flex min-h-11 items-center gap-1.5 text-accent underline decoration-accent/40 underline-offset-[5px] hover:decoration-accent"
                >
                  Full case study
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

          <dl className="grid grid-cols-3 gap-x-4 self-center lg:col-span-5 lg:grid-cols-1 lg:gap-y-5">
            {stats.map((s, i) => (
              <div key={s.label} className="rv border-t border-accent/40 pt-3 lg:flex lg:items-baseline lg:gap-5" style={{ ["--i" as string]: i + 1 }}>
                <dt className="data text-[12px] leading-snug text-ink-2 lg:order-last">{s.label}</dt>
                <dd className="mt-2 font-display text-[2.5rem] leading-none text-accent sm:text-[3.5rem] lg:mt-0 lg:w-[11rem] lg:shrink-0 lg:text-[4rem]">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </InView>

      <div className="mt-12 lg:mt-16">
        <FeatureFigure feature={feature} />
      </div>

      {/* The whole story */}
      <details className="group/story mt-12 border-t border-rule-strong lg:mt-16">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-display text-[1.75rem] leading-tight text-ink transition-colors group-hover/story:text-accent sm:text-[2rem]">
            <span className="group-open/story:hidden">Read the whole story</span>
            <span className="hidden group-open/story:inline">The whole story</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="data text-[12px] text-ink-3">{minutes} min read</span>
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center border border-accent text-accent transition-transform duration-300 group-open/story:rotate-45"
            >
              <Plus size={18} strokeWidth={1.5} />
            </span>
          </span>
        </summary>

        <div className="grid gap-x-10 gap-y-10 pb-4 pt-6 lg:grid-cols-12">
          <div className={`lg:col-span-7 ${mirrored ? "lg:col-start-6" : ""}`}>
            <div className="max-w-[36em] space-y-5 text-[17px] leading-[1.65] text-ink sm:text-[18px]">
              {body.map((para, i) => (
                <p key={i} className={i === 0 ? "dropcap" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <aside aria-label="Pull quote" className={`lg:col-span-4 lg:row-start-1 ${mirrored ? "lg:col-start-1" : "lg:col-start-9"}`}>
            <figure className="border-y border-accent py-6">
              <p className="font-display text-[4rem] leading-[0.9] text-accent sm:text-[5rem]">{pull.figure}</p>
              <p className="data mt-2 text-[12px] text-ink-3">{pull.label}</p>
              <blockquote className="mt-5 font-display text-[1.75rem] leading-[1.15] text-ink">
                <p>&ldquo;{pull.quote}&rdquo;</p>
              </blockquote>
            </figure>
          </aside>
        </div>
      </details>
    </article>
  );
}
