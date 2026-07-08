"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { answerQuestion } from "@/lib/assistant";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  text: "Merhaba! Ben Muharrem'in portföy asistanıyım. Sadece onun deneyimi, eğitimi, yetenekleri, projeleri ve iletişim bilgileriyle ilgili sorulara cevap veriyorum — bilmediğim bir şeyi uydurmam.",
};

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = answerQuestion(question);
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
      setThinking(false);
    }, 450);
  }

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <SectionHeading
          eyebrow="AI Asistan"
          title="Muharrem hakkında soru sor"
          description="Kural tabanlı, yerel çalışan bir asistan — kapsamı dışındaki konularda bilgi uydurmaz."
        />

        <TiltCard className="flex h-[28rem] max-w-2xl flex-col">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2.5 ${
                  message.role === "user" ? "flex-row-reverse text-right" : ""
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === "assistant"
                      ? "bg-border/40 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-border/40 px-4 py-2.5 text-sm text-muted">
                  yazıyor...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2 border-t border-border pt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Örn: Deneyimlerin neler?"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 transition-shadow focus:ring-2"
            />
            <button
              type="submit"
              aria-label="Gönder"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </TiltCard>
      </Container>
    </div>
  );
}
