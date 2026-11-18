"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { SectionFocus } from "./SectionFocus";

const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CommandPalette />
      <SectionFocus />
      {children}
    </ThemeProvider>
  );
}
