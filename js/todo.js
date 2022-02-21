const pass = "pass";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoLists = document.querySelector("#todo-lists");

let saveTodoLists = [];
let updateTodoLists = [];

function paintLi(paintObj) {
  const liTag = document.createElement("li");
  const todoTag = document.createElement("div");

  liTag.setAttribute("id", paintObj.id);
  liTag.appendChild(todoTag);

  todoTag.innerHTML = paintObj.todo;
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
  //새로고침 막기
  event.preventDefault();
  //입력받은 것을 변수에 저장하기
  const newTodo = todoInput.value;
  todoInput.value = "";

  // localstorage에 "저장할 배열(saveTodoLists)"을 저장하기
  saveTodoLists.push({ id: new Date().getTime(), todo: newTodo });
  localStorage.setItem("todoLists", JSON.stringify(saveTodoLists));
  //"saveTodoLists"에서 마지막에 입력받은 값을 "paintLi"에 전달하기
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
