import { site } from "@/content/site.config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-faint">
          © {new Date().getFullYear()} {site.name} · Built with Next.js
        </p>
        <div className="flex items-center gap-5">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-faint transition-colors hover:text-[var(--fg)]"
            >
              {s.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="text-sm text-faint transition-colors hover:text-[var(--fg)]">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
