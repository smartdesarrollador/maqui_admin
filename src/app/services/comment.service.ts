import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsUrl = environment.commentsUrl;

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<{ data: Comment[] }>(this.commentsUrl).pipe(
      map((response) => response.data) // Accediendo a la propiedad `data`
    );
  }

  getComment(id: number): Observable<Comment> {
    return this.http
      .get<{ data: Comment }>(`${this.commentsUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createComment(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.http
      .put<{ data: Comment }>(`${this.commentsUrl}/${id}`, comment)
      .pipe(map((response) => response.data));
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.commentsUrl}/${id}`);
  }
}
