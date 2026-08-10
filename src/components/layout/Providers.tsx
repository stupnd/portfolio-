"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SideNav } from "@/components/layout/SideNav";

// Decorative / interactive-only widgets: client-side, code-split
const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <SideNav />
      {children}
      <BackToTop />
    </ThemeProvider>
  );
}
