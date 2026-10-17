import { BrowserList } from "@/components/live/BrowserList";
import { SectionHeading } from "@/components/live/SectionHeading";
import { blog } from "@/content";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";

export function generateMetadata() {
  return buildMetadata({ title: blog.title, description: blog.description, path: blog.path });
}

export default function Blog() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort((a, b) =>
    b.metadata.publishedAt.localeCompare(a.metadata.publishedAt),
  );
  const items = posts.map((p) => {
    const tag: unknown = p.metadata.tag;
    return {
      href: `/blog/${p.slug}`,
      title: p.metadata.title,
      date: formatDate(p.metadata.publishedAt),
      tag: typeof tag === "string" && tag.length > 0 ? tag : undefined,
    };
  });

  return (
    <>
      <JsonLd
        schema={buildSchema({
          as: "webPage",
          title: blog.title,
          description: blog.description,
          path: blog.path,
        })}
      />
      <main className="live-wrap py-14 max-md:py-8">
        <SectionHeading as="h1" lede={blog.description}>
          Writing
        </SectionHeading>
        <BrowserList items={items} label="Posts, newest first" />
      </main>
    </>
  );
}
