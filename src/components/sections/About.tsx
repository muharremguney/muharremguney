import { GraduationCap, Briefcase, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const paragraphIcons: LucideIcon[] = [GraduationCap, Briefcase, Target];

const focusAreas = ["Kullanıcı Desteği", "Sistem Yönetimi", "Ağ Altyapısı", "Yazılım Çözümleri"];

export function About() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Hakkımda" title={profile.aboutTitle} />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ol className="relative space-y-8 border-l border-border pl-8">
            {profile.about.map((paragraph, index) => {
              const Icon = paragraphIcons[index] ?? Target;
              return (
                <Reveal key={index} as="li" delay={index * 100} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+12px)] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground"
                    aria-hidden
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={200}>
            <div className="lg:sticky lg:top-6 rounded-xl border border-border bg-[#0b1120] font-mono text-sm shadow-lg">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 text-xs text-slate-400">profile.json</span>
              </div>
              <div className="space-y-1 px-5 py-4 leading-relaxed">
                <div className="text-slate-500">{"{"}</div>
                <JsonLine indent name="name" value={profile.name} />
                <JsonLine indent name="title" value={profile.title} />
                <JsonLine indent name="location" value={profile.location} />
                <div className="pl-4">
                  <span className="text-sky-400">&quot;focus&quot;</span>
                  <span className="text-slate-500">: [</span>
                </div>
                {focusAreas.map((area, index) => (
                  <div key={area} className="pl-8">
                    <span className="text-emerald-400">&quot;{area}&quot;</span>
                    {index < focusAreas.length - 1 && (
                      <span className="text-slate-500">,</span>
                    )}
                  </div>
                ))}
                <div className="pl-4 text-slate-500">]</div>
                <div className="text-slate-500">{"}"}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

function JsonLine({
  indent,
  name,
  value,
}: {
  indent?: boolean;
  name: string;
  value: string;
}) {
  return (
    <div className={indent ? "pl-4" : undefined}>
      <span className="text-sky-400">&quot;{name}&quot;</span>
      <span className="text-slate-500">: </span>
      <span className="text-emerald-400">&quot;{value}&quot;</span>
      <span className="text-slate-500">,</span>
    </div>
  );
}
