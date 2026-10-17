"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { formatTimecode, scrollToFrames } from "@/lib/timecode";

export function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  // Under reduced motion the readout stays still at zero.
  const reduce = useReducedMotion();
  const write = (y: number) => {
    if (ref.current) ref.current.textContent = formatTimecode(scrollToFrames(reduce ? 0 : y));
  };
  useMotionValueEvent(scrollY, "change", (y) => {
    if (!reduce) write(y);
  });
  // Sync on mount (and when the preference flips) so a restored scroll position shows immediately.
  useEffect(() => write(window.scrollY), [reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className="lcd flex items-baseline gap-2 rounded-[var(--r)] border border-line bg-bg px-2.5 py-1 font-mono text-[14px] font-medium tabular-nums"
      title="Linear timecode, driven by how far you've scrolled"
    >
      <small className="hidden text-[10px] tracking-[.06em] text-muted min-[761px]:inline">
        LTC 25
      </small>
      <span ref={ref}>00:00:00:00</span>
    </div>
  );
}
