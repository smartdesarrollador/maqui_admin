import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces para el manejo de datos tipados
interface TipoRepuesto {
  id_tipo_repuesto: number;
  nombre: string;
  descripcion: string;
  repuestos?: any[]; // Array opcional de repuestos asociados
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

@Injectable({
  providedIn: 'root',
})
export class TipoRepuestoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/tipos-repuestos`;

  /**
   * Obtiene todos los tipos de repuestos
   */
  getAll(): Observable<ApiResponse<TipoRepuesto[]>> {
    return this.http.get<ApiResponse<TipoRepuesto[]>>(this.baseUrl);
  }

  /**
   * Obtiene un tipo de repuesto específico por ID
   */
  getById(id: number): Observable<ApiResponse<TipoRepuesto>> {
    return this.http.get<ApiResponse<TipoRepuesto>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo tipo de repuesto
   */
  create(
    tipoRepuesto: Omit<TipoRepuesto, 'id_tipo_repuesto'>
  ): Observable<ApiResponse<TipoRepuesto>> {
    return this.http.post<ApiResponse<TipoRepuesto>>(
      this.baseUrl,
      tipoRepuesto
    );
  }

  /**
   * Actualiza un tipo de repuesto existente
   */
  update(
    id: number,
    tipoRepuesto: Partial<TipoRepuesto>
  ): Observable<ApiResponse<TipoRepuesto>> {
    return this.http.put<ApiResponse<TipoRepuesto>>(
      `${this.baseUrl}/${id}`,
      tipoRepuesto
    );
  }

  /**
   * Elimina un tipo de repuesto
   */
  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
