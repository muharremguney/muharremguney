import { geolocation, ipAddress } from "@vercel/functions";

function maskIp(ip: string): string {
  if (ip.includes(":")) {
    const groups = ip.split(":");
    return `${groups.slice(0, 2).join(":")}:••••:••••`;
  }
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.•••.•••`;
  }
  return "•.•.•.•";
}

export async function GET(request: Request) {
  const ip = ipAddress(request);
  const geo = geolocation(request);

  return Response.json({
    maskedIp: ip ? maskIp(ip) : null,
    countryCode: geo.country ?? null,
    city: geo.city ?? null,
    flag: geo.flag ?? null,
  });
}
