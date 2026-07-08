import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { getDurationLabel } from "@/lib/duration";

export function Education() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Eğitim"
            title="Eğitim Geçmişim"
            description="Bilişim Teknolojileri ve Yönetim Bilişim Sistemleri alanlarında aldığım örgün eğitim."
          />
        </Reveal>

        <ol className="relative space-y-8 border-l border-border pl-8">
          {education.map((item, index) => {
            const duration = getDurationLabel(item.period);
            return (
              <Reveal
                key={item.school}
                as="li"
                delay={index * 100}
                className="relative"
              >
                <span
                  className="absolute -left-[calc(2rem+5px)] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary"
                  aria-hidden
                />
                <TiltCard className="flex gap-5 p-7">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.school}
                      </h3>
                      {duration && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {duration}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-primary">{item.program}</p>
                    <p className="mt-1 text-sm text-muted">{item.period}</p>
                    {item.detail && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                    )}
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
