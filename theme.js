///CHat Bot

document.getElementById('toggleChat').addEventListener('click', () => {
  const chat = document.getElementById('chatbot');
  chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
});

const chatForm = document.getElementById('chatForm');
const chatBody = document.getElementById('chatBody');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage('user', msg);
  input.value = '';

  // Simulated bot response
  setTimeout(() => {
    addMessage('bot', getBotReply(msg));
  }, 500);
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.textContent = (sender === 'user' ? "You: " : "Bot Bobi: ") + text;
  msg.style.marginBottom = '10px';
  msg.style.textAlign = sender === 'user' ? 'right' : 'left';
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello") || input.includes("hi")) return "Hello there!";
  if (input.includes("What is the capital of Kosovo") || input.includes("what is the capital of kosovo")) return "The capital of Kosovo is Pristina";
  if (input.includes("help")) return "How can I assist you today?";
  if (input.includes("todo")) return "Click the To-Do List card to manage tasks!";
  if (input.includes("weather")) return "Want the weather? Try the weather card!";
  if (input.includes("What is Digital School") || input.includes("what is digital school")) return "Digital School is a programming course where you learn all the programming languages like HTML CSS and JS, Python, Java and so on!";
  if (input.includes("Calculator") || input.includes("calculator")) return "Click the Calculator card to solve your arithmetic operations!";
  if (input.includes("Event Calendar") || input.includes("event calendar")) return "Click the Event Calendar card and organize your dates!";
  if (input.includes("bye")) return "Goodbye!";
  return "I'm just a basic bot! Try saying 'hello' or 'help'.";
}

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