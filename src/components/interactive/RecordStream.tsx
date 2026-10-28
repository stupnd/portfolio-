"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site.config";
import { cn } from "@/lib/utils";

const SWEEP_MS = 110;
const START_DELAY_MS = 450;

/**
 * The hero's record stream: every row is a resume fact on a three-partition
 * topic, readable from first paint. On load the visitor's consumer "catches
 * up": acks sweep down the status column and the lag counter falls to zero.
 * The rows are links to their evidence, so the motion is the only decoration.
 */
export function RecordStream() {
  const records = site.records;
  const reduce = useReducedMotion();
  const [acked, setAcked] = useState(0);

  useEffect(() => {
    if (reduce) {
      setAcked(records.length);
      return;
    }
    let n = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        setAcked(n);
        if (n >= records.length && interval) clearInterval(interval);
      }, SWEEP_MS);
    }, START_DELAY_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduce, records.length]);

  const lag = records.length - acked;
  const partitions = Array.from(new Set(records.map((r) => r.partition)));

  return (
    <div className="band-cobalt overflow-hidden rounded">
      <div className="data flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rule px-4 py-3 text-[11px] text-ink-2 sm:px-5">
        <span>
          <span className="font-semibold text-ink">topic stuti.work</span>
          <span className="mx-2 text-ink-3">/</span>
          {partitions.length} partitions
        </span>
        <span aria-live="off">
          consumer: you
          <span className="mx-2 text-ink-3">/</span>
          lag <span className={cn("font-semibold", lag === 0 ? "text-ack" : "text-pending")}>{lag}</span>
        </span>
      </div>

      <ol aria-label="Work record, oldest first">
        {records.map((r, i) => {
          const isAcked = i < acked;
          return (
            <li key={i} className="border-b border-rule/70">
              <Link
                href={r.href}
                className="group grid grid-cols-[2.75rem,1fr,auto] items-baseline gap-x-3 px-4 py-2.5 transition-colors duration-150 hover:bg-raised focus-visible:bg-raised sm:grid-cols-[3rem,9.75rem,1fr,auto] sm:px-5"
              >
                <span className="data text-[11px] text-ink-3">{String(i).padStart(4, "0")}</span>
                <span className="data hidden truncate text-[11px] text-ink-2 sm:block">
                  <span className="text-ink-3">p{partitions.indexOf(r.partition)} </span>
                  {r.key}
                  <span className="text-ink-3"> · {r.year}</span>
                </span>
                <span className="text-[13px] leading-snug text-ink sm:text-sm">
                  <span className="data mb-0.5 block text-[11px] text-ink-2 sm:hidden">
                    p{partitions.indexOf(r.partition)} · {r.key} · {r.year}
                  </span>
                  {r.text}
                </span>
                <span
                  className={cn(
                    "data flex items-center gap-1 text-[11px] uppercase tracking-wide transition-colors duration-300",
                    isAcked ? "text-ack" : "text-pending"
                  )}
                >
                  <span aria-hidden>{isAcked ? "ack" : "pending"}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 rounded-[1px] transition-colors duration-300",
                      isAcked ? "bg-ack" : "border border-pending"
                    )}
                  />
                  <span className="sr-only">{isAcked ? "acknowledged" : "pending"}</span>
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/#contact"
            className="grid grid-cols-[2.75rem,1fr,auto] items-baseline gap-x-3 px-4 py-3 transition-colors duration-150 hover:bg-raised focus-visible:bg-raised sm:grid-cols-[3rem,9.75rem,1fr,auto] sm:px-5"
          >
            <span className="data text-[11px] text-ink-3">{String(records.length).padStart(4, "0")}</span>
            <span className="data hidden text-[11px] text-ink-2 sm:block">
              next · {site.lookingFor.startDate.split(" ")[1]}
            </span>
            <span className="text-sm font-semibold text-ink">
              New-grad software engineer, starting {site.lookingFor.startDate}
            </span>
            <span className="data flex items-center gap-1 text-[11px] uppercase tracking-wide text-pending">
              <span>offer</span>
              <ArrowUpRight size={12} aria-hidden />
            </span>
          </Link>
        </li>
      </ol>
    </div>
  );
}
