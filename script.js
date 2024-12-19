document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage
  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => renderTask(task));
  };

  // Save tasks to local storage
  const saveTasks = () => {
      const tasks = [...taskList.children].map(task => ({
          text: task.querySelector(".task-text").textContent,
          completed: task.classList.contains("completed")
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add a new task
  const addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
          alert("Task cannot be empty!");
          return;
      }
      renderTask({ text: taskText, completed: false });
      saveTasks();
      taskInput.value = "";
  };

  // Render a single task
  const renderTask = ({ text, completed }) => {
      const li = document.createElement("li");
      li.className = completed ? "completed" : "";

      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = text;

      const completeBtn = document.createElement("button");
      completeBtn.textContent = completed ? "Undo" : "Complete";
      completeBtn.addEventListener("click", () => {
          li.classList.toggle("completed");
          saveTasks();
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit";
      editBtn.addEventListener("click", () => {
          const newText = prompt("Edit task:", taskText.textContent);
          if (newText) taskText.textContent = newText;
          saveTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete";
      deleteBtn.addEventListener("click", () => {
          li.remove();
          saveTasks();
      });

      li.append(taskText, completeBtn, editBtn, deleteBtn);
      taskList.appendChild(li);
  };

  // Add event listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
  });

  // Initialize the app
  loadTasks();
});
