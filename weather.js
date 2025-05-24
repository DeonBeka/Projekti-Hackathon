async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "5374e31f71c0fe71f12668988cbe0d7b"; // API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultBox.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="${iconUrl}" alt="${description}">
      <p><strong>${temp}°C</strong> - ${description}</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p>⚠️ ${error.message}</p>`;
  }
}

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