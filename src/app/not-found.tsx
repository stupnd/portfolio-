import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-issue items-center px-4 sm:px-8">
      <div className="w-full border-t-2 border-rule-strong pt-4">
        <p className="caps text-[12px] text-accent">Erratum</p>
        <h1 className="mt-8 max-w-[14em] text-balance font-display text-headline text-ink">
          This page didn’t make it into the issue.
        </h1>
        <p className="mt-5 max-w-[34em] text-[19px] leading-[1.45] text-ink-2 sm:text-[21px]">
          The link may be from an older edition. The features, the resume and the email are all in the current one.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-1.5 text-[17px] text-accent underline decoration-accent/40 underline-offset-[5px] hover:decoration-accent"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden /> Back to the cover
        </Link>
      </div>
    </section>
  );
}
