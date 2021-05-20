/*lets create a array which  have to do items text objects*/
/*let todoList = [{
        text: "Learn HTML",
        uniqueId: 1
    },
    {
        text: "Learn CSS",
        uniqueId: 2
    },
    {
        text: "Learn JAVA SCRIPT",
        uniqueId: 3
    }
];*/
//get to-do  list from local storage 
// removed above code and created a todoList that get data from local storage 
function getToDoListFromLocalStorage() {
    let parsedToDoList = JSON.parse(localStorage.getItem("todoListKey"));
    if (parsedToDoList === null) {
        return []
    } else {
        return parsedToDoList;
    }
}
let todoList = getToDoListFromLocalStorage();



//save button function 
let saveButton = document.getElementById("saveButton");
saveButton.onclick = function() {
    localStorage.setItem("todoListKey", JSON.stringify(todoList));
}



let toDoCount = todoList.length; //keep the count of items in local storage 

/*to add new to do item on clicking add button*/
let addButton = document.getElementById('addButton'); //get add button from html 
addButton.onclick = function() {
    let userInputValue = document.getElementById('userInput').value; /*get the value from user input*/
    let errorMessage = document.getElementById("errorMessage"); /*to display error message */
    if (userInputValue === "") {
        errorMessage.textContent = "Enter valid input";
    } else {
        errorMessage.textContent = "";
        toDoCount = toDoCount + 1; /*increment count by 1*/
        let newToDo = {
            /*create a new to and append it */
            text: userInputValue,
            uniqueId: toDoCount,
            isChecked: false
        };
        todoList.push(newToDo); // to add items to array 
        createAndAppendToDo(newToDo);
        document.getElementById("userInput").value = ""; // to make user input null after taking text 
    }
};

let toDoItemsContainer = document.getElementById('toDoItemsContainer');

function createAndAppendToDo(todo) {
    /*create a unique id for each to do item and label and check box */
    let toDOId = "todo" + todo.uniqueId;
    let checkBoxId = "checkBox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    /*to do item container*/
    let toDoItem = document.createElement("li");
    toDoItem.classList.add("todo-item");
    toDoItem.id = toDOId;
    toDoItemsContainer.appendChild(toDoItem);
    /*check box in to-do item */
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId; /*assigning a unique ID for each check box*/
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("label-checkbox");
    /*function to make line through text */
    inputElement.onclick = function() {
        onToDostatusChange(checkBoxId, labelId, toDOId);
    }
    toDoItem.appendChild(inputElement);
    /*container right to check box */
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    toDoItem.appendChild(labelContainer);
    /*label container text*/
    let labelElement = document.createElement("label");
    labelElement.textContent = todo.text;
    labelElement.classList.add("label-text");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.id = labelId; /*assigning a unique Id for each label*/
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    /*delete icon container in label container*/
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    /*delete icon */
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    /*on clicking delete icon delete entire to do */
    deleteIcon.onclick = function() {
        deleteToDo(toDOId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

/*onToDostatusChange function */
function onToDostatusChange(checkBoxId, labelId, toDOId) {
    let checkBoxElement = document.getElementById(checkBoxId); //get the check box element using checkBox Id 
    //console.log(checkBoxElement.checked); //return true or false if checked or unchecked 
    let labelElement = document.getElementById(labelId); // get the label element using label ID
    /* if(checkBoxElement.checked===true){
         labelElement.classList.add("checked");
     }else{
         labelElement.classList.remove("checked");
     }*/
    //insted of all this we use toggle 
    labelElement.classList.toggle("checked");

    let toDoObjectIndex = todoList.findIndex(function(eachItem) {
        let itemToDoId = "todo" + eachItem.uniqueId;
        if (toDOId === itemToDoId) {
            return true
        } else {
            return false;
        }
    });
    let toDoObject = todoList[toDoObjectIndex];
    if (toDoObject.isChecked === true) {
        toDoObject.isChecked = false;
    } else {
        toDoObject.isChecked = true;
    }

}

/*deleteToDo function where we delete items using splice */
function deleteToDo(toDOId) {
    let deleteToDoItem = document.getElementById(toDOId); // get the to do item using toDoId 
    toDoItemsContainer.removeChild(deleteToDoItem); //removeChild  to do item from toDoItemsContainer
    //using findIndex method and splice method we delete items from todoList array 
    let deleteIndex = todoList.findIndex(function(eachItem) {
        let eachToDoItem = "todo" + eachItem.uniqueId;
        if (toDOId === eachToDoItem) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1); //indicates deleting 1 element from specific index 
}

//clear button 
let cleraButton = document.getElementById("cleraButton");
cleraButton.onclick = function() {
    for (let item of todoList) {
        let itemId = "todo" + item.uniqueId;
        let deleteToDoItem = document.getElementById(itemId);
        toDoItemsContainer.removeChild(deleteToDoItem);
    }
    localStorage.removeItem("todoListKey");

}


//using for each loop and todoList we create each toDo item 
for (let item of todoList) {
    createAndAppendToDo(item);
}
