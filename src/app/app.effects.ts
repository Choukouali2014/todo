import { TodoService } from './todo.service';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import Todo from './store/todo.model';
import * as TodoActions from './store/todo.action';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private serviceTodo: TodoService) {}
  
  getTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.beginGetTodoAction),
      mergeMap(() =>
        this.serviceTodo.getTodo().pipe(
          map((data: Todo[]) => {
            return TodoActions.successGetTodoAction({payload: data});
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorTodoAction(error));
          })
        )
      )
    )
  );
  createTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.beginCreateTodoAction),
      mergeMap(action =>
        this.serviceTodo.createTodo(action.payload).pipe(
          map((data: Todo) => {
            return TodoActions.successCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorTodoAction(error));
          })
        )
      )
    )
  );

  updateTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.beginUpdateTodoAction),
      mergeMap(action =>
        this.serviceTodo.updateTodo(action.payload).pipe(
          map((data: Todo) => {
            return TodoActions.updateSuccessToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            console.log(error);
            return of(TodoActions.ErrorTodoAction(error));
          })
        )
      )
    )
  );
  deleteTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.beginDeleteTodoAction),
      mergeMap(action =>
        this.serviceTodo.deleteTodo(action.payload).pipe(
          map((data: Todo) => {
            return TodoActions.deleteSuccessToDoAction({ payload: action.payload });
          }),
          catchError((error: Error) => {
            console.log(error);
            return of(TodoActions.ErrorTodoAction(error));
          })
        )
      )
    )
  );
}
