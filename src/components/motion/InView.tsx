"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Marks a block with data-inview="false" once it has mounted below the fold,
 * then "true" the first time it scrolls into view. CSS keyed on the attribute
 * does the motion, so server HTML (and no-JS readers) always shows everything,
 * and anything already on screen at load never hides.
 */
export function InView({
  as: Tag = "div",
  children,
  className,
  threshold = 0.2,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  threshold?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const state = useInViewState(ref, threshold);
  return (
    <Tag ref={ref} className={className} data-inview={state} {...rest}>
      {children}
    </Tag>
  );
}

export function useInViewState(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
  const [state, setState] = useState<"true" | "false" | undefined>(undefined);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // already on screen: leave it be
    setState("false");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("true");
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return state;
}

/**
 * Counts every number inside a string up from zero when it scrolls into view,
 * keeping its decimals and surrounding text: "$6–9K", "0.831", "1,356".
 */
export function CountUp({
  value,
  className,
  duration = 1400,
  delay = 0,
  immediate = false,
}: {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** Count as soon as it mounts, even if it is on screen at load (the cover) */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!/\d/.test(value)) return;
    const r = el.getBoundingClientRect();
    if (!immediate && r.top < window.innerHeight * 0.9) return;
    setText(render(value, 0));
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + delay;
        const step = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / duration));
          const eased = 1 - Math.pow(1 - t, 3);
          setText(render(value, eased));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay, immediate]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final value, never the ticking one */}
      <span aria-hidden>{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

function render(template: string, t: number) {
  return template.replace(/\d[\d,]*(\.\d+)?/g, (m) => {
    const decimals = m.includes(".") ? m.split(".")[1].length : 0;
    const n = parseFloat(m.replace(/,/g, "")) * t;
    const s = n.toFixed(decimals);
    return m.includes(",") ? Number(s).toLocaleString("en-CA", { minimumFractionDigits: decimals }) : s;
  });
}
