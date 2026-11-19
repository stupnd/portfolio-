import Link from "next/link";
import { site } from "@/content/site.config";
import type { ContentsEntry } from "@/content/types";
import { features as featureData } from "@/content/features";

const plateFor = (href: string) => featureData.find((f) => `#${f.id}` === href)?.plate;

/**
 * The contents page: five features at full weight, three departments set
 * smaller. Each row draws a leader to its folio on hover or focus.
 */
export function Contents() {
  const { features, departments } = site.issue;

  return (
    <section id="contents" aria-labelledby="contents-title" data-folio="" data-folio-title="In this issue" className="mx-auto max-w-issue px-4 pb-20 pt-10 sm:px-8 lg:pb-28 lg:pt-8">
      <div className="border-t-2 border-rule-strong pt-6">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="contents-title" className="font-display text-headline text-ink">
              In this issue
            </h2>
            <p className="mt-4 max-w-[26ch] text-[17px] leading-relaxed text-ink-2">
              Five features, each with a figure you can read or play, and four departments.
            </p>
          </div>

          <div className="lg:col-span-9">
            <ol>
              {features.map((f) => (
                <Row key={f.href} entry={f} size="feature" />
              ))}
            </ol>

            <h3 className="caps mt-12 text-[12px] text-ink-2">Departments</h3>
            <ol className="mt-2">
              {departments.map((d) => (
                <Row key={d.href} entry={d} size="department" />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ entry, size }: { entry: ContentsEntry; size: "feature" | "department" }) {
  const feature = size === "feature";
  const plate = plateFor(entry.href);
  return (
    <li className={`border-b border-rule ${plate ? `plate-${plate}` : ""}`}>
      <Link
        href={entry.href}
        className="group grid grid-cols-[3rem,1fr] items-baseline gap-x-4 py-5 sm:grid-cols-[1fr,auto] sm:gap-x-6"
      >
        <span
          className={`order-first font-display leading-none text-accent sm:order-last ${
            feature ? "text-[2.25rem] sm:text-[3rem]" : "text-[1.75rem]"
          }`}
        >
          <span className="sr-only">Page </span>
          {entry.page}
        </span>
        <span className="min-w-0">
          <span className="flex items-baseline gap-4">
            <span
              className={`font-display text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent ${
                feature ? "text-[1.75rem] leading-[1.05] sm:text-[2.375rem]" : "text-[1.5rem] leading-tight"
              }`}
            >
              {entry.title}
            </span>
            <span
              aria-hidden
              className="hidden h-px flex-1 origin-left scale-x-0 border-b border-dotted border-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:block"
            />
          </span>
          <span className={`mt-2 block max-w-[62ch] leading-relaxed text-ink-2 ${feature ? "text-[17px]" : "text-[16px]"}`}>
            {entry.hook}
          </span>
        </span>
      </Link>
    </li>
  );
}
