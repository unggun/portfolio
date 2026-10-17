"use client";

import { useState } from "react";
import type { Device } from "@/content";

export function DeviceChain({ devices }: { devices: Device[] }) {
  const [bypassed, setBypassed] = useState<ReadonlySet<string>>(new Set());

  const toggle = (name: string) =>
    setBypassed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <div
      role="region"
      aria-label="Skills device chain"
      tabIndex={0}
      className="flex snap-x snap-proximity overflow-x-auto pb-2"
    >
      {devices.map((d) => {
        const on = !bypassed.has(d.name);
        return (
          <div
            key={d.name}
            className={`relative flex w-[236px] flex-none snap-start flex-col rounded-[2px] border border-line bg-panel transition-opacity duration-200 motion-reduce:transition-none [&+&]:ml-3.5 [&+&]:before:absolute [&+&]:before:top-[15px] [&+&]:before:-left-3.5 [&+&]:before:h-px [&+&]:before:w-3.5 [&+&]:before:bg-muted [&+&]:before:content-[''] ${on ? "" : "opacity-45"} ${d.live ? "border-t-[3px] border-t-clip-sand" : ""}`}
          >
            <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-2 py-1.5 text-xs font-bold [font-variation-settings:'wdth'_88]">
              <button
                type="button"
                aria-pressed={!on}
                aria-label={`Bypass ${d.name}`}
                onClick={() => toggle(d.name)}
                className={`relative h-3.5 w-3.5 flex-none rounded-full border border-line p-0 before:absolute before:-inset-2 before:content-[''] ${on ? "bg-accent" : "bg-panel"}`}
              />
              <span>{d.name}</span>
            </div>
            <ul
              className="m-0 flex flex-1 list-none flex-wrap content-start gap-1.5 px-2.5 pt-3 pb-3.5 [background-image:radial-gradient(color-mix(in_srgb,var(--line)_80%,transparent)_1px,transparent_1px)] [background-size:8px_8px]"
            >
              {d.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[2px] border border-line bg-panel-2 px-2 py-[3px] text-xs font-semibold [font-variation-settings:'wdth'_92]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
