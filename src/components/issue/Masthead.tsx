"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site.config";
import { EditionToggle } from "./EditionToggle";

const sections = [
  { href: "/#contents", label: "Contents" },
  { href: "/#aws-spike", label: "Features" },
  { href: "/#notes", label: "Contributors" },
  { href: "/#off-the-page", label: "Off the page" },
  { href: "/#letters", label: "Letters" },
];

/**
 * The nameplate bar stays with the reader (it carries Resume and the edition
 * switch); the section line under it scrolls away with the cover.
 */
export function Masthead() {
  const [open, setOpen] = useState(false);
  const { number, season } = site.issue;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const edition = mounted && resolvedTheme === "dark" ? " · Night edition" : "";

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper">
        <div className="mx-auto grid h-16 max-w-issue grid-cols-[1fr,auto] items-center gap-4 px-4 sm:px-8 lg:grid-cols-[1fr,auto,1fr]">
          <p className="data hidden text-[12px] text-ink-2 lg:block">
            Issue {number} · {season}
            {edition}
          </p>

          <Link
            href="/"
            className="caps justify-self-start whitespace-nowrap text-[13px] text-ink sm:text-[15px] lg:justify-self-center lg:text-[16px] lg:tracking-[0.42em]"
          >
            {site.name}
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <EditionToggle />
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-[15px] text-accent underline decoration-accent/40 underline-offset-[5px] transition-colors hover:decoration-accent"
            >
              Resume
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
            <button
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
              aria-label={open ? "Close sections" : "Open sections"}
              aria-expanded={open}
              aria-controls="sections-mobile"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-issue px-4 sm:px-8">
          <div className="rule-double print-rule" />
        </div>

        {open && (
          <nav id="sections-mobile" aria-label="Sections" className="border-b border-rule bg-paper px-4 pb-4 md:hidden">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-rule font-display text-2xl text-ink last:border-b-0"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="mx-auto max-w-issue px-4 sm:px-8">
        <div className="flex items-center justify-between gap-6 border-b border-rule">
          <p className="data py-2.5 text-[12px] text-ink-2 lg:hidden">
            Issue {number} · {season}
            {edition}
          </p>
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="inline-flex min-h-11 items-center text-[15px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="data hidden text-[12px] text-ink-3 md:block">Ottawa, Canada</p>
        </div>
      </div>
    </>
  );
}
