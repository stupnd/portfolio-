import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * A ruled section. The heading sits in a narrow left column on wide screens so
 * the content column lines up across the page, the way a ledger's columns do.
 */
export function Section({
  id,
  title,
  lede,
  children,
  className,
  band,
}: {
  id?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
  /** Inverted ground for the one section that should own the page */
  band?: "ink";
}) {
  return (
    <section
      id={id}
      className={cn(band === "ink" && "band-ink", "py-14 sm:py-20", className)}
    >
      <Container>
        <div className="grid gap-x-12 gap-y-8 border-t border-ink pt-8 lg:grid-cols-[14rem,1fr]">
          <div>
            <h2 className="display text-display-md font-bold">{title}</h2>
            {lede && <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">{lede}</p>}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
