import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/utils/utils";
import { CustomMDX } from "@/components/mdx";
import { ArticleHeader } from "@/components/live/ArticleHeader";
import { buildMetadata, buildSchema, JsonLd } from "@/lib/seo";

const getBlogPosts = () => getPosts(["src", "app", "blog", "posts"]);

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

type Params = { params: Promise<{ slug: string | string[] }> };

async function findPost({ params }: Params) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  return getBlogPosts().find((post) => post.slug === slugPath);
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const post = await findPost(props);
  if (!post) return {};
  return buildMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `/blog/${post.slug}`,
    image: post.metadata.image || undefined,
    type: "article",
    publishedTime: post.metadata.publishedAt,
  });
}

export default async function Blog(props: Params) {
  const post = await findPost(props);
  if (!post) notFound();

  const image = post.metadata.images[0] || post.metadata.image || undefined;

  return (
    <main className="live-wrap py-10">
      <JsonLd
        schema={buildSchema({
          as: "blogPosting",
          title: post.metadata.title,
          description: post.metadata.summary,
          path: `/blog/${post.slug}`,
          image: post.metadata.image || undefined,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
        })}
      />
      <div className="mx-auto max-w-[960px]">
        <ArticleHeader
          title={post.metadata.title}
          date={post.metadata.publishedAt}
          color="var(--clip-sage)"
          backHref="/blog"
          backLabel="All writing"
          image={image}
        />
        <article className="prose-live mt-10">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </main>
  );
}
