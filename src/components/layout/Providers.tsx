"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CommandPalette />
      {children}
    </ThemeProvider>
  );
}
