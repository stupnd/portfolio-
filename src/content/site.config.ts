import type { SiteConfig } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for every word on the site.
 *  Edit this file only; every page and section updates automatically.
 *
 *  Content rule (from the resume master file): nothing goes here
 *  that isn’t in the master file at "Used" depth or above. Keep it
 *  defensible. Every number on this site has a source.
 * ─────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  /**
   * The magazine frame. Page numbers are folios for the conceit, not claims.
   * No em dashes anywhere in site copy.
   */
  issue: {
    number: "01",
    season: "Fall 2026",
    coverLine: "I build AI that holds up.",
    dek: "AI and backend engineer. Computer Engineering at uOttawa, graduating December 2026.",
    cover: {
      src: "/photos/cover-stairs.webp",
      alt: "Stuti Pandya standing on a red staircase in a glass atrium, smiling at the camera",
      caption: "On the cover: Stuti Pandya, editor and sole contributor to this issue.",
      width: 1500,
      height: 2000,
    },
    features: [
      {
        page: "04",
        title: "The $9K/month mystery",
        hook: "A 1.4-billion-call spike on TrendAI’s API Gateway bill, traced to 55 orphaned CloudFormation stacks. Recovered: $6–9K a month.",
        href: "#aws-spike",
      },
      {
        page: "12",
        title: "Teaching an agent to grade itself",
        hook: "Traced’s eval harness lifted mean score from 0.641 to 0.831 over nine ablations, and turned down two of my own ideas.",
        href: "#eval-harness",
      },
      {
        page: "20",
        title: "Exactly once, even when it crashes",
        hook: "A Kafka ledger that never applies a transaction twice. Fig. 1 lets you crash it yourself.",
        href: "#ledger",
      },
      {
        page: "28",
        title: "Why my model scored 86% in testing and 15% on real faces",
        hook: "Tinted reads skin tone across the full Monk scale. Getting there meant finding out what a tidy test set was hiding.",
        href: "#tinted",
      },
      {
        page: "34",
        title: "A glove that talks",
        hook: "Bridge: flex sensors on an ESP32, streaming ASL to the browser over Bluetooth.",
        href: "#bridge",
      },
    ],
    departments: [
      {
        page: "40",
        title: "Contributors' notes",
        hook: "TrendAI, Solace and Natural Resources Canada, newest first.",
        href: "#notes",
      },
      {
        page: "44",
        title: "Off the page",
        hook: "Chairing IEEE Women in Engineering, a 100-person hackathon, a mentorship program, and second place at an AI hackathon.",
        href: "#off-the-page",
      },
      {
        page: "46",
        title: "Behind the byline",
        hook: "The editor, off deadline: home, a few lakes, and one uncooperative flock of flamingos.",
        href: "#behind-the-byline",
      },
      {
        page: "48",
        title: "Letters to the editor",
        hook: "Email, resume, LinkedIn and GitHub.",
        href: "#letters",
      },
    ],
  },
  name: "Stuti Pandya",
  firstName: "Stuti",
  initials: "SP",
  location: "Ottawa, Canada",
  email: "stuti.pandya0@gmail.com",

  /**
   * Recruiter summary card. This is the first thing a hiring manager reads,
   * so keep it concrete: role titles they actually post, and a real start date.
   */
  lookingFor: {
    roles: ["Applied AI Engineer", "Backend Engineer"],
    available: "2027",
    locations: "Ottawa, Toronto, Waterloo, Vancouver, or remote in Canada",
    authorization: "Legally able to work in Canada full time",
    note: "Graduating December 2026 with a BASc in Computer Engineering. Three internships across four terms, and legally able to work in Canada full time.",
  },
  // Copy of Stuti_Pandya_Resume.pdf; `npm run build` fails if it’s missing
  resumeUrl: "/resume.pdf",
  siteUrl: "https://stutipnd.net",

  socials: [
    { label: "GitHub", url: "https://github.com/stupnd" },
    { label: "LinkedIn", url: "https://linkedin.com/in/stuti-pandya-6a8bab258" },
  ],

  experience: [
    {
      company: "TrendAI (Trend Micro)",
      role: "Software Developer Intern, AI Security & Container Security",
      period: "May 2026 – Present",
      location: "Ottawa",
      stack: ["Go", "React", "DuckDB", "Kubernetes", "EKS", "Helm", "AWS", "GitHub Actions"],
      highlights: [
        "Recovered $6–9K/month in AWS spend by tracing a 1.4B-call API Gateway spike to 55 orphaned CloudFormation stacks.",
        "Shipped a package-license feature across 2 public REST endpoints on a DuckDB-backed Go API and the React inventory UI.",
        "Cleared 81 distinct CVEs across four service images by bumping Go stdlib, OpenSSL/libcrypto, and x/crypto.",
      ],
      details: [
        "Built a firstDetected date-range filter on the vulnerability endpoints and React UI, resolving timezone and bound edge cases.",
        "Deployed Helm manifests setting Kubernetes CPU/memory limits for the admission-controller and policy-operator on EKS.",
        "Automated Cosign image signing in GitHub Actions CI/CD, hardening a forked action against path-traversal on image refs.",
      ],
    },
    {
      company: "Solace",
      role: "Support Engineer Intern",
      period: "Sept 2025 – Dec 2025",
      location: "Ottawa",
      stack: ["MQTT", "AMQP", "JMS", "REST", "WebSocket", "Kubernetes"],
      highlights: [
        "Reproduced event broker defects and partnered with R&D to validate and ship fixes.",
        "Debugged distributed messaging across hybrid cloud; wrote postmortems tracing root causes through broker and client layers.",
      ],
      details: [
        "Supported enterprise customers running event-driven platforms on AWS, Azure, GCP, and Kubernetes, reducing escalations.",
        "The MQTT/AMQP/JMS depth here is the same intuition behind my Kafka ledger project.",
      ],
    },
    {
      company: "Natural Resources Canada",
      role: "Software Developer Intern, 2 co-op terms",
      period: "May 2024 – Aug 2025",
      location: "Ottawa",
      stack: ["Salesforce", "Apex", "C#", "Oracle SQL", "PowerShell"],
      highlights: [
        "Optimized Oracle SQL queries and dashboards to run 30% faster, via join restructuring and indexed views.",
        "Built a C# bulk import tool and automated Salesforce sandbox refresh with Apex and PowerShell.",
      ],
      details: [
        "Resolved scientific-notation edge cases in legacy data during the bulk import.",
        "Invited back for a second co-op term.",
      ],
    },
  ],

  projects: [
    {
      slug: "transaction-ledger",
      title: "Transaction Ledger Service",
      tagline:
        "An event-driven ledger that never loses or double-applies a transaction, even when it crashes mid-write.",
      year: "2026",
      stack: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "Next.js", "Prometheus", "Grafana"],
      featured: true,
      repoUrl: "https://github.com/stupnd/Transaction-Ingestion-Service",
      // No hosted demo by design: standing up a broker and Postgres to show an
      // empty dashboard isn’t worth it. Instead the case study embeds a
      // client-side simulation of the exactly-once guarantee, which is the part
      // worth seeing anyway.
      demo: "ledger-sim",
      caseStudy: {
        problem:
          "A ledger has to apply transactions in order, even when they arrive out of order and the service crashes mid-write. This one accepts writes over REST, returns 202 instantly, and applies balances asynchronously through Kafka. Nothing gets lost, nothing gets applied twice.",
        decisions: [
          {
            decision: "Partition Kafka by account ID",
            alternative: "one global ordering key",
            tradeoff:
              "Per-account ordering is all a ledger needs, and it lets consumers scale out. The cost: no global order, and a hot account can skew a partition.",
          },
          {
            decision: "Manual offset acknowledgement",
            alternative: "auto-commit",
            tradeoff:
              "Offsets commit only after the balance is durably applied, so a crash means redelivery, not loss. The consumer is idempotent, and the tests prove exactly-once effects.",
          },
          {
            decision: "Backoff retries (1s/2s/4s), then a dead-letter topic that preserves the partition, with an admin replay endpoint",
            alternative: "infinite retry or drop-on-failure",
            tradeoff:
              "Poison messages can’t block a partition, and nothing silently disappears. Keeping the partition number on the DLT record means per-account grouping survives the detour, and replay runs under its own consumer group so committed offsets stop it redoing old work. The cost is one more thing to monitor.",
          },
          {
            decision: "ErrorHandlingDeserializer wrapping the JSON deserializer",
            alternative: "letting deserialization throw",
            tradeoff:
              "A single malformed payload would otherwise crash-loop the listener forever, since the poison record is redelivered before it can ever be skipped. Wrapping it routes the bad message to the DLT and lets the partition keep moving.",
          },
          {
            decision: "Insufficient funds returns a rejection instead of throwing",
            alternative: "throwing on any failed transaction",
            tradeoff:
              "A business rejection is a valid outcome, not an incident. Throwing would burn three retries and about seven seconds of head-of-line blocking on that partition, then pollute the DLT with things that were never broken.",
          },
          {
            decision: "Money as integer minor units, plus @Version optimistic locking on accounts",
            alternative: "floats and last-write-wins",
            tradeoff:
              "Integers kill float rounding outright. Locking matters because a transfer credits the counterparty’s row from a different partition’s consumer thread, so per-account ordering alone does not prevent a lost update. Optimistic locking turns that race into a retry instead of a silent overwrite.",
          },
          {
            decision: "Three independent idempotency layers",
            alternative: "trusting one uniqueness check",
            tradeoff:
              "A unique idempotency key at submission, a processed-state guard at consumption, and an atomic status-plus-balance commit that makes the guard trustworthy. Any one alone has a gap; together at-least-once delivery becomes effectively-once processing. A duplicate key on a still-pending transaction even re-publishes the event, so a client retry doubles as crash recovery.",
          },
        ],
        evidence: [
          "31 tests across 8 classes, including 4 Testcontainers integration tests against real Postgres and real Kafka. Each one pins a specific design claim rather than covering lines: async round trip, submission-order application, exactly-once effect under redelivery, and DLT-to-replay recovery.",
          "Async assertions use Awaitility rather than sleeps, so the suite is neither flaky nor artificially slow.",
          "Four custom Micrometer meters feed Prometheus with histogram buckets, so p99 is computed properly rather than approximated, and consumer lag comes from Kafka’s own client metrics instead of a hand-rolled estimate.",
          "A 7-panel Grafana dashboard is provisioned from the repo: throughput by outcome, submit-to-posted latency, consumer lag by partition, rejection rate, and dead-letter rate.",
          "Correlation IDs flow from the HTTP thread through the MDC into Kafka headers and out to the consumer thread, so one async request is traceable across threads in every log line.",
          "Status changes broadcast over SSE only after the transaction commits, so the dashboard can never show a state that later rolls back.",
          "One command brings up Postgres 16, Kafka 3.9.1 in KRaft mode, Prometheus, and Grafana with healthchecks; CI runs backend, frontend, and a gated Docker build.",
        ],
        retrospective:
          "I’d add the Kubernetes deployment earlier. The interesting question a ledger has to answer is what breaks during a rolling restart, and how the consumer group rebalance is handled. That’s the difference between running a system and operating it. In progress now.",
      },
    },
    {
      slug: "traced-research-agent",
      title: "traced-research-agent",
      tagline:
        "A RAG research agent with the part most demos skip: an eval harness that proves it works.",
      year: "2026",
      stack: ["Python", "LangGraph", "FastAPI", "Chroma", "BM25", "RRF", "Groq"],
      featured: true,
      repoUrl: "https://github.com/stupnd/traced-research-agent",
      caseStudy: {
        problem:
          "Anyone can wire an LLM to a vector store and get plausible-sounding answers. The hard part is knowing whether they’re right, and when they’re wrong, whether retrieval or synthesis is to blame. So I built the measurement first, then let it decide what shipped.",
        decisions: [
          {
            decision: "Hybrid dense + BM25 retrieval fused with Reciprocal Rank Fusion",
            alternative: "pure vector similarity",
            tradeoff:
              "Embeddings miss exact terminology and BM25 misses paraphrase, so each covers the other’s blind spot. RRF (k=60) merges both rankings without tuning a weight. This was the single biggest win of the whole project: 0.641 to 0.831.",
          },
          {
            decision: "An LLM self-critique node that scores each chunk 1 to 5 and drops anything under 3",
            alternative: "passing everything retrieved straight to synthesis",
            tradeoff:
              "Precision beats recall once the synthesizer is the bottleneck, since irrelevant context actively degrades answers. Worth +0.09 on its own, at the cost of one extra LLM call per question.",
          },
          {
            decision: "8 rubric-scored questions with an LLM-as-judge scorer",
            alternative: "eyeballing or exact-match",
            tradeoff:
              "Exact match fails on paraphrase; eyeballing drifts. Each question carries explicit rubric points and a source slide, and two deterministic checks (did it cite a real chunk, did retrieval return anything) run alongside the model score so the judge is never the only signal. The set stays small enough to audit by hand.",
          },
          {
            decision: "One change per run, nine runs, every trace persisted",
            alternative: "tuning the whole pipeline at once",
            tradeoff:
              "Swapping one stage at a time shows exactly where each gain came from. Slower than vibes-driven tuning, but it is the only reason I could tell an improvement from a regression.",
          },
          {
            decision: "SSE streaming",
            alternative: "blocking request/response",
            tradeoff:
              "Agent runs are slow. Streaming intermediate steps is the difference between a usable tool and a spinner.",
          },
        ],
        evidence: [
          "Mean score 0.641 to 0.831 across nine recorded ablations, each attributable to one specific change.",
          "The harness rejected two of my own later ideas: hybrid-rrf-idf scored 0.740 and hybrid-rrf-v2 scored 0.699, both worse than the 0.831 they were meant to beat, so I kept the simpler implementation.",
          "Every run persists per-question traces, citations, judge reasoning, and elapsed time to a named JSON file, so any two runs can be compared after the fact.",
          "Five LangGraph nodes stream to the UI over SSE, so the agent’s reasoning is visible while it runs rather than after.",
        ],
        retrospective:
          "The confidence-check node is still a stub that always returns 1.0, so the conditional retry edge it was meant to trigger never fires. It is wired but inert, and I would rather say that than imply a feedback loop I have not finished. The lecture-slides corpus is also a toy and deserves something messier. Next: extracting the harness into a standalone retrieval-eval tool with recall@k and MRR, per-stage failure attribution, and a GitHub Action that fails builds on regression.",
      },
    },
    {
      slug: "tinted",
      title: "Tinted",
      tagline:
        "Computer vision that gets skin tone right across the full range, then recommends makeup that actually matches.",
      year: "2026",
      stack: ["FastAPI", "React 19", "Next.js", "MediaPipe", "OpenCV", "CLIP", "Claude Haiku"],
      featured: true,
      repoUrl: "https://github.com/stupnd/tinted",
      caseStudy: {
        problem:
          "Most beauty tech gets skin tone wrong for anyone who isn’t light-skinned, because camera white balance and lighting swamp the signal. Tinted corrects for that and classifies tone across the full Monk scale.",
        decisions: [
          {
            decision: "Classical CV preprocessing in LAB color space",
            alternative: "raw RGB into a model",
            tradeoff:
              "Lighting is the dominant error source, and correcting it deterministically beats hoping a model learns invariance. LAB separates lightness from color so classification works on the right axes.",
          },
          {
            decision: "Monk Skin Tone scale",
            alternative: "the older Fitzpatrick scale",
            tradeoff:
              "Monk was built for inclusive tech, with real coverage of deeper skin tones. That’s the exact failure mode this project exists to avoid.",
          },
          {
            decision: "CLIP shade matching with embeddings precomputed at import",
            alternative: "a hand-built rules engine, or embedding per request",
            tradeoff:
              "CLIP matches visual similarity without labelling thousands of products, and precomputing the whole catalogue reduces per-request work to one matrix multiply. There’s a Lab-distance fallback if the model fails to load, so the feature degrades instead of dying.",
          },
          {
            decision: "A four-check quality gate that refuses the image",
            alternative: "always returning an answer",
            tradeoff:
              "Blur, over/under-exposure, yaw and pitch are each checked with a specific, actionable error message. For a product whose whole purpose is getting tone right, a clear refusal beats a confidently wrong reading. The pitch estimator is still marked provisional in the code pending calibration across the eval set.",
          },
          {
            decision: "Per-patch outlier rejection with a hard floor on survivors",
            alternative: "averaging every sampled patch",
            tradeoff:
              "17 landmark patches are sampled on flat malar and forehead skin, then discarded if they read as an edge, a specular highlight, or deep shadow, with a 10 percent trimmed mean over what remains. If fewer than five patches survive, the request fails rather than guessing.",
          },
          {
            decision: "Sliding-window rate limits plus a fail-closed daily spend cap",
            alternative: "trusting upstream quotas",
            tradeoff:
              "Per-minute and per-day limits with correct Retry-After headers and bounded memory, on top of a cap that meters real token usage against model pricing and stops at a dollar ceiling. A public demo calling a paid API needs a hard spending floor, not good intentions.",
          },
        ],
        evidence: [
          "146-test pytest suite across the preprocessing and classification pipeline, plus an offline harness scoring accuracy across 3 lighting sets.",
          "Deployed end to end: 8 FastAPI REST routes on Render, Next.js 16 and React 19 on Vercel, behind a typed API client.",
          "The seven-stage pipeline streams over SSE from a worker thread, so the UI narrates each stage instead of showing a spinner.",
          "Classification returns the distance to all ten Monk reference tones, not just the winner, so the UI can show a range with match scores and let the user override.",
          "Interface colours are held to measured WCAG AA contrast, and the palette is deliberately near-neutral because a tinted background shifts perceived skin tone and would corrupt the exact judgement the product exists to make.",
        ],
        retrospective:
          "The offline harness splits accuracy by lighting condition, not by tone. Next I’d extend it to a labeled set of diverse faces with per-Monk-tone accuracy, so a regression on deeper skin tones can’t hide inside an average.",
      },
    },
    {
      slug: "bridge",
      title: "Bridge",
      tagline:
        "An ASL translation glove: flex sensors on an ESP32, streaming straight to the browser over Bluetooth.",
      year: "2025–2026",
      stack: ["Arduino Nano ESP32", "BLE", "React Native", "Web Bluetooth"],
      featured: true,
      repoUrl: "https://github.com/stupnd/Bridge",
      caseStudy: {
        problem:
          "Sign language users shouldn’t need an interpreter for everyday interactions. Bridge reads hand poses through flex sensors and translates them in the browser, in real time.",
        decisions: [
          {
            decision: "Flex sensors as voltage dividers",
            alternative: "IMU gesture recognition",
            tradeoff:
              "Cheap, readable, per-finger, with a rolling average to kill jitter. IMUs capture motion better but need a training pipeline the timeline didn’t allow.",
          },
          {
            decision: "BLE straight to the browser",
            alternative: "a phone app or relay server",
            tradeoff:
              "No install, no backend, no relay latency. The glove pairs directly to a web page. The cost is Web Bluetooth’s spotty support on iOS.",
          },
        ],
        evidence: [
          "Working end-to-end demo: glove → BLE → live translation in the browser.",
          "I designed the sensor calibration flow and BLE characteristic mapping.",
          "Built with Krisha Veera, Lana Othman, Sahil Shukla, and Salim Aissaoui.",
        ],
        retrospective:
          "I’d replace the manual per-user calibration with a guided routine that fits finger ranges automatically, and swap the rolling average for an exponential one for faster response at the same smoothing.",
      },
    },
  ],

  miniProjects: [
    {
      title: "Cycling Community App",
      description: "Android app for forming riding groups. Deployed and used by a local riding community.",
      stack: ["Java", "Firebase", "Android"],
      repoUrl: "https://github.com/stupnd/cycling_app",
    },
    {
      title: "Continuity Copilot",
      description:
        "AI pre-visit briefings for family doctors. 2nd place, Hackers & Healers hackathon.",
      stack: ["LangGraph", "GPT-4o", "HAPI FHIR", "React"],
    },
    {
      title: "Aerial Image Segmentation",
      description:
        "UNet trained from scratch to spot houses in aerial photos, with CI/CD shipping Docker images.",
      stack: ["PyTorch", "Flask", "Docker", "GitHub Actions"],
      repoUrl: "https://github.com/stupnd/lab2-ml",
    },
  ],

  leadership: [
    {
      org: "Institute of Electrical and Electronics Engineers (IEEE) Women in Engineering, uOttawa",
      role: "Chair (2026–27) · previously Vice Chair (2025–26)",
      period: "Sept 2024 – Present",
      images: ["/photos/wie-team-stage.jpg", "/photos/wie-gala.jpg", "/photos/wie-photobooth.jpg"],
      bullets: [
        "Launched WIEee Code, our first beginner hackathon, and built the starter template teams worked from.",
        "Built a mentorship program pairing upper-years with first- and second-years.",
        "Organized a hackathon for 100+ participants and led technical workshops on Git, React, and Docker.",
      ],
    },
  ],

  achievements: [
    { title: "2nd place, Hackers & Healers AI in Healthcare hackathon", detail: "Continuity Copilot: agentic clinical briefing on FHIR data", year: "2026" },
    { title: "Dean’s Honor List ×2", detail: "University of Ottawa, Faculty of Engineering", year: "2024–2025" },
    { title: "WIEee Code: founded the chapter’s first beginner hackathon", detail: "Including the starter template teams built from", year: "2025" },
  ],

  education: {
    school: "University of Ottawa",
    degree: "Bachelor of Applied Science, Computer Engineering",
    stream: "Engineering Management & Entrepreneurship stream",
    period: "Graduating December 2026",
    gpa: "CGPA 8.13/10.0",
    honours: ["Dean’s Honor List ×2"],
    coursework: [
      {
        label: "Systems",
        courses: ["Data Structures & Algorithms", "Computer Networks", "Operating Systems", "Distributed Systems", "Computer Architecture", "Real-Time Systems"],
      },
      { label: "AI / ML", courses: ["Applied Machine Learning", "Artificial Intelligence"] },
    ],
  },

};
