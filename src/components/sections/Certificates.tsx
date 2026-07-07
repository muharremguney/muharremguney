import { Award } from "lucide-react";
import { certificates } from "@/data/certificates";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function Certificates() {
  return (
    <section id="certificates" className="border-t border-border bg-card/40 py-20">
      <Container>
        <SectionHeading
          eyebrow="Sertifikalar"
          title="Sertifikalarım"
          description="Aşağıdaki kart örnek içeriktir; sertifikalar eklendikçe güncellenecektir."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card
              key={cert.title}
              className={cn(
                "flex items-start gap-4",
                cert.isPlaceholder && "border-dashed"
              )}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted">{cert.issuer}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {cert.isPlaceholder ? "Örnek İçerik" : cert.date}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
