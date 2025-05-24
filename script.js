let taskList = [];

window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    taskList = JSON.parse(savedTasks);
    renderTasks();
  }
};

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  taskList.push({ text: task, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    ul.appendChild(li);
  });
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