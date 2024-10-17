export const REMOVE_TODO = 'REMOVE_TODO';

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
    document.dispatchEvent(new Event(REMOVE_TODO));
  };

  // TODO: Implement toggleTodo method
  toggleTodo = () => {

  };

  getTodos = () => this.todos;
};
