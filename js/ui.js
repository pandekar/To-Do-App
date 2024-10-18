export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export let draggedElement = null;
export let draggedObject = null;

const _createListItemTextElement = (todo) => {
  const listItemTextElement = document.createElement('p');
  listItemTextElement.innerText = todo.text;
  listItemTextElement.setAttribute('class', 'todo-title-section')

  if (todo.completed) {
    listItemTextElement.setAttribute('class', 'completed');
  }

  return listItemTextElement;
};

const _createDeadlineSectionElement = (todo) => {
  const dateTime = new Date(todo.deadline);
  const dateStringDisplay = dateTime.toDateString();
  const timeStringDisplay = dateTime.toLocaleTimeString();
  const deadlineTodoElement = document.createElement('div');
  const deadlineTodoTextElement = document.createElement('p');

  deadlineTodoTextElement.innerText = dateStringDisplay + ' | ' + timeStringDisplay;
  deadlineTodoElement.appendChild(deadlineTodoTextElement);
  deadlineTodoElement.setAttribute('class', 'deadline-section');

  return deadlineTodoElement;
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

const _createHeader = () => {
  const firstRow = document.createElement('li');
  firstRow.setAttribute('class', 'todo-item');

  const firstRowTitleElement = document.createElement('p');
  firstRowTitleElement.setAttribute('class', 'todo-title-section');
  firstRowTitleElement.innerText = 'Title';

  const firstRowDeadlineTextElement = document.createElement('p');
  firstRowDeadlineTextElement.setAttribute('class', 'deadline-section');
  firstRowDeadlineTextElement.innerText = 'Deadline';

  const firstRowButtonSectionTextElement = document.createElement('p');
  firstRowButtonSectionTextElement.setAttribute('class', 'button-section');
  firstRowButtonSectionTextElement.innerText = 'ACTION';

  firstRow.appendChild(firstRowTitleElement);
  firstRow.appendChild(firstRowDeadlineTextElement);
  firstRow.appendChild(firstRowButtonSectionTextElement);

  return firstRow;
};

const onDrag = (todo) => (e) => {
  draggedElement = e.target;
  draggedObject = todo;
};

const _createTodoElement = (todos, todo) => {
  const listItemElement = document.createElement('li');
  const listItemTextElement = _createListItemTextElement(todo);
  const deadlineSectionElement = _createDeadlineSectionElement(todo);
  const buttonSectionElement = _createButtonSectionElement(todos, todo);

  listItemElement.setAttribute('id', todo.id);
  listItemElement.setAttribute('class', 'todo-item');
  listItemElement.appendChild(listItemTextElement);
  listItemElement.appendChild(deadlineSectionElement);
  listItemElement.appendChild(buttonSectionElement);
  listItemElement.addEventListener('dragstart', onDrag(todo));

  return listItemElement;
}

export function renderTodos(todos) {
  // TODO: Implement renderTodos function
  const todoItems = todos.getTodos();

  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  const completeListElement = document.getElementById('complete-list');
  completeListElement.innerHTML = '';

  const todoListHeader = _createHeader();
  const completeListHeader = _createHeader();
  todoListElement.appendChild(todoListHeader);
  completeListElement.appendChild(completeListHeader);

  for (const index in todoItems) {
    const todo = todoItems[index];

    if (!todo.completed) {
      const todoListItemElement = _createTodoElement(todos, todo);
      todoListItemElement.draggable = true;

      todoListElement.appendChild(todoListItemElement);
    } else {
      const completeListItemElement = _createTodoElement(todos, todo);
      completeListItemElement.draggable = true;

      completeListElement.appendChild(completeListItemElement);
    }
  }
};
