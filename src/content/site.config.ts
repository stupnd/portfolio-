import type { SiteConfig } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for every word on the site.
 *  Edit this file only; every page and section updates automatically.
 *
 *  Content rule (from the resume master file): nothing goes here
 *  that isn't in the master file at "Used" depth or above. Keep it
 *  defensible — every number on this site has a source.
 * ─────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  name: "Stuti Pandya",
  firstName: "Stuti",
  initials: "SP",
  // REPLACE to change the photo: drop a new file at public/photos/headshot.jpg
  headshot: "/photos/headshot.jpg",

  headline: "I build backend systems that survive failure.",
  subheadline:
    "Computer Engineering student at uOttawa and software developer intern at Trend Micro, working in Go, Java, and Kafka on container security and event-driven systems. Graduating December 2026 — available January 2027.",

  location: "Ottawa, Canada",
  availability: "Available January 2027 · New grad SWE (backend/infra) & AI application engineering",
  email: "stuti.pandya0@gmail.com",
  // REPLACE: drop your finalized resume at public/resume.pdf (this link 404s until you do)
  resumeUrl: "/resume.pdf",
  siteUrl: "https://stuti.tech",

  socials: [
    { label: "GitHub", url: "https://github.com/stupnd" },
    { label: "LinkedIn", url: "https://linkedin.com/in/stuti-pandya-6a8bab258" },
    { label: "Lil Bytes", url: "https://instagram.com/lilbytes.tech" },
  ],

  about: [
    "I'm a Computer Engineering student at the University of Ottawa with three internships behind me: currently on the container security team at Trend Micro (Go, Kubernetes, eBPF, AWS), previously debugging distributed event brokers at Solace, and before that three co-op terms at Natural Resources Canada.",
    "The work I care about most sits at the unglamorous end of backend engineering: message ordering, failure recovery, observability, and proving a system works with tests instead of claims. My flagship project is an event-driven transaction ledger — Kafka, Spring Boot, PostgreSQL — with 31 tests including Testcontainers integration tests that prove ordering holds under redelivery.",
    "On the AI side, I build the measurement infrastructure around LLM systems rather than more demos: my research agent ships with a 25-question eval harness and an LLM-as-judge scorer, and raised accuracy from 64% to 73% through per-component ablation.",
    "Outside of coursework and internships I chair uOttawa's IEEE Women in Engineering chapter, where I launched WIEee Code, our first beginner hackathon, and I co-run Lil Bytes, a short-form tech education brand.",
  ],

  // Every number here is sourced — see the label lines.
  stats: [
    { value: "3", label: "Internships", source: "Trend Micro · Solace · NRCan (3 co-op terms)" },
    { value: "$6–9K/mo", label: "Cloud cost savings identified", source: "AWS cost investigation at Trend Micro" },
    { value: "1.4B+", label: "Monthly API calls traced", source: "Root-caused a cost spike to 55 orphaned stacks" },
    { value: "200+", label: "CVEs triaged & resolved", source: "With automation cutting manual triage ~75%" },
    { value: "64→73%", label: "RAG eval accuracy lift", source: "Per-component ablation, traced-research-agent" },
    { value: "31", label: "Tests on the ledger", source: "Incl. Testcontainers integration tests" },
  ],

  /**
   * Tiers come straight from the skill depth ledger:
   *  Built  — designed and implemented it
   *  Used   — worked in it regularly
   *  Touched — used a few times (only Helm earns a listing at this tier)
   */
  skillCategories: [
    {
      label: "Languages",
      skills: [
        { name: "Java", tier: "Built", evidence: "Java 21 ledger service, coursework" },
        { name: "Python", tier: "Used", evidence: "traced-research-agent, Tinted" },
        { name: "Go", tier: "Used", evidence: "Production backend services at Trend Micro" },
        { name: "TypeScript", tier: "Used", evidence: "Trend Micro, personal projects" },
        { name: "C#", tier: "Used", evidence: "Bulk import tooling at NRCan" },
        { name: "SQL", tier: "Used", evidence: "PostgreSQL + Oracle query optimization" },
      ],
    },
    {
      label: "Backend & Streaming",
      skills: [
        { name: "Spring Boot", tier: "Built", evidence: "Ledger service: Data JPA, Kafka, Actuator" },
        { name: "Kafka", tier: "Built", evidence: "Partitioning, manual offsets, DLT, retries" },
        { name: "FastAPI", tier: "Built", evidence: "traced-research-agent, Tinted" },
        { name: "Flask", tier: "Built", evidence: "DistilBERT REST API" },
        { name: "REST / SSE", tier: "Built", evidence: "202-async APIs, SSE streaming dashboards" },
      ],
    },
    {
      label: "Data",
      skills: [
        { name: "PostgreSQL", tier: "Used", evidence: "Flyway migrations, optimistic locking" },
        { name: "Oracle SQL", tier: "Used", evidence: "Join restructuring, indexed views — 30% faster" },
        { name: "Firebase", tier: "Used", evidence: "Real-time backend, Android cycling app" },
        { name: "Supabase", tier: "Used", evidence: "Personal projects" },
      ],
    },
    {
      label: "Cloud & DevOps",
      skills: [
        { name: "Kubernetes", tier: "Used", evidence: "Debugging production workloads at Trend Micro" },
        { name: "Docker", tier: "Used", evidence: "Every recent project" },
        { name: "AWS CloudWatch", tier: "Used", evidence: "1.4B-call cost spike investigation" },
        { name: "GitHub Actions", tier: "Built", evidence: "CI/CD at Trend Micro + ledger service" },
        { name: "eBPF", tier: "Used", evidence: "Kernel-level container detection (worked with)" },
        { name: "Helm", tier: "Touched", evidence: "Chart misconfiguration fix" },
      ],
    },
    {
      label: "AI & ML",
      skills: [
        { name: "LLM evaluation", tier: "Built", evidence: "LLM-as-judge, golden sets, ablation" },
        { name: "LangGraph", tier: "Built", evidence: "Multi-step research agent, Continuity Copilot" },
        { name: "PyTorch", tier: "Built", evidence: "UNet trained from scratch, IoU/Dice reporting" },
        { name: "RAG pipelines", tier: "Built", evidence: "Chroma, sentence-transformer embeddings" },
      ],
    },
    {
      label: "Testing & Observability",
      skills: [
        { name: "Testcontainers", tier: "Built", evidence: "Real Postgres + Kafka in integration tests" },
        { name: "JUnit 5 / Mockito", tier: "Built", evidence: "31-test ledger suite" },
        { name: "Prometheus", tier: "Built", evidence: "Micrometer instrumentation" },
        { name: "Grafana", tier: "Built", evidence: "Provisioned dashboards: p99, consumer lag" },
      ],
    },
  ],

  experience: [
    {
      company: "Trend Micro",
      role: "Software Developer Intern — Container Security",
      period: "May 2026 – Present",
      location: "Ottawa",
      stack: ["Go", "TypeScript", "Kubernetes", "eBPF", "AWS"],
      highlights: [
        "Independently traced an API Gateway cost spike across ~1.4B calls/month using CloudWatch; root-caused it to 55 orphaned CloudFormation stacks, identifying $6–9K/month in recoverable spend.",
        "Extended the scan pipeline's CycloneDX SBOM schema to carry license metadata end to end — a client-requested change that crossed service boundaries.",
        "Resolved 200+ CVEs and built automation that cut manual triage time by ~75%.",
      ],
      details: [
        "Moved the managed rules list to cursor-based pagination and fixed a P2 CVSS API bug.",
        "Worked with eBPF kernel-level syscall instrumentation for detecting malicious container behavior.",
        "Built GitHub Actions CI/CD pipelines with unit and integration test gates; resolved a Helm chart misconfiguration.",
        "Two-week Agile sprints with sprint refinement and code review.",
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
        "Debugged distributed event-driven messaging and REST/WebSocket issues across hybrid cloud; authored postmortems tracing root causes across broker and client layers.",
      ],
      details: [
        "Supported enterprise customers on event-driven platforms and reduced repeat escalations.",
        "The messaging-semantics depth from MQTT/AMQP/JMS is the same intuition behind the Kafka work in my ledger project.",
      ],
    },
    {
      company: "Natural Resources Canada",
      role: "Software Developer Intern — 3 co-op terms",
      period: "May 2024 – Aug 2025",
      location: "Ottawa",
      stack: ["Salesforce", "Apex", "C#", "Oracle SQL", "PowerShell"],
      highlights: [
        "Optimized Oracle SQL queries and dashboards through join restructuring and indexed views — 30% faster.",
        "Automated Salesforce sandbox refresh (Apex, CLI, PowerShell) and built a C# bulk import tool that automated field mapping and handled scientific-notation edge cases in legacy data.",
      ],
      details: [
        "Migrated and cleaned legacy records ahead of a system upgrade.",
        "Invited back for three consecutive co-op terms — 15 months total.",
      ],
    },
  ],

  projects: [
    {
      slug: "transaction-ledger",
      title: "Transaction Ledger Service",
      tagline:
        "Event-driven financial ledger that keeps per-account ordering even when messages arrive out of order and the service crashes mid-write.",
      year: "2026",
      stack: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "Next.js", "Prometheus", "Grafana"],
      featured: true,
      repoUrl: "https://github.com/stupnd/Transaction-Ingestion-Service",
      // No live demo by design: hosting a broker + Postgres to show an empty
      // dashboard isn't worth it. The README and this case study are the deliverable.
      caseStudy: {
        problem:
          "Ledgers have to apply transactions in order, even when they arrive out of order and the service crashes mid-write. This service accepts writes over REST, returns 202 immediately, and applies balances asynchronously through Kafka — without ever double-applying a transaction or applying them out of sequence.",
        decisions: [
          {
            decision: "Partition Kafka by account ID",
            alternative: "A global ordering key (single partition)",
            tradeoff:
              "Per-account ordering is all a ledger actually needs, and partitioning by account lets consumers scale horizontally. The cost: no global ordering across accounts, and a hot account can skew a partition. A single partition gives total order but caps throughput at one consumer.",
          },
          {
            decision: "Manual offset acknowledgement",
            alternative: "Auto-commit",
            tradeoff:
              "Offsets are committed only after the balance is durably applied, so a crash between consume and apply causes redelivery, not loss. The cost is at-least-once delivery — which is why the consumer is idempotent and the tests prove exactly-once effects under redelivery.",
          },
          {
            decision: "Exponential backoff retries + dead-letter topic with an admin replay endpoint",
            alternative: "Infinite retry or drop-on-failure",
            tradeoff:
              "Poison messages can't block a partition forever, and nothing is silently lost — failed transactions land in the DLT and can be replayed after the underlying issue is fixed. The cost is operational surface: the DLT is one more thing to monitor, which is what the Grafana dashboard is for.",
          },
          {
            decision: "Integer money, Flyway in validate mode, optimistic locking via @Version",
            alternative: "Floats, Hibernate auto-DDL, last-write-wins",
            tradeoff:
              "Cents-as-integers eliminates float rounding; validate mode means the schema is exactly what migrations say it is; optimistic locking turns concurrent balance updates into a retry instead of a silent overwrite.",
          },
        ],
        evidence: [
          "31 tests, including Testcontainers integration tests running real Postgres and Kafka — proving ordering under redelivery, exactly-once application, and DLT recovery.",
          "Correlation IDs propagate from the HTTP thread through Kafka headers to the consumer thread, so a single transaction is traceable end to end in the logs.",
          "Micrometer → Prometheus → provisioned Grafana dashboard: throughput, p99 latency, rejection rate, consumer lag.",
          "SSE endpoint streams status changes to a Next.js dashboard; demo controls include a failure simulator, DLT replay, and a 100-transaction burst generator.",
        ],
        retrospective:
          "I'd add the Kubernetes deployment earlier — Deployment plus StatefulSets for Postgres and Kafka with readiness probes on Actuator health — because the interesting question a ledger has to answer is what breaks during a rolling restart and how the consumer group rebalance is handled. That work is in progress; it's the difference between running the system and operating it.",
      },
    },
    {
      slug: "traced-research-agent",
      title: "traced-research-agent",
      tagline:
        "Multi-step RAG research agent with the part most agent demos skip: a 25-question eval harness that measures whether it actually works.",
      year: "2026",
      stack: ["Python", "LangGraph", "FastAPI", "Chroma", "sentence-transformers"],
      featured: true,
      caseStudy: {
        problem:
          "Anyone can wire an LLM to a vector store and get plausible-sounding answers. The hard part is knowing whether the answers are right, and when they're wrong, whether retrieval or synthesis is to blame. This agent ships with the measurement infrastructure built in.",
        decisions: [
          {
            decision: "A golden set of 25 questions with an LLM-as-judge scorer",
            alternative: "Eyeballing outputs, or exact-match scoring",
            tradeoff:
              "Exact match fails on paraphrase; eyeballing doesn't scale and drifts. An LLM judge scores semantic correctness against golden answers — the cost is that the judge itself needs spot-checking, so the golden set stays small enough to audit by hand.",
          },
          {
            decision: "Per-component ablation to attribute failures",
            alternative: "Tuning the whole pipeline end to end",
            tradeoff:
              "Swapping one stage at a time (retrieval depth, embedding model, synthesis prompt) shows which stage each failure comes from. Slower than vibes-driven tuning, but it's how accuracy went from 0.641 to 0.734 with evidence for every change.",
          },
          {
            decision: "FastAPI with SSE streaming",
            alternative: "Blocking request/response",
            tradeoff:
              "Multi-step agent runs take long enough that streaming intermediate steps is the difference between a usable tool and a spinner.",
          },
        ],
        evidence: [
          "Accuracy 0.641 → 0.734 on the 25-question golden set, with each gain attributed to a specific pipeline change via ablation.",
          "Every answer is traced through the LangGraph steps that produced it — retrieval, synthesis, and judgment are inspectable, not a black box.",
        ],
        retrospective:
          "The lecture-slides corpus is a toy, and I'd swap it for a messier real-world corpus. I'm also extracting the eval harness into a standalone retrieval-evaluation tool — deterministic retrieval scorers (recall@k, MRR) plus LLM-as-judge faithfulness, with per-stage attribution of wrong answers and a GitHub Action that fails the build on regression. Evaluation is the part of AI engineering that's most requested and least supplied, and it deserves to be its own tool.",
      },
    },
    {
      slug: "tinted",
      title: "Tinted",
      tagline:
        "Computer-vision skin tone analysis and makeup recommendation — built to work across the full Monk Skin Tone scale.",
      year: "2025–present",
      stack: ["MediaPipe", "CLIP", "Claude Haiku", "FastAPI", "Next.js"],
      featured: true,
      caseStudy: {
        problem:
          "Most beauty tech gets skin tone wrong for anyone who isn't light-skinned, because camera white balance and lighting swamp the signal. Tinted classifies skin tone robustly across the full range and recommends genuinely matching shades.",
        decisions: [
          {
            decision: "Classical CV preprocessing: gray-world white balance, CLAHE, LAB color space",
            alternative: "Feeding raw RGB frames to a model",
            tradeoff:
              "Lighting variation is the dominant error source, and correcting it deterministically beats hoping a model learns invariance. LAB separates lightness from chroma so tone classification works on the right axes. The cost is a pipeline with more stages to tune — which is what the test suite covers.",
          },
          {
            decision: "Monk Skin Tone scale for classification",
            alternative: "The older Fitzpatrick scale",
            tradeoff:
              "Monk was designed for inclusive tech evaluation with better coverage of deeper skin tones — the exact failure mode this project exists to avoid.",
          },
          {
            decision: "CLIP-based shade matching + Claude Haiku for recommendations",
            alternative: "A hand-built rules engine over product metadata",
            tradeoff:
              "CLIP embeddings match visual shade similarity without labeling thousands of products; the LLM turns matches into readable recommendations. The rules-engine alternative is more auditable but scales poorly across brands.",
          },
        ],
        evidence: [
          "45-test suite across the preprocessing and classification pipeline.",
          "End-to-end product: FastAPI backend, Next.js frontend, live camera capture through MediaPipe.",
        ],
        retrospective:
          "Classical CV isn't what AI roles screen for in 2026 — if I were starting today I'd still build the same preprocessing (it's correct), but I'd add a labeled evaluation set of diverse faces with per-tone accuracy reporting, the same eval discipline I applied to the research agent.",
      },
    },
    {
      slug: "bridge",
      title: "Bridge",
      tagline:
        "ASL translation glove — flex sensors on an ESP32 streaming over BLE straight to the browser, no intermediary server.",
      year: "2025–2026",
      stack: ["Arduino Nano ESP32", "BLE", "React Native", "Web Bluetooth"],
      featured: true,
      repoUrl: "https://github.com/stupnd/Bridge",
      caseStudy: {
        problem:
          "Sign language users shouldn't need an interpreter for everyday interactions. Bridge is a capstone-team glove that reads hand poses through flex sensors and translates them in the browser in real time.",
        decisions: [
          {
            decision: "Flex sensors as voltage dividers with a 5-sample rolling average",
            alternative: "IMU-based gesture recognition",
            tradeoff:
              "Voltage dividers are cheap, readable, and per-finger — the rolling average kills sensor jitter without adding perceptible latency. IMUs capture motion better but cost more and demand a training pipeline the timeline didn't allow.",
          },
          {
            decision: "BLE direct to the browser via Web Bluetooth",
            alternative: "Phone app or intermediary server relaying sensor data",
            tradeoff:
              "No install, no backend, no latency from a relay hop — the glove pairs straight to a web page. The cost is Web Bluetooth's browser support matrix, which is fine for a demo and would need rethinking for production iOS.",
          },
        ],
        evidence: [
          "Working end-to-end demo: glove → BLE characteristic mapping → live translation in the browser.",
          "I designed the sensor calibration flow and the BLE characteristic mapping.",
          "Built with Krisha Veera, Lana Othman, Sahil Shukla, and Salim Aissaoui.",
        ],
        retrospective:
          "Calibration is per-user and manual; I'd replace the hand-tuned thresholds with a quick guided calibration routine that fits per-finger ranges automatically. And the 5-sample average is a crude filter — a small exponential moving average would respond faster for the same smoothing.",
      },
    },
  ],

  miniProjects: [
    {
      title: "Cycling Community App",
      description: "Native Android app for forming riding groups — deployed and used by a local riding community.",
      stack: ["Java", "Firebase", "Android"],
      repoUrl: "https://github.com/stupnd/cycling_app",
    },
    {
      title: "Continuity Copilot",
      description:
        "Agentic pre-visit clinical briefing tool for primary care physicians — 2nd place, Hackers & Healers AI in Healthcare hackathon.",
      stack: ["LangGraph", "GPT-4o", "HAPI FHIR", "React"],
    },
    {
      title: "Aerial Image Segmentation",
      description:
        "UNet trained from scratch for house segmentation on aerial imagery — IoU/Dice reporting, custom augmentation, CI/CD pushing Docker images.",
      stack: ["PyTorch", "Flask", "Docker", "GitHub Actions"],
      repoUrl: "https://github.com/stupnd/lab2-ml",
    },
  ],

  leadership: [
    {
      org: "IEEE Women in Engineering, uOttawa",
      role: "Chair (2026–27) · previously Vice Chair, VP External",
      period: "Sept 2024 – Present",
      image: "/photos/wie-team-stage.jpg",
      bullets: [
        "Progressed VP External → Vice Chair → Chair across three years.",
        "Launched WIEee Code, the chapter's first beginner hackathon, and built the starter template teams worked from (a GitHub template with 2 forks — teams actually used it).",
        "Built a mentorship program pairing upper-year students with first- and second-years.",
        "Organized a 100+ participant hackathon and workshops on Git, React, and Docker; ran WIPS 2026 including sponsor communications.",
      ],
    },
    {
      org: "Lil Bytes",
      role: "Co-creator",
      period: "2025 – Present",
      image: "/photos/lil-bytes.jpg",
      bullets: [
        "Short-form tech education brand on Instagram and TikTok — explaining engineering and AI concepts to non-technical audiences.",
        "Most engineers can build a tool; distribution is the rarer skill, and this is where I practice it.",
      ],
    },
  ],

  achievements: [
    { title: "2nd place — Hackers & Healers AI in Healthcare hackathon", detail: "Continuity Copilot: agentic clinical briefing on FHIR data", year: "2026" },
    { title: "Dean's Honour List ×2", detail: "University of Ottawa, Faculty of Engineering", year: "2024–2025" },
    { title: "WIEee Code — founded the chapter's first beginner hackathon", detail: "Including the starter template teams built from", year: "2025" },
  ],

  education: {
    school: "University of Ottawa",
    degree: "Bachelor of Applied Science, Computer Engineering",
    stream: "Engineering Management & Entrepreneurship stream",
    period: "Graduating December 2026",
    gpa: "CGPA 8.13/10.0",
    honours: ["Dean's Honour List ×2"],
    coursework: [
      {
        label: "Systems",
        courses: ["Data Structures & Algorithms", "Operating Systems", "Distributed Systems", "Computer Architecture", "Real-Time Systems"],
      },
      { label: "AI / ML", courses: ["Applied Machine Learning", "Artificial Intelligence"] },
    ],
  },

  // These sections are hidden until the arrays have entries.
  testimonials: [],
  certifications: [],
  blogPosts: [],
};
