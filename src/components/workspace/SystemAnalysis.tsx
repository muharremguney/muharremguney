"use client";

import { AppWindow, Clock, Globe2, MonitorSmartphone, ShieldCheck, Laptop2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { useVisitorSystemInfo } from "@/components/workspace/useVisitorSystemInfo";

export function SystemAnalysis() {
  const info = useVisitorSystemInfo();

  const cards: { icon: LucideIcon; label: string; value: string }[] = [
    {
      icon: Globe2,
      label: "Konum",
      value:
        [info.flag, [info.city, info.country].filter(Boolean).join(", ")]
          .filter(Boolean)
          .join(" ") || "Tespit edilemedi",
    },
    { icon: ShieldCheck, label: "Maskelenmiş IP", value: info.maskedIp ?? "Yerelde kullanılamıyor" },
    { icon: MonitorSmartphone, label: "Ekran Çözünürlüğü", value: info.resolution },
    { icon: AppWindow, label: "Tarayıcı", value: info.browser },
    { icon: Laptop2, label: "İşletim Sistemi", value: info.os },
    { icon: Clock, label: "Yerel Saat", value: info.localTime },
  ];

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Sistem Analizi"
            title={`${info.greeting}, hoş geldin!`}
            description="Bu bilgiler yalnızca tarayıcından ve isteğinden anlık olarak okunur; hiçbiri sunucuda saklanmaz veya kaydedilmez."
          />
        </Reveal>

        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          sistem.log — canlı
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.label} delay={index * 80}>
              <TiltCard className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted">{card.label}</p>
                  <p className="truncate font-mono text-base font-semibold text-foreground">
                    {card.value}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
