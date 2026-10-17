import { describe, expect, it } from "vitest";
import { buildMetadata, buildSchema } from "./seo";

describe("buildMetadata", () => {
  it("builds OG, twitter and canonical from path", () => {
    const m = buildMetadata({ title: "Deputy", description: "d", path: "/work/deputy" });
    expect(m.openGraph?.url).toBe("https://andreas-unggun.my.id/work/deputy");
    expect(m.alternates?.canonical).toBe("https://andreas-unggun.my.id/work/deputy");
    const images = m.openGraph?.images as { url: string }[];
    expect(images[0].url).toBe("/api/og/generate?title=Deputy");
    expect((m.twitter as { card: string }).card).toBe("summary_large_image");
    expect((m.metadataBase as URL).href).toBe("https://andreas-unggun.my.id/");
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
    expect(s.url).toBe("https://andreas-unggun.my.id/blog/t");
  });
});
