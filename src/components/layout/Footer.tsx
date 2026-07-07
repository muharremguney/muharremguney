import { Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { navItems } from "@/data/nav";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-foreground">{profile.name}</p>
          <p className="text-sm text-muted">{profile.title}</p>
        </div>

        <ul className="hidden gap-6 text-sm text-muted sm:flex">
          {navItems.slice(0, 5).map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </Container>
      <Container className="pb-8">
        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Tüm hakları saklıdır.
        </p>
      </Container>
    </footer>
  );
}
