import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-adder',
  templateUrl: './todo-adder.component.html',
  styleUrls: ['./todo-adder.component.css']
})
export class TodoAdderComponent implements OnInit {

  public todo: TodoItem;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.activeTodo = new TodoItem();
  }

  public addTodo(todo: TodoItem): void {
    if (!!this.todoService.activeTodo.title.trim()) {
      this.todoService.add(todo);
      this.todoService.activeTodo = new TodoItem();
    }
  }

}
