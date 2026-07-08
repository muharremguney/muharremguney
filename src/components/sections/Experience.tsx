import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { CompanyAvatar } from "@/components/workspace/CompanyAvatar";
import { companyLogos } from "@/data/companyLogos";
import { getDurationLabel } from "@/lib/duration";

export function Experience() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Deneyim"
            title="İş Deneyimlerim"
            description={`${experience.length} farklı kurumda edindiğim profesyonel deneyim.`}
          />
        </Reveal>

        <ol className="relative space-y-8 border-l border-border pl-8">
          {experience.map((item, index) => {
            const duration = getDurationLabel(item.period);
            return (
              <Reveal
                key={`${item.company}-${item.period}`}
                as="li"
                delay={index * 100}
                className="relative"
              >
                <span
                  className={`absolute -left-[calc(2rem+5px)] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary ${
                    item.current ? "animate-pulse-glow" : ""
                  }`}
                  aria-hidden
                />
                <TiltCard className="flex gap-5 p-7">
                  <CompanyAvatar
                    name={item.company}
                    logoSrc={companyLogos[item.company]}
                    className="h-14 w-14 text-base"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                      {item.current && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          Devam Ediyor
                        </span>
                      )}
                      {duration && !item.current && (
                        <span className="rounded-full bg-border/60 px-2.5 py-0.5 text-xs font-semibold text-muted">
                          {duration}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-primary">{item.company}</p>
                    <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </div>
  );
}
