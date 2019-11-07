import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Todo from './store/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://server-json-app.herokuapp.com/Todo';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getTodo(){
    return this.http.get<Todo[]>(this.apiUrl);
  }
 
  deleteTodo(todo: Todo) {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  updateTodo(todo: Todo) {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put(url, todo, this.httpOptions);
  }

  createTodo(todo: Todo) {
      return this.http.post(this.apiUrl, todo, this.httpOptions);
  }
}
