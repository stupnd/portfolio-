"use client";

import { useState } from "react";
import { site } from "@/content/site.config";
import { Section } from "@/components/ui/Section";
import { TierChip } from "@/components/ui/TierChip";

const COLLAPSED_PER_CATEGORY = 3;

/**
 * Reference material, so it reads as a dense ruled table. Collapsed, each
 * category shows its first three entries (the config lists them strongest
 * first); the rest are one click away for the reviewer who wants them.
 */
export function Skills() {
  const [all, setAll] = useState(false);
  const total = site.skillCategories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <Section
      id="skills"
      title="Skills"
      lede="Depth, not percentage bars. Built: I designed and shipped it. Used: I work in it regularly."
    >
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {site.skillCategories.map((cat) => {
          const shown = all ? cat.skills : cat.skills.slice(0, COLLAPSED_PER_CATEGORY);
          return (
            <div key={cat.label}>
              <h3 className="text-sm font-semibold">{cat.label}</h3>
              <ul className="mt-2 border-t border-ink">
                {shown.map((skill) => (
                  <li key={skill.name} className="border-b border-rule py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-medium">{skill.name}</span>
                      <TierChip tier={skill.tier} />
                    </div>
                    {skill.evidence && (
                      <p className="mt-1 text-xs leading-snug text-ink-3">{skill.evidence}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setAll(!all)}
        aria-expanded={all}
        className="mt-8 inline-flex min-h-11 items-center rounded border border-ink/80 px-5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
      >
        {all ? "Show the short list" : `Show all ${total}`}
      </button>
    </Section>
  );
}
