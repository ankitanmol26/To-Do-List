const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todos[index].completed = checkbox.checked;
    saveTodos();
    render();
  });

  const span = document.createElement("span");
  span.textContent = todo.text ?? "";

  // Double click to edit
  span.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo:", todos[index].text);
    if (newText === null) return;
    const trimmed = newText.trim();
    if (!trimmed) return;

    todos[index].text = trimmed;
    saveTodos();
    render();
  });

  li.appendChild(checkbox);
  li.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    render();
  });

  li.appendChild(deleteBtn);

  if (todo.completed) li.classList.add("completed");

  return li;
}

function render() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = createTodoNode(todo, index);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  saveTodos();

  input.value = "";
  render();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

render();
