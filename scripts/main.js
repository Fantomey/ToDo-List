
const taskInput = document.querySelector('.input-text');
const btnAdd = document.querySelector('.btn');
const taskList = document.querySelector('.task-list');

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach((item) => {
        tasks.push({ text: item.firstChild.textContent, done: item.classList.contains('task-item--done') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.done));
}

function addTaskToDOM(taskText, isDone = false) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (isDone) taskItem.classList.add('task-item--done');
    taskItem.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('delBtn');

    taskList.appendChild(taskItem);
    taskItem.appendChild(deleteBtn);

    deleteBtn.onclick = () => {
        taskItem.remove();
        saveTasks();
    };

    taskItem.onclick = () => {
        taskItem.classList.toggle('task-item--done');
        saveTasks();
    };
}

btnAdd.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const tasks = document.querySelectorAll('.task-item');

    if (taskText === '') {
        alert("Your task is empty, so you don't need to do something ( ͡° ͜ʖ ͡°)");
    } else if (tasks.length >= 8) {
        alert("You have reached the maximum number of tasks (8 tasks).");
    } else {
        addTaskToDOM(taskText);
        saveTasks();
    }

    taskInput.value = '';
});

loadTasks();




































function changeThemes() {
    const btnThemes = document.querySelector('.btn-theme');

    btnThemes.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');

        if (isDark) {
            localStorage.setItem('darkMode', 'dark');
        } else {
            localStorage.setItem('darkMode', 'light');
        }
    });

    if (localStorage.getItem('darkMode') === 'dark') {
        btnThemes.classList.add("btn-change-themes--active");
        document.body.classList.add("dark");
    } else {
        btnThemes.classList.remove("btn-change-themes--active");
        document.body.classList.remove("dark");
    }
}


changeThemes();

