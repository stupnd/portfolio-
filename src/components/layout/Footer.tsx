import { site } from "@/content/site.config";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 sm:flex-row sm:items-center sm:px-8">
        <p className="data text-[11px] text-ink-3">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p className="data text-[11px] text-ink-3">
          Press ⌘K to jump anywhere
        </p>
      </div>
    </footer>
  );
}
