import type { FileExt } from "@/data/sections";
import { cn } from "@/lib/utils";

const extColors: Record<FileExt, string> = {
  tsx: "bg-sky-500",
  ts: "bg-blue-500",
  json: "bg-amber-500",
  log: "bg-emerald-500",
};

export function FileIcon({ ext, className }: { ext: FileExt; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-bold text-white",
        extColors[ext],
        className
      )}
    >
      {ext === "json" ? "{}" : ext[0].toUpperCase()}
    </span>
  );
}
