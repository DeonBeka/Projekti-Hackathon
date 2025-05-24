const currentMonthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let selectedDate = null;
let events = JSON.parse(localStorage.getItem("events")) || {};  // Events stored in localStorage

// Initialize calendar
function initCalendar() {
  displayMonth(currentDate.getMonth(), currentDate.getFullYear());
}

// Display month and year in calendar
function displayMonth(month, year) {
  currentDate.setMonth(month);
  currentDate.setFullYear(year);

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Set calendar month display
  document.getElementById("calendarMonth").textContent = `${currentMonthNames[month]} ${year}`;

  // Clear existing grid
  const calendarGrid = document.getElementById("calendarGrid");
  calendarGrid.innerHTML = "";

  // Create empty cells for previous month days
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.textContent = prevMonthDays - firstDay + i + 1;
    calendarGrid.appendChild(emptyCell);
  }

  // Create cells for the current month days
  for (let day = 1; day <= lastDate; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    const dateString = `${year}-${month + 1}-${day}`;

    // If event exists for this day, highlight it
    if (events[dateString]) {
      dayCell.style.backgroundColor = "#ffeb3b";
    }

    // Click to open event modal for selected day
    dayCell.addEventListener("click", () => openEventModal(dateString, day, month, year));
    calendarGrid.appendChild(dayCell);
  }
}

// Open modal to add/edit event
function openEventModal(dateString, day, month, year) {
  selectedDate = dateString;
  const eventText = document.getElementById("eventText");
  eventText.value = events[dateString] || "";
  document.getElementById("eventModal").style.display = "flex";
}

// Save event in localStorage
document.getElementById("saveEvent").addEventListener("click", () => {
  const eventText = document.getElementById("eventText").value;
  events[selectedDate] = eventText;
  localStorage.setItem("events", JSON.stringify(events));
  document.getElementById("eventModal").style.display = "none";
  displayMonth(currentDate.getMonth(), currentDate.getFullYear()); // Refresh calendar
});

// Close event modal without saving
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("eventModal").style.display = "none";
});

// Navigation to previous month
document.getElementById("prevMonth").addEventListener("click", () => {
  displayMonth(currentDate.getMonth() - 1, currentDate.getFullYear());
});

// Navigation to next month
document.getElementById("nextMonth").addEventListener("click", () => {
  displayMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
});

// Initialize calendar
initCalendar();
//DArk Mode
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