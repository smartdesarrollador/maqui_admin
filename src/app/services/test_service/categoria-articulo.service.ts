import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoriaArticuloResponse,
  SingleCategoriaResponse,
  CategoriaArticuloForm,
  CategoriaCreateUpdateResponse,
  DeleteResponse,
} from '../../interface/interface_test/categoria-articulo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaArticuloService {
  private apiUrl = `${environment.apiBaseUrl}/categoria_articulos`;

  constructor(private http: HttpClient) {}

  // Obtener listado de categorías con sus artículos
  getCategorias(): Observable<CategoriaArticuloResponse> {
    return this.http.get<CategoriaArticuloResponse>(this.apiUrl);
  }

  // Obtener una categoría específica con sus artículos
  getCategoria(id: number): Observable<SingleCategoriaResponse> {
    return this.http.get<SingleCategoriaResponse>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva categoría
  createCategoria(
    categoria: CategoriaArticuloForm
  ): Observable<CategoriaCreateUpdateResponse> {
    return this.http.post<CategoriaCreateUpdateResponse>(
      this.apiUrl,
      categoria
    );
  }

  // Actualizar categoría existente
  updateCategoria(
    id: number,
    categoria: CategoriaArticuloForm
  ): Observable<CategoriaCreateUpdateResponse> {
    return this.http.put<CategoriaCreateUpdateResponse>(
      `${this.apiUrl}/${id}`,
      categoria
    );
  }

  // Eliminar categoría
  deleteCategoria(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${id}`);
  }
}
