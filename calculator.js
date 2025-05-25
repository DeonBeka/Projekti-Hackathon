const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

buttons.forEach(button => {
  const value = button.dataset.value;
  const action = button.dataset.action;

  button.addEventListener('click', () => {
    if (value !== undefined) {
      expression += value;
      display.textContent = expression;
    }

    if (action === 'clear') {
      expression = '';
      display.textContent = '0';
    }

    if (action === 'delete') {
      expression = expression.slice(0, -1);
      display.textContent = expression || '0';
    }

    if (action === 'calculate') {
      try {
        expression = eval(expression).toString();
        display.textContent = expression;
      } catch {
        display.textContent = 'Error';
        expression = '';
      }
    }
  });
});

(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = savedTheme || (prefersDark ? "dark" : "light");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  // Wait for button and toggle icon
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