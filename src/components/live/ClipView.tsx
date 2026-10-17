"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { TRACKS, type SessionClip } from "@/lib/session";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMeta(clip: SessionClip) {
  const [y, m] = clip.publishedAt.split("-");
  const month = MONTHS[Number(m) - 1] ?? "";
  const kind = clip.kind === "work" ? "Case study" : "Blog post";
  return `${kind}, ${month} ${y}`.replace(/\s+/g, " ").trim();
}

export function ClipView({
  clip,
  priority,
}: {
  clip: SessionClip;
  priority: boolean;
}) {
  const color = TRACKS.find((t) => t.id === clip.track)?.color;
  return (
    <div
      aria-live="polite"
      className={`clipview mt-3.5 grid ${clip.image ? "grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]" : "grid-cols-[minmax(0,1fr)]"} rounded-[var(--r)] border border-line bg-panel max-[620px]:grid-cols-[minmax(0,1fr)]`}
    >
      {clip.image ? (
        <figure className="relative m-0 aspect-[16/10] max-w-full overflow-hidden border-r border-line bg-bg max-[620px]:border-r-0 max-[620px]:border-b">
          <Image
            key={clip.slug}
            src={clip.image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 920px) 100vw, 40vw"
            className="cv-img block object-cover"
          />
        </figure>
      ) : null}
      <div className="flex min-w-0 flex-col gap-2.5 px-[18px] py-4">
        <div className="flex items-center gap-2 text-[11px] font-bold text-muted [font-variation-settings:'wdth'_85]">
          <span
            className="size-2.5 rounded-[1px] bg-[var(--c)]"
            style={{ "--c": color } as React.CSSProperties}
            aria-hidden="true"
          />
          <span>{formatMeta(clip)}</span>
        </div>
        <h3 className="m-0 text-xl leading-[1.2] font-bold text-balance [font-variation-settings:'wdth'_110]">
          {clip.title}
        </h3>
        <p className="m-0 max-w-[60ch] text-sm text-muted">{clip.summary}</p>
        <a
          href={clip.href}
          className="mt-auto inline-flex items-center gap-1 self-start border-b border-accent pb-px text-[13px] font-bold no-underline hover:text-accent"
        >
          {clip.kind === "work" ? "Read case study" : "Read the post"}
          <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
