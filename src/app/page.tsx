import { Hero } from "@/components/sections/Hero";
import { Flagship } from "@/components/sections/Flagship";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Background } from "@/components/sections/Background";
import { Contact } from "@/components/sections/Contact";

/**
 * Proof before personality: the record stream and the ledger a reviewer can
 * crash come first, the person after, and the close hands over resume and email.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Flagship />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Background />
      <Contact />
    </>
  );
}
