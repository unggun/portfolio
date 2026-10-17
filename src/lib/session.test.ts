import { describe, expect, it } from "vitest";
import { buildSessionGrid, toSessionClips, TRACKS, type SessionClip } from "./session";

const clip = (over: Partial<SessionClip>): SessionClip => ({
  slug: "x",
  kind: "work",
  track: "commerce",
  name: "X",
  title: "X",
  summary: "",
  publishedAt: "2025-01-01",
  href: "/work/x",
  ...over,
});

const meta = (title: string, publishedAt: string, track?: "ai" | "commerce" | "audio") => ({
  metadata: { title, publishedAt, summary: `${title} summary`, image: "", images: [], team: [], track },
  slug: title.toLowerCase().replace(/\W+/g, "-"),
  content: "",
});

const projects = [
  meta("Deputy: A Factory", "2026-10-15", "ai"),
  meta("Swift Checkout: SaaS", "2025-04-01", "commerce"),
  meta("UP LTC Display: Plugin", "2024-06-03", "audio"),
  meta("Medbiz: B2B", "2023-04-01", "commerce"),
];
const posts = [meta("When Agents Write the Code", "2026-09-17")];

describe("TRACKS", () => {
  it("has the four tracks in order", () => {
    expect(TRACKS.map((t) => t.id)).toEqual(["ai", "commerce", "audio", "writing"]);
    expect(TRACKS[0]).toEqual({ id: "ai", name: "AI Systems", color: "var(--clip-lilac)" });
  });
});

describe("toSessionClips", () => {
  const clips = toSessionClips(projects, posts);
  it("derives name, track, href", () => {
    expect(clips[0].name).toBe("Deputy");
    expect(clips[0].href).toBe("/work/deputy-a-factory");
    const post = clips.find((c) => c.kind === "blog")!;
    expect(post.track).toBe("writing");
    expect(post.href.startsWith("/blog/")).toBe(true);
    expect(post.name).toBe("When Agents Write the Code");
  });
  it("picks image from images[0], then image, else undefined", () => {
    const a = meta("A", "2025-01-01", "ai");
    a.metadata.images = ["/i.png"];
    a.metadata.image = "/j.png";
    const b = meta("B", "2025-01-01", "ai");
    b.metadata.image = "/j.png";
    const [ca, cb, cc] = toSessionClips([a, b, meta("C", "2025-01-01", "ai")], []);
    expect(ca.image).toBe("/i.png");
    expect(cb.image).toBe("/j.png");
    expect(cc.image).toBeUndefined();
  });
});

describe("toSessionClips validation", () => {
  it("throws for a project without a valid track", () => {
    expect(() => toSessionClips([meta("No Track", "2025-01-01")], [])).toThrow(/Unknown track/);
  });
});

describe("buildSessionGrid", () => {
  it("builds year scenes newest first", () => {
    const grid = buildSessionGrid(toSessionClips(projects, posts));
    expect(grid.map((s) => s.label)).toEqual(["2026", "2025", "2024", "2023"]);
    expect(grid[0].slots[0]?.name).toBe("Deputy");
    expect(grid[0].slots[3]?.kind).toBe("blog");
  });
  it("spills a taken slot into a new scene with the same label", () => {
    const older = clip({ slug: "a", publishedAt: "2025-02-01" });
    const newer = clip({ slug: "b", publishedAt: "2025-09-01" });
    const grid = buildSessionGrid([older, newer]);
    expect(grid.map((s) => s.label)).toEqual(["2025", "2025"]);
    expect(grid[0].slots[1]?.slug).toBe("b");
    expect(grid[1].slots[1]?.slug).toBe("a");
    const total = grid.flatMap((s) => s.slots).filter(Boolean).length;
    expect(total).toBe(2);
  });
  it("throws on an unknown track instead of dropping the clip", () => {
    const bad = clip({ slug: "v", track: "video" as never });
    expect(() => buildSessionGrid([bad])).toThrow(/Unknown track "video" for clip/);
  });
  it("returns [] for no clips", () => {
    expect(buildSessionGrid([])).toEqual([]);
  });
});
