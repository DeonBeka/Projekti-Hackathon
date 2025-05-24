(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // If user has saved a theme, use it; otherwise use system preference
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  // Update icon
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";

      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        toggleBtn.textContent = isDark ? "🌞" : "🌙";
      });
    }
  });
})();