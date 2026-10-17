import Image from "next/image";
import { about, person, social } from "@/content";
import { CopyEmail } from "./CopyEmail";
import { CtaButton } from "./CtaButton";

const linkClass =
  "border-b border-line font-semibold no-underline hover:border-accent";

export function Footer() {
  const links = social.filter((s) => s.name !== "Email");
  return (
    <footer id="contact" className="foot border-t border-line bg-panel pt-16 pb-10">
      <div className="live-wrap">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-7 max-[760px]:grid-cols-[minmax(0,1fr)]">
          <Image
            src={person.avatar}
            alt={`Portrait of ${person.name}`}
            width={76}
            height={76}
            className="block size-[76px] rounded-[var(--r)] object-cover grayscale-[.2]"
          />
          <div>
            <h2 className="mb-1.5 text-2xl font-extrabold">Count me in.</h2>
            <p className="text-muted">
              For roles, projects, or a long chat about agents and live playback.
            </p>
          </div>
          <CtaButton href={about.calendarHref} label="Book a call" />
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-[18px] gap-y-2.5 text-[14px]">
          <CopyEmail email={person.email} />
          {links.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener" className={linkClass}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
