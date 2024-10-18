export default class TodoItem {
  constructor(text, deadline, completed=false) {
    this.id = Date.now().toString() + Math.random().toString(16);
    this.text = text;
    this.deadline = deadline;
    this.completed = completed;
  }

  // TODO: Implement toggleCompleted method
  toggleCompleted = () => {
    this.completed = !this.completed;
  };
};
