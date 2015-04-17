import { HomeController } from './controllers/Home';
import { ToDoService } from './services/ToDoService';

angular.module('app', ['ngAnimate', 'ngMaterial'])
  .controller('HomeController', HomeController)
  .service('ToDoService', ToDoService)
