import type { SocialLink } from "@/types";

export const profile = {
  name: "Muharrem Güney",
  title: "IT Support Specialist",
  location: "İstanbul / Pendik",
  email: "muharremgunney@gmail.com",
  avatar: "/images/muharrem-guney.png",
  cvFile: "/cv/muharrem-guney-cv.pdf",
  heroTagline:
    "Bilgi teknolojileri altyapısı, kullanıcı destek süreçleri ve yazılım geliştirme alanlarında pratik deneyime sahip, öğrenmeye ve gelişmeye açık bir BT profesyoneli.",
  about: [
    "2019 yılında Bilişim Teknolojileri bölümünü okul birincisi olarak tamamladım. 2025 yılında ise Dokuz Eylül Üniversitesi Yönetim Bilişim Sistemleri bölümünden mezun oldum.",
    "Bir süre e-ticaret alanında yurt dışına yönelik satış faaliyetlerinde bulundum. Uzun yıllar bilişim alanında eğitim aldım ve bu süreçte kapsamlı teknik bilgiler edindim.",
    "Edindiğim bilgi ve becerileri aktif olarak kullanabileceğim, aynı zamanda kendimi geliştirebileceğim bir iş ortamı arıyorum. Hızlı öğrenme ve analitik düşünme yeteneklerimle, bilişim sektöründe yenilikçi projelerde yer almayı hedefliyorum.",
  ],
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/muharremguney",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muharrem-g-a096b6283/",
    icon: "linkedin",
  },
  {
    label: "E-posta",
    href: "mailto:muharremgunney@gmail.com",
    icon: "email",
  },
];
