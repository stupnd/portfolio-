"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileDown, Menu, X } from "lucide-react";
import { site } from "@/content/site.config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

// Order mirrors the page: the work, then the record, then the person.
const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the last section whose top has passed 30% of the viewport, and
  // nothing while the hero is in view. Derived from scroll position rather
  // than intersection events, so scrolling back up can never leave a stale link.
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-paper transition-colors duration-200",
        scrolled || open ? "border-rule" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="display text-[15px] font-extrabold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => {
            const isActive = onHome && active === l.id;
            return (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "px-3 py-2 text-sm transition-colors",
                  isActive ? "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[10px]" : "text-ink-2 hover:text-ink"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Open command palette (Cmd K)"
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
            }
            className="data hidden h-9 items-center rounded px-2.5 text-[11px] text-ink-2 transition-colors hover:text-ink sm:flex"
          >
            ⌘K
          </button>
          <ThemeToggle />
          <a
            href={site.resumeUrl}
            download
            className="ml-1 hidden min-h-9 items-center gap-1.5 rounded bg-accent px-3.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent/90 sm:flex"
          >
            <FileDown size={14} aria-hidden />
            Resume
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rule bg-paper px-5 pb-5 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-3.5 text-[15px] text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.resumeUrl}
            download
            className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded bg-accent text-sm font-semibold text-accent-ink"
          >
            <FileDown size={15} aria-hidden />
            Download resume
          </a>
        </nav>
      )}
    </header>
  );
}
