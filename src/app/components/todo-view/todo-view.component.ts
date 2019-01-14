import { Component, OnInit, Input } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoItem } from '../../models/todoItem';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {

  @Input() todo: TodoItem;
  public todoList: TodoItem[];
  public dateWarningThreshold: number;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodos();
    this.dateWarningThreshold = 3;
  }

  public setTodoActive(todo: TodoItem): void {
    this.todoService.activeTodo = todo;
    this.deleteTodo(todo);
  }

  public deleteTodo(todo: TodoItem): void {
    const index = this.todoList.indexOf(todo);
    this.todoList.splice(index, 1);
  }

  public deleteTodoTree(todo: TodoItem): void {
    let children = this.todoService.getTodoChildren(todo.id);
    children.forEach(element => {
      this.deleteTodo(element);
    });
  }

  public getDateCriticality(dateOfItem: string): string {
    let itemDate = new Date(dateOfItem);
    let dateNow = new Date();
    let threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + this.dateWarningThreshold);
    if (itemDate > threeDaysFromNow) {
      return 'success';
    } else if (itemDate > dateNow) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

}
