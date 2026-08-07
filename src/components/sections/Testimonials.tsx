"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Carousel: renders nothing until site.testimonials has entries.
 * Add real quotes to the config to activate this section.
 */
export function Testimonials() {
  const items = site.testimonials;
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What people say" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="card p-8 text-center"
            >
              <Quote size={22} className="mx-auto text-accent" />
              <blockquote className="mt-4 text-lg leading-relaxed text-muted">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                {current.image && (
                  <Image
                    src={current.image}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="text-sm font-semibold">{current.name}</p>
                  <p className="text-xs text-faint">{current.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setIndex((index - 1 + items.length) % items.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-muted transition-colors hover:text-[var(--fg)]"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5" aria-hidden>
                {items.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-5 bg-accent" : "w-1.5 bg-[var(--border-strong)]"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setIndex((index + 1) % items.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-muted transition-colors hover:text-[var(--fg)]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
