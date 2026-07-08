import { Award, Building2 } from "lucide-react";
import { certificates } from "@/data/certificates";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

function groupByIssuer() {
  const groups = new Map<string, typeof certificates>();
  for (const cert of certificates) {
    const existing = groups.get(cert.issuer);
    if (existing) {
      existing.push(cert);
    } else {
      groups.set(cert.issuer, [cert]);
    }
  }
  return Array.from(groups.entries());
}

export function Certificates() {
  const groups = groupByIssuer();

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Sertifikalar"
            title="Sertifikalarım"
            description={`${certificates.length} sertifika · ${groups.length} kurum.`}
          />
        </Reveal>

        <div className="space-y-6">
          {groups.map(([issuer, items], groupIndex) => (
            <Reveal key={issuer} delay={groupIndex * 100}>
              <TiltCard className="p-8">
                <div className="flex items-center gap-4 border-b border-border pb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{issuer}</h3>
                    <p className="text-sm text-muted">
                      {items.length} sertifika · {items[0].date}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {items.map((cert) => (
                    <li
                      key={cert.title}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-3 py-2.5 transition-colors hover:border-primary"
                    >
                      <Award className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm font-medium text-foreground">{cert.title}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
