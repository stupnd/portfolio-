import { ablationRuns, tintedBars, type Feature } from "@/content/features";
import { LedgerSim } from "@/components/interactive/LedgerSim";

/** Every feature carries exactly one figure, numbered within its article. */
export function FeatureFigure({ feature }: { feature: Feature }) {
  switch (feature.figure) {
    case "trace":
      return <TraceFigure />;
    case "ablation":
      return <AblationFigure />;
    case "ledger":
      return (
        <Fig label="Fig. 1, interactive" title="Crash the consumer mid-write" caption={null} bare>
          <LedgerSim />
        </Fig>
      );
    case "tinted":
      return <TintedFigure />;
    case "glove":
      return <GloveFigure />;
  }
}

function Fig({
  label,
  title,
  caption,
  children,
  bare,
}: {
  label: string;
  title: string;
  caption: React.ReactNode;
  children: React.ReactNode;
  bare?: boolean;
}) {
  return (
    <figure>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule-strong pt-3">
        <p className="data text-[12px] text-accent">{label}</p>
        <p className="font-display text-[1.5rem] leading-tight text-ink">{title}</p>
      </div>
      <div className={bare ? "mt-4" : "mt-5 border border-rule-strong p-4 sm:p-6 lg:p-8"}>{children}</div>
      {caption && <figcaption className="mt-3 max-w-[60em] text-[15px] italic leading-snug text-ink-2">{caption}</figcaption>}
    </figure>
  );
}

const linkCls = "not-italic text-accent underline decoration-accent/40 underline-offset-[4px] hover:decoration-accent";

/* ── The $9K/month mystery ─────────────────────────────────────────── */

function TraceFigure() {
  const steps = [
    { value: "1.4B", label: "API Gateway calls on the bill", note: "Where it showed up" },
    { value: "55", label: "orphaned CloudFormation stacks", note: "Where it came from" },
    { value: "$6–9K", label: "a month, recovered", note: "What cleanup was worth" },
  ];
  return (
    <Fig
      label="Fig. 1"
      title="The trace, from the bill back to its source"
      caption="Figures from my TrendAI internship, as listed on my resume. Account and service names are internal and left out."
    >
      <ol className="grid gap-y-6 md:grid-cols-3 md:gap-x-0">
        {steps.map((s, i) => (
          <li key={s.value} className="relative md:px-6 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-rule">
            <p className="data text-[12px] text-ink-3">
              {String(i + 1).padStart(2, "0")} · {s.note}
            </p>
            <p className={`mt-2 font-display text-[3.5rem] leading-none sm:text-[4.5rem] ${i === 2 ? "text-accent" : "text-ink"}`}>
              {s.value}
            </p>
            <p className="mt-2 text-[17px] leading-snug text-ink-2">{s.label}</p>
            {i < steps.length - 1 && (
              <span aria-hidden className="data mt-4 block text-[12px] text-ink-3 md:hidden">
                ↓ traced to
              </span>
            )}
          </li>
        ))}
      </ol>
    </Fig>
  );
}

/* ── Teaching an agent to grade itself ────────────────────────────── */

const AXIS_MIN = 0.6;
const AXIS_MAX = 0.85;
const pct = (v: number) => ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;

