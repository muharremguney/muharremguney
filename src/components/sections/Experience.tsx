import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <Container>
        <SectionHeading eyebrow="Deneyim" title="İş Deneyimlerim" />
        <ol className="relative space-y-10 border-l border-border pl-8">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}
                </h3>
                {item.current && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Devam Ediyor
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-primary">{item.company}</p>
              <p className="mt-1 text-sm text-muted">{item.period}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
