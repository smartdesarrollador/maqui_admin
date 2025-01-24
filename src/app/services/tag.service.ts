import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagsUrl = environment.tagsUrl;

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<{ data: Tag[] }>(this.tagsUrl).pipe(
      map((response) => response.data) // Accediendo a la propiedad `data`
    );
  }

  getTag(id: number): Observable<Tag> {
    return this.http
      .get<{ data: Tag }>(`${this.tagsUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http
      .post<{ data: Tag }>(this.tagsUrl, tag)
      .pipe(map((response) => response.data));
  }

  updateTag(id: number, tag: Tag): Observable<Tag> {
    return this.http
      .put<{ data: Tag }>(`${this.tagsUrl}/${id}`, tag)
      .pipe(map((response) => response.data));
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tagsUrl}/${id}`);
  }
}
