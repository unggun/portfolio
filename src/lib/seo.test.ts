import { describe, expect, it } from "vitest";
import { buildMetadata, buildSchema } from "./seo";

describe("buildMetadata", () => {
  it("builds OG, twitter and canonical from path", () => {
    const m = buildMetadata({ title: "Deputy", description: "d", path: "/work/deputy" });
    expect(m.openGraph?.url).toBe("https://unggun.tech/work/deputy");
    expect(m.alternates?.canonical).toBe("https://unggun.tech/work/deputy");
    const images = m.openGraph?.images as { url: string }[];
    expect(images[0].url).toBe("/api/og/generate?title=Deputy");
    expect((m.twitter as { card: string }).card).toBe("summary_large_image");
    expect((m.metadataBase as URL).href).toBe("https://unggun.tech/");
  });

  it("uses a custom image unchanged", () => {
    const m = buildMetadata({ title: "T", description: "d", path: "/x", image: "/images/x.jpg" });
    const images = m.openGraph?.images as { url: string }[];
    expect(images[0].url).toBe("/images/x.jpg");
    expect((m.twitter as { images: string[] }).images).toEqual(["/images/x.jpg"]);
  });
});

describe("buildSchema", () => {
  it("builds BlogPosting schema", () => {
    const s = buildSchema({ as: "blogPosting", title: "T", description: "d", path: "/blog/t", datePublished: "2026-09-17" }) as Record<string, any>;
    expect(s["@type"]).toBe("BlogPosting");
    expect(s.headline).toBe("T");
    expect(s.dateModified).toBe("2026-09-17");
    expect(s.author.name).toBe("Andreas Unggun Parananda");
    expect(s.url).toBe("https://unggun.tech/blog/t");
  });

  it("falls back to the generated OG card when no image is given", () => {
    const s = buildSchema({ as: "webPage", title: "A B", description: "d", path: "/" });
    expect(s.image).toBe("https://unggun.tech/api/og/generate?title=A%20B");
  });

  it("resolves relative images and keeps absolute ones", () => {
    const rel = buildSchema({ as: "webPage", title: "T", description: "d", path: "/", image: "/images/x.jpg" });
    expect(rel.image).toBe("https://unggun.tech/images/x.jpg");
    const abs = buildSchema({ as: "webPage", title: "T", description: "d", path: "/", image: "https://cdn.example.com/x.jpg" });
    expect(abs.image).toBe("https://cdn.example.com/x.jpg");
  });
});
