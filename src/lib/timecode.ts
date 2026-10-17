export function formatTimecode(frames: number, fps = 25): string {
  const total = Math.max(0, Math.floor(frames));
  const ff = total % fps;
  const secs = Math.floor(total / fps);
  const pad = (n: number) => String(n).padStart(2, "0");
  return [Math.floor(secs / 3600), Math.floor(secs / 60) % 60, secs % 60, ff]
    .map(pad)
    .join(":");
}

export function scrollToFrames(scrollY: number): number {
  return Math.floor(Math.max(0, scrollY) / 3);
}
