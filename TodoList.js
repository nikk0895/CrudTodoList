const mainTodoElem = document.querySelector(".todo-lists-elem"); 
{/* //making the reference of input under mainTodoElem */}
const inputValue = document.getElementById("inputValue"); 
{/* //making the reference of input under inputvalue */}

const fromlocal = () => {
  return JSON.parse(localStorage.getItem("initailstorageto_do"));
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem("initailstorageto_do",JSON.stringify(localTodoLists)
);
};

let localTodoLists = fromlocal () || [];

{/* //adding the list dynamically  */}
const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${curElem}</li>
      <button class ="deleteBtn">Delete</button> `;
      mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  console.log("testing",inputValue.value);
  if(!inputValue.value){
    alert("please enter the name")
  }
  const todoListValue = inputValue.value.trim();
  inputValue.value = "";
  if(todoListValue != "" && !localTodoLists.includes(todoListValue))
    {
      localTodoLists.push(todoListValue);
      localTodoLists = [...new Set(localTodoLists)];
      console.log(localTodoLists);
      localStorage.setItem("initailstorageto_do",JSON.stringify(localTodoLists)
      );
      addTodoDynamicElement(todoListValue);
    }
  };
{/* //reusablity 
  // const divElement = document.createElement("div");
  // divElement.classList.add("main_todo_div");
  // divElement.innerHTML = `<li>${inputValue.value}</li>
  //     <button class ="deleteBtn">Delete</button> `;
  //     mainTodoElem.append(divElement) */}
  const showTodoList = () => {
  console.log(localTodoLists);
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

{/*to remove data */}

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;
  console.log(todoListContent);
  localTodoLists = localTodoLists.filter((curTodo) => {
  return curTodo != todoListContent.toLowerCase(); 
  });
  addTodoListLocalStorage(localTodoLists);
  parentElem.remove();
  console.log(localTodoLists);
};

mainTodoElem.addEventListener("click",(e) => {
  e.preventDefault();
  if(e.target.classList.contains("deleteBtn")){
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});