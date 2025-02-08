import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
interface TipoAccesorio {
  id_tipo_accesorio: number;
  nombre: string;
  descripcion: string;
  accesorios?: any[]; // Array de accesorios relacionados
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TipoAccesoriosService {
  private readonly apiUrl = `${environment.apiBaseUrl}/tipos-accesorios`;
  private readonly http = inject(HttpClient);

  /**
   * Obtiene todos los tipos de accesorios
   */
  getTiposAccesorios(): Observable<TipoAccesorio[]> {
    return this.http.get<TipoAccesorio[]>(this.apiUrl);
  }

  /**
   * Obtiene un tipo de accesorio por su ID
   */
  getTipoAccesorio(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo tipo de accesorio
   */
  createTipoAccesorio(
    data: Omit<TipoAccesorio, 'id_tipo_accesorio'>
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, data);
  }

  /**
   * Actualiza un tipo de accesorio existente
   */
  updateTipoAccesorio(
    id: number,
    data: Partial<TipoAccesorio>
  ): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Elimina un tipo de accesorio
   */
  deleteTipoAccesorio(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
