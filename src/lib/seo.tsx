import type { Metadata } from "next";
import { baseURL, person, social } from "@/content";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

type SchemaInput = {
  as: "webPage" | "blogPosting";
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
};

const normalizedBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
const normalizePath = (p: string) => (p.startsWith("/") ? p : `/${p}`);

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: MetaInput): Metadata {
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : normalizePath(image)
    : `/api/og/generate?title=${encodeURIComponent(title)}`;
  const url = `${normalizedBase}${normalizePath(path)}`;

  return {
    metadataBase: new URL(normalizedBase),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type,
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const schemaTypes = { webPage: "WebPage", blogPosting: "BlogPosting" } as const;

export function buildSchema({
  as,
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: SchemaInput): Record<string, unknown> {
  const url = `${normalizedBase}${normalizePath(path)}`;
  const imageUrl = image
    ? `${normalizedBase}${normalizePath(image)}`
    : `${normalizedBase}/og?title=${encodeURIComponent(title)}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaTypes[as],
    url,
    sameAs: social.filter((s) => s.name !== "Email").map((s) => s.href),
    headline: title,
    description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: person.name,
      url: normalizedBase,
      image: { "@type": "ImageObject", url: `${normalizedBase}${person.avatar}` },
    },
  };
  if (datePublished) {
    schema.datePublished = datePublished;
    schema.dateModified = dateModified || datePublished;
  }
  return schema;
}

export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
