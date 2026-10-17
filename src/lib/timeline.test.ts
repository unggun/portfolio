import { describe, expect, it } from "vitest";
import { roles } from "@/content/experience";
import {
  followOffset,
  formatMonth,
  roleAt,
  roleEnd,
  timelineSpan,
  toMonth,
} from "./timeline";

const now = toMonth("2026-10");

describe("months", () => {
  it("toMonth and formatMonth", () => {
    expect(toMonth("2014-12")).toBe(2014 * 12 + 11);
    expect(formatMonth(toMonth("2025-08"))).toBe("Aug 2025");
  });
});

describe("timelineSpan / roleEnd", () => {
  it("ends at now + 1 and starts at the earliest role", () => {
    const span = timelineSpan(roles, now);
    expect(span.end).toBe(toMonth("2026-11"));
    expect(span.start).toBe(toMonth("2014-12"));
  });
  it("open role ends at now + 1, closed role after its last month", () => {
    const upscalix = roles.find((r) => r.company === "Upscalix")!;
    expect(roleEnd(upscalix, now)).toBe(now + 1);
    expect(roleEnd(roles[0], now)).toBe(toMonth("2017-06"));
  });
});

describe("roleAt", () => {
  it("keeps the last role through a gap", () => {
    expect(roleAt(roles, toMonth("2025-06"), now).company).toBe("SIRCLO");
  });
  it("falls back to the first role before any start", () => {
    expect(roleAt(roles, toMonth("2010-01"), now)).toBe(roles[0]);
  });
  it("finds the containing role", () => {
    expect(roleAt(roles, toMonth("2026-01"), now).company).toBe("Upscalix");
  });
});

describe("followOffset", () => {
  it("follows the playhead", () => {
    expect(followOffset(0, 2000, 800)).toEqual({ playheadX: 0, translateX: 0 });
    expect(followOffset(1, 2000, 800)).toEqual({ playheadX: 2000, translateX: 1200 });
    expect(followOffset(0.5, 2000, 800)).toEqual({ playheadX: 1000, translateX: 640 });
  });
  it("does not translate when the track fits the view", () => {
    expect(followOffset(1, 500, 800).translateX).toBe(0);
  });
});
