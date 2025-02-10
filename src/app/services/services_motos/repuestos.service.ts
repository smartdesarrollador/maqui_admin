import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Repuesto {
  id_repuesto: number;
  nombre: string;
  tipo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string;
  tipo_repuesto_id: number;
  created_at?: string;
  updated_at?: string;
  tipoRepuesto?: {
    id_tipo_repuesto: number;
    nombre: string;
    descripcion: string;
  };
  motos?: any[];
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

interface PaginationData<T> {
  current_page: number;
  data: T;
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

interface PaginatedResponse<T> extends Omit<ApiResponse<any>, 'data'> {
  data: PaginationData<T>;
}

@Injectable({
  providedIn: 'root',
})
export class RepuestosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/repuestos`;

  /**
   * Obtiene el listado de repuestos con paginación y búsqueda opcional
   */
  getRepuestos(
    page: number = 1,
    perPage: number = 10,
    search?: string
  ): Observable<PaginatedResponse<Repuesto[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Repuesto[]>>(this.baseUrl, {
      params,
    });
  }

  /**
   * Obtiene un repuesto específico por su ID
   */
  getRepuesto(id: number): Observable<ApiResponse<Repuesto>> {
    return this.http.get<ApiResponse<Repuesto>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo repuesto
   */
  createRepuesto(formData: FormData): Observable<ApiResponse<Repuesto>> {
    return this.http.post<ApiResponse<Repuesto>>(this.baseUrl, formData);
  }

  /**
   * Actualiza un repuesto existente
   */
  updateRepuesto(
    id: number,
    formData: FormData
  ): Observable<ApiResponse<Repuesto>> {
    return this.http.post<ApiResponse<Repuesto>>(
      `${this.baseUrl}/${id}`,
      formData
    );
  }

  /**
   * Elimina un repuesto
   */
  deleteRepuesto(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Prepara el FormData para crear o actualizar un repuesto
   */
  prepareFormData(repuesto: Partial<Repuesto>, imagen?: File): FormData {
    const formData = new FormData();

    (Object.keys(repuesto) as Array<keyof Partial<Repuesto>>).forEach((key) => {
      if (repuesto[key] !== undefined && repuesto[key] !== null) {
        formData.append(key, repuesto[key]!.toString());
      }
    });

    if (imagen) {
      formData.append('imagen', imagen);
    }

    return formData;
  }
}
