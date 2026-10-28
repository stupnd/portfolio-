import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="data text-sm text-pending">offset not found</p>
        <h1 className="display mt-4 max-w-3xl text-display-lg font-extrabold">
          This page was never written to the log.
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-2">
          The link may be old. The work, the resume, and the email are all on the homepage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent/90"
        >
          <ArrowLeft size={16} aria-hidden /> Back to the homepage
        </Link>
      </div>
    </section>
  );
}
