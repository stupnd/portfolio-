/**
 * Per-project SVG motifs for the card headers.
 *
 * A gradient panel with nothing in it reads as a missing screenshot. Each of
 * these instead draws the shape of the actual system: partition lanes for the
 * ledger, a scoring grid for the eval agent, a tone scale for Tinted, flex
 * curves for Bridge.
 */

function Lanes() {
  // Kafka partitions carrying ordered messages
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full" aria-hidden>
      {[26, 60, 94].map((y, lane) => (
        <g key={y}>
          <line
            x1="12"
            y1={y}
            x2="308"
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={20 + i * 58 + lane * 9}
              y={y - 7}
              width="34"
              height="14"
              rx="3"
              fill="currentColor"
              fillOpacity={i === 4 - lane ? 0.55 : 0.16}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function EvalGrid() {
  // Golden-set scoring matrix: filled cells pass, hollow cells fail
  const pass = new Set([0, 1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 22, 23]);
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return (
          <rect
            key={i}
            x={28 + col * 34}
            y={22 + row * 30}
            width="22"
            height="22"
            rx="5"
            fill="currentColor"
            fillOpacity={pass.has(i) ? 0.5 : 0.1}
            stroke="currentColor"
            strokeOpacity={pass.has(i) ? 0 : 0.25}
          />
        );
      })}
    </svg>
  );
}

function ToneScale() {
  // Monk-style tone scale, light through deep
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <circle
          key={i}
          cx={34 + i * 28}
          cy={60}
          r={13}
          fill="currentColor"
          fillOpacity={0.12 + i * 0.075}
        />
      ))}
    </svg>
  );
}

function FlexCurves() {
  // Five flex sensors, one per finger
  const paths = [
    "M12 84 C 70 84, 96 30, 160 30 S 250 66, 308 66",
    "M12 74 C 78 74, 104 46, 160 46 S 242 34, 308 34",
    "M12 92 C 66 92, 110 58, 160 58 S 254 88, 308 88",
    "M12 60 C 84 60, 108 88, 160 88 S 246 52, 308 52",
    "M12 100 C 72 100, 118 74, 160 74 S 238 100, 308 100",
  ];
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full" aria-hidden>
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18 + i * 0.1}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

const motifs: Record<string, () => JSX.Element> = {
  "transaction-ledger": Lanes,
  "traced-research-agent": EvalGrid,
  tinted: ToneScale,
  bridge: FlexCurves,
};

export function ProjectMotif({ slug }: { slug: string }) {
  const Motif = motifs[slug];
  if (!Motif) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-2 h-24 text-[var(--fg)] opacity-80">
      <Motif />
    </div>
  );
}
