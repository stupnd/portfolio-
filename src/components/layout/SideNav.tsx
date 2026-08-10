"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Vertical section rail.
 *
 * On a page this tall the reader can't tell how much is left or what's coming,
 * so anything below the fold feels lost. This shows the whole structure at once,
 * marks where you are, and makes every section one click away.
 *
 * Desktop only, and only on the home page. The top nav already covers mobile.
 */

const SECTIONS = [
  { id: "looking-for", label: "Looking for" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));

    // Hide the rail over the hero so it doesn't compete with the headline
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Page sections"
      // Only shown once the viewport is wide enough that the rail clears the
      // centred content column; below 1400px it would overlap the text.
      className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 min-[1400px]:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul className="group/rail flex flex-col gap-1">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group/item flex items-center gap-2.5 py-1.5"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-accent"
                      : "w-3.5 bg-[var(--border-strong)] group-hover/item:w-6 group-hover/item:bg-[var(--fg)]"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-[11px] transition-all duration-300 ${
                    isActive
                      ? "text-[var(--fg)] opacity-100"
                      : "text-muted opacity-0 group-hover/rail:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
