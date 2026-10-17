import { about, home, person } from "@/content";
import { buildSessionGrid, toSessionClips } from "@/lib/session";
import { getPosts } from "@/utils/utils";
import { CtaButton } from "./CtaButton";
import { SessionView } from "./SessionView";

export function HomeHero() {
  const projects = getPosts(["src", "app", "work", "projects"], { requireTrack: true });
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const clips = toSessionClips(projects, posts);
  const scenes = buildSessionGrid(clips);
  const newestWork = clips
    .filter((c) => c.kind === "work")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
  if (!newestWork) throw new Error("No work clips found for the session view");

  // The subline ends with the "Off the clock..." sentence, rendered muted.
  const cut = home.subline.indexOf("Off the clock");
  const main = cut > 0 ? home.subline.slice(0, cut) : home.subline;
  const muted = cut > 0 ? home.subline.slice(cut) : "";

  return (
    <section id="work" className="live-wrap py-14 max-[920px]:py-8">
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-12 max-[920px]:grid-cols-[minmax(0,1fr)] max-[920px]:gap-9">
        <div>
          <p className="mb-[18px] text-[13px] font-semibold text-muted [font-variation-settings:'wdth'_90]">
            {home.roleLine}
          </p>
          <h1 className="mb-[22px] text-[clamp(2.6rem,5.2vw,4.6rem)] leading-[.98] font-extrabold tracking-[-.02em] text-balance [font-variation-settings:'wdth'_125]">
            {person.name}
          </h1>
          <p className="mb-7 max-w-[34ch] text-lg leading-normal">
            {main}
            {muted ? <span className="text-muted">{muted}</span> : null}
          </p>
          <CtaButton href={about.calendarHref} label="Book a call" />
        </div>
        <SessionView scenes={scenes} initialSlug={newestWork.slug} />
      </div>
    </section>
  );
}
