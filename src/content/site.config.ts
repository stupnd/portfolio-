import type { SiteConfig } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for every word on the site.
 *  Edit this file only; every page and section updates automatically.
 *
 *  Content rule (from the resume master file): nothing goes here
 *  that isn't in the master file at "Used" depth or above. Keep it
 *  defensible. Every number on this site has a source.
 * ─────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  name: "Stuti Pandya",
  firstName: "Stuti",
  initials: "SP",
  // Background-removed portrait. To swap: drop a new cutout PNG here.
  // public/photos/headshot.jpg keeps the original uncut version.
  headshot: "/photos/headshot-cutout.png",

  headline: "I build full-stack products, and the systems under them.",
  subheadline:
    "Computer Engineering student at uOttawa. Software developer intern at Trend Micro, working across Go, Java, Kafka, and Next.js.",

  location: "Ottawa, Canada",
  availability: "Open to new grad roles starting January 2027",
  email: "stuti.pandya0@gmail.com",

  /**
   * Recruiter summary card. This is the first thing a hiring manager reads,
   * so keep it concrete: role titles they actually post, and a real start date.
   */
  lookingFor: {
    roles: ["Backend Engineer", "Full-Stack Engineer", "Software Engineer, New Grad", "AI / ML Engineer"],
    startDate: "January 2027",
    locations: "Ottawa, Toronto, Waterloo, Vancouver, or remote in Canada",
    note: "Graduating December 2026 with a BASc in Computer Engineering. Three software internships completed, and legally able to work in Canada full time.",
  },
  // REPLACE: drop your finalized resume at public/resume.pdf (this link 404s until you do)
  resumeUrl: "/resume.pdf",
  siteUrl: "https://stutipnd.net",

  socials: [
    { label: "GitHub", url: "https://github.com/stupnd" },
    { label: "LinkedIn", url: "https://linkedin.com/in/stuti-pandya-6a8bab258" },
  ],

  about: [
    "Three internships so far: container security at Trend Micro (Go, Kubernetes, AWS), event brokers at Solace, and two co-op terms at Natural Resources Canada.",
    "I work across the stack, but I like the unglamorous end of it: message ordering, failure recovery, observability. My flagship project is an event-driven transaction ledger with 31 tests proving ordering holds even when things crash, fronted by a Next.js dashboard that streams status live.",
    "On the AI side, I build the measurement around LLM systems, not just demos. My research agent ships with its own eval harness: 25 golden questions, an LLM judge, and accuracy raised 64% → 73% by ablation.",
    "Off the clock, I chair uOttawa's Institute of Electrical and Electronics Engineers (IEEE) Women in Engineering chapter.",
  ],

  // Photo strip in the About section. Swap files in public/photos to change.
  aboutPhotos: [
    { src: "/photos/kayaks.jpg", alt: "Kayaks tied up at a lake dock", caption: "off-grid" },
    { src: "/photos/moraine.jpg", alt: "Canoes on Moraine Lake in the Rockies", caption: "banff" },
    { src: "/photos/ottawa-canal.jpg", alt: "Sunset over the Rideau Canal locks in Ottawa", caption: "home" },
    { src: "/photos/flamingos.jpg", alt: "Watching flamingos at the park", caption: "touching grass" },
  ],

  // Every number here is sourced. See the label lines.
  stats: [
    { value: "3", label: "Internships", source: "Trend Micro · Solace · NRCan (2 co-op terms)" },
    { value: "$6–9K/mo", label: "Cloud cost savings identified", source: "AWS cost investigation at Trend Micro" },
    { value: "1.4B+", label: "Monthly API calls traced", source: "Root-caused a cost spike to 55 orphaned stacks" },
    { value: "200+", label: "CVEs triaged & resolved", source: "With automation cutting manual triage ~75%" },
    { value: "64→73%", label: "RAG eval accuracy lift", source: "Per-component ablation, traced-research-agent" },
    { value: "31", label: "Tests on the ledger", source: "Incl. Testcontainers integration tests" },
  ],

  /**
   * Tiers come straight from the skill depth ledger:
   *  Built:   designed and implemented it
   *  Used:    worked in it regularly
   *  Touched: used a few times (only Helm earns a listing at this tier)
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
        { name: "Oracle SQL", tier: "Used", evidence: "Join restructuring, indexed views: 30% faster" },
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
      role: "Software Developer Intern, Container Security",
      period: "May 2026 – Present",
      location: "Ottawa",
      stack: ["Go", "TypeScript", "Kubernetes", "AWS", "Docker"],
      highlights: [
        "Traced an API Gateway cost spike across ~1.4B calls/month to 55 orphaned CloudFormation stacks, with $6–9K/month recoverable. Fully independent investigation.",
        "Extended the CycloneDX SBOM schema to carry license metadata end to end, a client-requested change across services.",
        "Resolved 200+ CVEs; built automation cutting manual triage ~75%.",
      ],
      details: [
        "Moved the managed rules list to cursor-based pagination; fixed a P2 CVSS API bug.",
        "Built GitHub Actions CI/CD with unit and integration test gates.",
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
        "Supported enterprise customers on event-driven platforms; reduced repeat escalations.",
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
        "Migrated and cleaned legacy records ahead of a system upgrade.",
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
      // empty dashboard isn't worth it. Instead the case study embeds a
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
            decision: "Backoff retries + dead-letter topic with replay",
            alternative: "infinite retry or drop-on-failure",
            tradeoff:
              "Poison messages can't block a partition, and nothing silently disappears. Failures land in the DLT and replay after a fix. The cost is one more thing to monitor.",
          },
          {
            decision: "Integer money + optimistic locking",
            alternative: "floats and last-write-wins",
            tradeoff:
              "Cents-as-integers kills float rounding. Optimistic locking turns concurrent balance updates into a retry instead of a silent overwrite.",
          },
        ],
        evidence: [
          "31 tests, including Testcontainers integration tests on real Postgres and Kafka, proving ordering under redelivery, exactly-once application, and DLT recovery.",
          "Correlation IDs trace every transaction end to end: HTTP thread → Kafka headers → consumer.",
          "Grafana dashboard tracking throughput, p99 latency, rejection rate, and consumer lag.",
          "Live SSE dashboard with a failure simulator, DLT replay, and a 100-transaction burst generator.",
        ],
        retrospective:
          "I'd add the Kubernetes deployment earlier. The interesting question a ledger has to answer is what breaks during a rolling restart, and how the consumer group rebalance is handled. That's the difference between running a system and operating it. In progress now.",
      },
    },
    {
      slug: "traced-research-agent",
      title: "traced-research-agent",
      tagline:
        "A RAG research agent with the part most demos skip: an eval harness that proves it works.",
      year: "2026",
      stack: ["Python", "LangGraph", "FastAPI", "Chroma", "sentence-transformers"],
      featured: true,
      caseStudy: {
        problem:
          "Anyone can wire an LLM to a vector store and get plausible-sounding answers. The hard part is knowing whether they're right, and when they're wrong, whether retrieval or synthesis is to blame.",
        decisions: [
          {
            decision: "25 golden questions + an LLM-as-judge scorer",
            alternative: "eyeballing or exact-match",
            tradeoff:
              "Exact match fails on paraphrase; eyeballing drifts. An LLM judge scores meaning, and the golden set stays small enough to audit by hand.",
          },
          {
            decision: "Per-component ablation",
            alternative: "tuning the whole pipeline at once",
            tradeoff:
              "Swapping one stage at a time shows exactly where each failure comes from. Slower than vibes-driven tuning, but every gain has evidence behind it.",
          },
          {
            decision: "SSE streaming",
            alternative: "blocking request/response",
            tradeoff:
              "Agent runs are slow. Streaming intermediate steps is the difference between a usable tool and a spinner.",
          },
        ],
        evidence: [
          "Accuracy 0.641 → 0.734 on the golden set, every gain attributed to a specific change.",
          "Every answer is traceable through the LangGraph steps that produced it. No black box.",
        ],
        retrospective:
          "The lecture-slides corpus is a toy; I'd swap it for something messier. Next: extracting the harness into a standalone retrieval-eval tool with recall@k and MRR scoring, per-stage failure attribution, and a GitHub Action that fails builds on regression.",
      },
    },
    {
      slug: "tinted",
      title: "Tinted",
      tagline:
        "Computer vision that gets skin tone right across the full range, then recommends makeup that actually matches.",
      year: "2025–present",
      stack: ["MediaPipe", "CLIP", "Claude Haiku", "FastAPI", "Next.js"],
      featured: true,
      caseStudy: {
        problem:
          "Most beauty tech gets skin tone wrong for anyone who isn't light-skinned, because camera white balance and lighting swamp the signal. Tinted corrects for that and classifies tone across the full Monk scale.",
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
              "Monk was built for inclusive tech, with real coverage of deeper skin tones. That's the exact failure mode this project exists to avoid.",
          },
          {
            decision: "CLIP shade matching + LLM recommendations",
            alternative: "a hand-built rules engine",
            tradeoff:
              "CLIP matches visual similarity without labeling thousands of products. A rules engine is more auditable but scales poorly across brands.",
          },
        ],
        evidence: [
          "45-test suite across preprocessing and classification.",
          "Full product: FastAPI backend, Next.js frontend, live camera via MediaPipe.",
        ],
        retrospective:
          "I'd add a labeled eval set of diverse faces with per-tone accuracy reporting, the same eval discipline I applied to the research agent.",
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
          "Sign language users shouldn't need an interpreter for everyday interactions. Bridge reads hand poses through flex sensors and translates them in the browser, in real time.",
        decisions: [
          {
            decision: "Flex sensors as voltage dividers",
            alternative: "IMU gesture recognition",
            tradeoff:
              "Cheap, readable, per-finger, with a rolling average to kill jitter. IMUs capture motion better but need a training pipeline the timeline didn't allow.",
          },
          {
            decision: "BLE straight to the browser",
            alternative: "a phone app or relay server",
            tradeoff:
              "No install, no backend, no relay latency. The glove pairs directly to a web page. The cost is Web Bluetooth's spotty support on iOS.",
          },
        ],
        evidence: [
          "Working end-to-end demo: glove → BLE → live translation in the browser.",
          "I designed the sensor calibration flow and BLE characteristic mapping.",
          "Built with Krisha Veera, Lana Othman, Sahil Shukla, and Salim Aissaoui.",
        ],
        retrospective:
          "I'd replace the manual per-user calibration with a guided routine that fits finger ranges automatically, and swap the rolling average for an exponential one for faster response at the same smoothing.",
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
      role: "Chair (2026–27) · previously Vice Chair, VP External",
      period: "Sept 2024 – Present",
      images: ["/photos/wie-team-stage.jpg", "/photos/wie-gala.jpg", "/photos/wie-photobooth.jpg"],
      bullets: [
        "VP External → Vice Chair → Chair, across three years.",
        "Launched WIEee Code, our first beginner hackathon, and built the starter template teams worked from.",
        "Built a mentorship program pairing upper-years with first- and second-years.",
        "Ran WIPS 2026 and a 100+ participant hackathon, plus workshops on Git, React, and Docker.",
      ],
    },
  ],

  achievements: [
    { title: "2nd place, Hackers & Healers AI in Healthcare hackathon", detail: "Continuity Copilot: agentic clinical briefing on FHIR data", year: "2026" },
    { title: "Dean's Honour List ×2", detail: "University of Ottawa, Faculty of Engineering", year: "2024–2025" },
    { title: "WIEee Code: founded the chapter's first beginner hackathon", detail: "Including the starter template teams built from", year: "2025" },
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
