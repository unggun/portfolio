import { describe, expect, it } from "vitest";
import { formatTimecode, scrollToFrames } from "./timecode";

describe("formatTimecode", () => {
  it("formats frames at 25 fps", () => {
    expect(formatTimecode(0)).toBe("00:00:00:00");
    expect(formatTimecode(24)).toBe("00:00:00:24");
    expect(formatTimecode(25)).toBe("00:00:01:00");
    expect(formatTimecode(90000)).toBe("01:00:00:00");
  });
});

describe("scrollToFrames", () => {
  it("maps 3px of scroll to 1 frame and clamps negatives", () => {
    expect(scrollToFrames(299)).toBe(99);
    expect(scrollToFrames(-40)).toBe(0);
  });
});
