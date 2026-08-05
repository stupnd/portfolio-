import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-accent text-white hover:bg-accent-soft shadow-[0_0_24px_rgba(108,124,255,0.35)] hover:shadow-[0_0_32px_rgba(108,124,255,0.5)]",
  secondary:
    "glass text-[var(--fg)] hover:border-[var(--border-strong)]",
  ghost: "text-muted hover:text-[var(--fg)]",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  className,
  external,
  download,
}: {
  href: string;
  variant?: keyof typeof styles;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
    styles[variant],
    className
  );
  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
