"use client";

import { useState } from "react";
import { evidence } from "@/content/evidence";
import { InView } from "@/components/motion/InView";

type Mode = "compare" | "sim" | "real";

/**
 * Fig. 1 for Tinted: within-one accuracy at each of the ten Monk levels, each
 * column keyed by its real Monk reference colour. Flip between the simulation
 * and the MST-E photographs and the light end of the scale collapses to zero.
 */
export function TintedLevels() {
  const [mode, setMode] = useState<Mode>("compare");
  const { levels, simAll, realAll } = evidence.tinted;
  const modes: { key: Mode; label: string }[] = [
    { key: "sim", label: "Simulated" },
    { key: "real", label: "Real photos" },
    { key: "compare", label: "Both" },
  ];

  return (
    <InView>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div role="radiogroup" aria-label="Which evaluation to show" className="inline-flex border border-accent">
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              role="radio"
              aria-checked={mode === m.key}
              onClick={() => setMode(m.key)}
              className={`min-h-11 px-4 text-[15px] transition-colors [&+button]:border-l [&+button]:border-accent ${
                mode === m.key ? "bg-accent text-paper" : "text-accent hover:bg-accent/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <dl className="flex gap-8">
          <div className={`transition-opacity ${mode === "real" ? "opacity-40" : ""}`}>
            <dt className="data text-[12px] text-ink-3">Simulated, overall</dt>
            <dd className="font-display text-[3rem] leading-none text-ink">{simAll}%</dd>
          </div>
          <div className={`transition-opacity ${mode === "sim" ? "opacity-40" : ""}`}>
            <dt className="data text-[12px] text-ink-3">Real photos, overall</dt>
            <dd className="font-display text-[3rem] leading-none text-accent">{realAll}%</dd>
          </div>
        </dl>
      </div>

      {/* Columns */}
      <div className="mt-8 grid grid-cols-10 gap-1.5 sm:gap-3">
        {levels.map((l, i) => (
          <div key={l.level} className="flex flex-col">
            <div className="relative h-48 border-b border-ink sm:h-64" aria-hidden>
              <div className="absolute inset-0 flex items-end justify-center gap-[3px]">
                {mode !== "real" && (
                  <span
                    className={`rv-col block w-full max-w-[1.75rem] bg-ink-2 transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mode === "compare" ? "opacity-45" : ""}`}
                    style={{ height: `${l.sim}%`, ["--i" as string]: i }}
                  />
                )}
                {mode !== "sim" && (
                  <span
                    className="rv-col block w-full max-w-[1.75rem] bg-accent transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ height: `${Math.max(l.real, 0.6)}%`, ["--i" as string]: i }}
                  />
                )}
              </div>
            </div>
            <span
              aria-hidden
              className="mx-auto mt-2 block h-5 w-5 rounded-full ring-1 ring-ink/25 sm:h-7 sm:w-7"
              style={{ backgroundColor: l.hex }}
            />
            <span className="data mt-1 text-center text-[12px] text-ink-3">{l.level}</span>
            <span className="data hidden text-center text-[12px] leading-tight sm:block">
              {mode !== "real" && <span className="block text-ink-2">{l.sim}%</span>}
              {mode !== "sim" && <span className="block text-accent">{l.real}%</span>}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-ink-2">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 bg-ink-2" /> Simulated portraits
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 bg-accent" /> Real photos (MST-E)
        </span>
        <span className="italic text-ink-3">Monk level 1 is the palest, 10 the deepest. Each swatch is that level’s reference colour.</span>
      </p>

      {/* The same data as a table, for screen readers */}
      <table className="sr-only">
        <caption>Within-one accuracy by Monk level, simulated and real photos</caption>
        <thead>
          <tr>
            <th scope="col">Monk level</th>
            <th scope="col">Simulated</th>
            <th scope="col">Real photos</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((l) => (
            <tr key={l.level}>
              <th scope="row">{l.level}</th>
              <td>{l.sim}%</td>
              <td>{l.real}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InView>
  );
}
