"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { Lane, Role } from "@/content/experience";
import { followOffset, formatMonth, roleAt, roleEnd, toMonth } from "@/lib/timeline";

export type Locator = { name: string; at: number };

type Props = {
  roles: Role[];
  locators: Locator[];
  span: { start: number; end: number };
  now: number;
};

const LANES: { id: Lane; color: string }[] = [
  { id: "ICUBE", color: "var(--clip-sand)" },
  { id: "SIRCLO", color: "var(--clip-teal)" },
  { id: "_upsounds", color: "var(--clip-sage)" },
  { id: "Upscalix", color: "var(--clip-lilac)" },
  { id: "Freelance", color: "var(--clip-rose)" },
];

// Keep in sync with the `.arr-wrap` / `.arr-stick` rule in src/app/globals.css.
export const PINNED_QUERY =
  "(min-width: 761px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";

const laneTop = (i: number) => 31 + i * 67;
const LOCATOR_FLIP_PX = 160;
const NOTES_BG = [
  "repeating-linear-gradient(90deg, var(--on-clip) 0 14px, transparent 14px 22px, var(--on-clip) 22px 30px, transparent 30px 46px)",
  "repeating-linear-gradient(90deg, transparent 0 8px, var(--on-clip) 8px 26px, transparent 26px 40px)",
].join(", ");

function period(role: Role) {
  return `${formatMonth(toMonth(role.from))} to ${role.to ? formatMonth(toMonth(role.to)) : "now"}`;
}

