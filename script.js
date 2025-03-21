// Get all elements we need
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load saved tasks or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Show tasks when page loads
showTasks();

// Add button click handler
addBtn.onclick = function() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        tasks.push({
            text: taskText,
            completed: false
        });
        
        taskInput.value = '';
        saveTasks();
        showTasks();
    }
};

// Show all tasks
function showTasks() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        
        if (task.completed) {
            taskDiv.classList.add('completed');
        }
        
        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${i})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask(${i})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(taskDiv);
    }
}

// Toggle task complete/incomplete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    showTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
}

// Save to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}