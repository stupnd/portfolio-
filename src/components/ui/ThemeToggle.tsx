"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-[var(--fg)]"
    >
      {/* Render both until mounted to avoid hydration mismatch */}
      {mounted && resolvedTheme === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
