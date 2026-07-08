import Image from "next/image";
import { cn } from "@/lib/utils";

const palette = [
  "bg-sky-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
];

function hashString(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function CompanyAvatar({
  name,
  logoSrc,
  className,
}: {
  name: string;
  logoSrc?: string;
  className?: string;
}) {
  if (logoSrc) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl bg-white p-2",
          className
        )}
      >
        <Image
          src={logoSrc}
          alt={name}
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  const color = palette[hashString(name) % palette.length];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl font-bold text-white",
        color,
        className
      )}
    >
      {initials}
    </div>
  );
}
