//define UI var
const form = document.querySelector('form');
const taskList = document.querySelector('.collection');
const clear = document.querySelector('.clear');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners(); 

//load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
     //Add task event
     form.addEventListener('submit', addTask);
     //remove task event
     taskList.addEventListener('click', removeTask);
     //clear tasks
     clear.addEventListener('click', clearTasks)
     //filter tasks event
     filter.addEventListener('keyup', filterTasks)
}
//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));      
}
tasks.forEach(function(task){
    //create li element 
const li = document.createElement('li');
//Add class
li.className = 'collection-item';
//Create and append textNode
li.appendChild(document.createTextNode(task));
 //create link element
 const link = document.createElement('a');
 //Add class
 link.className = 'delete';
//Add icon
link.innerHTML = '<i class="fas fa-backspace"></i>';
//Append the link to li
li.appendChild(link);

//Append to ul
taskList.appendChild(li);
})

}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
        taskList.removeChild(li)
    }
//create li element 
const li = document.createElement('li');
//Add class
li.className = 'collection-item';
//create and append textNode
li.appendChild(document.createTextNode(taskInput.value));
 //create link element
 const link = document.createElement('a');
 //Add class
 link.className = 'delete';
//add icon
link.innerHTML = '<i class="fas fa-backspace"></i>';
//append the link to li
li.appendChild(link);
//append to ul
taskList.appendChild(li);

//store in LS 
storeTaskinLS(taskInput.value);

//clear input
taskInput.value = '';

 e.preventDefault();
}

//store task
function storeTaskinLS(task){
let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task)
 
localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete'))
{if(confirm('Are you certain?')){
    e.target.parentElement.parentElement.remove();

    //Remove from LS
    removeTaskFromLS(e.target.parentElement.parentElement)
}}
}

//Remove from LS 
function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//clear tasks
function clearTasks(){
    //using innerhtml
    // taskList.innerHTML = ''
    
    //faster using loop
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    //clear from LS
    clearTasksFromLS()
}

//clear tasks from LS 
function clearTasksFromLS(){
 localStorage.clear()
}

//filter tasks
function filterTasks(e){
const text = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
        }else {
            task.style.display = 'none'
        }
    }
)
}