export function getDurationLabel(period: string): string | null {
  const years = period.match(/\d{4}/g);
  if (!years || years.length < 2) return null;
  const diff = Number(years[1]) - Number(years[0]);
  if (diff <= 0) return null;
  return `${diff} Yıl`;
}
