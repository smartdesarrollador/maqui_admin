import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces para el tipado
interface ClientePaginacion {
  clientes: Cliente[];
  pagination: {
    total_items: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    previous_page: string | null;
    next_page: string | null;
    has_more_pages: boolean;
  };
  filters: {
    search: string | null;
    email: string | null;
    tipo_documento: string | null;
    order_by: string;
    order_direction: string;
  };
}

interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_usuario: string;
  tipo_documento: string;
  numero_documento: string;
  fecha_nacimiento: string;
  departamento: string;
  provincia: string;
  distrito: string;
  imagen?: string;
  resenas?: any[];
  cotizaciones?: any[];
  motosResenadas?: any[];
  motosCotizadas?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ClientesMotosService {
  private apiUrl = `${environment.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de clientes con paginación y filtros
   */
  getClientes(
    params: {
      page?: number;
      per_page?: number;
      search?: string;
      email?: string;
      tipo_documento?: string;
      order_by?: string;
      order_direction?: 'asc' | 'desc';
    } = {}
  ): Observable<ClientePaginacion> {
    let httpParams = new HttpParams();

    // Agregar parámetros si existen
    if (params.page)
      httpParams = httpParams.set('page', params.page.toString());
    if (params.per_page)
      httpParams = httpParams.set('per_page', params.per_page.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.email) httpParams = httpParams.set('email', params.email);
    if (params.tipo_documento)
      httpParams = httpParams.set('tipo_documento', params.tipo_documento);
    if (params.order_by)
      httpParams = httpParams.set('order_by', params.order_by);
    if (params.order_direction)
      httpParams = httpParams.set('order_direction', params.order_direction);

    return this.http.get<ClientePaginacion>(this.apiUrl, {
      params: httpParams,
    });
  }

  /**
   * Obtiene un cliente específico por su ID
   */
  getCliente(id: number): Observable<{ success: boolean; data: Cliente }> {
    return this.http.get<{ success: boolean; data: Cliente }>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Crea un nuevo cliente
   */
  createCliente(
    cliente: FormData
  ): Observable<{ success: boolean; message: string; data: Cliente }> {
    return this.http.post<{ success: boolean; message: string; data: Cliente }>(
      this.apiUrl,
      cliente
    );
  }

  /**
   * Actualiza un cliente existente
   */
  updateCliente(
    id: number,
    cliente: FormData
  ): Observable<{ success: boolean; message: string; data: Cliente }> {
    return this.http.put<{ success: boolean; message: string; data: Cliente }>(
      `${this.apiUrl}/${id}`,
      cliente
    );
  }

  /**
   * Elimina un cliente
   */
  deleteCliente(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}
