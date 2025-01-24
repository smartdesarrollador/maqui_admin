import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = environment.postsUrl;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>(this.postsUrl).pipe(
      map((response) => response.data) // Accediendo a la propiedad `data`
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http
      .get<{ data: Post }>(`${this.postsUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(this.postsUrl, formData);
  }

  updatePostWithPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/update`, formData); // La URL del nuevo endpoint que has creado en la API
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http
      .put<{ data: Post }>(`${this.postsUrl}/${id}`, post)
      .pipe(map((response) => response.data));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.postsUrl}/${id}`);
  }
}
