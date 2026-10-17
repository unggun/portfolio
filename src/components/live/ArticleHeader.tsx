import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/utils/formatDate";

type Props = {
  title: string;
  date?: string;
  color: string;
  backHref: string;
  backLabel: string;
  image?: string;
};

export function ArticleHeader({ title, date, color, backHref, backLabel, image }: Props) {
  return (
    <header>
      <div aria-hidden className="h-[6px] rounded-[var(--r)]" style={{ background: color }} />
      <div className="mt-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-muted hover:text-fg"
        >
          <ArrowLeft aria-hidden size={14} />
          {backLabel}
        </Link>
      </div>
      <h1
        className="mt-5 text-[clamp(30px,5vw,48px)] font-bold leading-[1.08]"
        style={{ fontVariationSettings: '"wdth" 112' }}
      >
        {title}
      </h1>
      {date && <p className="mt-4 font-mono text-[12px] text-muted">{formatDate(date)}</p>}
      {image && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-[var(--r)] border border-line bg-panel">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 960px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
