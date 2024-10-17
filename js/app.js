import TodoList, { REMOVE_TODO } from './TodoList.js';
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

  renderTodos(todoList);
});

document.addEventListener(COMPLETE_ITEM, () => {
  renderTodos(todoList);
});

document.addEventListener(REMOVE_TODO, () => {
  renderTodos(todoList);
});
