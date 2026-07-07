import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Projeler"
          title="Üzerinde Çalıştığım Projeler"
          description="Aşağıdaki kartlar örnek içeriktir; gerçek projeler eklendikçe güncellenecektir."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className={cn(
                "flex flex-col",
                project.isPlaceholder && "border-dashed"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} bağlantısı`}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                )}
              </div>
              {project.isPlaceholder && (
                <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Örnek İçerik
                </span>
              )}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
