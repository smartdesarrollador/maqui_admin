import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
interface MediaCategoria {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  is_active: boolean;
  sort_order: number;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  parent?: MediaCategoria;
  children?: MediaCategoria[];
  mediaFiles?: MediaFile[];
}

interface MediaFile {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  title: string;
  // ... otros campos de MediaFile
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

@Injectable({
  providedIn: 'root',
})
export class MedioCategoriaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/media-categorias`;

  /**
   * Obtiene todas las categorías de medios
   */
  listarCategorias(): Observable<ApiResponse<MediaCategoria[]>> {
    return this.http.get<ApiResponse<MediaCategoria[]>>(this.apiUrl);
  }

  /**
   * Obtiene una categoría específica por ID
   */
  obtenerCategoria(id: number): Observable<ApiResponse<MediaCategoria>> {
    return this.http.get<ApiResponse<MediaCategoria>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva categoría de medios
   */
  crearCategoria(categoria: {
    name: string;
    description?: string;
    is_active?: boolean;
    sort_order?: number;
    parent_id?: number;
  }): Observable<ApiResponse<MediaCategoria>> {
    return this.http.post<ApiResponse<MediaCategoria>>(this.apiUrl, categoria);
  }

  /**
   * Actualiza una categoría existente
   */
  actualizarCategoria(
    id: number,
    categoria: {
      name: string;
      description?: string;
      is_active?: boolean;
      sort_order?: number;
      parent_id?: number;
    }
  ): Observable<ApiResponse<MediaCategoria>> {
    return this.http.put<ApiResponse<MediaCategoria>>(
      `${this.apiUrl}/${id}`,
      categoria
    );
  }

  /**
   * Elimina una categoría
   */
  eliminarCategoria(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene las categorías raíz (sin padre)
   */
  obtenerCategoriasRaiz(): Observable<ApiResponse<MediaCategoria[]>> {
    const params = new HttpParams().set('parent_id', 'null');
    return this.http.get<ApiResponse<MediaCategoria[]>>(this.apiUrl, {
      params,
    });
  }

  /**
   * Obtiene las subcategorías de una categoría específica
   */
  obtenerSubcategorias(
    parentId: number
  ): Observable<ApiResponse<MediaCategoria[]>> {
    const params = new HttpParams().set('parent_id', parentId.toString());
    return this.http.get<ApiResponse<MediaCategoria[]>>(this.apiUrl, {
      params,
    });
  }

  /**
   * Verifica si una categoría tiene subcategorías o archivos
   */
  verificarDependencias(id: number): Observable<
    ApiResponse<{
      hasChildren: boolean;
      hasFiles: boolean;
    }>
  > {
    return this.http.get<
      ApiResponse<{
        hasChildren: boolean;
        hasFiles: boolean;
      }>
    >(`${this.apiUrl}/${id}/check-dependencies`);
  }

  /**
   * Reordena las categorías
   */
  reordenarCategorias(
    categorias: { id: number; sort_order: number }[]
  ): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/reorder`, {
      categorias,
    });
  }
}
