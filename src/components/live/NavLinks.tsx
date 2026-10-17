"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Work", href: "/work", page: true },
  { label: "Experience", href: "/#experience", page: false },
  { label: "Skills", href: "/#skills", page: false },
  { label: "Writing", href: "/blog", page: true },
  { label: "About", href: "/about", page: true },
  { label: "Contact", href: "#contact", page: false },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Sections"
      className="nav flex flex-nowrap justify-center gap-0.5 overflow-x-auto max-[760px]:col-span-full max-[760px]:row-start-2 max-[760px]:justify-start"
    >
      {links.map((l) => {
        const current =
          l.page && (pathname === l.href || pathname.startsWith(l.href + "/"));
        return (
          <Link
            key={l.label}
            href={l.href}
            aria-current={current ? "page" : undefined}
            className="whitespace-nowrap rounded-[var(--r)] border border-line bg-panel-2 px-3 py-[5px] text-[12.5px] font-semibold no-underline hover:border-accent aria-[current=page]:border-accent aria-[current=page]:bg-accent aria-[current=page]:text-on-accent"
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
