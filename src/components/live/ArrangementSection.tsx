import { roles } from "@/content/experience";
import { getSessionData } from "@/lib/session-data";
import { timelineSpan, toMonth } from "@/lib/timeline";
import { SectionHeading } from "./SectionHeading";
import { Arrangement, type Locator } from "./Arrangement";

export function ArrangementSection() {
  // The page is statically built, so "now" is the build month.
  const d = new Date();
  const now = toMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  const span = timelineSpan(roles, now);

  // Locators sit on month positions, so projects published in the same month share one marker.
  const byMonth = new Map<number, string[]>();
  for (const c of getSessionData().clips) {
    if (c.kind !== "work") continue;
    const at = toMonth(c.publishedAt.slice(0, 7));
    if (at < span.start || at >= span.end) continue;
    byMonth.set(at, [...(byMonth.get(at) ?? []), c.name]);
  }
  const locators: Locator[] = [...byMonth].map(([at, names]) => ({ name: names.join(" · "), at }));

  return (
    <section id="experience" className="live-wrap py-[72px] max-[920px]:py-12">
      <SectionHeading
        lede="From Magento backends to engineering management to agentic delivery. Scroll through it, or pick any clip."
      >
        Twelve years on the timeline
      </SectionHeading>
      <Arrangement roles={roles} locators={locators} span={span} now={now} />
    </section>
  );
}
