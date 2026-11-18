"use client";

import { useEffect } from "react";

/**
 * After a pointer click on an in-page link, hand focus to the section it
 * points at (so screen readers and the next Tab start there), or release it
 * when there is no such section. Otherwise the clicked link keeps focus, and
 * the next key press anywhere (Shift, a screenshot shortcut) flips the browser
 * into keyboard modality and paints a focus ring on a link nobody tabbed to.
 * Keyboard activation (detail === 0) is left alone: its ring is wanted.
 */
export function SectionFocus() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.detail === 0) return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } else {
        link.blur();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
