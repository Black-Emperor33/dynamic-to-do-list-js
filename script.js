//Wait for the DOM to fully load before running the code
document.addEventListener('DOMContentLoaded', function () {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');     // Add Task button
  const taskInput = document.getElementById('task-input');   // Input field
  const taskList = document.getElementById('task-list');     // UL list container

  //Define the addTask function
  function addTask() {
    // Get and trim the input value
    const taskText = taskInput.value.trim();

    //Validate input
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    //Create a new <li> for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    //Remove the task when the button is clicked
    removeButton.onclick = function () {
      taskList.removeChild(li);
    };

    //Append button → li → ul
    li.appendChild(removeButton);
    taskList.appendChild(li);

    //Clear input field
    taskInput.value = '';
  }

  //Add event listener for the "Add Task" button
  addButton.addEventListener('click', addTask);

  //Add event listener for pressing "Enter"
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  //Optionally invoke addTask when DOM loads (if needed)
  // addTask(); // Uncomment if you want to add a default task on load
});
