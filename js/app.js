import TodoList, {
  REMOVE_TODO,
  STORAGE_KEY,
  isStorageExist,
  saveTodoListToLocalStorage
} from './TodoList.js';
import TodoItem from './TodoItem.js';
import {
  renderTodos,
  draggedObject,
  COMPLETE_ITEM
} from './ui.js';

const SUBMIT_WITH_VALUE = 'SUBMIT_WITH_VALUE'
const emptyString = '';

const todoList = new TodoList();

let dragged = '';

// TODO: Select DOM elements
const todoInputElement = document.getElementById('todo-input');
const todoDateTimeElement = document.getElementById('todo-datetime');

// TODO: Add event listener for form submission
const form = document.getElementById('todo-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  document.dispatchEvent(new CustomEvent(SUBMIT_WITH_VALUE, {
    detail: {
      textValue: todoInputElement.value,
      deadline: todoDateTimeElement.value
    }
  }));
});

// TODO: Implement addTodo function
document.addEventListener(SUBMIT_WITH_VALUE, ({ detail: { textValue, deadline } }) => {
  const todoItem = new TodoItem(textValue, deadline);
  todoList.addTodo(todoItem);
  todoInputElement.value = emptyString;
  todoDateTimeElement.value = emptyString;

  // LOCAL STORAGE ACTION
  if (isStorageExist()) {
    saveTodoListToLocalStorage(STORAGE_KEY, todoList.getTodos());
  }

  renderTodos(todoList);
});

document.addEventListener(COMPLETE_ITEM, () => {
  renderTodos(todoList);

  // LOCAL STORAGE ACTION
  if (isStorageExist()) {
    saveTodoListToLocalStorage(STORAGE_KEY, todoList.getTodos());
  }
});

document.addEventListener(REMOVE_TODO, () => {
  renderTodos(todoList);
});

const _renderInitialData = () => {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedData !== null) {
    for (const i in parsedData.todos) {
      const { text, deadline, completed } = parsedData.todos[i];
      const todoItem = new TodoItem(text, deadline, completed);
      todoList.addTodo(todoItem)
    }
  
    renderTodos(todoList);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (isStorageExist()) {
    _renderInitialData();
  } else {
    alert('Your browser does not have local storage');
  }
});

const onDropHandler = () => (e) => {
  e.preventDefault();

  const dragged = draggedObject;
  dragged.toggleCompleted();

  todoList.removeTodo(dragged.id);
  todoList.addTodo(new TodoItem(dragged.text, dragged.deadline, dragged.completed))

  renderTodos(todoList);
  saveTodoListToLocalStorage(STORAGE_KEY, todoList.getTodos());
};

const completeListSectionElement = document.getElementById('complete-list-section');
completeListSectionElement.addEventListener('dragover', (e) => {
  e.preventDefault();
});
completeListSectionElement.addEventListener('drop', onDropHandler());

const todoListSectionElement = document.getElementById('todo-list-section');
todoListSectionElement.addEventListener('dragover', (e) => {
  e.preventDefault();
});
todoListSectionElement.addEventListener('drop', onDropHandler());
