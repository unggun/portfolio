"use client";

import { useEffect, useState } from "react";

export function AboutToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden rounded-[var(--r)] border border-line bg-panel py-2 lg:block"
    >
      <p className="px-3 pt-1 pb-2 text-[11px] font-bold tracking-[.04em] text-muted uppercase [font-variation-settings:'wdth'_88]">
        Browser
      </p>
      <ul className="m-0 list-none p-0">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={`block border-l-2 px-3 py-1.5 text-[12.5px] font-bold no-underline [font-variation-settings:'wdth'_88] ${
                  on ? "border-accent text-accent" : "border-transparent text-muted hover:text-inherit"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
