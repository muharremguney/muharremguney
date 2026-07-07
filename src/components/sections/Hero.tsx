import Image from "next/image";
import { Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
      />
      <Container className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between">
        <div className="animate-fade-in-up max-w-xl text-center lg:text-left">
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

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              İletişime Geç
            </a>
            <a
              href={profile.cvFile}
              download
              className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border/50 sm:w-auto"
            >
              CV İndir
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
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
        </div>

        <div className="animate-fade-in-up relative shrink-0 [animation-delay:150ms]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 rounded-full bg-[conic-gradient(from_90deg,var(--primary),var(--accent),var(--primary))] opacity-20 blur-2xl"
          />
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={288}
            height={288}
            priority
            className="h-56 w-56 rounded-full border-4 border-card object-cover shadow-xl sm:h-72 sm:w-72"
          />
        </div>
      </Container>
    </section>
  );
}
