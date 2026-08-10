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

            {/* Greeting is secondary; the claim is the headline, so it carries
                the h1 and the size. */}
            <motion.p
              {...fade(0.06)}
              className="mb-1 text-2xl font-medium text-muted sm:text-3xl"
            >
              Hi, I&apos;m {site.firstName}.
            </motion.p>
            <motion.h1 {...fade(0.08)} className="text-display-lg font-semibold">
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

          {/* Cutout portrait: no frame, just a gradient bloom behind it and a
              soft fade at the bottom so it sits in the page rather than on it */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.65, 0.35, 1] }}
            className="relative mx-auto w-[15rem] shrink-0 sm:w-[19rem] lg:mx-0 lg:w-[21rem]"
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(108,124,255,0.42) 0%, rgba(167,139,250,0.24) 38%, rgba(76,201,240,0.12) 58%, transparent 72%)",
              }}
            />
            <Image
              src={site.headshot}
              alt={`Portrait of ${site.name}`}
              width={887}
              height={1400}
              priority
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 304px, 336px"
              className="relative h-auto w-full object-contain [mask-image:linear-gradient(to_bottom,black_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,black_78%,transparent_99%)]"
            />
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
