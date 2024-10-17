export const COMPLETE_ITEM = 'COMPLETE_ITEM';

export function renderTodos(todos) {
  // TODO: Implement renderTodos function
  const todoItems = todos.getTodos();
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  for (const index in todoItems) {
    const todo = todoItems[index];
    const listItemElement = document.createElement('li');
    const buttonCompleteTodoElement = document.createElement('button');
    const buttonDeleteTodoElement = document.createElement('button');

    listItemElement.setAttribute('id', todo.id);
    listItemElement.setAttribute('class', 'todo-item');
    listItemElement.innerText = todo.text;
    if (todo.completed) {
      listItemElement.setAttribute('class', 'completed');
    }

    buttonCompleteTodoElement.innerText = 'complete';
    buttonCompleteTodoElement.addEventListener('click', () => {
      todo.toggleCompleted();
      
      document.dispatchEvent(new Event(COMPLETE_ITEM));
    });

    buttonDeleteTodoElement.innerText = 'delete';
    // buttonDeleteTodoElement.setAttribute('class', 'todo-item');
    buttonDeleteTodoElement.addEventListener('click', () => {
      todos.removeTodo(todo.id);
    });

    listItemElement.appendChild(buttonCompleteTodoElement);
    listItemElement.appendChild(buttonDeleteTodoElement);
    todoListElement.appendChild(listItemElement);
  }
};
