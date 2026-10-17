import { SectionHeading } from "@/components/live/SectionHeading";
import { BrowserList } from "@/components/live/BrowserList";
import { SessionView } from "@/components/live/SessionView";
import { work } from "@/content";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";
import { getSessionData } from "@/lib/session-data";
import { TRACKS } from "@/lib/session";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export function generateMetadata() {
  return buildMetadata({ title: work.title, description: work.description, path: work.path });
}

export default function Work() {
  const projects = getPosts(["src", "app", "work", "projects"], { requireTrack: true });
  const { scenes, initialSlug } = getSessionData();
  const sortedProjects = [...projects].sort((a, b) =>
    b.metadata.publishedAt.localeCompare(a.metadata.publishedAt),
  );

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
          <SessionView scenes={scenes} initialSlug={initialSlug} />
        </div>
        <BrowserList items={items} label="Projects, newest first" />
      </main>
    </>
  );
}
