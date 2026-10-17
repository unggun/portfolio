import "server-only";
import { buildSessionGrid, toSessionClips, type Scene, type SessionClip } from "@/lib/session";
import { getPosts } from "@/utils/utils";

export function getSessionData(): { clips: SessionClip[]; scenes: Scene[]; initialSlug: string } {
  const projects = getPosts(["src", "app", "work", "projects"], { requireTrack: true });
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const clips = toSessionClips(projects, posts);
  const newestWork = clips
    .filter((c) => c.kind === "work")
    .reduce<SessionClip | undefined>(
      (best, c) => (!best || c.publishedAt > best.publishedAt ? c : best),
      undefined,
    );
  if (!newestWork) throw new Error("No work clips found for the session view");
  return { clips, scenes: buildSessionGrid(clips), initialSlug: newestWork.slug };
}
