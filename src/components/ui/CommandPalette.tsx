"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  FileDown,
  FolderGit2,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { useTheme } from "next-themes";
import { site } from "@/content/site.config";

/** ⌘K / Ctrl+K command palette for keyboard-first navigation. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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

  const github = site.socials.find((s) => s.label === "GitHub")?.url;
  const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.url;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-[18vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg px-4">
        <Command
          label="Command palette"
          className="glass overflow-hidden rounded-2xl shadow-2xl"
        >
          <Command.Input
            autoFocus
            placeholder="Type a command or search…"
            className="w-full border-b border-[var(--border)] bg-transparent px-5 py-4 text-sm outline-none placeholder:text-faint"
          />
          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-faint">
              No results.
            </Command.Empty>
            <Command.Group>
              <Item icon={<Home size={15} />} onSelect={() => run(() => router.push("/"))}>
                Home
              </Item>
              <Item icon={<User size={15} />} onSelect={() => run(() => router.push("/#about"))}>
                About
              </Item>
              <Item
                icon={<FolderGit2 size={15} />}
                onSelect={() => run(() => router.push("/#projects"))}
              >
                Projects
              </Item>
              {site.projects.map((p) => (
                <Item
                  key={p.slug}
                  icon={<FolderGit2 size={15} />}
                  onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
                >
                  {p.title}
                </Item>
              ))}
              <Item icon={<Mail size={15} />} onSelect={() => run(() => router.push("/#contact"))}>
                Contact
              </Item>
              <Item
                icon={<FileDown size={15} />}
                onSelect={() => run(() => window.open(site.resumeUrl, "_blank"))}
              >
                Download resume
              </Item>
              {github && (
                <Item
                  icon={<Github size={15} />}
                  onSelect={() => run(() => window.open(github, "_blank"))}
                >
                  GitHub
                </Item>
              )}
              {linkedin && (
                <Item
                  icon={<Linkedin size={15} />}
                  onSelect={() => run(() => window.open(linkedin, "_blank"))}
                >
                  LinkedIn
                </Item>
              )}
              <Item
                icon={resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                onSelect={() =>
                  run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
                }
              >
                Toggle theme
              </Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-[var(--card-hover)] data-[selected=true]:text-[var(--fg)]"
    >
      <span className="text-faint">{icon}</span>
      {children}
    </Command.Item>
  );
}
