import { profile, socialLinks } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";

function fold(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
}

type Topic = {
  keywords: string[];
  answer: () => string;
};

const topics: Topic[] = [
  {
    keywords: ["maymun"],
    answer: () => "Seni çok seviyorum bitanem, iyi ki hayatımdasın.",
  },
  {
    keywords: ["merhaba", "selam", "hey", "gunaydin", "iyi gunler", "iyi aksamlar"],
    answer: () =>
      `Merhaba! Ben ${profile.name}'in portföy sitesindeki asistanıyım. Sadece onun deneyimi, yetenekleri, eğitimi ve projeleriyle ilgili sorulara cevap verebilirim.`,
  },
  {
    keywords: ["kim", "hakkinda", "tanit", "kimsin"],
    answer: () => `${profile.name}, ${profile.title}. ${profile.about[0]}`,
  },
  {
    keywords: ["deneyim", "is ", "calis", "kariyer", "firma", "sirket", "nerede calisiyor"],
    answer: () => {
      const lines = experience.map(
        (item) =>
          `• ${item.role} — ${item.company} (${item.period})${item.current ? ", hâlâ devam ediyor" : ""}`
      );
      return `İş deneyimleri şöyle:\n${lines.join("\n")}`;
    },
  },
  {
    keywords: ["egitim", "okul", "universite", "lise", "mezun"],
    answer: () => {
      const lines = education.map(
        (item) => `• ${item.school} — ${item.program} (${item.period})`
      );
      return `Eğitim geçmişi:\n${lines.join("\n")}`;
    },
  },
  {
    keywords: ["yetenek", "beceri", "teknoloji", "programlama"],
    answer: () => {
      const skillLines = skillCategories.map(
        (cat) => `• ${cat.title}: ${cat.skills.join(", ")}`
      );
      return `Teknik yetkinlikler:\n${skillLines.join("\n")}`;
    },
  },
  {
    keywords: ["proje"],
    answer: () => {
      const hasRealProjects = projects.some((p) => !p.isPlaceholder);
      if (!hasRealProjects) {
        return "Şu anda profilde gerçek bir proje listelenmiyor — Projeler bölümündeki kartlar açıkça işaretlenmiş örnek/placeholder içeriktir. Gerçek projeler eklendiğinde burada listeleyebilirim.";
      }
      return projects
        .filter((p) => !p.isPlaceholder)
        .map((p) => `• ${p.title}: ${p.description}`)
        .join("\n");
    },
  },
  {
    keywords: ["sertifika"],
    answer: () => {
      const hasRealCertificates = certificates.some((c) => !c.isPlaceholder);
      if (!hasRealCertificates) {
        return "Şu anda profilde gerçek bir sertifika listelenmiyor — Sertifikalar bölümündeki kart açıkça örnek/placeholder içeriktir.";
      }
      return certificates
        .filter((c) => !c.isPlaceholder)
        .map((c) => `• ${c.title} — ${c.issuer} (${c.date})`)
        .join("\n");
    },
  },
  {
    keywords: ["iletisim", "email", "e-posta", "eposta", "mail", "ulas", "telefon"],
    answer: () =>
      `Muharrem'e e-posta üzerinden ulaşabilirsin: ${profile.email}. Telefon numarası gizlilik nedeniyle paylaşılmıyor. Ayrıca ${socialLinks.find((s) => s.icon === "linkedin")?.href} adresinden LinkedIn'de de bulabilirsin.`,
  },
  {
    keywords: ["cv", "ozgecmis"],
    answer: () =>
      `Şu anda site üzerinden doğrudan bir CV indirme seçeneği yok. CV için Muharrem'e e-posta ile ulaşabilirsin: ${profile.email}`,
  },
  {
    keywords: ["nerede oturuyor", "sehir", "konum", "yasiyor"],
    answer: () => `Muharrem şu anda ${profile.location} bölgesinde yaşıyor.`,
  },
  {
    keywords: ["tesekkur", "sagol", "sag ol"],
    answer: () => "Rica ederim! Başka bir sorun olursa buradayım.",
  },
];

const FALLBACK =
  "Bu konuda elimde bilgi yok, dolayısıyla bir şey uydurmak istemem. Bunun yerine Muharrem'e doğrudan e-posta ile ulaşabilirsin: " +
  profile.email;

export function answerQuestion(question: string): string {
  const normalized = fold(question);
  for (const topic of topics) {
    if (topic.keywords.some((keyword) => normalized.includes(fold(keyword)))) {
      return topic.answer();
    }
  }
  return FALLBACK;
}
