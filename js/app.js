import TodoList, { REMOVE_TODO, STORAGE_KEY, isStorageExist } from './TodoList.js';
import TodoItem from './TodoItem.js';
import { renderTodos, COMPLETE_ITEM } from './ui.js';

const SUBMIT_WITH_VALUE = 'SUBMIT_WITH_VALUE'
const emptyString = '';

const todoList = new TodoList();

// TODO: Select DOM elements
const todoInputElement = document.getElementById('todo-input');

// TODO: Add event listener for form submission
const form = document.getElementById('todo-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  document.dispatchEvent(new CustomEvent(SUBMIT_WITH_VALUE, {
    detail: { textValue: todoInputElement.value }
  }));
});

// TODO: Implement addTodo function
document.addEventListener(SUBMIT_WITH_VALUE, ({ detail }) => {
  const todoItem = new TodoItem(detail.textValue);
  todoList.addTodo(todoItem);
  todoInputElement.value = emptyString;

  // LOCAL STORAGE ACTION
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos: todoList.getTodos() }));
  }

  renderTodos(todoList);
});

document.addEventListener(COMPLETE_ITEM, () => {
  renderTodos(todoList);

  // LOCAL STORAGE ACTION
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos: todoList.getTodos() }));
  }
});

document.addEventListener(REMOVE_TODO, () => {
  renderTodos(todoList);
});

document.addEventListener('DOMContentLoaded', () => {
  if (isStorageExist()) {
    const { todos } = JSON.parse(localStorage.getItem(STORAGE_KEY))

    for (const i in todos) {
      const todo = todos[i];
      const todoItem = new TodoItem(todo.text, todo.completed);
      todoList.addTodo(todoItem)
    }

    renderTodos(todoList);
  } else {
    alert('Your browser does not have local storage');
  }
});
