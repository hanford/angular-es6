import { ToDoService } from '../services/ToDoService';

class HomeController {
  constructor(ToDoService, $timeout) {
    this.items = ToDoService.list;

    this.title = "Todo app";

    this.addItem = (value) => {
      if (!value) return;
      ToDoService.add(value);
    }

    this.remove = (value) => {
      if (!value) return;
      ToDoService.removeItem(value);
      $timeout(() => {
        this.items = ToDoService.list
      }, 0);

    }
  }

}


export { HomeController }
