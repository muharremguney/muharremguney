import type { SocialLink } from "@/types";

export const profile = {
  name: "Muharrem Güney",
  title: "IT Support Specialist",
  location: "İstanbul / Ümraniye",
  email: "muharremgunney@gmail.com",
  avatar: "/images/muharrem-guney.png",
  cvFile: "/cv/muharrem-guney-cv.pdf",
  heroTagline:
    "Bilgi teknolojileri alanında; kullanıcı desteği, sistem yönetimi, ağ altyapısı ve yazılım çözümleri üzerine çalışıyorum. Teknik problemleri yalnızca gidermekle kalmayıp, süreçleri daha verimli, düzenli ve sürdürülebilir hale getiren çözümler geliştirmeye odaklanıyorum.",
  aboutTitle: "Teknolojiyi iş süreçleriyle buluşturuyorum",
  about: [
    "Bilişim Teknolojileri alanındaki lise eğitimimi okul birincisi olarak tamamladıktan sonra, Dokuz Eylül Üniversitesi Yönetim Bilişim Sistemleri bölümünden mezun oldum. Bu eğitim süreci bana teknik bilgi birikiminin yanında, teknolojiyi işletme ihtiyaçları doğrultusunda değerlendirebilme becerisi kazandırdı.",
    "Kariyerim boyunca e-ticaret operasyonları, internet altyapısı, saha teknik destek hizmetleri ve kurumsal bilgi teknolojileri alanlarında görev aldım. Farklı çalışma ortamlarında edindiğim deneyimler sayesinde kullanıcı ihtiyaçlarını doğru analiz etme, teknik sorunlara hızlı müdahale etme ve uygulanabilir çözümler geliştirme konusunda kendimi geliştirdim.",
    "Günümüzde donanım ve yazılım desteği, ağ altyapısı, e-posta sistemleri, Microsoft 365 yönetimi ve uç nokta cihazlarının işletilmesi gibi kurumsal BT süreçlerinde aktif olarak çalışıyorum. Sürekli öğrenmeyi, sorumluluk almayı ve kurumlara ölçülebilir katkı sağlayan projeler üretmeyi kariyerimin temel yaklaşımı olarak benimsiyorum.",
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
