"use client";

import { useEffect, useRef, useState } from "react";
import { sectionFiles, type SectionId } from "@/data/sections";
import { WORKSPACE_NAVIGATE_EVENT } from "@/components/workspace/events";
import { Sidebar } from "@/components/workspace/Sidebar";
import { MobileDrawer } from "@/components/workspace/MobileDrawer";
import { TabBar } from "@/components/workspace/TabBar";
import { StatusBar } from "@/components/workspace/StatusBar";
import { ProgressDots } from "@/components/workspace/ProgressDots";
import { TerminalPanel } from "@/components/workspace/TerminalPanel";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { AiAssistant } from "@/components/workspace/AiAssistant";
import { HelpdeskDemo } from "@/components/workspace/HelpdeskDemo";
import { SystemAnalysis } from "@/components/workspace/SystemAnalysis";

const panelComponents: Record<SectionId, () => React.JSX.Element> = {
  home: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  education: Education,
  projects: Projects,
  certificates: Certificates,
  assistant: AiAssistant,
  helpdesk: HelpdeskDemo,
  system: SystemAnalysis,
  contact: Contact,
};

const validIds = new Set(sectionFiles.map((file) => file.id));

function initialSectionId(): SectionId {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  return validIds.has(hash) ? hash : "home";
}

export function Workspace() {
  const [activeId, setActiveId] = useState<SectionId>(initialSectionId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const switchingRef = useRef(false);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeId}`);
  }, [activeId]);

  useEffect(() => {
    const node = mainRef.current;
    if (!node) return;

    function goToOffset(offset: number) {
      const currentIndex = sectionFiles.findIndex((f) => f.id === activeId);
      const nextIndex = currentIndex + offset;
      if (nextIndex < 0 || nextIndex >= sectionFiles.length) return;

      switchingRef.current = true;
      setActiveId(sectionFiles[nextIndex].id);
      setTimeout(() => {
        switchingRef.current = false;
      }, 700);
    }

    function handleWheel(e: WheelEvent) {
      if (switchingRef.current) {
        e.preventDefault();
        return;
      }

      const atTop = node!.scrollTop <= 1;
      const atBottom = node!.scrollTop + node!.clientHeight >= node!.scrollHeight - 1;

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        goToOffset(1);
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        goToOffset(-1);
      }
    }

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [activeId]);

  useEffect(() => {
    function handleNavigate(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      if (validIds.has(id)) setActiveId(id);
    }
    window.addEventListener(WORKSPACE_NAVIGATE_EVENT, handleNavigate);
    return () => window.removeEventListener(WORKSPACE_NAVIGATE_EVENT, handleNavigate);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!(e.ctrlKey || e.metaKey)) return;

      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
        return;
      }

      const num = Number(e.key);
      if (num >= 1 && num <= 9 && num <= sectionFiles.length) {
        e.preventDefault();
        setActiveId(sectionFiles[num - 1].id);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function select(id: string) {
    if (validIds.has(id)) setActiveId(id);
    setDrawerOpen(false);
  }

  const activeFile = sectionFiles.find((file) => file.id === activeId) ?? sectionFiles[0];
  const ActivePanel = panelComponents[activeId];

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeId={activeId} onSelect={select} className="hidden md:flex" />
        {drawerOpen && (
          <MobileDrawer activeId={activeId} onSelect={select} onClose={() => setDrawerOpen(false)} />
        )}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <TabBar activeFile={activeFile} onOpenDrawer={() => setDrawerOpen(true)} />
          <main
            key={activeId}
            ref={mainRef}
            className="animate-fade-in-up flex-1 overflow-y-auto"
          >
            <ActivePanel />
          </main>
          <ProgressDots activeId={activeId} onSelect={select} />
          <TerminalPanel
            open={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onNavigate={select}
          />
          <StatusBar
            activeFile={activeFile}
            terminalOpen={terminalOpen}
            onToggleTerminal={() => setTerminalOpen((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
}
