import { Mail, MapPin } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="İletişim"
          title="Benimle İletişime Geçin"
          description="Bir fırsat, proje ya da sorunuz mu var? Aşağıdaki formu doldurun ya da doğrudan e-posta gönderin."
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="space-y-6">
            <Card className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted">E-posta</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-semibold text-foreground hover:text-primary"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted">Konum</p>
                  <p className="text-sm font-semibold text-foreground">
                    {profile.location}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <Card>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </section>
  );
}
