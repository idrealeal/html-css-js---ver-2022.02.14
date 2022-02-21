const pass = "pass";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoLists = document.querySelector("#todo-lists");

let saveTodoLists = [];
let updateTodoLists = [];

// function paintLi(paintList) {
//   const liTag = document.createElement("li");
//   const todoTag = document.createElement("span");
//   const buttonTag = document.createElement("button");

//   liTag.setAttribute("id", paintList.id);
//   liTag.appendChild(todoTag);
//   liTag.appendChild(buttonTag);

//   todoTag.innerHTML = paintList.todo;
//   buttonTag.innerHTML = "X";
//   todoLists.appendChild(liTag);

//   //add event listener to delete button
//   buttonTag.addEventListener("click", (event) => {
//     updateTodoLists = saveTodoLists.filter(
//       (obj) => obj.id !== parseInt(event.target.parentElement.id)
//     );
//     localStorage.setItem("todoLists", JSON.stringify(updateTodoLists));
//     saveTodoLists = updateTodoLists;

//     const deleteLiTag = event.target.parentElement;
//     deleteLiTag.remove();
//   });
// }

function paintLi(paintList) {
  const liTag = document.createElement("li");
  const todoTag = document.createElement("div");

  liTag.setAttribute("id", paintList.id);
  liTag.appendChild(todoTag);

  todoTag.innerHTML = paintList.todo;
  todoLists.appendChild(liTag);

  //add event listener to delete button
  todoTag.addEventListener("click", (event) => {
    updateTodoLists = saveTodoLists.filter(
      (obj) => obj.id !== parseInt(event.target.parentElement.id)
    );
    localStorage.setItem("todoLists", JSON.stringify(updateTodoLists));
    saveTodoLists = updateTodoLists;

    const deleteLiTag = event.target.parentElement;
    deleteLiTag.remove();
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  // save newtodo to localstorage
  saveTodoLists.push({ id: new Date().getTime(), todo: newTodo });
  localStorage.setItem("todoLists", JSON.stringify(saveTodoLists));

  paintLi(saveTodoLists[saveTodoLists.length - 1]);
});

const getTodoLists = JSON.parse(localStorage.getItem("todoLists"));
if (getTodoLists === null) {
  pass;
} else {
  for (let i in getTodoLists) {
    paintLi(getTodoLists[i]);
  }
  saveTodoLists = getTodoLists;
}
