import fs from "fs";
import os from "os";
import path from "path";
import { describe, expect, it } from "vitest";
import { getPosts } from "./utils";

const rel = (d: string) => path.relative(process.cwd(), d);

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "posts-"));
}

describe("getPosts track", () => {
  it("returns track from frontmatter", () => {
    const dir = tmpDir();
    fs.writeFileSync(path.join(dir, "has-track.mdx"), "---\ntitle: A\ntrack: ai\n---\nBody");
    const posts = getPosts([rel(dir)], { requireTrack: true });
    expect(posts[0].metadata.track).toBe("ai");
  });

  it("throws when requireTrack and track is missing", () => {
    const dir = tmpDir();
    fs.writeFileSync(path.join(dir, "no-track.mdx"), "---\ntitle: A\n---\nBody");
    expect(() => getPosts([rel(dir)], { requireTrack: true })).toThrow(/Missing or invalid track in .*no-track\.mdx/);
  });

  it("does not throw without requireTrack", () => {
    const dir = tmpDir();
    fs.writeFileSync(path.join(dir, "no-track.mdx"), "---\ntitle: A\n---\nBody");
    expect(getPosts([rel(dir)])[0].metadata.track).toBeUndefined();
  });
});
