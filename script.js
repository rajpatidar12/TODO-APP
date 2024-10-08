function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  return todos;
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todoText) {
  const todos = loadTodos();
  todos.todoList.push({ text: todoText, completed: false });
  saveTodos(todos);
}

function appendTodoInHtml(todoText, completed = false) {
  const todoList = document.getElementById("todoList");

  const todo = document.createElement("li");

  const todoContent = document.createElement("span");
  todoContent.textContent = todoText;
  todoContent.style.textDecoration = completed ? "line-through" : "none";

  const completeButton = document.createElement("button");
  completeButton.textContent = completed ? "Completed" : "Complete";
  completeButton.classList.add("completeBtn");

  if (completed) {
    completeButton.disabled = true;
    todoContent.style.color = "grey";
  }

  completeButton.addEventListener("click", () => {
    markTodoAsCompleted(todoText);
    completeButton.textContent = "Completed";
    completeButton.disabled = true;
    todoContent.style.textDecoration = "line-through";
    todoContent.style.color = "grey";
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteBtn");

  deleteButton.addEventListener("click", () => {
    deleteTodoFromLocalStorage(todoText);
    todoList.removeChild(todo);
  });

  todo.appendChild(todoContent);
  todo.appendChild(completeButton);
  todo.appendChild(deleteButton);

  todoList.appendChild(todo);
}

function markTodoAsCompleted(todoText) {
  const todos = loadTodos();
  const todoItem = todos.todoList.find((todo) => todo.text === todoText);
  if (todoItem) {
    todoItem.completed = true;
    saveTodos(todos);
  }
}

function deleteTodoFromLocalStorage(todoText) {
  let todos = loadTodos();
  todos.todoList = todos.todoList.filter((todo) => todo.text !== todoText);
  saveTodos(todos);
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const submitButton = document.getElementById("addTodo");

  submitButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
      alert("Please write something for the todo");
    } else {
      addTodoToLocalStorage(todoText);
      appendTodoInHtml(todoText);
      todoInput.value = "";
    }
  });

  const todos = loadTodos();
  todos.todoList.forEach((todo) => {
    appendTodoInHtml(todo.text, todo.completed);
  });
});
