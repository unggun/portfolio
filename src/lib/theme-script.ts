export const themeInitScript = `(function () {
  var theme = "dark";
  try {
    var saved = localStorage.getItem("data-theme");
    theme =
      saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
  } catch (e) {}
  document.documentElement.dataset.theme = theme;
})();`;
