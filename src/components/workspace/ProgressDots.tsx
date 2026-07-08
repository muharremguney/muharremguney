import { sectionFiles } from "@/data/sections";
import { cn } from "@/lib/utils";

export function ProgressDots({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 z-10 hidden flex-col items-center justify-center gap-2.5 md:flex">
      {sectionFiles.map((file) => (
        <button
          key={file.id}
          type="button"
          onClick={() => onSelect(file.id)}
          aria-label={file.label}
          aria-current={activeId === file.id ? "true" : undefined}
          className={cn(
            "pointer-events-auto w-2 rounded-full transition-all",
            activeId === file.id ? "h-5 bg-primary" : "h-2 bg-border hover:bg-muted"
          )}
        />
      ))}
    </div>
  );
}
