export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  /** Always-visible summary bullets */
  highlights: string[];
  /** Extra bullets revealed on expand */
  details?: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface Decision {
  decision: string;
  alternative: string;
  tradeoff: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  /** Key of an interactive demo component to embed in the case study */
  demo?: "ledger-sim";
  /** Path under /public, or undefined for gradient placeholder */
  image?: string;
  caseStudy?: {
    /** Beat 1: the problem, in one sentence a non-engineer gets */
    problem: string;
    /** Beat 2: decisions with named alternatives and costs */
    decisions: Decision[];
    /** Beat 3: evidence it works */
    evidence: string[];
    /** Beat 4: what I'd do differently */
    retrospective: string;
    /** Optional extra narrative sections */
    sections?: CaseStudySection[];
  };
}

export interface MiniProject {
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
}

export interface LeadershipEntry {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  /** First image is the card header; extras render as a thumbnail row */
  images?: string[];
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
}

/** One line on the contents page */
export interface ContentsEntry {
  page: string;
  title: string;
  hook: string;
  href: string;
}

/** The magazine frame: cover and contents */
export interface Issue {
  number: string;
  season: string;
  coverLine: string;
  dek: string;
  cover: { src: string; alt: string; caption: string; width: number; height: number };
  features: ContentsEntry[];
  departments: ContentsEntry[];
}

export interface SiteConfig {
  issue: Issue;
  name: string;
  firstName: string;
  initials: string;
  location: string;
  email: string;
  /** Role targets shown in the recruiter summary card */
  lookingFor: {
    roles: string[];
    /** Shown in the cover colophon as "Available" */
    available: string;
    locations: string;
    authorization: string;
    note: string;
  };
  resumeUrl: string;
  siteUrl: string;
  socials: { label: string; url: string }[];
  experience: ExperienceEntry[];
  projects: Project[];
  miniProjects: MiniProject[];
  leadership: LeadershipEntry[];
  achievements: Achievement[];
  education: {
    school: string;
    degree: string;
    stream: string;
    period: string;
    gpa: string;
    honours: string[];
    coursework: { label: string; courses: string[] }[];
  };
}
