import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function Education() {
  return (
    <section id="education" className="border-t border-border bg-card/40 py-20">
      <Container>
        <SectionHeading eyebrow="Eğitim" title="Eğitim Geçmişim" />
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((item) => (
            <Card key={item.school} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {item.school}
                </h3>
                <p className="text-sm text-primary">{item.program}</p>
                <p className="mt-1 text-sm text-muted">{item.period}</p>
                {item.detail && (
                  <p className="mt-2 text-sm text-muted">{item.detail}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
