import Link from "next/link";
import { features } from "@/content/features";
import { CountUp } from "@/components/motion/InView";

/**
 * Cover lines: the five features sold on the cover the way a newsstand
 * issue sells them, each with its number counting up in its own spot colour.
 * Phones get a swipeable strip; laptops get the full row under the fold line.
 */
export function CoverLines() {
  return (
    <nav aria-label="Cover lines" className="print-set mt-10 [animation-delay:350ms] lg:mt-12">
      <p className="caps flex items-center gap-4 text-[12px] text-ink-2">
        Also in this issue
        <span aria-hidden className="h-px flex-1 bg-rule-strong" />
        <span className="data hidden normal-case tracking-normal text-ink-3 sm:inline">5 features · tap to jump</span>
      </p>
      <ol className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
        {features.map((f, i) => (
          <li key={f.id} className={`plate-${f.plate} w-[78%] shrink-0 snap-start sm:w-auto ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <Link
              href={`#${f.id}`}
              className="group flex h-full flex-col border-t-[3px] border-accent bg-accent/[0.06] px-4 pb-4 pt-3 transition-colors hover:bg-accent/[0.13] focus-visible:bg-accent/[0.13]"
            >
              <span className="data flex justify-between text-[12px] text-ink-3">
                <span className="text-accent">{f.kicker}</span>
                <span>
                  <span className="sr-only">page </span>p. {f.page}
                </span>
              </span>
              <span className="mt-3 font-display text-[3rem] leading-none text-accent lg:text-[3.25rem]">
                <CountUp value={f.cover.figure} immediate delay={450 + i * 140} duration={1300} />
              </span>
              <span className="data mt-1 text-[12px] text-ink-2">{f.cover.label}</span>
              <span className="mt-3 text-[16px] leading-snug text-ink">{f.cover.line}</span>
              <span className="mt-auto pt-3 text-[14px] italic text-ink-3 transition-colors group-hover:text-accent">
                Read it <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
