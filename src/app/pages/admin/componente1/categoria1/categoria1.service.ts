import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categoria1 } from './categoria1';

@Injectable({
  providedIn: 'root',
})
export class Categoria1Service {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.categoria1}`;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria1[]> {
    return this.http
      .get<{ data: Categoria1[] }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getCategoria(id: number): Observable<Categoria1> {
    return this.http
      .get<{ data: Categoria1 }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createCategoria(categoria: FormData): Observable<Categoria1> {
    return this.http
      .post<{ data: Categoria1 }>(this.apiUrl, categoria)
      .pipe(map((response) => response.data));
  }

  updateCategoria(id: number, categoria: Categoria1): Observable<Categoria1> {
    return this.http
      .put<{ data: Categoria1 }>(`${this.apiUrl}/${id}`, categoria)
      .pipe(map((response) => response.data));
  }

  updateCategoriaWithPost(
    id: number,
    categoria: FormData
  ): Observable<Categoria1> {
    return this.http
      .post<{ data: Categoria1 }>(
        `${this.apiUrl}/${id}/updatewithpost`,
        categoria
      )
      .pipe(map((response) => response.data));
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
