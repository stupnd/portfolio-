"use client";

import { useEffect, useRef, useState } from "react";

const N = 120; // samples on screen
const W = 600;
const H = 160;

/**
 * Fig. 2 for Bridge: why the glove smooths. Drag the bend slider (or let it
 * flex on its own) and watch a noisy flex reading next to its rolling
 * average. Synthetic noise, clearly labelled: an illustration of the filter,
 * not recorded glove data.
 */
export function SignalSmoother() {
  const [bend, setBend] = useState(55);
  const [windowSize, setWindowSize] = useState(8);
  const [auto, setAuto] = useState(true);
  const [raw, setRaw] = useState<number[]>(() => Array.from({ length: N }, () => 55));
  const bendRef = useRef(bend);
  bendRef.current = bend;
  const autoRef = useRef(auto);
  autoRef.current = auto;
  const tRef = useRef(0);
  const visible = useRef(true);
  const box = useRef<HTMLDivElement>(null);

  const still = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Start with a full trace rather than a flat line
    setRaw(sample(bendRef.current));
    if (reduce) {
      // No scrolling plot: a still trace that redraws when a slider moves
      still.current = true;
      setAuto(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (box.current) io.observe(box.current);
    const timer = setInterval(() => {
      if (!visible.current) return;
      tRef.current += 1;
      if (autoRef.current) {
        // A slow finger curl and release
        const b = 50 + 38 * Math.sin(tRef.current / 22);
        bendRef.current = b;
        setBend(Math.round(b));
      }
      setRaw((prev) => [...prev.slice(1), clamp(bendRef.current + noise())]);
    }, 50);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const smooth = raw.map((_, i) => {
    const from = Math.max(0, i - windowSize + 1);
    const slice = raw.slice(from, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
  const path = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${((i / (N - 1)) * W).toFixed(1)},${(H - (v / 100) * H).toFixed(1)}`).join(" ");
  const latestRaw = raw[N - 1];
  const latestSmooth = smooth[N - 1];

  return (
    <div ref={box}>
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full sm:h-48" preserveAspectRatio="none" role="img" aria-label="A noisy flex-sensor reading and its rolling average, plotted over time">
            {[25, 50, 75].map((g) => (
              <line key={g} x1="0" x2={W} y1={H - (g / 100) * H} y2={H - (g / 100) * H} className="stroke-rule" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={path(raw)} fill="none" className="stroke-ink-3" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            <path d={path(smooth)} fill="none" className="stroke-accent" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-ink-2">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-px w-5 bg-ink-3" /> Raw reading <span className="data text-[12px] text-ink-3">{Math.round(latestRaw)}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-[3px] w-5 bg-accent" /> Rolling average <span className="data text-[12px] text-accent">{Math.round(latestSmooth)}</span>
            </span>
          </p>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <label className="block">
            <span className="flex items-baseline justify-between text-[16px] text-ink">
              Finger bend <span className="data text-[12px] text-ink-3">{bend}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={bend}
              onChange={(e) => {
                setAuto(false);
                setBend(Number(e.target.value));
                bendRef.current = Number(e.target.value);
                if (still.current) setRaw(sample(Number(e.target.value)));
              }}
              className="mt-2 w-full accent-[rgb(var(--accent))]"
            />
          </label>
          <label className="block">
            <span className="flex items-baseline justify-between text-[16px] text-ink">
              Smoothing window <span className="data text-[12px] text-ink-3">{windowSize} samples</span>
            </span>
            <input
              type="range"
              min={1}
              max={24}
              value={windowSize}
              onChange={(e) => setWindowSize(Number(e.target.value))}
              className="mt-2 w-full accent-[rgb(var(--accent))]"
            />
          </label>
          <button
            type="button"
            hidden={still.current}
            aria-pressed={auto}
            onClick={() => setAuto((a) => !a)}
            className="inline-flex min-h-11 items-center border border-accent px-4 text-[15px] text-accent transition-colors hover:bg-accent/10 aria-pressed:bg-accent aria-pressed:text-paper"
          >
            {auto ? "Flexing on its own" : "Let it flex on its own"}
          </button>
          <p className="text-[14px] italic leading-snug text-ink-3">
            A window of 1 is no smoothing at all. A wider window kills the jitter but lags behind the finger, which is why the
            retrospective calls for an exponential average.
          </p>
        </div>
      </div>
    </div>
  );
}

const clamp = (v: number) => Math.max(0, Math.min(100, v));
const noise = () => (Math.random() - 0.5) * 22 + (Math.random() < 0.04 ? (Math.random() - 0.5) * 40 : 0);
const sample = (bend: number) => Array.from({ length: N }, () => clamp(bend + noise()));
