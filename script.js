// Get the div where the tasks will be displayed.
let tasksDisplay = document.getElementById("tasks-display");

// Load previously stored tasks (if any) from local storage.
tasksDisplay.innerHTML = JSON.parse(localStorage.getItem("tasks"));

// Function to save all tasks to Local Storage
function saveTasks() {
  // Save all tasks to local storage.
  localStorage.setItem("tasks", JSON.stringify(tasksDisplay.innerHTML));
}

// Function to create and add a new task.
function addTodo() {
  // Store user's povided input.
  let taskToAdd = document.getElementsByClassName("input-task")[0].value;

  // If user left the input empty, do nothing.
  if (taskToAdd === "") {
  } else {
    // Otherwise, create new task.
    let newTaskElement = document.createElement("div");

    // Set the class and id of the new task element to apply the preset styles.
    newTaskElement.setAttribute("class", "task");
    newTaskElement.setAttribute("id", "todo-" + taskToAdd);

    // Set the HTML of the new task element.
    let newTaskContent = `<div class='task-left'><button class='check-button' name='${
      "todo-" + taskToAdd
    }' onclick='taskDone(this.name)'><svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e3e3e3'><path d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/></svg></button><p class='task-label'>${taskToAdd}</p></div><div class='task-buttons'><button class='task-button edit-button' name='${taskToAdd}' onclick='editTodo(this.name)'><svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e3e3e3'><path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12-11 17.5-26t5.5-30q0-16-5.5-30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z'/></svg></button><button class='task-button delete-button' name='${taskToAdd}' onclick='deleteTodo(this.name)'><svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e3e3e3'><path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z'/></svg></button></div>`;
    newTaskElement.innerHTML = newTaskContent;

    // Add new task element to the display.
    tasksDisplay.appendChild(newTaskElement);

    // Clear the task input field.
    let inputTask = document.getElementsByClassName("input-task")[0];
    inputTask.value = "";

    // Save all tasks to local storage.
    saveTasks();
  }
}

// Function to remove a task.
function deleteTodo(name) {
  // Get the task which is to be removed.
  let taskToDelete = document.getElementById("todo-" + name);

  // Remove selected task.
  tasksDisplay.removeChild(taskToDelete);

  // Save all tasks to local storage.
  saveTasks();
}

// Function to edit the content of a task
function editTodo(name) {
  // Get the task which is to be editted.
  let taskToEdit = document.getElementById("todo-" + name);

  // Get the content of the selected task.
  let taskPara = taskToEdit.getElementsByTagName("p")[0];
  let task = taskPara.innerText;

  // Replace the content of selected task with a styled input and a submit button. Input by default contains original task content.
  taskPara.innerText = "";
  taskPara.innerHTML = `<input type='text' id='${
    "todo-" + name
  }-editing-input' class='input-task' height='35px' value="${task}"><button name='${
    "todo-" + name
  }' class='task-button' onclick='finalizeEdit(this.name)' style="margin-left: 15px;">Submit</button>`;
}

// Function to finalize task edit.
function finalizeEdit(name) {
  // Get the selected task element.
  let taskToFinalize = document.getElementById(name);
  let edittedTask = document
    .getElementById(name)
    .getElementsByTagName("p")[0]
    .getElementsByTagName("input")[0].value;
  let editToFinalize = document
    .getElementById(name)
    .getElementsByTagName("p")[0];
  let inputToRemove = editToFinalize.getElementsByTagName("input")[0];
  let buttonToRemove = editToFinalize.getElementsByTagName("button")[0];
  editToFinalize.removeChild(inputToRemove);
  editToFinalize.removeChild(buttonToRemove);
  if (edittedTask === "") {
    tasksDisplay.removeChild(taskToFinalize);
  } else {
    editToFinalize.innerText = edittedTask;
  }
  saveTasks();
}

function taskDone(name) {
  let taskToTick = document.getElementById(name);
  let doneTaskCheckButton =
    taskToTick.getElementsByClassName("check-button")[0];
  let taskParaDone = taskToTick.getElementsByTagName("p")[0];
  taskParaDone.setAttribute(
    "style",
    "text-decoration: line-through; opacity: 0.5;"
  );
  doneTaskCheckButton.setAttribute(
    "class",
    "check-button checked-check-button"
  );
  doneTaskCheckButton.setAttribute("onclick", "taskUndo(this.name)");
  tasksDisplay.removeChild(taskToTick);
  tasksDisplay.appendChild(taskToTick);
  saveTasks();
}

function taskUndo(name) {
  let taskParaToUndo = document
    .getElementById(name)
    .getElementsByTagName("p")[0];
  taskParaToUndo.setAttribute("style", "");
  let taskUndoCheckButton = document
    .getElementById(name)
    .getElementsByClassName("checked-check-button")[0];
  taskUndoCheckButton.setAttribute("class", "check-button");
  taskUndoCheckButton.setAttribute("onclick", "taskDone(this.name)");
  saveTasks();
}

function clearAllTasks() {
  tasksDisplay.innerHTML = "";
  saveTasks();
}
