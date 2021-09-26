var todoInput = document.getElementById("todo_input");
var btnAdd = document.getElementById("enter");
var ul = document.querySelector("ul");

btnAdd.className = "btnAdd";

function validateinput() {
    if(todoInput.value.length > 0){
        return true;
    }
    return false;
}

function btnAddClick() {
    if(validateinput()){
        addItem();
    }
}

function btnKeyPress(event) {
    if(validateinput() && event.keyCode === 13){
        addItem();
    }
}

function liClick(element) {
    doneTask(element);
}

function doneTask(task) {
    if(task.target.tagName === "LI"){
        task.target.classList.toggle("done");
    }
}

function addItem() {
    var li = document.createElement("li");
    var btnDelete = document.createElement("button");
    li.appendChild(document.createTextNode(todoInput.value));
    btnDelete.appendChild(document.createTextNode("Delete"));
    ul.appendChild(li);
    li.appendChild(btnDelete);
    btnDelete.classList.add("btnDelete");
    btnDelete.addEventListener("click", deleteItem);
    todoInput.value = "";
}

function deleteItem(element) {
    if (element.target.className === "btnDelete"){
		element.target.parentElement.remove();
	}
}

btnAdd.addEventListener("click", btnAddClick);
todoInput.addEventListener("keypress", btnKeyPress);
ul.addEventListener("click", liClick);