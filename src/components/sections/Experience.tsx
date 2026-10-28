"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site.config";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section id="experience" title="Experience" lede="Three internships across four terms, newest first.">
      <ol>
        {site.experience.map((exp) => (
          <Entry key={exp.company} {...exp} />
        ))}
      </ol>
    </Section>
  );
}

function Entry({
  company,
  role,
  period,
  location,
  stack,
  highlights,
  details,
}: (typeof site.experience)[number]) {
  const [open, setOpen] = useState(false);
  const detailsId = `details-${company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li className="grid gap-x-8 gap-y-3 border-b border-rule py-8 first:pt-0 sm:grid-cols-[11rem,1fr]">
      <div>
        <p className="data text-xs text-ink-2">{period}</p>
        <p className="mt-1 text-sm text-ink-3">{location}</p>
      </div>

      <div className="min-w-0">
        <h3 className="display text-2xl font-bold leading-tight">{company}</h3>
        <p className="mt-1 text-[15px] text-ink-2">{role}</p>

        <ul className="mt-5 max-w-3xl space-y-2.5">
          {highlights.map((h, i) => (
            <li key={i} className="grid grid-cols-[1rem,1fr] text-[15px] leading-relaxed">
              <span aria-hidden className="text-ink-3">–</span>
              {h}
            </li>
          ))}
        </ul>

        {details && details.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  id={detailsId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl overflow-hidden"
                >
                  {details.map((d, i) => (
                    <li
                      key={i}
                      className="mt-2.5 grid grid-cols-[1rem,1fr] text-[15px] leading-relaxed text-ink-2"
                    >
                      <span aria-hidden className="text-ink-3">–</span>
                      {d}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft"
            >
              {open ? "Fewer details" : `${details.length} more`}
              <ChevronDown
                size={15}
                aria-hidden
                className={cn("transition-transform duration-200", open && "rotate-180")}
              />
            </button>
          </>
        )}

        <p className="data mt-4 text-[11px] leading-relaxed text-ink-3">{stack.join(" / ")}</p>
      </div>
    </li>
  );
}
