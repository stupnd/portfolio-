"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { site } from "@/content/site.config";
import { features } from "@/content/features";

/**
 * ⌘K / Ctrl+K: the issue's index. Built on cmdk's Dialog (Radix underneath),
 * so it is a real modal: focus moves in, is trapped, Escape closes it, and
 * focus returns to whatever opened it.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);
  const go = (href: string) => run(() => router.push(href));
  const openTab = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Find anything in this issue"
      overlayClassName="fixed inset-0 z-[70] bg-ink/45"
      contentClassName="fixed left-1/2 top-[14vh] z-[71] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 border border-rule-strong bg-paper shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
    >
      <Command.Input
        placeholder="Find a feature, a department, or a link"
        className="w-full border-b border-rule-strong bg-transparent px-5 py-4 text-[17px] text-ink outline-none placeholder:italic placeholder:text-ink-3"
      />
      <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
        <Command.Empty className="px-4 py-6 text-center text-[16px] italic text-ink-3">Nothing by that name in this issue.</Command.Empty>

        <Group heading="Features">
          {features.map((f) => (
            <Item key={f.id} folio={f.page} onSelect={() => go(`/#${f.id}`)}>
              {f.headline}
            </Item>
          ))}
        </Group>

        <Group heading="Departments">
          {site.issue.departments.map((d) => (
            <Item key={d.href} folio={d.page} onSelect={() => go(`/${d.href}`)}>
              {d.title}
            </Item>
          ))}
        </Group>

        <Group heading="Case studies">
          {site.projects
            .filter((p) => p.caseStudy)
            .map((p) => (
              <Item key={p.slug} onSelect={() => go(`/projects/${p.slug}`)}>
                {p.title}
              </Item>
            ))}
        </Group>

        <Group heading="Elsewhere">
          <Item onSelect={() => openTab(site.resumeUrl)}>Resume (PDF)</Item>
          <Item onSelect={() => run(() => (window.location.href = `mailto:${site.email}`))}>Email {site.firstName}</Item>
          {site.socials.map((s) => (
            <Item key={s.label} onSelect={() => openTab(s.url)}>
              {s.label}
            </Item>
          ))}
          <Item onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
            Switch to the {resolvedTheme === "dark" ? "day" : "night"} edition
          </Item>
        </Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:caps [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:text-ink-3"
    >
      {children}
    </Command.Group>
  );
}

function Item({ children, folio, onSelect }: { children: React.ReactNode; folio?: string; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex min-h-11 cursor-pointer items-baseline justify-between gap-4 px-3 py-2 text-[17px] text-ink-2 data-[selected=true]:bg-paper-2 data-[selected=true]:text-accent"
    >
      <span className="font-display text-[1.25rem] leading-tight">{children}</span>
      {folio && <span className="data shrink-0 text-[12px] text-ink-3">p. {folio}</span>}
    </Command.Item>
  );
}
