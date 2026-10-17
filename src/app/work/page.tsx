import { SectionHeading } from "@/components/live/SectionHeading";
import { BrowserList } from "@/components/live/BrowserList";
import { SessionView } from "@/components/live/SessionView";
import { work } from "@/content";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";
import { buildSessionGrid, toSessionClips, TRACKS } from "@/lib/session";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export function generateMetadata() {
  return buildMetadata({ title: work.title, description: work.description, path: work.path });
}

export default function Work() {
  const projects = getPosts(["src", "app", "work", "projects"], { requireTrack: true });
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const clips = toSessionClips(projects, posts);
  const scenes = buildSessionGrid(clips);
  const byDate = (a: string, b: string) => b.localeCompare(a);
  const sortedProjects = [...projects].sort((a, b) =>
    byDate(a.metadata.publishedAt, b.metadata.publishedAt),
  );
  const newest = clips
    .filter((c) => c.kind === "work")
    .sort((a, b) => byDate(a.publishedAt, b.publishedAt))[0];
  if (!newest) throw new Error("No work clips found for the session view");

  const items = sortedProjects.map((p) => ({
    href: `/work/${p.slug}`,
    title: p.metadata.title,
    date: formatDate(p.metadata.publishedAt),
    tag: TRACKS.find((t) => t.id === p.metadata.track)?.name,
  }));

  return (
    <>
      <JsonLd
        schema={buildSchema({
          as: "webPage",
          title: work.title,
          description: work.description,
          path: work.path,
        })}
      />
      <main className="live-wrap py-14 max-md:py-8">
        <SectionHeading as="h1">Work</SectionHeading>
        <div className="mb-14">
          <SessionView scenes={scenes} initialSlug={newest.slug} />
        </div>
        <BrowserList items={items} label="Projects, newest first" />
      </main>
    </>
  );
}
