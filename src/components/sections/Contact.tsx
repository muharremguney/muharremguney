import { Mail, MapPin } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { ContactForm } from "@/components/sections/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function Contact() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="İletişim"
            title="Benimle İletişime Geçin"
            description="Bir fırsat, proje ya da sorunuz mu var? Aşağıdaki formu doldurun ya da doğrudan e-posta gönderin."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <Reveal>
              <TiltCard className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">
                    e-posta
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="truncate text-sm font-semibold text-foreground hover:text-primary"
                  >
                    {profile.email}
                  </a>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={80}>
              <TiltCard className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">konum</p>
                  <p className="text-sm font-semibold text-foreground">{profile.location}</p>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={160}>
              <TiltCard className="flex items-center gap-4">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">bağlan</p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.icon === "email" ? undefined : "_blank"}
                        rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                        aria-label={link.label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </TiltCard>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <TiltCard className="overflow-hidden">
              <div className="-mx-6 -mt-6 mb-6 flex items-center gap-1.5 border-b border-border bg-card/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-xs text-muted">POST /iletisim</span>
              </div>
              <ContactForm />
            </TiltCard>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
