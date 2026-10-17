import { describe, expect, it } from "vitest";
import { slugify, uniqueSlug } from "./slugify";

describe("slugify", () => {
  it("replaces ampersands with and", () => {
    expect(slugify("Why It Works & Scales")).toBe("why-it-works-and-scales");
  });
  it("drops punctuation and collapses spaces", () => {
    expect(slugify("Hello  World!")).toBe("hello-world");
  });
});

describe("uniqueSlug", () => {
  it("dedupes repeats and falls back to section for empty slugs", () => {
    const seen = new Map<string, number>();
    expect(uniqueSlug("Intro", seen)).toBe("intro");
    expect(uniqueSlug("Intro", seen)).toBe("intro-2");
    expect(uniqueSlug("!!!", seen)).toBe("section");
  });
});
