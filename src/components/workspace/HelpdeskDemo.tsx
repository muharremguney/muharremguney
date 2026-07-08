"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Circle } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";
import {
  generateTicketId,
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
  type Ticket,
  type TicketCategory,
  type TicketPriority,
} from "@/lib/ticketSimulator";

type LogEntry = { time: string; text: string };

function timestamp() {
  return new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function HelpdeskDemo() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [category, setCategory] = useState<TicketCategory>(ticketCategories[0]);
  const [priority, setPriority] = useState<TicketPriority>(ticketPriorities[0]);
  const [description, setDescription] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  function appendLog(text: string) {
    setLogs((prev) => [...prev, { time: timestamp(), text }]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const newTicket: Ticket = {
      id: generateTicketId(),
      category,
      priority,
      description: description.trim() || "Açıklama girilmedi.",
      status: "Açık",
      assignedTo: profile.name,
      createdAt: new Date(),
    };
    setTicket(newTicket);
    setLogs([
      { time: timestamp(), text: `Talep oluşturuldu → ${newTicket.id}` },
      { time: timestamp(), text: `Kategori atandı: ${newTicket.category}` },
      { time: timestamp(), text: `${newTicket.assignedTo} kuyruğa alındı` },
    ]);

    timers.current.push(
      setTimeout(() => {
        setTicket((prev) => (prev ? { ...prev, status: "İnceleniyor" } : prev));
        appendLog("Durum güncellendi → İnceleniyor");
      }, 3000)
    );
    timers.current.push(
      setTimeout(() => {
        setTicket((prev) => (prev ? { ...prev, status: "Çözüldü" } : prev));
        appendLog("Durum güncellendi → Çözüldü ✓");
      }, 8000)
    );
  }

  const activeStepIndex = ticket ? ticketStatuses.indexOf(ticket.status) : -1;

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <SectionHeading
          eyebrow="Helpdesk Demo"
          title="Etkileşimli Destek Talebi Simülasyonu"
          description="Bu bir demodur — gerçek bir destek talebi oluşturulmaz, girdiğin veriler hiçbir yerde saklanmaz."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <TiltCard className="overflow-hidden">
            <div className="-mx-6 -mt-6 mb-6 flex items-center gap-1.5 border-b border-border bg-card/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-xs text-muted">yeni-talep.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wide text-muted">
                  --kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TicketCategory)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
                >
                  {ticketCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wide text-muted">
                  --oncelik
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TicketPriority)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
                >
                  {ticketPriorities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wide text-muted">
                  --aciklama
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Örn: Bilgisayarım açılmıyor..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                ./talep-olustur --calistir
              </button>
            </form>
          </TiltCard>

          <TiltCard className="flex flex-col overflow-hidden">
            {!ticket ? (
              <div className="flex min-h-[20rem] flex-1 items-center justify-center">
                <p className="text-center text-sm text-muted">
                  Soldaki formu doldurup gönderdiğinde örnek bir destek talebi burada oluşacak.
                </p>
              </div>
            ) : (
              <div className="-m-6 flex flex-1 flex-col">
                <div className="space-y-5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-lg font-bold text-foreground">{ticket.id}</p>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {ticket.priority} Öncelik
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted">Kategori</p>
                      <p className="font-medium text-foreground">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted">Atanan Kişi</p>
                      <p className="font-medium text-foreground">{ticket.assignedTo}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">Açıklama</p>
                    <p className="mt-1 text-sm text-foreground">{ticket.description}</p>
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-wide text-muted">Durum</p>
                    <div className="flex items-center">
                      {ticketStatuses.map((status, index) => {
                        const isDone = index < activeStepIndex;
                        const isCurrent = index === activeStepIndex;
                        const isLast = index === ticketStatuses.length - 1;
                        return (
                          <div key={status} className="flex flex-1 items-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <div
                                className={cn(
                                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold",
                                  isDone && "border-primary bg-primary text-primary-foreground",
                                  isCurrent &&
                                    !isDone &&
                                    (status === "Çözüldü"
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-primary text-primary"),
                                  !isDone && !isCurrent && "border-border text-muted"
                                )}
                              >
                                {isDone || (isCurrent && status === "Çözüldü") ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : isCurrent ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Circle className="h-2 w-2 fill-current" />
                                )}
                              </div>
                              <span
                                className={cn(
                                  "text-[11px]",
                                  isCurrent || isDone
                                    ? "font-semibold text-foreground"
                                    : "text-muted"
                                )}
                              >
                                {status}
                              </span>
                            </div>
                            {!isLast && (
                              <div
                                className={cn(
                                  "mx-1 h-0.5 flex-1",
                                  index < activeStepIndex ? "bg-primary" : "bg-border"
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-[#0b1120] p-4">
                  <p className="mb-2 font-mono text-xs text-slate-400">destek-talebi.log</p>
                  <div ref={logRef} className="max-h-32 space-y-1 overflow-y-auto font-mono text-xs">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-2 text-slate-300">
                        <span className="text-slate-500">[{log.time}]</span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                    {ticket.status !== "Çözüldü" && (
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="terminal-caret" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TiltCard>
        </div>
      </Container>
    </div>
  );
}
