"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useVisitorSystemInfo } from "@/components/workspace/useVisitorSystemInfo";

type Line = { type: "input" | "output"; text: string };

const HELP_TEXT = [
  "Kullanılabilir komutlar:",
  "  about      — Hakkımda sayfasını açar",
  "  skills     — Yetenekler sayfasını açar",
  "  projects   — Projeler sayfasını açar",
  "  contact    — İletişim sayfasını açar",
  "  system     — Ziyaretçi sistem analizini gösterir",
  "  clear      — Terminal ekranını temizler",
  "  help       — Bu listeyi gösterir",
].join("\n");

const WELCOME_TEXT =
  'Muharrem CLI — v1.0.0\nKomutları görmek için "help" yazın.';

function makeSystemReport(info: ReturnType<typeof useVisitorSystemInfo>): string {
  return [
    `${info.greeting}! Sistem analizi:`,
    `  konum      : ${
      [info.flag, [info.city, info.country].filter(Boolean).join(", ")]
        .filter(Boolean)
        .join(" ") || "tespit edilemedi"
    }`,
    `  ip         : ${info.maskedIp ?? "yerelde kullanılamıyor"}`,
    `  çözünürlük : ${info.resolution}`,
    `  tarayıcı   : ${info.browser}`,
    `  işletim s. : ${info.os}`,
    `  yerel saat : ${info.localTime}`,
  ].join("\n");
}

export function TerminalPanel({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [lines, setLines] = useState<Line[]>([{ type: "output", text: WELCOME_TEXT }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const systemInfo = useVisitorSystemInfo();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function print(text: string) {
    setLines((prev) => [...prev, { type: "output", text }]);
  }

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;

    setLines((prev) => [...prev, { type: "input", text: command }]);
    setHistory((prev) => [...prev, command]);
    setHistoryIndex(null);

    const normalized = command.toLocaleLowerCase("tr-TR");

    switch (normalized) {
      case "help":
        print(HELP_TEXT);
        break;
      case "clear":
        setLines([]);
        break;
      case "about":
        onNavigate("about");
        print("Hakkımda sayfası açılıyor...");
        break;
      case "skills":
        onNavigate("skills");
        print("Yetenekler sayfası açılıyor...");
        break;
      case "projects":
        onNavigate("projects");
        print("Projeler sayfası açılıyor...");
        break;
      case "contact":
        onNavigate("contact");
        print("İletişim sayfası açılıyor...");
        break;
      case "system":
        print(makeSystemReport(systemInfo));
        break;
      case "sudo hire muharrem":
        print(
          "[sudo] parola gerekmiyor 😉\n✅ Yetki verildi.\n🎉 Harika seçim! Muharrem'e ulaşmak için 'contact' yazabilir ya da CV'sini indirebilirsin."
        );
        break;
      default:
        print(`Komut bulunamadı: ${command}\n"help" yazarak komutları görebilirsin.`);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runCommand(input);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  if (!open) return null;

  return (
    <div className="flex h-64 shrink-0 flex-col border-t border-border bg-[#0b1120] text-slate-200">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-slate-400">TERMINAL — Muharrem CLI</span>
        <button type="button" onClick={onClose} aria-label="Terminali kapat">
          <X className="h-4 w-4 text-slate-400 hover:text-slate-200" />
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-1.5 overflow-y-auto px-4 py-3 font-mono text-sm">
        {lines.map((line, index) =>
          line.type === "input" ? (
            <div key={index} className="flex text-slate-200">
              <span className="mr-2 text-accent">$</span>
              <span>{line.text}</span>
            </div>
          ) : (
            <div key={index} className="whitespace-pre-line pl-4 text-slate-400">
              {line.text}
            </div>
          )
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center border-t border-white/10 px-4 py-2">
        <span className="mr-2 font-mono text-sm text-accent">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none"
          placeholder="bir komut yazın..."
        />
      </form>
    </div>
  );
}