function AblationFigure() {
  const ticks = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85];
  return (
    <Fig
      label="Fig. 1"
      title="Nine runs, one change each"
      caption={
        <>
          Mean judge score over eight rubric-scored questions, in the order the runs were recorded. The two hatched bars
          are later ideas of mine that the harness turned down. Source:{" "}
          <a href="https://github.com/stupnd/traced-research-agent/tree/main/eval/results" target="_blank" rel="noopener noreferrer" className={linkCls}>
            eval/results
          </a>{" "}
          in the traced-research-agent repo.
        </>
      }
    >
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">Mean eval score for each of nine recorded runs</caption>
        <thead>
          <tr>
            <th scope="col" className="data pb-3 text-left text-[12px] font-normal text-ink-3 sm:w-[17rem] lg:w-[20rem]">Run</th>
            <th scope="col" className="hidden pb-3 sm:table-cell">
              <span className="sr-only">Score bar</span>
              <span aria-hidden className="relative block h-4">
                {ticks.map((t) => (
                  <span
                    key={t}
                    className="data absolute top-0 -translate-x-1/2 text-[12px] font-normal text-ink-3 first:translate-x-0 last:-translate-x-full"
                    style={{ left: `${pct(t)}%` }}
                  >
                    {t.toFixed(2)}
                  </span>
                ))}
              </span>
            </th>
            <th scope="col" className="data w-[4.5rem] pb-3 text-right text-[12px] font-normal text-ink-3 sm:w-[6rem]">Score</th>
          </tr>
        </thead>
        <tbody>
          {ablationRuns.map((r, i) => (
            <tr key={r.run} className="border-t border-rule align-middle">
              <th scope="row" className="py-2.5 pr-4 text-left font-normal">
                <span className="data block text-[12px] text-ink-3">Run {i + 1}</span>
                <span className={`data block break-all text-[13px] ${r.kind === "shipped" ? "text-accent" : "text-ink"}`}>{r.run}</span>
                {r.note && <span className="block text-[14px] italic leading-snug text-ink-2">{r.note}</span>}
                {/* Phones: the bar sits under the label */}
                <Bar run={r} className="mt-2 sm:hidden" />
              </th>
              <td className="hidden py-2.5 sm:table-cell">
                <Bar run={r} />
              </td>
              <td className={`data py-2.5 pl-4 text-right text-[14px] ${r.kind === "shipped" ? "text-accent" : "text-ink"}`}>
                {r.score.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fig>
  );
}

function Bar({ run, className = "" }: { run: (typeof ablationRuns)[number]; className?: string }) {
  const tone =
    run.kind === "shipped"
      ? "bg-accent"
      : run.kind === "rejected"
        ? "border border-ink-2 bg-[repeating-linear-gradient(135deg,rgb(var(--ink-2)/0.55)_0_1.5px,transparent_1.5px_6px)]"
        : run.kind === "baseline"
          ? "bg-ink-3"
          : "bg-ink-2";
  return (
    <span aria-hidden className={`relative block h-3 ${className}`}>
      {/* The shipped score, as a hairline every run is measured against */}
      <span className="absolute inset-y-[-6px] w-px bg-accent/60" style={{ left: `${pct(0.831)}%` }} />
      <span className={`absolute inset-y-0 left-0 block ${tone}`} style={{ width: `${pct(run.score)}%` }} />
    </span>
  );
}

/* ── Why my model scored 86% in testing and 15% on real faces ─────── */

function TintedFigure() {
  return (
    <Fig
      label="Fig. 1"
      title="The same pipeline, simulated and real"
      caption={
        <>
          Share of all images classified correctly. The real-photo bars come from my own eval on 1,356 images from
          Google&rsquo;s Monk Skin Tone Examples dataset: within one Monk level, the pipeline is right on 15% of all
          photos (95% range 8 to 23%, bootstrapped by person) and 31% of the photos its quality gate accepts. The
          simulated bars use 1,200 synthetic portraits. Source: the eval output in the{" "}
          <a href="https://github.com/stupnd/tinted" target="_blank" rel="noopener noreferrer" className={linkCls}>
            tinted repo
          </a>
          .
        </>
      }
    >
      <ul className="space-y-5">
        {tintedBars.map((b) => (
          <li key={b.label} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[15rem,1fr,4rem] sm:items-center">
            <p className="leading-tight">
              <span className={`block text-[17px] ${b.real ? "text-accent" : "text-ink"}`}>{b.label}</span>
              <span className="block text-[14px] italic leading-snug text-ink-2">{b.detail}</span>
            </p>
            <span aria-hidden className="relative block h-4 bg-paper-2">
              <span className={`absolute inset-y-0 left-0 ${b.real ? "bg-accent" : "bg-ink-2"}`} style={{ width: `${b.value}%` }} />
            </span>
            <p className={`data text-[15px] sm:text-right ${b.real ? "text-accent" : "text-ink"}`}>{b.value}%</p>
          </li>
        ))}
      </ul>
    </Fig>
  );
}

/* ── A glove that talks ───────────────────────────────────────────── */

function GloveFigure() {
  const path = [
    { at: "Hand", what: "Five flex sensors", how: "One per finger, wired as voltage dividers" },
    { at: "Glove", what: "Arduino Nano ESP32", how: "Reads each finger and smooths it with a rolling average" },
    { at: "Air", what: "Bluetooth Low Energy", how: "Finger values on a mapped BLE characteristic" },
    { at: "Browser", what: "Web Bluetooth", how: "Pairs straight to the page, no app and no server" },
    { at: "Screen", what: "Live translation", how: "The pose becomes text as you sign" },
  ];
  return (
    <Fig
      label="Fig. 1"
      title="The signal path, hand to screen"
      caption="Every hop between the glove and the translation. Nothing in this path runs on a server."
    >
      <ol className="grid gap-y-5 md:grid-cols-5 md:gap-x-0">
        {path.map((p, i) => (
          <li key={p.at} className="grid grid-cols-[2.5rem,1fr] md:block md:px-4 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-rule">
            <p className="data pt-1 text-[12px] text-ink-3 md:pt-0">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <p className="caps text-[12px] text-accent md:mt-2">{p.at}</p>
              <p className="mt-1 font-display text-[1.5rem] leading-tight text-ink">{p.what}</p>
              <p className="mt-1.5 text-[15px] leading-snug text-ink-2">{p.how}</p>
            </div>
          </li>
        ))}
      </ol>
    </Fig>
  );
}
