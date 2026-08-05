"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileDown, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { site } from "@/content/site.config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const reduce = useReducedMotion();
  const github = site.socials.find((s) => s.label === "GitHub")?.url;
  const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.url;

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.21, 0.65, 0.35, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      {/* Ambient background */}
      <div aria-hidden className="glow-field absolute inset-0" />
      <div aria-hidden className="grid-lines absolute inset-0" />

      <Container className="relative">
        <div className="flex flex-col-reverse items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-2xl flex-1">
            <motion.p
              {...fade(0)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {site.availability}
            </motion.p>

            <motion.h1 {...fade(0.08)} className="text-display-xl font-semibold">
              Hi, I&apos;m {site.firstName}.
              <br />
              <span className="text-gradient">{site.headline}</span>
            </motion.h1>

            <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.subheadline}
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/#projects">
                View projects <ArrowRight size={15} />
              </Button>
              <Button href={site.resumeUrl} variant="secondary" download>
                <FileDown size={15} /> Resume
              </Button>
              <div className="ml-1 flex items-center gap-1">
                {github && (
                  <IconLink href={github} label="GitHub">
                    <Github size={18} />
                  </IconLink>
                )}
                {linkedin && (
                  <IconLink href={linkedin} label="LinkedIn">
                    <Linkedin size={18} />
                  </IconLink>
                )}
                <IconLink href={`mailto:${site.email}`} label="Email">
                  <Mail size={18} />
                </IconLink>
              </div>
            </motion.div>

            <motion.p {...fade(0.3)} className="mt-8 flex items-center gap-1.5 font-mono text-xs text-faint">
              <MapPin size={12} /> {site.location}
            </motion.p>
          </div>

          {/* Headshot */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.65, 0.35, 1] }}
            className="relative mx-auto lg:mx-0"
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-transparent to-accent-cyan/20 blur-2xl"
            />
            <div className="glass relative h-56 w-56 overflow-hidden rounded-[1.75rem] sm:h-72 sm:w-72">
              <Image
                src={site.headshot}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(max-width: 640px) 224px, 288px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-[var(--fg)]"
    >
      {children}
    </a>
  );
}
