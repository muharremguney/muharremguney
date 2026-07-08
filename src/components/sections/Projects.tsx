import { ArrowUpRight, Clock } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

function repoPath(href?: string): string | null {
  if (!href) return null;
  const match = href.match(/github\.com\/(.+?)\/?$/);
  return match ? match[1] : null;
}

export function Projects() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Projeler"
            title="Üzerinde Çalıştığım Projeler"
            description={`GitHub'da paylaştığım ${projects.length} proje.`}
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <TiltCard
                className={cn(
                  "flex h-full min-w-0 flex-col",
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
                      className="shrink-0 text-muted transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {repoPath(project.href) && (
                  <div className="mt-1.5 flex min-w-0 items-center gap-1.5 font-mono text-xs text-muted">
                    <GithubIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0 truncate">{repoPath(project.href)}</span>
                  </div>
                )}

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

                {project.updatedAt && (
                  <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
                    <Clock className="h-3 w-3" />
                    Son güncelleme: {project.updatedAt}
                  </div>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
