import { GitCommit } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type GithubEvent = {
  type: string;
  repo: { name: string };
  payload: { commits?: { sha: string; message: string }[] };
  created_at: string;
};

type CommitItem = {
  id: string;
  repo: string;
  message: string;
  sha: string;
  createdAt: string;
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

async function getRecentCommits(username: string): Promise<CommitItem[]> {
  const res = await fetch(`https://api.github.com/users/${username}/events/public`, {
    headers: { Accept: "application/vnd.github+json" },
    // Revalidate hourly so this stays "live" without hitting GitHub's
    // unauthenticated rate limit (60 req/hr per IP) on every page view.
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];

  const events = (await res.json()) as GithubEvent[];
  const commits: CommitItem[] = [];

  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    for (const commit of event.payload.commits ?? []) {
      commits.push({
        id: commit.sha,
        repo: event.repo.name.split("/")[1] ?? event.repo.name,
        message: commit.message.split("\n")[0],
        sha: commit.sha.slice(0, 7),
        createdAt: event.created_at,
      });
      if (commits.length >= 6) return commits;
    }
  }
  return commits;
}

export async function GithubActivity() {
  const githubUrl = site.socials.find((s) => s.label === "GitHub")?.url;
  const username = githubUrl?.split("/").filter(Boolean).pop();
  if (!username) return null;

  const commits = await getRecentCommits(username).catch(() => []);
  if (commits.length === 0) return null;

  return (
    <section id="activity" className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          size="minor"
          eyebrow="Live"
          title="Recent commits"
          description={`Pulled straight from github.com/${username}. This is what I actually pushed most recently.`}
        />
        <div className="card divide-y divide-[var(--border)] overflow-hidden">
          {commits.map((commit, i) => (
            <ScrollReveal key={commit.id} delay={i * 0.04}>
              <a
                href={`https://github.com/${username}/${commit.repo}/commit/${commit.sha}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 px-6 py-4 transition-colors hover:bg-[var(--border)]/20 sm:px-7"
              >
                <GitCommit size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--fg)]">{commit.message}</p>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {commit.repo} · {commit.sha} · {timeAgo(commit.createdAt)}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
