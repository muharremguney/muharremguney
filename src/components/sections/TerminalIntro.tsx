"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

const currentRole = experience.find((item) => item.current) ?? experience[0];

const LINES = [
  { prompt: "whoami", output: profile.name },
  { prompt: "cat rol.txt", output: profile.title },
  { prompt: "cat calisiyor.txt", output: `${currentRole.role} @ ${currentRole.company}` },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TerminalIntro({ className }: { className?: string }) {
  const [reducedMotion] = useState(prefersReducedMotion);
  const [lineIndex, setLineIndex] = useState(() => (prefersReducedMotion() ? LINES.length : 0));
  const [charIndex, setCharIndex] = useState(0);
  const done = lineIndex >= LINES.length;

  useEffect(() => {
    if (reducedMotion || done) return;

    const full = LINES[lineIndex].prompt;

    if (charIndex < full.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 45);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 550);
    return () => clearTimeout(timeout);
  }, [reducedMotion, done, lineIndex, charIndex]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col rounded-xl border border-border bg-[#0b1120] text-left shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs text-slate-400">terminal</span>
      </div>
      <div className="min-h-[7.5rem] flex-1 space-y-1.5 px-4 py-4 font-mono text-sm">
        {LINES.slice(0, done ? LINES.length : lineIndex).map((line) => (
          <TerminalLine key={line.prompt} prompt={line.prompt} output={line.output} />
        ))}
        {!done && lineIndex < LINES.length && (
          <div className="flex text-slate-200">
            <span className="mr-2 text-accent">$</span>
            <span>{LINES[lineIndex].prompt.slice(0, charIndex)}</span>
            <span className="terminal-caret ml-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalLine({ prompt, output }: { prompt: string; output: string }) {
  return (
    <div>
      <div className="flex text-slate-200">
        <span className="mr-2 text-accent">$</span>
        <span>{prompt}</span>
      </div>
      <div className="pl-4 text-slate-400">{output}</div>
    </div>
  );
}
