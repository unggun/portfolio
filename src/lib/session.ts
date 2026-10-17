import type { Track } from "@/utils/utils";

export type SessionClip = {
  slug: string;
  kind: "work" | "blog";
  track: Track;
  name: string;
  title: string;
  summary: string;
  image?: string;
  publishedAt: string;
  href: string;
};

export const TRACKS: { id: Track; name: string; color: string }[] = [
  { id: "ai", name: "AI Systems", color: "var(--clip-lilac)" },
  { id: "commerce", name: "Commerce", color: "var(--clip-teal)" },
  { id: "audio", name: "Audio Tools", color: "var(--clip-sand)" },
  { id: "writing", name: "Writing", color: "var(--clip-sage)" },
];

export type Scene = { label: string; slots: (SessionClip | null)[] };

export function buildSessionGrid(clips: SessionClip[]): Scene[] {
  const sorted = [...clips].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const scenes: Scene[] = [];
  for (const clip of sorted) {
    const label = clip.publishedAt.slice(0, 4);
    const col = TRACKS.findIndex((t) => t.id === clip.track);
    if (col < 0) throw new Error(`Unknown track "${clip.track}" for clip ${clip.slug}`);
    let scene = scenes.find((s) => s.label === label && s.slots[col] === null);
    if (!scene) {
      scene = { label, slots: TRACKS.map(() => null) };
      // keep scenes of the same year grouped, years newest first
      let last = -1;
      scenes.forEach((s, i) => {
        if (s.label >= label) last = i;
      });
      scenes.splice(last + 1, 0, scene);
    }
    scene.slots[col] = clip;
  }
  return scenes;
}

type Source = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images?: string[];
    track?: Track;
    clipName?: string;
  };
  slug: string;
};

function toClip(item: Source, kind: "work" | "blog"): SessionClip {
  const { metadata, slug } = item;
  const track: Track | undefined =
    kind === "blog" ? "writing" : TRACKS.find((t) => t.id === metadata.track)?.id;
  if (!track) throw new Error(`Unknown track "${metadata.track}" for clip ${slug}`);
  const image = metadata.images?.[0] || metadata.image || undefined;
  return {
    slug,
    kind,
    track,
    name: metadata.clipName?.trim() || metadata.title.split(":")[0].trim(),
    title: metadata.title,
    summary: metadata.summary,
    image,
    publishedAt: metadata.publishedAt,
    href: `/${kind === "work" ? "work" : "blog"}/${slug}`,
  };
}

export function toSessionClips(projects: Source[], posts: Source[]): SessionClip[] {
  return [...projects.map((p) => toClip(p, "work")), ...posts.map((p) => toClip(p, "blog"))];
}
