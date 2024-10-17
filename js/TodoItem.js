export default class TodoItem {
  constructor(text, completed=false) {
    this.id = Date.now().toString() + Math.random().toString(16);
    this.text = text;
    this.completed = completed;
  }

  // TODO: Implement toggleCompleted method
  toggleCompleted = () => {
    this.completed = !this.completed;
  };
};
