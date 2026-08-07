"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, FileDown, Menu, X } from "lucide-react";
import { site } from "@/content/site.config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

// Order mirrors the page: work first, personal later.
const links = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Highlight whichever section is currently in the upper half of the viewport
  useEffect(() => {
    if (!onHome) return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 sm:mx-5 sm:px-5 lg:mx-auto">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label={`${site.name}, home`}
        >
          {site.initials.toLowerCase()}
          <span className="text-accent">.</span>
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
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-[var(--fg)]"
                    : "text-muted hover:text-[var(--fg)]"
                )}
              >
                {l.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Open command palette (Cmd K)"
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )
            }
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 font-mono text-xs text-faint transition-colors hover:text-[var(--fg)] sm:flex"
          >
            <Command size={13} />K
          </button>
          <ThemeToggle />
          <a
            href={site.resumeUrl}
            download
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft sm:flex"
          >
            <FileDown size={14} />
            Resume
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "glass mx-3 mt-2 overflow-hidden rounded-2xl transition-all duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="flex flex-col p-3" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--fg)]"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.resumeUrl}
            download
            className="mt-1 flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white"
          >
            <FileDown size={15} />
            Download resume
          </a>
        </nav>
      </div>
    </header>
  );
}
