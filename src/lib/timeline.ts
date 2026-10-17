import type { Role } from "@/content/experience";

export type Month = number;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function toMonth(ym: string): Month {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

export function formatMonth(m: Month): string {
  return `${MONTHS[((m % 12) + 12) % 12]} ${Math.floor(m / 12)}`;
}

export function roleEnd(role: Role, now: Month): Month {
  return role.to === null ? now + 1 : toMonth(role.to) + 1;
}

export function timelineSpan(roles: Role[], now: Month): { start: Month; end: Month } {
  return { start: Math.min(...roles.map((r) => toMonth(r.from))), end: now + 1 };
}

export function roleAt(roles: Role[], m: Month, now: Month): Role {
  const containing = roles.find((r) => toMonth(r.from) <= m && m < roleEnd(r, now));
  if (containing) return containing;
  const started = roles.filter((r) => toMonth(r.from) < m);
  if (started.length === 0) return roles[0];
  return started.reduce((a, b) => (toMonth(b.from) >= toMonth(a.from) ? b : a));
}

export function followOffset(
  p: number,
  trackW: number,
  viewW: number,
  lead = 0.45,
): { playheadX: number; translateX: number } {
  const playheadX = clamp01(p) * trackW;
  const translateX = Math.min(Math.max(0, playheadX - viewW * lead), Math.max(0, trackW - viewW));
  return { playheadX, translateX };
}
