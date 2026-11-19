/**
 * The five features, in issue order. Every number traces to the resume or to
 * the project’s own repository; the source sits in the comment beside it.
 * No em dashes in any of this copy.
 */
export type FigureKey = "trace" | "ablation" | "ledger" | "tinted" | "glove";
export type Plate = "oxblood" | "cobalt" | "forest" | "ochre" | "plum";

export interface Feature {
  id: string;
  page: string;
  kicker: string;
  headline: string;
  dek: string;
  /** Year and stack, set in the byline row */
  meta: string;
  /** The feature's spot colour */
  plate: Plate;
  /** The teaser on the cover: a number and one line */
  cover: { figure: string; label: string; line: string };
  /** The 30-second version: three lines a skimmer reads instead of the body */
  brief: string[];
  /** Three numbers set large beside the brief */
  stats: { value: string; label: string }[];
  /** First paragraph gets the drop cap */
  body: string[];
  pull: { figure: string; label: string; quote: string };
  figure: FigureKey;
  caseStudy?: string;
  repo?: string;
}

export const features: Feature[] = [
  {
    // Resume: TrendAI, "Recovered $6–9K/month in AWS spend by tracing a 1.4B-call
    // API Gateway spike to 55 orphaned CloudFormation stacks". CloudWatch per skills.
    id: "aws-spike",
    page: "04",
    kicker: "Cost forensics",
    headline: "The $9K/month mystery",
    dek: "A 1.4-billion-call spike on an API Gateway bill, and the 55 forgotten stacks behind it.",
    meta: "TrendAI, 2026 · AWS API Gateway, CloudFormation, CloudWatch",
    body: [
      "During my internship at TrendAI, API Gateway reported 1.4 billion calls, with a bill to match. A number that size needed an explanation, so I went looking for where the calls were landing.",
      "I worked backwards in CloudWatch: from the calls, to the APIs receiving them, to the CloudFormation stacks that had created those APIs. The trail ended at 55 orphaned stacks. Each one was still deployed and still taking calls, and none of them was owned by anyone any more.",
      "Cleaning them up recovered between $6K and $9K a month.",
      "What I took from it is that infrastructure nobody owns still costs money, and a bill is a monitoring signal like any other. The trace was not clever. It was patient, and it followed one number until it ran out of places to hide.",
    ],
    pull: { figure: "55", label: "orphaned stacks", quote: "Infrastructure nobody owns still costs money." },
    figure: "trace",
    plate: "ochre",
    cover: { figure: "$6–9K", label: "a month, recovered", line: "A 1.4-billion-call AWS bill, traced to 55 forgotten stacks." },
    brief: [
      "API Gateway showed a spike of 1.4 billion calls, with a bill to match.",
      "I traced it back through CloudWatch to 55 orphaned CloudFormation stacks.",
      "Cleaning them up recovered $6–9K a month.",
    ],
    stats: [{ value: "1.4B", label: "API Gateway calls" }, { value: "55", label: "orphaned stacks" }, { value: "$6–9K", label: "a month, recovered" }],
  },
  {
    // Repo: stupnd/traced-research-agent, eval/results/*.json (nine runs, mean_score).
    id: "eval-harness",
    page: "12",
    kicker: "Applied AI",
    headline: "Teaching an agent to grade itself",
    dek: "Traced is a research agent that answers questions over lecture slides. Its eval harness decided what shipped, and it said no to two of my own ideas.",
    meta: "2026 · Python, LangGraph, FastAPI, Chroma, BM25, Groq",
    body: [
      "Anyone can wire a language model to a vector store and get answers that sound right. The hard part is knowing whether they are right, and when they are wrong, whether retrieval or synthesis is to blame. So I built the measurement first and let it decide what shipped.",
      "The harness is small on purpose: eight questions, each with explicit rubric points and a source slide, scored by an LLM judge. Two deterministic checks run beside the judge, one for whether the answer cited a real chunk and one for whether retrieval returned anything, so the model is never the only signal. Eight questions is few enough to audit by hand.",
      "Then the rule: one change per run, every trace saved. A self-critique node that scores each retrieved chunk and drops the weak ones was worth +0.09 on its own. Fusing dense retrieval with BM25 through Reciprocal Rank Fusion was the biggest win of the project, taking the mean from 0.641 to 0.831.",
      "The two runs after that were mine too. An IDF-weighted fusion scored 0.740 and a second revision scored 0.699, both worse than the version they were meant to beat. I kept the simpler one. The confidence-check node is still a stub that always returns 1.0, and I would rather say so than imply a feedback loop I have not finished.",
    ],
    pull: { figure: "0.831", label: "mean score, from 0.641", quote: "The harness turned down two of my own ideas, and it was right both times." },
    figure: "ablation",
    plate: "cobalt",
    cover: { figure: "0.831", label: "eval score, from 0.641", line: "The harness that decided what shipped, and said no to two of my ideas." },
    brief: [
      "I built the eval harness before tuning the agent: eight rubric-scored questions and an LLM judge.",
      "Nine runs, one change each. Hybrid retrieval with RRF took the mean from 0.641 to 0.831.",
      "Two later ideas of mine scored worse, so they didn’t ship. Tap any run in the chart.",
    ],
    stats: [{ value: "0.831", label: "mean score, from 0.641" }, { value: "9", label: "recorded runs" }, { value: "2", label: "of my ideas rejected" }],
    caseStudy: "traced-research-agent",
    repo: "https://github.com/stupnd/traced-research-agent",
  },
  {
    // Case study + repo stupnd/Transaction-Ingestion-Service (31 tests, 4 Testcontainers).
    id: "ledger",
    page: "20",
    kicker: "Distributed systems",
    headline: "Exactly once, even when it crashes",
    dek: "An event-driven ledger that never loses a transaction and never applies one twice. Fig. 1 lets you crash it yourself.",
    meta: "2026 · Java 21, Spring Boot, Kafka, PostgreSQL, Prometheus, Grafana",
    body: [
      "A ledger has to apply transactions in order, even when they arrive out of order and the service dies halfway through a write. This one accepts writes over REST, answers 202 straight away, and applies balances asynchronously through Kafka.",
      "Kafka promises at-least-once delivery, which means a crash brings the message back. The dangerous moment is a crash after the balance is written but before the offset is committed: the message returns, and without a guard the account is charged twice. Offsets here commit only after the balance is durably applied, so a crash means redelivery, never loss.",
      "The guard is three idempotency layers, because any one alone has a gap: a unique key at submission, a processed-state check at consumption, and an atomic status-plus-balance commit that makes the check trustworthy. Money is stored as integer minor units, and optimistic locking turns a cross-partition race into a retry instead of a silent overwrite.",
      "31 tests pin the claims, four of them Testcontainers runs against real Postgres and real Kafka. If I did it again I would add the Kubernetes deployment earlier, because the interesting question is what breaks during a rolling restart.",
    ],
    pull: { figure: "31", label: "tests, 4 against real Kafka", quote: "At-least-once delivery, exactly-once effects." },
    figure: "ledger",
    plate: "oxblood",
    cover: { figure: "31", label: "tests, 4 on real Kafka", line: "A ledger you can crash yourself. It still charges you once." },
    brief: [
      "Kafka delivers at least once, so a crash brings a message back.",
      "Three idempotency layers make sure the balance moves exactly once anyway.",
      "31 tests prove it. Below, you can crash it yourself, and switch the guard off.",
    ],
    stats: [{ value: "31", label: "tests" }, { value: "4", label: "against real Kafka" }, { value: "3", label: "idempotency layers" }],
    caseStudy: "transaction-ledger",
    repo: "https://github.com/stupnd/Transaction-Ingestion-Service",
  },
  {
    // Repo: stupnd/tinted, frontend/lib/eval-report.json (simulation) and
    // frontend/lib/mste-report.json (MST-E photos), plus README "On real photographs".
    id: "tinted",
    page: "28",
    kicker: "Computer vision",
    headline: "Why my model scored 86% in testing and 15% on real faces",
    dek: "Tinted reads skin tone across the full Monk scale. Getting there meant finding out what a tidy test set was hiding.",
    meta: "2026 · FastAPI, MediaPipe, OpenCV, CLIP, Next.js",
    body: [
      "Most beauty tech gets skin tone wrong for anyone who isn’t light-skinned, because white balance and lighting swamp the signal. Tinted corrects for lighting in LAB colour space, samples 17 patches of flat skin, and classifies tone on the ten-point Monk scale, which was built with real coverage of deeper tones.",
      "I tested it first in simulation: 1,200 synthetic portraits with known skin colour under daylight, a warm bulb, cool shade and low light. It scored well, 86% exact in simulated daylight, and it earned its keep by finding a real bug. The exposure gate was refusing a third of the palest faces in daylight. After the fix, daylight refusals fell from 12% to 2%.",
      "Then I ran it on real photographs: Google’s Monk Skin Tone Examples, 1,356 photos of 19 people with expert labels. Within one Monk level, it was right on 15% of them. Readings collapsed toward the middle of the scale, with pale skin reading four to five levels deep and deep skin one to two levels light.",
      "The simulation had missed it because its virtual camera exposed every face correctly. Real phones normalise face brightness, and the classifier compares absolute colour. The fix I have planned normalises exposure against the whites of the eyes and classifies relative colour. The dataset is for evaluation only and is never used for tuning.",
    ],
    pull: { figure: "15%", label: "within one level, on real faces", quote: "My simulated camera exposed every face perfectly. Real phones don’t." },
    figure: "tinted",
    plate: "plum",
    cover: { figure: "15%", label: "on real faces", line: "What my 84% simulation was hiding, level by level." },
    brief: [
      "Tinted classifies skin tone on the ten-point Monk scale.",
      "In simulation it landed within one level 84% of the time. On 1,356 real photos, 15%.",
      "The simulated camera exposed every face perfectly. Real phones don’t. Flip the chart to see where it broke.",
    ],
    stats: [{ value: "84%", label: "in simulation" }, { value: "15%", label: "on real photos" }, { value: "1,356", label: "photos tested" }],
    caseStudy: "tinted",
    repo: "https://github.com/stupnd/tinted",
  },
  {
    // Case study: Bridge.
    id: "bridge",
    page: "34",
    kicker: "Hardware",
    headline: "A glove that talks",
    dek: "Bridge reads American Sign Language through flex sensors on an ESP32 and translates it in the browser, live, over Bluetooth.",
    meta: "2025 to 2026 · Arduino Nano ESP32, BLE, Web Bluetooth, React Native",
    body: [
      "Sign language users shouldn’t need an interpreter for everyday interactions. Bridge is a glove that reads hand poses through flex sensors and translates them in the browser in real time.",
      "Each finger carries a flex sensor wired as a voltage divider: cheap, readable, one value per finger, with a rolling average to kill jitter. An IMU would capture motion better, but it needs a training pipeline the timeline didn’t allow.",
      "The glove talks Bluetooth Low Energy straight to a web page. No install, no backend, no relay latency. The cost is Web Bluetooth’s patchy support on iOS. I designed the sensor calibration flow and the BLE characteristic mapping.",
      "Next time I would replace the manual per-user calibration with a guided routine that fits finger ranges automatically, and swap the rolling average for an exponential one to respond faster at the same smoothing. Built with Krisha Veera, Lana Othman, Sahil Shukla and Salim Aissaoui.",
    ],
    pull: { figure: "0", label: "servers between glove and page", quote: "The glove pairs directly to a web page." },
    figure: "glove",
    plate: "forest",
    cover: { figure: "0", label: "servers in the path", line: "A glove that signs to a web page over Bluetooth." },
    brief: [
      "A glove with a flex sensor on each finger reads hand poses.",
      "An ESP32 streams them over Bluetooth Low Energy straight to a web page.",
      "The browser translates ASL live. No app, no server.",
    ],
    stats: [{ value: "5", label: "flex sensors" }, { value: "0", label: "servers" }, { value: "1", label: "web page" }],
    caseStudy: "bridge",
    repo: "https://github.com/stupnd/Bridge",
  },
];

/** Traced eval runs, in the order they were recorded (eval/results/*.json). */
export const ablationRuns: { run: string; score: number; note?: string; kind?: "baseline" | "shipped" | "rejected" }[] = [
  { run: "baseline", score: 0.641, note: "Starting point", kind: "baseline" },
  { run: "with-self-critique", score: 0.734, note: "Self-critique node, +0.093" },
  { run: "deeper-retrieval-strict-critique", score: 0.677 },
  { run: "gentle-n5", score: 0.644 },
  { run: "n3-better-synth", score: 0.664 },
  { run: "targeted-fixes", score: 0.728 },
  { run: "hybrid-rrf", score: 0.831, note: "Dense + BM25, fused with RRF. Shipped", kind: "shipped" },
  { run: "hybrid-rrf-idf", score: 0.74, note: "My idea. Rejected", kind: "rejected" },
  { run: "hybrid-rrf-v2", score: 0.699, note: "My idea. Rejected", kind: "rejected" },
];
