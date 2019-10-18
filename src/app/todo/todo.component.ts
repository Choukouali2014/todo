import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as TodoActions from './../store/todo.action';
import Todo from '../store/todo.model';
import TodoState from '../store/todo.state';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  todo$: Observable<TodoState>;
  ToDoSubscription: Subscription;
  ToDoList: Todo[];
  title = '';
  id = '';
  isCompleted = false;
  todoError: Error;
  constructor(private store: Store<TodoState>, private dragulaService: DragulaService) {
    this.todo$ = store.pipe(select('todo'));
    this.dragulaService.createGroup("VAMPIRES", {
    });
  }
  todoIncomplete: Todo[];
  todocomplete: Todo[];

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.Todos;
          this.todoError = x.todoError;
          this.todoIncomplete = this.ToDoList.filter(o => o.isCompleted === false);
          this.todocomplete = this.ToDoList.filter(o => o.isCompleted === true);
        })
      ).subscribe();
    this.store.dispatch(TodoActions.beginGetTodoAction());
    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      if (args.sourceModel !== args.targetModel) {
        let updateTodo: Todo ;
        if (args.item.isCompleted === false) {
           updateTodo = { id: args.item.id, title: args.item.title, isCompleted: true };
        } else {
           updateTodo = { id: args.item.id, title: args.item.title, isCompleted: false };
        }
        this.store.dispatch(TodoActions.beginUpdateTodoAction({ payload: updateTodo }));
      }
    });
  }

  createToDo() {
    const todo: Todo = { id: this.id, title: this.title, isCompleted: this.isCompleted };
    if (!!this.id) {
      this.store.dispatch(TodoActions.beginUpdateTodoAction({ payload: todo }));
    }
    if (!this.id) {
      this.store.dispatch(TodoActions.beginCreateTodoAction({ payload: todo }));
    }
    this.resetForm();
  }
  deleteTodo(todo) {
    if (!!todo.id) {
      this.store.dispatch(TodoActions.beginDeleteTodoAction({ payload: todo }));
    }
  }
  onDisplay(todo) {
    this.title = todo.title;
    this.id = todo.id;
    this.isCompleted = todo.isCompleted;
    console.log(this.id);
  }
  ngOnDestroy() {
    this.ToDoSubscription.unsubscribe();
  }
  resetForm() {
    this.title = '';
    this.id = '';
    this.isCompleted = false;
  }


}
