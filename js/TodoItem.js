export default class TodoItem {
  constructor(text) {
    this.id = Date.now().toString() + Math.random().toString(16);
    this.text = text;
    this.completed = false;
  }

  // TODO: Implement toggleCompleted method
  toggleCompleted = () => {

  };
};
