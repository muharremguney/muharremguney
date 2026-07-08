import { skillCategories } from "@/data/skills";

const items = Array.from(new Set(skillCategories.flatMap((category) => category.skills)));
const loop = [...items, ...items];

export function TechMarquee() {
  return (
    <div
      className="relative mt-12 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max gap-3">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
