class ToDoService {
  constructor() {
    this.list = [];
  }

  add (v) {
    this.list.push(v);
    console.log(this.list);
  }

  removeItem (v) {
    var toRemove = this.list.indexOf(v);
    this.list = this.list.slice(toRemove, -1);
  }

}


export { ToDoService }
