import { skillCategories, languages } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-card/40 py-20">
      <Container>
        <SectionHeading
          eyebrow="Yetenekler"
          title="Teknik bilgi ve becerilerim"
          description="Eğitim ve iş deneyimlerim boyunca edindiğim teknik yetkinlikler."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}

          <Card>
            <h3 className="text-lg font-semibold text-foreground">Diller</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge key={lang.name}>
                  {lang.name} — {lang.level}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
