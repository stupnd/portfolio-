"use client";

import { useState } from "react";
import { FileDown, Github, Linkedin, Mail, Send } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const github = site.socials.find((s) => s.label === "GitHub")?.url;
  const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.url;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      form.reset();
    } catch {
      // Fallback: open the visitor's mail client with the message pre-filled
      setStatus("error");
      const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="glow-field absolute inset-0 rotate-180" />
      <Container className="relative">
        <SectionHeading
          eyebrow="07 · Contact"
          title="Let's talk"
          description="I'm interviewing for new grad software engineering roles starting January 2027. If you're hiring — or just want to talk backend systems or LLM evals — my inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <a
                href={`mailto:${site.email}`}
                className="card group flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-hover)] text-accent">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-muted">{site.email}</p>
                </div>
              </a>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-hover)] text-accent">
                    <Linkedin size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">LinkedIn</p>
                    <p className="text-sm text-muted">Connect with me</p>
                  </div>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-hover)] text-accent">
                    <Github size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">GitHub</p>
                    <p className="text-sm text-muted">github.com/stupnd</p>
                  </div>
                </a>
              )}
              <Button href={site.resumeUrl} variant="secondary" download className="w-full">
                <FileDown size={15} /> Download my resume
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-7">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
                  placeholder="What would you like to talk about?"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent-soft disabled:opacity-60"
              >
                <Send size={15} />
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you!" : "Send message"}
              </button>
              {status === "sent" && (
                <p role="status" className="text-center text-xs text-emerald-400">
                  Got it — I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p role="status" className="text-center text-xs text-muted">
                  Opening your email client instead…
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
