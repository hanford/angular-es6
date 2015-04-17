class ToDoService {
  constructor() {
    this.list = ['Jack', 'Hanford'];
  }

  add (v) {
    this.list.push(v);
    console.log("added", this.list);
  }

  removeItem (idx) {
    console.log(idx);
    this.list = this.list.splice(idx, 1);
  }

}


export { ToDoService }
