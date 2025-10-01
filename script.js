// Wait for the DOM to fully load before running the code
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');   // Add Task button
  const taskInput = document.getElementById('task-input');     // Input field
  const taskList = document.getElementById('task-list');       // UL list container

  // Global tasks array to keep track of tasks
  let tasks = [];

  //Load tasks from Local Storage on page load
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks); // Convert JSON → array
      tasks.forEach(task => createTaskElement(task));
    }
  }

  // Save tasks to Local Storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  //Helper function to create a task <li> element
  function createTaskElement(taskText) {
    // Create a new <li> for the task
    const li = document.createElement('li');

    // Add the text content
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    // Remove the task from both DOM & Local Storage
    removeButton.onclick = function () {
      // Remove from tasks array
      tasks = tasks.filter(task => task !== taskText);

      // Update localStorage
      saveTasks();

      // Remove from DOM
      li.remove();
    };

    // Append button → li → ul
    li.appendChild(removeButton);
    taskList.appendChild(li);
  }

  // Define the addTask function
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Add to tasks array
    tasks.push(taskText);

    // Save to Local Storage
    saveTasks();

    // Add to DOM
    createTaskElement(taskText);

    // Clear input field
    taskInput.value = '';
  }

  //Event listener for the "Add Task" button
  addButton.addEventListener('click', addTask);

  //Event listener for pressing "Enter"
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load saved tasks when page loads
  loadTasks();
});
