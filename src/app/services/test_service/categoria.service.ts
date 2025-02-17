import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../interface/interface_test/categoria';
import { SuccessResponse } from '../../interface/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = `${environment.apiBaseUrl}/categoria_articulos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de todas las categorías
   */
  getCategorias(): Observable<SuccessResponse<Categoria[]>> {
    return this.http.get<SuccessResponse<Categoria[]>>(this.apiUrl);
  }

  /**
   * Obtiene una categoría por su ID
   * @param id ID de la categoría
   */
  getCategoria(id: number): Observable<SuccessResponse<Categoria>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SuccessResponse<Categoria>>(url);
  }

  /**
   * Crea una nueva categoría
   * @param categoria Datos de la categoría a crear
   */
  createCategoria(
    categoria: Pick<Categoria, 'nombre' | 'descripcion'>
  ): Observable<SuccessResponse<Categoria>> {
    return this.http.post<SuccessResponse<Categoria>>(this.apiUrl, categoria);
  }

  /**
   * Actualiza una categoría existente
   * @param id ID de la categoría
   * @param categoria Datos actualizados de la categoría
   */
  updateCategoria(
    id: number,
    categoria: Pick<Categoria, 'nombre' | 'descripcion'>
  ): Observable<SuccessResponse<Categoria>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<SuccessResponse<Categoria>>(url, categoria);
  }

  /**
   * Elimina una categoría
   * @param id ID de la categoría a eliminar
   */
  deleteCategoria(id: number): Observable<SuccessResponse<void>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<SuccessResponse<void>>(url);
  }
}
