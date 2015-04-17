import { ToDoService } from '../services/ToDoService';

class HomeController {
  constructor(ToDoService, $timeout) {
    this.items = ToDoService.list;

    this.title = "Todo app";

    this.addItem = (value) => {
      if (!value) return;
      ToDoService.add(value);
    }

    this.remove = (idx) => {
      ToDoService.removeItem(idx);
      this.items = ToDoService.list
    }

  }

}


export { HomeController }
