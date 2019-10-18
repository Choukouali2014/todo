import { createAction, props } from '@ngrx/store';
import Todo from './todo.model';



export const beginGetTodoAction = createAction(
    '[ToDo] Begin Get Todo'
);
export const beginCreateTodoAction = createAction(
    '[ToDo]  Begin Create ToDo',
    props<{ payload: Todo }>()
);
export const beginUpdateTodoAction = createAction(
    '[ToDo]  Begin Update ToDo',
    props<{ payload: Todo }>()
);

export const beginDeleteTodoAction = createAction(
    '[ToDo]  Begin Delete ToDo',
    props<{ payload: Todo }>()
);
export const successGetTodoAction = createAction(
    '[ToDo] Success Get Todo',
    props<{ payload: Todo[] }>()
);


export const successCreateToDoAction = createAction(
    '[ToDo] - Success Create ToDo',
    props<{ payload: Todo }>()
);
export const deleteSuccessToDoAction = createAction(
    '[ToDo] - Delete  Success ToDo',
    props<{ payload: Todo }>()
);
export const updateSuccessToDoAction = createAction(
    '[ToDo] - Update  Success ToDo',
    props<{ payload: Todo }>()
);
export const ErrorTodoAction = createAction(
    '[ToDo] Error',
    props<Error>()
);




export const deleteTodo = createAction(
    '[ToDo] Delete ToDo',
    props<{ id: number }>()
);
export const getTodoAction = createAction(
    '[Todo] Get ToDo'
);

export const createTodoAction = createAction(
    '[ToDo] Create Todo',
    props<Todo>()
);
export const updateTodo = createAction(
    '[ToDo] Update Todo',
    props<Todo>()
);