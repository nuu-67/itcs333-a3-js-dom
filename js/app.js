document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#todo-input");
  const todoList = document.querySelector("#todo-list");
  const errorMsg = document.querySelector("#error-msg");
  const counter = document.querySelector("#counter");

  const filterAll = document.querySelector("#filter-all");
  const filterActive = document.querySelector("#filter-active");
  const filterDone = document.querySelector("#filter-done");

  let currentFilter = "all";

  function updateCounter() {
    const remaining = todoList.querySelectorAll("li:not(.completed)").length;
    counter.textContent = `${remaining} item(s) left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll("li");

    items.forEach((item) => {
      const completed = item.classList.contains("completed");

      if (currentFilter === "all") {
        item.style.display = "";
      } else if (currentFilter === "active") {
        item.style.display = completed ? "none" : "";
      } else {
        item.style.display = completed ? "" : "none";
      }
    });
  }

  function addTodo() {
    const text = input.value.trim();

    if (text === "") {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.textContent = text;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.type = "button";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    input.value = "";

    applyFilter();
    updateCounter();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
  });

  todoList.addEventListener("click", (event) => {
    const item = event.target.closest("li");

    if (!item || !todoList.contains(item)) {
      return;
    }

    if (event.target.closest(".delete-btn")) {
      item.remove();
    } else {
      item.classList.toggle("completed");
    }

    applyFilter();
    updateCounter();
  });

  filterAll.addEventListener("click", () => {
    currentFilter = "all";
    applyFilter();
  });

  filterActive.addEventListener("click", () => {
    currentFilter = "active";
    applyFilter();
  });

  filterDone.addEventListener("click", () => {
    currentFilter = "done";
    applyFilter();
  });

  errorMsg.classList.add("hidden");
  updateCounter();
});

