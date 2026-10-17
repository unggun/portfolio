import Link from "next/link";

export type BrowserItem = { href: string; title: string; date: string; tag?: string };

export function BrowserList({ items, label }: { items: BrowserItem[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="m-0 list-none rounded-[var(--r)] border border-line bg-line p-0"
    >
      {items.map((item) => (
        <li key={item.href} className="border-b border-line bg-panel last:border-b-0">
          <Link
            href={item.href}
            className="grid grid-cols-[170px_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 text-inherit no-underline hover:bg-panel-2 max-md:grid-cols-[minmax(0,1fr)] max-md:gap-1"
          >
            <span className="font-mono text-[12.5px] text-muted">{item.date}</span>
            <span className="font-semibold">{item.title}</span>
            {item.tag ? (
              <span className="justify-self-start rounded-[var(--r)] border border-line px-2 py-0.5 text-[11.5px] font-bold text-muted [font-variation-settings:'wdth'_85] md:justify-self-end">
                {item.tag}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
