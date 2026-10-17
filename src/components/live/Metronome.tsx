"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const BEAT_MS = 500;
const START_MS = 300;

export function Metronome({ countIn }: { countIn: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!countIn || reduce) return;
    try {
      if (sessionStorage.getItem("countin")) return;
    } catch {
      /* storage unavailable, play anyway */
    }
    const dots = Array.from(ref.current?.children ?? []) as HTMLElement[];
    const timers: number[] = [];
    const light = (n: number) =>
      dots.forEach((d, i) => d.toggleAttribute("data-on", i === n));
    dots.forEach((_, i) =>
      timers.push(window.setTimeout(() => light(i), START_MS + i * BEAT_MS)),
    );
    timers.push(
      window.setTimeout(
        () => {
          light(-1);
          try {
            sessionStorage.setItem("countin", "1");
          } catch {
            /* ignore */
          }
          window.dispatchEvent(new Event("live:countin-done"));
        },
        START_MS + dots.length * BEAT_MS,
      ),
    );
    return () => {
      timers.forEach(clearTimeout);
      light(-1);
    };
  }, [countIn, reduce]);

  return (
    <span ref={ref} className="metro flex gap-1" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}
