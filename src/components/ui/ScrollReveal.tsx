"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fades and lifts children into view on scroll. Respects prefers-reduced-motion. */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </MotionTag>
  );
}
