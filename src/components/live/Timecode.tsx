"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { formatTimecode, scrollToFrames } from "@/lib/timecode";

export function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  const write = (y: number) => {
    if (ref.current) ref.current.textContent = formatTimecode(scrollToFrames(y));
  };
  useMotionValueEvent(scrollY, "change", write);
  // Sync once on mount so a restored scroll position is reflected immediately.
  useEffect(() => write(scrollY.get()), [scrollY]); // eslint-disable-line react-hooks/exhaustive-deps
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
