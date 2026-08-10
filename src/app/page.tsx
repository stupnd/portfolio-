import { Hero } from "@/components/sections/Hero";
import { LookingFor } from "@/components/sections/LookingFor";
import { Stats } from "@/components/sections/Stats";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

/**
 * Section order is deliberate: a recruiter gets roles, proof of work, and
 * skills before anything personal.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <LookingFor />
      <Stats />
      <About />
      <Experience />
      <Projects />
      <GithubActivity />
      <Skills />
      <Leadership />
      <Education />
      {/* These render nothing until their config arrays have entries */}
      <Certifications />
      <Testimonials />
      <Contact />
    </>
  );
}
