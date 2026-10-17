import type { ReactNode } from "react";

export function SectionHeading({
  as: Tag = "h2",
  children,
  lede,
  id,
}: {
  as?: "h1" | "h2";
  children: ReactNode;
  lede?: ReactNode;
  id?: string;
}) {
  return (
    <>
      <Tag
        id={id}
        className={`text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-extrabold tracking-[-.015em] text-balance [font-variation-settings:'wdth'_125] ${lede ? "mb-2.5" : "mb-8"}`}
      >
        {children}
      </Tag>
      {lede ? <p className="mb-8 max-w-[58ch] text-base text-muted">{lede}</p> : null}
    </>
  );
}
