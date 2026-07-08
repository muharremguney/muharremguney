import { FolderOpen } from "lucide-react";
import { sectionFiles } from "@/data/sections";
import { FileIcon } from "@/components/workspace/FileIcon";
import { cn } from "@/lib/utils";

export function Sidebar({
  activeId,
  onSelect,
  className,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <aside className={cn("flex w-64 shrink-0 flex-col overflow-y-auto bg-card/60", className)}>
      <div className="flex items-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted">
        <FolderOpen className="h-4 w-4 text-primary" />
        muharrem-guney
      </div>
      <nav className="flex-1 pb-4">
        {sectionFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={() => onSelect(file.id)}
            aria-current={activeId === file.id ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-2.5 border-l-2 px-4 py-2 text-left text-sm transition-colors",
              activeId === file.id
                ? "border-primary bg-primary/10 text-foreground"
                : "border-transparent text-muted hover:bg-border/40 hover:text-foreground"
            )}
          >
            <FileIcon ext={file.ext} />
            <span className="truncate">{file.fileName}</span>
          </button>
        ))}
      </nav>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          çevrimiçi
        </span>
        <span>v2.0.0</span>
      </div>
    </aside>
  );
}
