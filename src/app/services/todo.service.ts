import { Injectable, Component } from '@angular/core';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public activeTodo: TodoItem;
  private todoList: TodoItem[];
  constructor() {
    this.todoList = [];
  }

  public getTodos(): TodoItem[] {
    return this.todoList;
  }

  public getTodo(id: number): TodoItem {
    return this.todoList.find(t => t.id === id);
  }

  public add(todo: TodoItem) {
    console.log('Added item to todoList');

    // fix recursive parenthood, or items will disappear from list
    if (todo.parentId) {
      let parentObject = this.todoList.find(item => item.id === todo.parentId);
      if (parentObject.parentId = todo.id) {
        parentObject.parentId = undefined;
      }
    }

    if (!todo.id) {
      todo.id = (this.todoList[this.todoList.length - 1] || { id: 0 }).id + 1;
      this.todoList.push(todo);
    } else {
      let listMatch = this.todoList.find((t) => t.id === todo.id);
      if (listMatch) {
        listMatch = todo;
      } else {
        this.todoList.push(todo);
      }
    }
    this.todoList.sort((a, b) => a.id - b.id);
  }

  public getTodoChildren(id: number): Array<TodoItem> {
    return this.todoList.filter(todo => todo.parentId === id);
  }

  public getTodoOrphans(): Array<TodoItem> {
    console.log(this.todoList);

    // console.log('INDEX', this.todoList.findIndex(todo2 => todo2.id === 1));
    // return this.todoList.filter(todo => (this.todoList.findIndex(todo2 => todo2.id === todo.parentId) === -1));
    return this.todoList.filter(todo => this.isOrphan(todo));
  }

  public isParent(id: number): boolean {
    return this.getTodoChildren(id).length > 0;
  }

  public isOrphanById(id: number): boolean {
    let todo = this.todoList.find(t => t.id === id);
    return this.isOrphan(todo);
  }
  public isOrphan(todo: TodoItem): boolean {
    if (todo.parentId) {
      return todo.parentId == null || (this.todoList.findIndex(todo2 => todo2.id === todo.parentId) === -1);
    }
    return true;
  }

  public getHierarchyValidation(id: number): Array<string> {
    let validationResults = new Array<string>();

    let validationItem = this.todoList.find(t => t.id === id);
    if (!validationItem || this.isOrphan(validationItem)) {
      return validationResults;
    }

    let validationItemParent = this.getTodo(validationItem.parentId);
    while (validationItemParent) {
      if (validationItem.dateToComplete && validationItemParent.dateToComplete) {
        let itemDateToComplete = new Date(validationItem.dateToComplete);
        let parentDateToComplete = new Date(validationItemParent.dateToComplete);
        if (itemDateToComplete > parentDateToComplete) {
          validationResults.push("Completion date is scheduled after a parent item");
        }
      }
      validationItemParent = validationItemParent.parentId ? this.getTodo(validationItemParent.parentId) : undefined;
    }
    return validationResults;
  }
}
