import { FileDown, Mail } from "lucide-react";
import { site } from "@/content/site.config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RecordStream } from "@/components/interactive/RecordStream";

export function Hero() {
  const github = site.socials.find((s) => s.label === "GitHub")?.url;
  const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.url;
  const [first, ...rest] = site.name.split(" ");
  const { startDate, locations, authorization } = site.lookingFor;

  return (
    <section className="pb-16 pt-24 sm:pb-24 sm:pt-28">
      <Container>
        <div className="grid items-start gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-4">
            <h1 className="display text-display-xl font-extrabold">
              {first}
              <br />
              {rest.join(" ")}
            </h1>
            <p className="mt-7 max-w-md text-xl font-semibold leading-snug sm:text-2xl">
              {site.headline}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">{site.subheadline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={site.resumeUrl} download>
                <FileDown size={16} aria-hidden /> Resume
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary">
                <Mail size={16} aria-hidden /> Email me
              </Button>
              <div className="ml-1 flex items-center gap-4 text-sm">
                {github && (
                  <Button href={github} variant="ghost" external>
                    GitHub
                  </Button>
                )}
                {linkedin && (
                  <Button href={linkedin} variant="ghost" external>
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-[5.5rem,1fr] gap-x-4 border-t border-rule text-sm">
              <Fact label="Start" value={`${startDate}, new grad`} />
              <Fact label="Where" value={locations} />
              <Fact label="Status" value={authorization} />
            </dl>
          </div>

          <div className="lg:col-span-7">
            <RecordStream />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="border-b border-rule py-2.5 font-semibold text-ink">
        {label}
      </dt>
      <dd className="border-b border-rule py-2.5 text-ink-2">{value}</dd>
    </>
  );
}
