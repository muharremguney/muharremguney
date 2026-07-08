import Image from "next/image";
import { Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { TerminalIntro } from "@/components/sections/TerminalIntro";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { TiltCard } from "@/components/ui/TiltCard";
import { PanelLink } from "@/components/workspace/PanelLink";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

const currentRole = experience.find((item) => item.current) ?? experience[0];

const stats = [
  { label: "İş Deneyimi", value: experience.length },
  { label: "Eğitim", value: education.length },
  {
    label: "Teknik Yetkinlik",
    value: skillCategories.reduce((sum, category) => sum + category.skills.length, 0),
  },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
      />
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <TiltCard className="animate-fade-in-up flex flex-col justify-center gap-6 text-center sm:col-span-2 sm:text-left lg:col-span-2 lg:row-span-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Merhaba, ben
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-xl font-medium text-muted">{profile.title}</p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {profile.heroTagline}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
              <PanelLink
                id="contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              >
                İletişime Geç
              </PanelLink>
            </div>

            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </TiltCard>

          <TiltCard className="animate-fade-in-up flex flex-col items-center justify-center gap-4 [animation-delay:120ms]">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="animate-spin-slow absolute inset-0 -z-10 scale-110 rounded-full bg-[conic-gradient(from_90deg,var(--primary),var(--accent),var(--primary))] opacity-25 blur-2xl"
              />
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={160}
                height={160}
                priority
                className="h-28 w-28 rounded-full border-4 border-card object-cover shadow-xl sm:h-36 sm:w-36"
              />
            </div>
          </TiltCard>

          <TiltCard className="animate-fade-in-up flex flex-col justify-center gap-3 [animation-delay:180ms]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Şu an
              </span>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">{currentRole.role}</p>
              <p className="text-sm text-primary">{currentRole.company}</p>
            </div>
            <p className="text-xs text-muted">{profile.location}</p>
          </TiltCard>

          <TerminalIntro className="animate-fade-in-up sm:col-span-2 lg:col-span-2 [animation-delay:250ms]" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-y border-border py-6 lg:justify-start">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <TechMarquee />
      </Container>
    </div>
  );
}
