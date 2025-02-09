import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

// Interfaces
export interface Accesorio {
  id_accesorio: number;
  nombre: string;
  tipo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string;
  tipo_accesorio_id: number;
  created_at?: string;
  updated_at?: string;
  tipoAccesorio?: {
    id_tipo_accesorio: number;
    nombre: string;
  };
  motos?: any[];
}

export interface AccesorioResponse {
  status: boolean;
  message: string;
  data: Accesorio | Accesorio[];
  meta?: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
  };
}

export interface AccesorioFilters {
  nombre?: string;
  tipo?: string;
  precio_min?: number;
  precio_max?: number;
  tipo_accesorio_id?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccesoriosService {
  private readonly apiUrl = `${environment.apiBaseUrl}/accesorios`;
  private http = inject(HttpClient);

  /**
   * Obtiene el listado de accesorios con filtros opcionales
   */
  getAccesorios(filters?: AccesorioFilters): Observable<AccesorioResponse> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key as keyof AccesorioFilters];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    console.log('URL:', this.apiUrl);
    console.log('Params:', params.toString());

    return this.http.get<AccesorioResponse>(this.apiUrl, { params }).pipe(
      tap((response) => console.log('API Response:', response)),
      catchError((error) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un accesorio específico por ID
   */
  getAccesorio(id: number): Observable<AccesorioResponse> {
    return this.http.get<AccesorioResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo accesorio
   */
  createAccesorio(formData: FormData): Observable<AccesorioResponse> {
    return this.http.post<AccesorioResponse>(this.apiUrl, formData);
  }

  /**
   * Actualiza un accesorio existente
   */
  updateAccesorio(
    id: number,
    formData: FormData
  ): Observable<AccesorioResponse> {
    return this.http.post<AccesorioResponse>(`${this.apiUrl}/${id}`, formData);
  }

  /**
   * Elimina un accesorio
   */
  deleteAccesorio(id: number): Observable<AccesorioResponse> {
    return this.http.delete<AccesorioResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Construye un FormData para enviar al servidor
   */
  buildFormData(
    accesorio: Partial<Record<string, any>>,
    imagen?: File
  ): FormData {
    const formData = new FormData();

    Object.keys(accesorio).forEach((key) => {
      const value = accesorio[key];
      if (value !== undefined && value !== null && key !== 'imagen') {
        formData.append(key, value.toString());
      }
    });

    if (imagen) {
      formData.append('imagen', imagen);
    }

    return formData;
  }
}
