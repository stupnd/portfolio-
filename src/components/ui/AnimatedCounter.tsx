"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts numeric portions of a stat up from zero when scrolled into view.
 * Non-numeric stats (e.g. "$6–9K/mo", "64→73%") render as-is with a fade.
 */
export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  // Only animate simple "number + optional suffix" values like "31" or "200+"
  const match = /^(\d+)(\+?)$/.exec(value);

  useEffect(() => {
    if (!match || !inView || reduce || !ref.current) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = `${Math.round(eased * target)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match, reduce]);

  return (
    <span ref={ref} className={className}>
      {match && !reduce ? `0${match[2]}` : value}
    </span>
  );
}
