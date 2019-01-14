import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList: TodoItem[];

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodos();
  }

  public refresh(): void {
    this.todoList = this.todoService.getTodos();
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

    this.deleteTodo(todo);
  }

}
