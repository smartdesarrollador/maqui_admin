import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Interfaces
interface CotizacionFilters {
  estado?: string;
  precio_min?: number;
  precio_max?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  cliente?: string;
  moto?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Cotizacion {
  id: number;
  cliente_id: number;
  moto_id: number;
  precio_total: number;
  estado: string;
  created_at: string;
  updated_at: string;
  cliente?: any;
  moto?: any;
  accesorios?: any[];
  repuestos?: any[];
  financiamiento?: any;
}

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/cotizaciones`;

  /**
   * Obtiene el listado paginado de cotizaciones con filtros opcionales
   */
  getCotizaciones(
    filters: CotizacionFilters = {}
  ): Observable<PaginatedResponse<Cotizacion>> {
    let params = new HttpParams();

    // Agregar filtros a los parámetros si están presentes
    if (filters.estado) {
      params = params.set('estado', filters.estado);
    }
    if (filters.precio_min) {
      params = params.set('precio_min', filters.precio_min.toString());
    }
    if (filters.precio_max) {
      params = params.set('precio_max', filters.precio_max.toString());
    }
    if (filters.fecha_inicio) {
      params = params.set('fecha_inicio', filters.fecha_inicio);
    }
    if (filters.fecha_fin) {
      params = params.set('fecha_fin', filters.fecha_fin);
    }
    if (filters.cliente) {
      params = params.set('cliente', filters.cliente);
    }
    if (filters.moto) {
      params = params.set('moto', filters.moto);
    }

    // Parámetros de ordenamiento y paginación
    params = params.set('sort_by', filters.sort_by || 'created_at');
    params = params.set('sort_order', filters.sort_order || 'desc');
    params = params.set('per_page', filters.per_page?.toString() || '10');
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }

    return this.http.get<PaginatedResponse<Cotizacion>>(this.baseUrl, {
      params,
    });
  }

  /**
   * Obtiene una cotización específica por su ID
   */
  getCotizacion(id: number): Observable<{ data: Cotizacion }> {
    return this.http.get<{ data: Cotizacion }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea una nueva cotización
   */
  createCotizacion(
    cotizacion: Partial<Cotizacion>
  ): Observable<{ data: Cotizacion }> {
    return this.http.post<{ data: Cotizacion }>(this.baseUrl, cotizacion);
  }

  /**
   * Actualiza una cotización existente
   */
  updateCotizacion(
    id: number,
    cotizacion: Partial<Cotizacion>
  ): Observable<{ data: Cotizacion }> {
    return this.http.put<{ data: Cotizacion }>(
      `${this.baseUrl}/${id}`,
      cotizacion
    );
  }

  /**
   * Elimina una cotización
   */
  deleteCotizacion(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
