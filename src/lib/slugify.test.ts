import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("replaces ampersands with and", () => {
    expect(slugify("Why It Works & Scales")).toBe("why-it-works-and-scales");
  });
  it("drops punctuation and collapses spaces", () => {
    expect(slugify("Hello  World!")).toBe("hello-world");
  });
});
