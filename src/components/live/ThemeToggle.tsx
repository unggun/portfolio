"use client";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("data-theme", next);
    } catch {
      /* storage unavailable, theme still applies for this page */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="cursor-pointer rounded-[var(--r)] border border-line bg-panel-2 px-2.5 py-[5px] text-[12px] font-semibold hover:border-accent"
    >
      Theme
    </button>
  );
}
