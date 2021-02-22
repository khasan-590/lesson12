"use strict";

const  todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


const  todoData = [];

const upDateLocal = () => {
  localStorage.setItem('todoData' , JSON.stringify(todoData) );
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  

  todoData.forEach(function(item, i){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' + 
    '<button class="todo-remove"></button>' +
    '<button class="todo-complete"></button>' +
    '</div>' ;

    if (item.completed){
      todoCompleted.append(li);
       
    } else {
      todoList.append(li);
    }

    

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });
    
    

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function(item, i){
     localStorage.removeItem('todoData' , JSON.stringify(todoData));
      todoData.splice(i, 0);
      
      render();
    });
    
  });

};


todoControl.addEventListener('submit', function(event){
  event.preventDefault();


  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  
  // todoData.push(newTodo);
  if (headerInput.value !== '') {
    todoData.push(newTodo);
    
  } else {
    headerInput.value = '';
  }
  render();
  upDateLocal();
});

render();


