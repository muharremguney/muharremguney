export type FileExt = "tsx" | "ts" | "json" | "log";

export type SectionFile = {
  id: string;
  fileName: string;
  label: string;
  ext: FileExt;
};

export const sectionFiles: SectionFile[] = [
  { id: "home", fileName: "Anasayfa.tsx", label: "Ana Sayfa", ext: "tsx" },
  { id: "about", fileName: "Hakkimda.tsx", label: "Hakkımda", ext: "tsx" },
  { id: "skills", fileName: "Yetenekler.json", label: "Yetenekler", ext: "json" },
  { id: "experience", fileName: "Deneyim.ts", label: "Deneyim", ext: "ts" },
  { id: "education", fileName: "Egitim.ts", label: "Eğitim", ext: "ts" },
  { id: "projects", fileName: "Projeler.tsx", label: "Projeler", ext: "tsx" },
  { id: "certificates", fileName: "Sertifikalar.tsx", label: "Sertifikalar", ext: "tsx" },
  { id: "assistant", fileName: "Asistan.tsx", label: "AI Asistan", ext: "tsx" },
  { id: "helpdesk", fileName: "Helpdesk.tsx", label: "Helpdesk Demo", ext: "tsx" },
  { id: "system", fileName: "Sistem.log", label: "Sistem Analizi", ext: "log" },
  { id: "contact", fileName: "Iletisim.tsx", label: "İletişim", ext: "tsx" },
];

export type SectionId = (typeof sectionFiles)[number]["id"];
