"use client";

import { X } from "lucide-react";
import { Sidebar } from "@/components/workspace/Sidebar";

export function MobileDrawer({
  activeId,
  onSelect,
  onClose,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col border-r border-border bg-background shadow-xl">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-semibold text-foreground">Dosyalar</span>
          <button type="button" onClick={onClose} aria-label="Kapat">
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>
        <Sidebar activeId={activeId} onSelect={onSelect} className="w-full flex-1" />
      </div>
    </div>
  );
}
