import { roles } from "@/content/experience";
import { toSessionClips } from "@/lib/session";
import { timelineSpan, toMonth } from "@/lib/timeline";
import { getPosts } from "@/utils/utils";
import { Arrangement, type Locator } from "./Arrangement";

export function ArrangementSection() {
  // The page is statically built, so "now" is the build month.
  const d = new Date();
  const now = toMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  const span = timelineSpan(roles, now);

  const projects = getPosts(["src", "app", "work", "projects"], { requireTrack: true });
  const locators: Locator[] = toSessionClips(projects, [])
    .map((c) => ({ name: c.name, at: toMonth(c.publishedAt.slice(0, 7)) }))
    .filter((l) => l.at >= span.start && l.at < span.end);

  return (
    <section id="experience" className="live-wrap py-[72px] max-[920px]:py-12">
      <h2 className="mb-2.5 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-extrabold tracking-[-.015em] text-balance [font-variation-settings:'wdth'_125]">
        Twelve years on the timeline
      </h2>
      <p className="mb-8 max-w-[58ch] text-base text-muted">
        From Magento backends to engineering management to agentic delivery. Scroll to move the
        playhead, or click any clip.
      </p>
      <Arrangement roles={roles} locators={locators} span={span} now={now} />
    </section>
  );
}
