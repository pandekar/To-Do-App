import TodoList from './TodoList.js';
import TodoItem from './TodoItem.js';
import { renderTodos } from './ui.js';

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
  todoList.addTodo(new TodoItem(detail.textValue));
  todoInputElement.value = emptyString;

  renderTodos(todoList.getTodos());
});
