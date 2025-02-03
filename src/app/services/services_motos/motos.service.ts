import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
interface Moto {
  id_moto: number;
  modelo_id: number;
  tipo_moto_id: number;
  año: string;
  precio_base: string;
  color: string;
  stock: number;
  descripcion: string;
  imagen: string;
  cilindrada: string;
  motor: string;
  potencia: string;
  arranque: string;
  transmision: string;
  capacidad_tanque: string;
  peso_neto: number;
  carga_util: number;
  peso_bruto: number;
  largo: number;
  ancho: number;
  alto: number;
  neumatico_delantero: string;
  neumatico_posterior: string;
  freno_delantero: string;
  freno_posterior: string;
  cargador_usb: number;
  luz_led: number;
  alarma: number;
  cajuela: number;
  tablero_led: number;
  mp3: number;
  bluetooth: number;
  modelo: {
    id_modelo: number;
    marca_id: number;
    nombre: string;
    tipo: string;
    cilindrada: number;
    imagen: string;
    marca: {
      id_marca: number;
      nombre: string;
      origen: string;
      fundacion: string;
      logo: string;
    };
  };
  tipo_moto: {
    id_tipo_moto: number;
    nombre: string;
    descripcion: string;
  };
}

interface MotosResponse {
  current_page: number;
  data: Moto[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface MotosFilter {
  per_page?: number;
  page?: number;
  search?: string;
  precio_min?: number;
  precio_max?: number;
  order_by?: string;
  order_direction?: 'asc' | 'desc';
  año?: number;
  tipo_moto_id?: number;
}

interface Marca {
  id_marca: number;
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
}

interface Modelo {
  id_modelo: number;
  marca_id: number;
  nombre: string;
  tipo: string;
  cilindrada: number;
  imagen: string;
  marca: Marca;
}

interface TipoMoto {
  id_tipo_moto: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class MotosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}`;

  /**
   * Obtiene el listado de motos con filtros y paginación
   */
  getMotos(filters: MotosFilter = {}): Observable<MotosResponse> {
    let params = new HttpParams();

    // Agregar parámetros de filtro si existen
    if (filters.per_page) params = params.set('per_page', filters.per_page);
    if (filters.page) params = params.set('page', filters.page);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.precio_min)
      params = params.set('precio_min', filters.precio_min);
    if (filters.precio_max)
      params = params.set('precio_max', filters.precio_max);
    if (filters.order_by) params = params.set('order_by', filters.order_by);
    if (filters.order_direction)
      params = params.set('order_direction', filters.order_direction);
    if (filters.año) params = params.set('año', filters.año);
    if (filters.tipo_moto_id)
      params = params.set('tipo_moto_id', filters.tipo_moto_id);

    return this.http.get<MotosResponse>(this.baseUrl + '/motos', { params });
  }

  /**
   * Obtiene una moto específica por su ID
   */
  getMotoById(id: number): Observable<{ data: Moto }> {
    return this.http.get<{ data: Moto }>(this.baseUrl + '/motos/' + id);
  }

  /**
   * Crea una nueva moto
   */
  createMoto(
    data: FormData
  ): Observable<{ status: boolean; message: string; data: Moto }> {
    return this.http.post<{ status: boolean; message: string; data: Moto }>(
      `${this.baseUrl}/motos`,
      data
    );
  }

  /**
   * Actualiza una moto existente
   */
  updateMoto(
    id: number,
    moto: Partial<Moto>
  ): Observable<{ status: boolean; message: string; data: Moto }> {
    return this.http.put<{ status: boolean; message: string; data: Moto }>(
      this.baseUrl + '/motos/' + id,
      moto
    );
  }

  /**
   * Elimina una moto
   */
  deleteMoto(id: number): Observable<{ status: boolean; message: string }> {
    return this.http.delete<{ status: boolean; message: string }>(
      this.baseUrl + '/motos/' + id
    );
  }

  /**
   * Obtiene todos los modelos de motos
   */
  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.baseUrl + '/modelos');
  }

  /**
   * Obtiene todos los tipos de motos
   */
  getTipoMotos(): Observable<TipoMoto[]> {
    return this.http.get<TipoMoto[]>(this.baseUrl + '/tipos-motos');
  }
}
