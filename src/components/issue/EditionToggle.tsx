"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/** Day edition / night edition. The label names the edition you switch to. */
export function EditionToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const night = mounted && resolvedTheme === "dark";
  const next = night ? "Day edition" : "Night edition";

  return (
    <button
      type="button"
      onClick={() => setTheme(night ? "light" : "dark")}
      aria-label={mounted ? `Switch to the ${next.toLowerCase()}` : "Switch edition"}
      className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-ink-2 transition-colors hover:text-ink"
    >
      <span aria-hidden className="flex h-5 w-5 items-center justify-center">
        {night ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </span>
      <span className="hidden italic lg:inline">{mounted ? next : "Night edition"}</span>
    </button>
  );
}
