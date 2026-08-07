export type SkillTier = "Built" | "Used" | "Touched";

export interface Skill {
  name: string;
  tier: SkillTier;
  /** Where the skill was earned — shown on hover/detail */
  evidence?: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface Stat {
  value: string;
  label: string;
  source: string;
}

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
  /** Path under /public, or undefined for gradient placeholder */
  image?: string;
  caseStudy?: {
    /** Beat 1 — the problem, in one sentence a non-engineer gets */
    problem: string;
    /** Beat 2 — decisions with named alternatives and costs */
    decisions: Decision[];
    /** Beat 3 — evidence it works */
    evidence: string[];
    /** Beat 4 — what I'd do differently */
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

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

export interface Certification {
  title: string;
  provider: string;
  date: string;
  credentialUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
}

export interface SiteConfig {
  name: string;
  firstName: string;
  initials: string;
  /** Path under /public — swap this file to change the hero photo */
  headshot: string;
  headline: string;
  subheadline: string;
  location: string;
  availability: string;
  email: string;
  resumeUrl: string;
  siteUrl: string;
  socials: { label: string; url: string }[];
  about: string[];
  /** Personal photo strip shown in the About section */
  aboutPhotos: Photo[];
  stats: Stat[];
  skillCategories: SkillCategory[];
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
  /** Empty arrays hide these sections entirely */
  testimonials: Testimonial[];
  certifications: Certification[];
  blogPosts: BlogPost[];
}
