"use client";

import { useEffect, useState } from "react";
import { TRACKS, type Scene, type SessionClip } from "@/lib/session";
import { ClipView } from "./ClipView";

const triangle = (w: number, h: number) =>
  ({
    width: 0,
    height: 0,
    borderLeft: `${w}px solid currentColor`,
    borderTop: `${h}px solid transparent`,
    borderBottom: `${h}px solid transparent`,
  }) as React.CSSProperties;

export function SessionView({ scenes, initialSlug }: { scenes: Scene[]; initialSlug: string }) {
  const [playing, setPlaying] = useState(initialSlug);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const onDone = () => {
      setPlaying(initialSlug);
      setPulse((p) => p + 1);
    };
    window.addEventListener("live:countin-done", onDone);
    return () => window.removeEventListener("live:countin-done", onDone);
  }, [initialSlug]);

  const all = scenes.flatMap((s) => s.slots).filter((c): c is SessionClip => c !== null);
  const current = all.find((c) => c.slug === playing) ?? all[0];

  return (
    <div>
      <div className="session-scroll overflow-x-auto">
        <div
          role="group"
          aria-label="Projects arranged by track and year"
          className="session grid min-w-[480px] grid-cols-[repeat(4,minmax(92px,1fr))_76px] gap-0.5 rounded-[var(--r)] border border-line bg-line"
        >
          {TRACKS.map((t) => (
            <div
              key={t.id}
              className="trk overflow-hidden border-t-4 border-[var(--c)] bg-panel px-2 pt-[7px] pb-1.5 text-[11.5px] font-bold text-ellipsis whitespace-nowrap [font-variation-settings:'wdth'_85]"
              style={{ "--c": t.color } as React.CSSProperties}
            >
              {t.name}
            </div>
          ))}
          <div className="trk master overflow-hidden border-t-4 border-muted bg-panel px-2 pt-[7px] pb-1.5 text-[11.5px] font-bold whitespace-nowrap text-muted [font-variation-settings:'wdth'_85]">
            Scenes
          </div>
          {scenes.map((scene, row) => {
            const first = scene.slots.find((c): c is SessionClip => c !== null);
            return (
              <SceneRow
                key={row}
                scene={scene}
                first={first}
                playing={playing}
                pulse={pulse}
                initialSlug={initialSlug}
                onLaunch={setPlaying}
              />
            );
          })}
          {TRACKS.map((t) => (
            <div key={t.id} className="stop grid h-7 place-items-center bg-panel" aria-hidden="true">
              <i className="block size-2 bg-muted opacity-70" />
            </div>
          ))}
          <div className="stop h-7 bg-panel" aria-hidden="true" />
        </div>
      </div>
      <ClipView clip={current} priority={current.slug === initialSlug} />
    </div>
  );
}

function SceneRow({
  scene,
  first,
  playing,
  pulse,
  initialSlug,
  onLaunch,
}: {
  scene: Scene;
  first: SessionClip | undefined;
  playing: string;
  pulse: number;
  initialSlug: string;
  onLaunch: (slug: string) => void;
}) {
  return (
    <>
      {scene.slots.map((clip, i) => {
        if (!clip) {
          return (
            <div
              key={`e${i}`}
              aria-hidden="true"
              className="slot empty flex h-[46px] items-center gap-2 bg-panel px-2 before:block before:size-[7px] before:border before:border-line"
            />
          );
        }
        const isPlaying = clip.slug === playing;
        const color = TRACKS[i].color;
        return (
          <button
            key={clip.slug}
            type="button"
            aria-label={`Launch ${clip.name}`}
            aria-pressed={isPlaying}
            onClick={() => onLaunch(clip.slug)}
            className={`slot clip relative flex h-[46px] cursor-pointer items-center gap-2 overflow-hidden border-0 bg-[var(--c)] px-2 text-left text-[11.5px] font-semibold text-on-clip hover:brightness-110 [font-variation-settings:'wdth'_85] ${
              isPlaying ? "playing shadow-[inset_0_0_0_2px_var(--accent)]" : ""
            }`}
            style={{ "--c": color } as React.CSSProperties}
          >
            <span
              className={`flex-none ${isPlaying ? "opacity-100" : "opacity-75"}`}
              style={triangle(8, 5)}
              aria-hidden="true"
            />
            <span className="nm min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{clip.name}</span>
            {isPlaying ? (
              <span
                key={clip.slug === initialSlug ? pulse : 0}
                aria-hidden="true"
                className="clip-bar absolute bottom-0 left-0 h-[3px] w-full origin-left bg-on-clip opacity-55"
              />
            ) : null}
          </button>
        );
      })}
      <button
        type="button"
        aria-label={`Launch scene ${scene.label}`}
        disabled={!first}
        onClick={() => first && onLaunch(first.slug)}
        className="scene flex h-[46px] cursor-pointer items-center gap-[7px] border-0 bg-panel px-2 font-mono text-[11.5px] text-muted hover:text-accent"
      >
        <span style={triangle(7, 4)} aria-hidden="true" />
        {scene.label}
      </button>
    </>
  );
}
