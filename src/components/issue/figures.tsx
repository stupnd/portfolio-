import type { Feature } from "@/content/features";
import { LedgerSim } from "@/components/interactive/LedgerSim";
import { AblationExplorer } from "@/components/figures/AblationExplorer";
import { TintedLevels } from "@/components/figures/TintedLevels";
import { SignalSmoother } from "@/components/figures/SignalSmoother";
import { CountUp, InView } from "@/components/motion/InView";

/** Every feature carries at least one figure, numbered within its article. */
export function FeatureFigure({ feature }: { feature: Feature }) {
  switch (feature.figure) {
    case "trace":
      return <TraceFigure />;
    case "ablation":
      return (
        <Fig
          label="Fig. 1, interactive"
          title="Nine runs, one change each"
          caption={
            <>
              Mean judge score over eight rubric-scored questions, in the order the runs were recorded. Source:{" "}
              <a href="https://github.com/stupnd/traced-research-agent/tree/main/eval/results" target="_blank" rel="noopener noreferrer" className={linkCls}>
                eval/results
              </a>{" "}
              in the traced-research-agent repo.
            </>
          }
        >
          <AblationExplorer />
        </Fig>
      );
    case "ledger":
      return (
        <Fig label="Fig. 1, interactive" title="Crash the consumer mid-write" caption={null} bare>
          <LedgerSim />
        </Fig>
      );
    case "tinted":
      return (
        <Fig
          label="Fig. 1, interactive"
          title="Where the real photos broke it"
          caption={
            <>
              Within one Monk level, as a share of all images, so refusals count as misses. Real photos: my eval on 1,356
              images from Google&rsquo;s Monk Skin Tone Examples dataset, 15% overall (95% range 8 to 23%, bootstrapped by
              person). Simulated: 1,200 synthetic portraits under four lights. Source: the eval output in the{" "}
              <a href="https://github.com/stupnd/tinted" target="_blank" rel="noopener noreferrer" className={linkCls}>
                tinted repo
              </a>
              .
            </>
          }
        >
          <TintedLevels />
        </Fig>
      );
    case "glove":
      return (
        <div className="space-y-14">
          <GloveFigure />
          <Fig
            label="Fig. 2, interactive"
            title="Why the glove smooths its readings"
            caption="An illustration of the filter with synthetic noise, not recorded glove data."
          >
            <SignalSmoother />
          </Fig>
        </div>
      );
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
        <p className="font-display text-[1.75rem] leading-tight text-ink">{title}</p>
      </div>
      <div className={bare ? "mt-4" : "mt-5 border border-rule-strong p-4 sm:p-6 lg:p-8"}>{children}</div>
      {caption && <figcaption className="mt-3 max-w-[60em] text-[15px] italic leading-snug text-ink-2">{caption}</figcaption>}
    </figure>
  );
}

const linkCls = "not-italic text-accent underline decoration-accent/40 underline-offset-[4px] hover:decoration-accent";

/* ── The $9K/month mystery: the trace lands one step at a time ─────── */

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
      <InView as="ol" className="grid gap-y-6 md:grid-cols-3 md:gap-x-0">
        {steps.map((s, i) => (
          <li
            key={s.value}
            className="rv relative md:px-6 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-rule"
            style={{ ["--i" as string]: i * 3 }}
          >
            <p className="data text-[12px] text-ink-3">
              {String(i + 1).padStart(2, "0")} · {s.note}
            </p>
            <p className={`mt-2 font-display text-[3.5rem] leading-none sm:text-[4.5rem] ${i === 2 ? "text-accent" : "text-ink"}`}>
              <CountUp value={s.value} duration={1100 + i * 300} />
            </p>
            <p className="mt-2 text-[17px] leading-snug text-ink-2">{s.label}</p>
            {i < steps.length - 1 && (
              <span aria-hidden className="data mt-4 block text-[12px] text-accent md:absolute md:right-[-0.6rem] md:top-1/2 md:mt-0 md:bg-paper md:px-1">
                <span className="md:hidden">↓ traced to</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </InView>
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
    <Fig label="Fig. 1" title="The signal path, hand to screen" caption="Every hop between the glove and the translation. Nothing in this path runs on a server.">
      <InView as="ol" className="grid gap-y-5 md:grid-cols-5 md:gap-x-0">
        {path.map((p, i) => (
          <li
            key={p.at}
            className="rv grid grid-cols-[2.5rem,1fr] md:block md:px-4 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-rule"
            style={{ ["--i" as string]: i }}
          >
            <p className="data pt-1 text-[12px] text-ink-3 md:pt-0">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <p className="caps text-[12px] text-accent md:mt-2">{p.at}</p>
              <p className="mt-1 font-display text-[1.5rem] leading-tight text-ink">{p.what}</p>
              <p className="mt-1.5 text-[15px] leading-snug text-ink-2">{p.how}</p>
            </div>
          </li>
        ))}
      </InView>
    </Fig>
  );
}
