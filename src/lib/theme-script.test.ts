import { describe, it, expect } from "vitest";
import { themeInitScript } from "./theme-script";
const run = (stored: string | null, prefersDark: boolean) => {
  const root = { dataset: {} as Record<string, string> };
  const fn = new Function("document", "localStorage", "matchMedia", themeInitScript);
  fn({ documentElement: root }, { getItem: () => stored }, () => ({ matches: prefersDark }));
  return root.dataset.theme;
};
describe("themeInitScript", () => {
  it("uses the saved theme", () => expect(run("light", true)).toBe("light"));
  it("follows the system when nothing is saved", () => expect(run(null, true)).toBe("dark"));
  it("treats 'system' as unsaved", () => expect(run("system", false)).toBe("light"));
  it("falls back to dark when storage throws", () => {
    const root = { dataset: {} as Record<string, string> };
    new Function("document", "localStorage", "matchMedia", themeInitScript)(
      { documentElement: root }, { getItem: () => { throw new Error("blocked"); } }, () => ({ matches: false }));
    expect(root.dataset.theme).toBe("dark");
  });
});
