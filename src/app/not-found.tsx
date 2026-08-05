import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div aria-hidden className="glow-field absolute inset-0" />
      <div className="relative px-5 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-display-lg font-semibold">
          This page applied itself out of existence.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Whatever you were looking for isn&apos;t here — but the projects are one click away.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft"
        >
          <ArrowLeft size={15} /> Back home
        </Link>
      </div>
    </section>
  );
}
