"use strict";

const  todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


let todoData = JSON.parse(localStorage.getItem('Планы'));

const render = function () {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	if (todoData !== null) {
		todoData.forEach(function (item, i) {
			const li = document.createElement('li');
			li.classList.add('todo-item');

			li.innerHTML ='<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>' ;

			if (item.completed) {
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const btnTodoComplete = li.querySelector('.todo-complete');
			btnTodoComplete.addEventListener('click', function () {
				item.completed = !item.completed;
				render();
			});

			const btnTodoRemove = li.querySelector('.todo-remove');
			btnTodoRemove.addEventListener('click', function () {
				todoData.splice(i, 1);
				render();
			});
		});

	} else {

		todoData = [];

	}


	let todoDataMain = JSON.stringify(todoData);
	localStorage.setItem('Планы', todoDataMain);
  
};


todoControl.addEventListener('submit', function(event){
  event.preventDefault();


  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  
  if (headerInput.value === '') {
		alert ('Введите план действий!');
	} else {
		todoData.push(newTodo);
		render();
	}
	headerInput.value = '';
  
});

render();


