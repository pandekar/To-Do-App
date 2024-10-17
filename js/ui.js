export const COMPLETE_ITEM = 'COMPLETE_ITEM';

const _createListItemTextElement = (todo) => {
  const listItemTextElement = document.createElement('p');
  listItemTextElement.innerText = todo.text;

  if (todo.completed) {
    listItemTextElement.setAttribute('class', 'completed');
  }

  return listItemTextElement;
};

const _createButtonSectionElement = (todos, todo) => {
  const buttonSectionElement = document.createElement('div');
  const buttonCompleteTodoElement = document.createElement('button');
  const buttonDeleteTodoElement = document.createElement('button');

  buttonCompleteTodoElement.addEventListener('click', () => {
    todo.toggleCompleted();
    
    document.dispatchEvent(new Event(COMPLETE_ITEM));
  });

  if (todo.completed) {
    buttonCompleteTodoElement.innerText = 'revert';
    buttonCompleteTodoElement.setAttribute('class', 'button-revert');
  } else {
    buttonCompleteTodoElement.innerText = 'complete';
    buttonCompleteTodoElement.setAttribute('class', 'button-complete');
  }

  buttonDeleteTodoElement.innerText = 'delete';
  buttonDeleteTodoElement.addEventListener('click', () => {
    todos.removeTodo(todo.id);
  });

  buttonSectionElement.setAttribute('class', 'button-section');
  buttonSectionElement.appendChild(buttonCompleteTodoElement);
  buttonSectionElement.appendChild(buttonDeleteTodoElement);

  return buttonSectionElement;
};

export function renderTodos(todos) {
  // TODO: Implement renderTodos function
  const todoItems = todos.getTodos();
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  for (const index in todoItems) {
    const todo = todoItems[index];

    const listItemElement = document.createElement('li');
    const listItemTextElement = _createListItemTextElement(todo);
    const buttonSectionElement = _createButtonSectionElement(todos, todo);

    listItemElement.setAttribute('id', todo.id);
    listItemElement.setAttribute('class', 'todo-item');
    listItemElement.appendChild(listItemTextElement);
    listItemElement.appendChild(buttonSectionElement);

    todoListElement.appendChild(listItemElement);
  }
};
