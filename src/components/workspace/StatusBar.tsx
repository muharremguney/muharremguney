import { GitBranch, Mail, TerminalSquare } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { SectionFile } from "@/data/sections";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export function StatusBar({
  activeFile,
  terminalOpen,
  onToggleTerminal,
}: {
  activeFile: SectionFile;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}) {
  return (
    <div className="flex h-7 shrink-0 items-center justify-between bg-primary px-3 text-[11px] text-primary-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <GitBranch className="h-3 w-3" /> main
        </span>
        <span className="hidden sm:inline">{activeFile.fileName}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleTerminal}
          aria-pressed={terminalOpen}
          className="flex items-center gap-1 opacity-90 transition-opacity hover:opacity-100"
        >
          <TerminalSquare className="h-3 w-3" />
          <span className="hidden sm:inline">Terminal</span>
        </button>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">{profile.location}</span>
        <div className="flex items-center gap-2.5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="opacity-90 transition-opacity hover:opacity-100"
              >
                <Icon className="h-3 w-3" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
