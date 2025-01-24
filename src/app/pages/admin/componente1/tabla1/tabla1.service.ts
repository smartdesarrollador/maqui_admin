import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tabla1 } from './tabla1';

@Injectable({
  providedIn: 'root',
})
export class Tabla1Service {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.tabla1}`;

  constructor(private http: HttpClient) {}

  getTablas(): Observable<Tabla1[]> {
    return this.http
      .get<{ data: Tabla1[] }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getTabla(id: number): Observable<Tabla1> {
    return this.http
      .get<{ data: Tabla1 }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createTabla(tabla: FormData): Observable<Tabla1> {
    return this.http
      .post<{ data: Tabla1 }>(this.apiUrl, tabla)
      .pipe(map((response) => response.data));
  }

  updateTabla(id: number, tabla: Tabla1): Observable<Tabla1> {
    return this.http
      .put<{ data: Tabla1 }>(`${this.apiUrl}/${id}`, tabla)
      .pipe(map((response) => response.data));
  }

  updateTablaWithPost(id: number, tabla: FormData): Observable<Tabla1> {
    return this.http
      .post<{ data: Tabla1 }>(`${this.apiUrl}/${id}/updatewithpost`, tabla)
      .pipe(map((response) => response.data));
  }

  deleteTabla(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
