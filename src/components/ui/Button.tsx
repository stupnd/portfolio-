import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary: "min-h-11 rounded px-5 bg-accent text-accent-ink hover:bg-accent/90",
  secondary: "min-h-11 rounded px-5 border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  ghost: "min-h-9 text-ink-2 underline decoration-rule-strong hover:text-ink hover:decoration-ink",
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
    "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-150",
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
