const form = document.querySelector("#todo-form");
const small = document.querySelector("#check");
const taskInput = document.querySelector("#task-input");
const todoList = document.querySelector("#todo-list");
const itemsLeftSpan = document.querySelector("#items-left");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clear-completed");
let todos = [];
let currentFilter = "all";
// Form submission handler with image validation logic
form.addEventListener("submit", function (event) {
event.preventDefault();
const formData = new FormData(form);
const data = Object.fromEntries(formData);
const taskText = data.task ? data.task.trim() : "";
// Validation logic from screenshot snippet
if (taskText.length < 4) {
console.log("name is too short");
small.textContent = "Task name is too short (min 4 chars)";
small.style.color = "red";
return;
} else {
console.log("name is good");
small.textContent = "";
}
// Create new task item
const newTodo = {
id: Date.now(),
text: taskText,
completed: false
};
todos.push(newTodo);
taskInput.value = "";
renderTodos();
});
// Render function to display list items
function renderTodos() {
todoList.innerHTML = "";
const filteredTodos = todos.filter(todo => {
if (currentFilter === "active") return !todo.completed;
if (currentFilter === "completed") return todo.completed;
return true;
});
filteredTodos.forEach(todo => {
const li = document.createElement("li");
li.className = `todo-item ${todo.completed ? "completed" : ""}`;
li.innerHTML = `
<input type="checkbox" ${todo.completed ? "checked" : ""} />
<span class="task-text">${escapeHtml(todo.text)}</span>
<button class="delete-btn" title="Delete task">&times;</button>
`;
// Toggle completion status on click
li.addEventListener("click", (e) => {
if (e.target.classList.contains("delete-btn")) return;
toggleTodo(todo.id);
});
// Delete task button handler
const deleteBtn = li.querySelector(".delete-btn");
deleteBtn.addEventListener("click", (e) => {
e.stopPropagation();
deleteTodo(todo.id);
});
todoList.appendChild(li);
});
updateStats();
}
// Toggle Task
function toggleTodo(id) {
todos = todos.map(todo =>
todo.id === id ? { ...todo, completed: !todo.completed } : todo
);
renderTodos();
}
// Delete Task
function deleteTodo(id) {
todos = todos.filter(todo => todo.id !== id);
renderTodos();
}
// Update remaining active count
function updateStats() {
const activeCount = todos.filter(t => !t.completed).length;
itemsLeftSpan.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}
// Filter button handlers
filterBtns.forEach(btn => {
btn.addEventListener("click", () => {
filterBtns.forEach(b => b.classList.remove("active"));
btn.classList.add("active");
currentFilter = btn.dataset.filter;
renderTodos();
});
});
// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
todos = todos.filter(todo => !todo.completed);
renderTodos();
});
// Utility helper to sanitize output
function escapeHtml(text) {
const div = document.createElement("div");
div.textContent = text;
return div.innerHTML;
}
// Initial render
renderTodos();

// ==========================================
// 1. Load saved data from localStorage on start
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("formData"));
  if (savedData) {
    if (nameInput) nameInput.value = savedData.name || "";
    if (messageInput) messageInput.value = savedData.message || "";
    console.log("Loaded data from localStorage:", savedData);
  }
});

// ==========================================
// 2. Form Submit & LocalStorage Save Handler
// ==========================================
form.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
  console.log(data.name);
  console.log(data.email);

  // Save the form data object into localStorage as a JSON string
  localStorage.setItem("formData", JSON.stringify(data));
  console.log("Data saved to localStorage!");

  if (data.name.length < 4) {
    console.log("name is too short");
    small.textContent = "name is too short";
    small.style.color = "red";
  } else {
    console.log("name is good");
    small.textContent = "name is good";
    small.style.color = "green";
  }

  if (!data.message) {
    console.log("message is unavailable");
  } else if (data.message.length > 3) {
    console.log("please enter more");
  } else {
    console.log("please enter new message");
  }
});

// ==========================================
// 3. Switch Statement & Array Operations
// ==========================================
const color = "blue";
switch (color) {
  case "red":
    console.log("color is red");
    break;
  case "blue":
    console.log("color is blue");
    break;
  default:
    break;
}

