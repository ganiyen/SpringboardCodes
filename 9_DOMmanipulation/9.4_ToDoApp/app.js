/*
JS Todos Exercise
Part 1
For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

As a user, you should be able to:

Add a new todo (by submitting a form)
Mark a todo as completed (cross out the text of the todo)
Remove a todo
*/

//mark to do completed by crossing out the text of the todo
//remove a todo
const todo = document.querySelector('#todo-list');

localStorage.clear();

todo.addEventListener('click', function(event){
    if (event.target.tagName === "BUTTON" && event.target.textContent === "completed") {
        event.target.parentElement.style.textDecoration = "line-through";
    }

    if (event.target.tagName === "BUTTON" && event.target.textContent === "remove") {
        event.target.parentElement.remove();
    }
})

//submit a form, add new entry 
const form = document.querySelector("#todo-form")
const input = document.querySelector("#new-todo")

form.addEventListener("submit", function(e){
    e.preventDefault();

    //<li>Read books<button>completed</button><button>remove</button></li>
    const newTodo = document.createElement("li");
    newTodo.innerText = input.value //<li>input.value</li>

    const completedBtn = document.createElement("button"); //<button>completed<button>
    completedBtn.innerText = "completed";
    newTodo.append(completedBtn);

    const removeBtn = document.createElement("button"); //<button>remove<button>
    removeBtn.innerText = "remove";
    newTodo.append(removeBtn)

    todo.append(newTodo);
    input.value = '';

})


