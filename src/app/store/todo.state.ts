import Todo from './todo.model';

export default class TodoState {
    Todos: Array<Todo>;
    todoError: Error;
}

export const initializeState = () => {
    return { Todos: Array<Todo>() };
}