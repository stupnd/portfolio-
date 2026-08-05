"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="03 · Experience" title="Where I've worked" />
        <ol className="relative ml-3 space-y-8 border-l border-[var(--border)] pl-8 sm:ml-6">
          {site.experience.map((exp, i) => (
            <ExperienceCard key={exp.company} index={i} {...exp} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ExperienceCard({
  index,
  company,
  role,
  period,
  location,
  stack,
  highlights,
  details,
}: (typeof site.experience)[number] & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal as="li" delay={index * 0.06} className="relative">
      {/* Timeline node */}
      <span
        aria-hidden
        className="absolute -left-[41px] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-accent/50 bg-[var(--bg)] sm:-left-[41px]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <div className="card group p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Logo placeholder — swap for a real logo image if desired */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-hover)] text-muted">
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-snug">{company}</h3>
              <p className="text-sm text-muted">{role}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-faint">
            {period} · {location}
          </p>
        </div>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        {details && details.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 space-y-2.5">
                    {details.map((d, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--border-strong)]"
                        />
                        {d}
                      </li>
                    ))}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-soft"
            >
              {open ? "Show less" : "More details"}
              <ChevronDown
                size={13}
                className={cn("transition-transform duration-300", open && "rotate-180")}
              />
            </button>
          </>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-faint"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