export function Arrangement({ roles, locators, span, now }: Props) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState<boolean | null>(null);
  const [selected, setSelected] = useState(roles.length - 1);
  const selectedRef = useRef(roles.length - 1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const pinned = wide === true && !reduce;
  const mw = wide === false ? 13 : 18;
  const total = span.end - span.start;
  const trackW = total * mw;

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const choose = useCallback((i: number) => {
    if (selectedRef.current === i) return;
    selectedRef.current = i;
    setSelected(i);
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    const head = headRef.current;
    const view = viewRef.current;
    if (!track || !head || !view) return;
    if (!pinned) {
      track.style.transform = "";
      head.style.left = "0px";
      return;
    }
    const p = scrollYProgress.get();
    const { playheadX, translateX } = followOffset(p, trackW, view.clientWidth);
    track.style.transform = `translate3d(${-translateX}px,0,0)`;
    head.style.left = `${playheadX}px`;
    const month = Math.floor(span.start + p * total);
    choose(roles.indexOf(roleAt(roles, month, now)));
  }, [pinned, scrollYProgress, trackW, span.start, total, roles, now, choose]);

  useMotionValueEvent(scrollYProgress, "change", sync);

  // Sync once on mount and whenever mode or width changes; also when the view resizes.
  useEffect(() => {
    sync();
    const view = viewRef.current;
    if (!view || !pinned) return;
    const ro = new ResizeObserver(sync);
    ro.observe(view);
    return () => ro.disconnect();
  }, [sync, pinned]);

  const scrollToRole = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const p = (toMonth(roles[i].from) + 1 - span.start) / total;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + p * (wrap.offsetHeight - window.innerHeight),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Side roles are skipped by the scroll playhead, so scrolling to one would re-select the
  // main role it overlaps. Select them in place instead.
  const onClip = (i: number) => {
    if (pinned && !roles[i].side) scrollToRole(i);
    choose(i);
  };

  // Keyboard navigation: Tab's keyup lands on the newly focused clip. Not onFocus, which
  // also fires when the browser restores focus after the window regains it.
  const onClipKeyUp = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "Tab") return;
    if (pinned && !roles[i].side) scrollToRole(i);
    choose(i);
  };

  const firstYear = Math.floor(span.start / 12) + 1;
  const lastYear = Math.floor((span.end - 1) / 12);
  const years: number[] = [];
  for (let y = firstYear; y <= lastYear; y++) years.push(y);

  const role = roles[selected];

  return (
    <div ref={wrapRef} className="arr-wrap relative">
      <div
        className="arr-stick relative"
      >
        <div className="grid grid-cols-[132px_minmax(0,1fr)] gap-px rounded-[var(--r)] border border-line bg-line max-[699px]:grid-cols-[92px_minmax(0,1fr)]">
          <div
            aria-hidden="true"
            style={{ gridTemplateRows: `30px repeat(${LANES.length}, 66px)` }}
            className="grid gap-px [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:border-l-4 [&>div]:border-l-[var(--c,transparent)] [&>div]:bg-panel [&>div]:px-2.5 [&>div]:py-1.5 [&>div]:text-xs [&>div]:font-bold [&>div]:[font-variation-settings:'wdth'_88]"
          >
            <div className="!font-mono !text-[11px] !font-medium text-muted">YEAR</div>
            {LANES.map((l) => (
              <div key={l.id} style={{ "--c": l.color } as React.CSSProperties}>
                {l.id}
              </div>
            ))}
          </div>
          <div
            ref={viewRef}
            className={`relative bg-panel-2 ${pinned ? "overflow-clip" : "overflow-x-auto"}`}
          >
            <div
              ref={trackRef}
              className="relative will-change-transform"
              style={{ width: trackW, height: 30 + LANES.length * 67 }}
            >
              <div className="absolute inset-x-0 top-0 h-[30px] border-b border-line bg-panel">
                {years.map((y) => (
                  <div
                    key={y}
                    className="absolute top-0 h-[30px] border-l border-line pt-1 pl-[5px] font-mono text-[10.5px] text-muted"
                    style={{ left: (y * 12 - span.start) * mw }}
                  >
                    {y}
                  </div>
                ))}
                {locators.map((l) => {
                  const x = (l.at - span.start) * mw;
                  // Near the end of the track the label would run past the clip edge, so it hangs left of the marker instead.
                  const flip = trackW - x < LOCATOR_FLIP_PX;
                  return (
                    <div
                      key={`${l.name}-${l.at}`}
                      className={`absolute bottom-0.5 flex items-center gap-1 text-[10px] font-bold whitespace-nowrap text-fg [font-variation-settings:'wdth'_80] before:h-0 before:w-0 before:border-x-[5px] before:border-t-[7px] before:border-x-transparent before:border-t-accent before:content-[''] ${flip ? "translate-x-[5px] flex-row-reverse" : "-translate-x-[5px]"}`}
                      style={flip ? { right: trackW - x } : { left: x }}
                    >
                      {l.name}
                    </div>
                  );
                })}
              </div>
              {LANES.map((l, i) => (
                <div
                  key={l.id}
                  className="absolute inset-x-0 h-[66px] border-b border-line"
                  style={{
                    top: laneTop(i),
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0 ${12 * mw - 1}px, color-mix(in srgb, var(--line) 70%, transparent) ${12 * mw - 1}px ${12 * mw}px)`,
                    backgroundPosition: `${(12 - (span.start % 12)) * mw}px 0`,
                  }}
                >
                  {roles.map((r, ri) =>
                    r.company === l.id ? (
                      <button
                        key={`${r.company}-${r.from}`}
                        type="button"
                        aria-label={`${r.title} at ${r.company}, ${period(r)}`}
                        aria-pressed={ri === selected}
                        onClick={() => onClip(ri)}
                        onKeyUp={(e) => onClipKeyUp(e, ri)}
                        className={`absolute top-1.5 bottom-1.5 flex cursor-pointer flex-col overflow-hidden rounded-[var(--r)] border-0 bg-[var(--c)] p-0 text-left text-on-clip ${ri === selected ? "shadow-[0_0_0_2px_var(--accent)]" : ""}`}
                        style={
                          {
                            "--c": l.color,
                            left: (toMonth(r.from) - span.start) * mw,
                            width: Math.max(30, (roleEnd(r, now) - toMonth(r.from)) * mw - 3),
                          } as React.CSSProperties
                        }
                      >
                        <span className="overflow-hidden bg-[color-mix(in_srgb,var(--c)_70%,#000_30%)] px-[7px] py-0.5 text-[11px] font-bold text-ellipsis whitespace-nowrap text-on-clip [font-variation-settings:'wdth'_85]">
                          {r.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex-1 opacity-45"
                          style={{
                            backgroundImage: NOTES_BG,
                            backgroundSize: "100% 3px, 100% 3px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "0 30%, 0 70%",
                          }}
                        />
                      </button>
                    ) : null,
                  )}
                </div>
              ))}
              <div
                ref={headRef}
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 bottom-0 z-[2] w-px bg-accent before:absolute before:top-0 before:-left-[5px] before:border-x-[5.5px] before:border-t-8 before:border-x-transparent before:border-t-accent before:content-[''] ${pinned ? "" : "hidden"}`}
              />
            </div>
          </div>
        </div>
        <div
          aria-live="polite"
          className="mt-3.5 grid min-h-[150px] grid-cols-[minmax(0,260px)_minmax(0,1fr)] items-start gap-6 max-[699px]:grid-cols-[minmax(0,1fr)] max-[699px]:gap-2.5"
        >
          <div>
            <div className="font-mono text-xs tabular-nums text-muted">{period(role)}</div>
            <h3 className="mt-1 text-[22px] leading-[1.15] font-bold [font-variation-settings:'wdth'_112]">
              {role.title}
            </h3>
            <div className="text-sm font-semibold text-muted">{role.company}</div>
          </div>
          <ul className="m-0 grid max-w-[70ch] list-none gap-2.5 p-0">
            {role.highlights.map((h) => (
              <li
                key={h}
                className="relative pl-[18px] text-[15px] before:absolute before:top-[.6em] before:left-0 before:h-0.5 before:w-2 before:bg-accent before:content-['']"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
