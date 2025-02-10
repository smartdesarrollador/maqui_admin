import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Financiamiento {
  id_financiamiento: number;
  cotizacion_id: number;
  cliente_id: number;
  monto_financiado: number;
  plazo: number;
  interes: number;
  cuota_mensual: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  situacion_laboral: string;
  cuota_inicial: number;
  ingreso_mensual: number;
  created_at: string;
  updated_at: string;
  cotizacion?: {
    id_cotizacion: number;
    moto?: {
      id_moto: number;
      modelo_id: number;
      nombre: string;
      precio_base: number;
    };
  };
  cliente?: {
    id_cliente: number;
    nombre: string;
    apellido: string;
    email: string;
  };
}

export interface FinanciamientoResponse {
  status: string;
  data: Financiamiento[];
  meta: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
  };
}

export interface FinanciamientoFilters {
  estado?: string;
  monto_min?: number;
  monto_max?: number;
  cliente?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FinanciacionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/financiaciones`;

  /**
   * Obtiene el listado de financiamientos con filtros y paginación
   */
  getFinanciamientos(
    filters: FinanciamientoFilters = {}
  ): Observable<FinanciamientoResponse> {
    let params = new HttpParams();

    // Agregar filtros a los parámetros si están presentes
    if (filters.estado) {
      params = params.set('estado', filters.estado);
    }
    if (filters.monto_min) {
      params = params.set('monto_min', filters.monto_min.toString());
    }
    if (filters.monto_max) {
      params = params.set('monto_max', filters.monto_max.toString());
    }
    if (filters.cliente) {
      params = params.set('cliente', filters.cliente);
    }
    if (filters.fecha_inicio) {
      params = params.set('fecha_inicio', filters.fecha_inicio);
    }
    if (filters.fecha_fin) {
      params = params.set('fecha_fin', filters.fecha_fin);
    }

    // Parámetros de ordenamiento
    params = params.set('sort_by', filters.sort_by || 'created_at');
    params = params.set('sort_direction', filters.sort_direction || 'desc');

    // Parámetros de paginación
    params = params.set('page', (filters.page || 1).toString());
    params = params.set('per_page', (filters.per_page || 10).toString());

    return this.http.get<FinanciamientoResponse>(this.baseUrl, { params });
  }

  /**
   * Obtiene un financiamiento por su ID
   */
  getFinanciamiento(
    id: number
  ): Observable<{ status: string; data: Financiamiento }> {
    return this.http.get<{ status: string; data: Financiamiento }>(
      `${this.baseUrl}/${id}`
    );
  }

  /**
   * Crea un nuevo financiamiento
   */
  createFinanciamiento(financiamiento: Partial<Financiamiento>): Observable<{
    status: string;
    message: string;
    data: Financiamiento;
  }> {
    return this.http.post<{
      status: string;
      message: string;
      data: Financiamiento;
    }>(this.baseUrl, financiamiento);
  }

  /**
   * Actualiza un financiamiento existente
   */
  updateFinanciamiento(
    id: number,
    financiamiento: Partial<Financiamiento>
  ): Observable<{
    status: string;
    message: string;
    data: Financiamiento;
  }> {
    return this.http.post<{
      status: string;
      message: string;
      data: Financiamiento;
    }>(`${this.baseUrl}/${id}`, financiamiento);
  }

  /**
   * Elimina un financiamiento
   */
  deleteFinanciamiento(
    id: number
  ): Observable<{ status: string; message: string }> {
    return this.http.delete<{ status: string; message: string }>(
      `${this.baseUrl}/${id}`
    );
  }

  /**
   * Obtiene los financiamientos de un cliente específico
   */
  getFinanciamientosByCliente(clienteId: number): Observable<{
    status: string;
    data: Financiamiento[];
  }> {
    return this.http.get<{ status: string; data: Financiamiento[] }>(
      `${this.baseUrl}/cliente/${clienteId}`
    );
  }
}
