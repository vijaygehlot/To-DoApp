import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../../models/todoItem';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  @Input() todo: TodoItem;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

}
