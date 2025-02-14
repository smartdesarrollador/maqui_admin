import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Articulo,
  ArticuloResponse,
  ArticulosResponse,
  ArticuloMensaje,
} from '../../interface/interface_test/articulo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private apiUrl = `${environment.apiBaseUrl}/articulos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de todos los artículos
   */
  getArticulos(): Observable<ArticulosResponse> {
    return this.http.get<ArticulosResponse>(this.apiUrl);
  }

  /**
   * Obtiene un artículo específico por su ID
   */
  getArticulo(id: number): Observable<ArticuloResponse> {
    return this.http.get<ArticuloResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo artículo
   */
  createArticulo(articulo: Articulo): Observable<ArticuloResponse> {
    return this.http.post<ArticuloResponse>(this.apiUrl, articulo);
  }

  /**
   * Actualiza un artículo existente
   */
  updateArticulo(id: number, articulo: Articulo): Observable<ArticuloResponse> {
    return this.http.put<ArticuloResponse>(`${this.apiUrl}/${id}`, articulo);
  }

  /**
   * Elimina un artículo
   */
  deleteArticulo(id: number): Observable<ArticuloMensaje> {
    return this.http.delete<ArticuloMensaje>(`${this.apiUrl}/${id}`);
  }
}
