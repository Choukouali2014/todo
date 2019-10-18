import { createReducer, Action, on } from "@ngrx/store";
import * as TodoActions from './todo.action';
import TodoState, { initializeState } from './todo.state';
import Todo from './todo.model';

export const initialSate = initializeState();

const reducer =  createReducer(
    initialSate,
   on(TodoActions.getTodoAction, state => state),
    on(TodoActions.createTodoAction,(state: TodoState, todo: Todo) => {
        return { ...state, Todos: [...state.Todos, todo], todoError: null};
    }),
    on(TodoActions.updateTodo, (state: TodoState, todo: Todo) => {
        return { ...state, Todos: [...state.Todos, todo], todoError: null};
    }),
    on(TodoActions.successGetTodoAction, (state: TodoState, { payload }) => {
        return { ...state, Todos:  payload };
    }),

    on(TodoActions.successCreateToDoAction, (state: TodoState, {payload}) => {
        return {...state, Todos: [...state.Todos, payload ], todoError: null };
    }),
    on( TodoActions.deleteSuccessToDoAction, (state: TodoState, {payload}) => {
        return {...state, Todos: [...state.Todos.filter(o => o.id !== payload.id) ], todoError: null };
    }),
    on( TodoActions.updateSuccessToDoAction, (state: TodoState, {payload}) => {
        return {...state, Todos: [...state.Todos.filter(t => t.id !== payload.id), payload ], todoError: null };
    }),
    on(TodoActions.ErrorTodoAction, (state: TodoState, error: Error) => {
        console.log(error);
        return {...state, todoError: error};
    })
);

export function TodoReducer(state: TodoState | undefined, action: Action) {
    return reducer(state, action);
}