"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded border border-rule-strong bg-raised px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-3 focus:border-accent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const { startDate } = site.lookingFor;

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
      const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} (${data.email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    }
  }

  return (
    <section id="contact" className="band-cobalt py-20 sm:py-28">
      <Container>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display text-display-lg font-extrabold">
              Hiring for {startDate}?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-2">
              I&apos;m interviewing for new-grad backend, infrastructure, and full-stack roles. The
              fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="display mt-8 inline-block break-all text-2xl font-bold underline decoration-2 underline-offset-[6px] hover:decoration-4 sm:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.resumeUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded bg-white px-5 text-sm font-semibold text-[#1C3FE0] transition-colors hover:bg-white/90"
              >
                <FileDown size={16} aria-hidden /> Download resume
              </a>
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold underline decoration-ink-3 hover:decoration-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-5 lg:col-start-8">
            <p className="text-sm font-semibold">Or leave a message</p>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-ink-2">
                Name
              </label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-ink-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-ink-2">
                Message
              </label>
              <textarea id="message" name="message" required rows={4} className={`${field} resize-none`} />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 w-full items-center justify-center rounded border border-ink px-5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#1C3FE0] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send message"}
            </button>
            <p role="status" className="min-h-5 text-sm text-ink-2">
              {status === "sent" && "Got it. I'll reply from my personal email."}
              {status === "error" &&
                "The form couldn't send, so your mail app is opening with the message filled in."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
