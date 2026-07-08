import { Code2, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { getSkillIcon } from "@/components/workspace/skillIcons";

const categoryIcons: Record<string, LucideIcon> = {
  "Programlama & Web": Code2,
  "BT Operasyonları & Altyapı": Server,
};

const totalSkills = skillCategories.reduce((sum, category) => sum + category.skills.length, 0);

export function Skills() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Yetenekler"
            title="Teknik bilgi ve becerilerim"
            description={`Eğitim ve iş deneyimlerim boyunca edindiğim ${totalSkills} teknoloji, ${skillCategories.length} kategoride.`}
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = categoryIcons[category.title] ?? Code2;
            return (
              <Reveal key={category.title} delay={index * 100}>
                <TiltCard className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CategoryIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted">{category.skills.length} teknoloji</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {category.skills.map((skill) => {
                      const SkillIcon = getSkillIcon(skill);
                      return (
                        <div
                          key={skill}
                          className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5 transition-colors hover:border-primary"
                        >
                          <SkillIcon className="h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm font-medium text-foreground">{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
