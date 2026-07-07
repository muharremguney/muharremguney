import type { LanguageItem, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Programlama & Web",
    skills: ["PHP", "MySQL", "Python", "C#", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "BT Operasyonları & Altyapı",
    skills: [
      "BT Operasyonları",
      "BT Altyapı Yönetimi",
      "Bilgisayar Donanımı",
      "Microsoft 365 Yönetimi",
    ],
  },
];

export const languages: LanguageItem[] = [{ name: "İngilizce", level: "A2 Seviye" }];
