"use client";

import { useState } from "react";
import { evidence } from "@/content/evidence";
import { ablationRuns } from "@/content/features";
import { InView } from "@/components/motion/InView";

const AXIS_MIN = 0.6;
const AXIS_MAX = 0.85;
const pct = (v: number) => ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
const SHIPPED = 0.831;

/**
 * Fig. 1 for the eval feature: nine runs as bars against the shipped score.
 * Choosing a run opens its scorecard: what changed, the delta, and how each of
 * the eight questions scored against the baseline. All values come from the
 * repo's committed eval/results JSON.
 */
export function AblationExplorer() {
  const runs = evidence.runs.map((r, i) => ({ ...r, ...ablationRuns[i] }));
  const [selected, setSelected] = useState(runs.findIndex((r) => r.kind === "shipped"));
  const run = runs[selected];
  const base = runs[0];
  const prevBest = Math.max(...runs.slice(0, selected).map((r) => r.mean), 0);
  const delta = selected === 0 ? null : run.mean - base.mean;

  return (
    <InView className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
      {/* The runs */}
      <div className="lg:col-span-7">
        <div aria-hidden className="relative ml-[10.25rem] mr-[4.75rem] hidden h-4 sm:block">
          {[0.6, 0.65, 0.7, 0.75, 0.8, 0.85].map((t) => (
            <span
              key={t}
              className="data absolute top-0 -translate-x-1/2 text-[12px] text-ink-3 first:translate-x-0 last:-translate-x-full"
              style={{ left: `${pct(t)}%` }}
            >
              {t.toFixed(2)}
            </span>
          ))}
        </div>
        <ul aria-label="Eval runs, in the order they were recorded" className="mt-2">
          {runs.map((r, i) => {
            const active = i === selected;
            return (
              <li key={r.run}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(i)}
                  className={`grid w-full grid-cols-[1fr,auto] items-center gap-x-3 gap-y-1.5 border-t border-rule px-2 py-2.5 text-left transition-colors sm:grid-cols-[9rem,1fr,3.5rem] ${
                    active ? "bg-accent/[0.08]" : "hover:bg-paper-2"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="data block text-[12px] text-ink-3">Run {i + 1}</span>
                    <span className={`data block truncate text-[13px] ${active ? "text-accent" : "text-ink"}`}>{r.run}</span>
                  </span>
                  <span className="relative col-span-2 row-start-2 block h-3.5 sm:col-span-1 sm:row-start-auto">
                    <span className="absolute inset-y-[-5px] w-px bg-accent/60" style={{ left: `${pct(SHIPPED)}%` }} />
                    <span
                      className={`rv-bar absolute inset-y-0 left-0 block ${barTone(r.kind, active)}`}
                      style={{ width: `${pct(r.mean)}%`, ["--i" as string]: i }}
                    />
                  </span>
                  <span className={`data text-right text-[14px] ${active || r.kind === "shipped" ? "text-accent" : "text-ink"}`}>
                    {r.mean.toFixed(3)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[14px] italic text-ink-3">
          Choose a run to open its scorecard. The vertical line is the score that shipped; hatched bars are the two ideas the harness turned down.
        </p>
      </div>

      {/* The scorecard */}
      <div className="lg:col-span-5">
        <p className="sr-only" aria-live="polite">
          {`Run ${selected + 1}, ${run.run}, mean score ${run.mean.toFixed(3)}`}
        </p>
        <div className="border border-accent p-5 sm:p-6">
          <p className="data text-[12px] text-ink-3">Scorecard · Run {selected + 1} of 9</p>
          <p className="data mt-1 break-all text-[15px] text-accent">{run.run}</p>
          <p className="mt-3 font-display text-[3.5rem] leading-none text-ink">{run.mean.toFixed(3)}</p>
          <p className="mt-2 text-[16px] leading-snug text-ink-2">
            {delta === null ? (
              "The starting point every other run is measured against."
            ) : (
              <>
                <span className={delta >= 0 ? "text-ack" : "text-accent"}>
                  {delta >= 0 ? "+" : "−"}
                  {Math.abs(delta).toFixed(3)}
                </span>{" "}
                against the baseline.{" "}
                {run.mean > prevBest ? "A new best at the time." : `Below the best so far (${prevBest.toFixed(3)}).`}
              </>
            )}
          </p>
          {run.note && <p className="mt-2 text-[16px] italic text-ink">{run.note}</p>}

          <p className="caps mt-6 text-[12px] text-ink-2">By question</p>
          <ol className="mt-2 space-y-2">
            {evidence.questions.map((q, qi) => {
              const s = run.scores[qi] ?? 0;
              const b = base.scores[qi] ?? 0;
              return (
                <li key={q.id} className="grid grid-cols-[1fr,2.75rem] items-center gap-x-3" title={q.q}>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] leading-snug text-ink-2">{q.q}</span>
                    <span aria-hidden className="relative mt-1 block h-2 bg-paper-2">
                      <span className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500" style={{ width: `${s * 100}%` }} />
                      <span className="absolute inset-y-[-3px] w-px bg-ink" style={{ left: `${b * 100}%` }} />
                    </span>
                  </span>
                  <span className="data text-right text-[13px] text-ink">{s.toFixed(2)}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-[13px] italic leading-snug text-ink-3">Bar: this run. Tick: the baseline. Judge score per question, 0 to 1.</p>
        </div>
      </div>
    </InView>
  );
}

function barTone(kind: string | undefined, active: boolean) {
  if (kind === "rejected")
    return "border border-ink-2 bg-[repeating-linear-gradient(135deg,rgb(var(--ink-2)/0.55)_0_1.5px,transparent_1.5px_6px)]";
  if (kind === "shipped" || active) return "bg-accent";
  if (kind === "baseline") return "bg-ink-3";
  return "bg-ink-2";
}
