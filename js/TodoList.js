export const REMOVE_TODO = 'REMOVE_TODO';
export const STORAGE_KEY = 'TODO-LIST';

export const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    alert('your browser does not support local storage');
    return false;
  }

  return true;
};

export const saveTodoListToLocalStorage = (key, todos) => localStorage.setItem(key, JSON.stringify({ todos }));

export default class TodoList {
  constructor() {
    this.todos = [];
  }

  // TODO: Implement addTodo method
  addTodo = (value) => {
    this.todos.push(value);
  };

  // TODO: Implement removeTodo method
  removeTodo = (id) => {
    const newTodos = this.todos.filter((todo) => todo.id !== id);

    this.todos = newTodos;

    // LOCAL STORAGE ACTION
    if (isStorageExist()) {
      saveTodoListToLocalStorage(STORAGE_KEY, this.todos);
    }

    document.dispatchEvent(new Event(REMOVE_TODO));
  };

  // TODO: Implement toggleTodo method
  toggleTodo = () => {

  };

  getTodos = () => this.todos;
};
