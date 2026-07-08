import { Menu } from "lucide-react";
import type { SectionFile } from "@/data/sections";
import { FileIcon } from "@/components/workspace/FileIcon";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function TabBar({
  activeFile,
  onOpenDrawer,
}: {
  activeFile: SectionFile;
  onOpenDrawer: () => void;
}) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/40 pr-3">
      <div className="flex h-full items-center">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Dosyaları göster"
          className="flex h-full items-center px-4 md:hidden"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex h-full items-center gap-2 border-x border-border bg-background px-4 text-sm text-foreground">
          <FileIcon ext={activeFile.ext} />
          {activeFile.fileName}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
