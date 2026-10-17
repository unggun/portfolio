import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/utils/utils";
import { CustomMDX } from "@/components/mdx";
import { ArticleHeader } from "@/components/live/ArticleHeader";
import { ScreenshotGallery } from "@/components/live/ScreenshotGallery";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";
import { TRACKS } from "@/lib/session";

const getProjects = () =>
  getPosts(["src", "app", "work", "projects"], { requireTrack: true });

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getProjects().map((post) => ({ slug: post.slug }));
}

type Params = { params: Promise<{ slug: string | string[] }> };

async function findPost({ params }: Params) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  return getProjects().find((post) => post.slug === slugPath);
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const post = await findPost(props);
  if (!post) return {};
  return buildMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `/work/${post.slug}`,
    image: post.metadata.images[0] || post.metadata.image || undefined,
    type: "article",
    publishedTime: post.metadata.publishedAt,
  });
}

export default async function Project(props: Params) {
  const post = await findPost(props);
  if (!post) notFound();

  const path = `/work/${post.slug}`;
  const color = TRACKS.find((t) => t.id === post.metadata.track)?.color ?? "var(--clip-sage)";
  const image = post.metadata.images[0] || post.metadata.image || undefined;

  return (
    <main className="live-wrap py-10">
      <JsonLd
        schema={buildSchema({
          as: "blogPosting",
          title: post.metadata.title,
          description: post.metadata.summary,
          path,
          image,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
        })}
      />
      <div className="mx-auto max-w-[960px]">
        <ArticleHeader
          title={post.metadata.title}
          date={post.metadata.publishedAt}
          color={color}
          backHref="/work"
          backLabel="All work"
          image={image}
          link={post.metadata.link || undefined}
        />
        <article className="prose-live mt-10">
          <CustomMDX source={post.content} />
        </article>
        <ScreenshotGallery
          images={post.metadata.images.filter((src) => src !== image)}
          title={post.metadata.title}
        />
      </div>
    </main>
  );
}
