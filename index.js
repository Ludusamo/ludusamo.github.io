document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector("day-night");

  const initialTheme = "light";
  
  root.dataset.theme = initialTheme;
  toggle.setAttribute("theme", initialTheme);

  toggle.addEventListener("theme-change", (e) => {
    root.dataset.theme = e.detail.theme;
  });
});
