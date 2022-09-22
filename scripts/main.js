// let todos = [];
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const form = document.getElementById('new-task-form');
    const input = document.getElementById('new-task-input');

    displayTodos();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert('Please fill out the task form');
            return;
        }

        // adding to local storage
        if (todos.includes(task)) {
            window.alert('Task is already on the list!');
            return;
        }
        todos.push(task);
        localStorage.setItem('todos', JSON.stringify(todos))
        e.target.reset();
        // displayTodos();

        addNewTask(task);
        // input.value = '';
    });


});

function addNewTask(task) {
    const input = document.getElementById('new-task-input');
    const taskList = document.getElementById('tasks');
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    const taskContent = `
            <div class="content">
                <input type="text" class="text" value="${task}" readonly>
            </div>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
    newTask.innerHTML = taskContent;

    taskList.appendChild(newTask);

    const editBtn = newTask.querySelector('.edit');
    const deleteBtn = newTask.querySelector('.delete');

    let index;
    editBtn.addEventListener('click', () => {
        const taskInput = newTask.querySelector('.text');
        if (editBtn.innerText.toLowerCase() == 'edit') {
            taskInput.removeAttribute('readonly');
            taskInput.focus();
            editBtn.innerText = 'Save';
            index = todos.indexOf(taskInput.value);
        } else {
            if (todos.includes(taskInput.value)) {
                window.alert('Task is already on the list!');
                return;
            }

            taskInput.setAttribute('readonly', 'readonly');
            editBtn.innerText = 'Edit';
            todos[index] = taskInput.value;
            console.log(todos);
            localStorage.setItem('todos', JSON.stringify(todos));
            // displayTodos();
        }
    });

    deleteBtn.addEventListener('click', () => {
        const taskInput = newTask.querySelector('.text');
        deleteTask(taskInput.value);
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        newTask.remove();
    });
}

function displayTodos() {
    const tasks = document.getElementById('tasks');
    tasks.innerHTML = '';

    for (let title of todos) {
        addNewTask(title);
    }
}

function deleteTask(taskToDelete) {
    let newTodos = [];
    for (let task of todos) {
        if (task != taskToDelete) {
            newTodos.push(task);
        }
    }
    todos = newTodos;
}