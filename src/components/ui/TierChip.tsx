import type { SkillTier } from "@/content/types";
import { cn } from "@/lib/utils";

const tierStyles: Record<SkillTier, string> = {
  Built: "border-accent/40 bg-accent/10 text-accent-soft",
  Used: "border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan",
  Touched: "border-[var(--border)] bg-transparent text-faint",
};

/**
 * Honest skill depth badge: Built / Used / Touched, straight from
 * the skill depth ledger. No fake percentage bars.
 */
export function TierChip({ tier, className }: { tier: SkillTier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        tierStyles[tier],
        className
      )}
    >
      {tier}
    </span>
  );
}
