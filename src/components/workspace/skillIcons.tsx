import {
  Braces,
  Cpu,
  Database,
  Globe,
  Hash,
  Mail,
  Network,
  Palette,
  Settings,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const skillIconMap: Record<string, LucideIcon> = {
  PHP: Braces,
  MySQL: Database,
  Python: Terminal,
  "C#": Hash,
  HTML: Globe,
  CSS: Palette,
  JavaScript: Braces,
  "BT Operasyonları": Settings,
  "BT Altyapı Yönetimi": Network,
  "Bilgisayar Donanımı": Cpu,
  "Microsoft 365 Yönetimi": Mail,
};

export function getSkillIcon(name: string): LucideIcon {
  return skillIconMap[name] ?? Terminal;
}
