import Link from "next/link";
import { Metronome } from "./Metronome";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Timecode } from "./Timecode";

export function Transport() {
  return (
    <header className="transport sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-panel">
      <div className="live-wrap grid min-h-[var(--tp-h)] grid-cols-[auto_1fr_auto] items-center gap-4 max-[760px]:grid-cols-[1fr_auto] max-[760px]:gap-2 max-[760px]:py-2">
        <Link href="/" className="brand flex items-center gap-2.5 text-[15px] font-extrabold tracking-[.01em] no-underline">
          <Metronome countIn />
          Andreas
        </Link>
        <NavLinks />
        <div className="flex items-center gap-2">
          <Timecode />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
