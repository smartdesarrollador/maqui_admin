import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.usersUrl).pipe(
      map((response) => response.data) // Accediendo a la propiedad `data`
    );
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<{ data: User }>(`${this.usersUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<{ data: User }>(this.usersUrl, user)
      .pipe(map((response) => response.data));
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http
      .put<{ data: User }>(`${this.usersUrl}/${id}`, user)
      .pipe(map((response) => response.data));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }
}
