import { Briefcase, CalendarCheck, FileDown, MapPin } from "lucide-react";
import { site } from "@/content/site.config";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

/**
 * The 10-second answer for a recruiter: what roles, when, and where.
 * Deliberately the first thing after the hero.
 */
export function LookingFor() {
  const { roles, startDate, locations, note } = site.lookingFor;

  return (
    <section id="looking-for" className="py-14 sm:py-16">
      <Container>
        <ScrollReveal>
          <div className="card overflow-hidden p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] lg:gap-12">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  What I&apos;m looking for
                </p>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent-soft"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">{note}</p>
              </div>

              <dl className="space-y-4 border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <Fact icon={<CalendarCheck size={16} />} label="Start date" value={startDate} />
                <Fact icon={<MapPin size={16} />} label="Location" value={locations} />
                <Fact
                  icon={<Briefcase size={16} />}
                  label="Experience"
                  value="3 software internships"
                />
                <Button href={site.resumeUrl} variant="secondary" download className="mt-2 w-full">
                  <FileDown size={15} /> Download resume
                </Button>
              </dl>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <div>
        <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">{label}</dt>
        <dd className="mt-0.5 text-sm text-muted">{value}</dd>
      </div>
    </div>
  );
}
