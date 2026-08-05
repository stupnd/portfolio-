"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Soft glow that trails the pointer. Desktop-only (fine pointer),
 * disabled for prefers-reduced-motion. Purely decorative.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(108,124,255,0.14) 0%, rgba(76,201,240,0.06) 45%, transparent 70%)",
      }}
    />
  );
}
