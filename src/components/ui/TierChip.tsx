import type { SkillTier } from "@/content/types";
import { cn } from "@/lib/utils";

const tierStyles: Record<SkillTier, string> = {
  Built: "bg-ink text-paper",
  Used: "border border-ink-3 text-ink-2",
  Touched: "border border-dashed border-ink-3 text-ink-3",
};

/**
 * Honest skill depth badge: Built / Used / Touched, straight from
 * the skill depth ledger. No fake percentage bars.
 */
export function TierChip({ tier, className }: { tier: SkillTier; className?: string }) {
  return (
    <span
      className={cn(
        "data inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase leading-none tracking-wide",
        tierStyles[tier],
        className
      )}
    >
      {tier}
    </span>
  );
}
