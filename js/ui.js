export function renderTodos(todos) {
  // TODO: Implement renderTodos function
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  for (const index in todos) {
    const todo = todos[index];
    const listItemElement = document.createElement('li');
    
    listItemElement.setAttribute('id', todo.id);
    listItemElement.innerText = todo.text;
    if (todo.completed) {
      listItemElement.setAttribute('class', 'completed');
    }

    todoListElement.appendChild(listItemElement)
  }
};
