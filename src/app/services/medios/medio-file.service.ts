import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
interface MediaFile {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  extension: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  description: string | null;
  alt_text: string | null;
  title: string;
  is_public: boolean;
  sort_order: number;
  category_id: number | null;
  uploaded_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category?: MediaCategory;
  uploader?: User;
}

interface MediaCategory {
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
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  rol: string;
  created_at: string | null;
  updated_at: string | null;
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  data: {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MedioFileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/media`;

  /**
   * Lista archivos multimedia con filtros y paginación
   */
  listarArchivos(params: {
    page?: number;
    per_page?: number;
    search?: string;
    category_id?: number;
    file_type?: string;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
  }): Observable<ApiResponse<MediaFile>> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<ApiResponse<MediaFile>>(this.apiUrl, {
      params: httpParams,
    });
  }

  /**
   * Obtiene un archivo multimedia por ID
   */
  obtenerArchivo(id: number): Observable<ApiResponse<MediaFile>> {
    return this.http.get<ApiResponse<MediaFile>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo archivo multimedia
   */
  crearArchivo(formData: FormData): Observable<ApiResponse<MediaFile>> {
    return this.http.post<ApiResponse<MediaFile>>(this.apiUrl, formData);
  }

  /**
   * Actualiza un archivo multimedia existente
   */
  actualizarArchivo(
    id: number,
    formData: FormData
  ): Observable<ApiResponse<MediaFile>> {
    return this.http.put<ApiResponse<MediaFile>>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }

  /**
   * Elimina un archivo multimedia
   */
  eliminarArchivo(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Prepara el FormData para crear/actualizar un archivo
   */
  prepararFormData(data: {
    file?: File;
    title: string;
    description?: string;
    alt_text?: string;
    is_public?: boolean;
    sort_order?: number;
    category_id?: number | null;
  }): FormData {
    const formData = new FormData();

    if (data.file) {
      formData.append('file', data.file);
    }

    formData.append('title', data.title);

    if (data.description !== undefined) {
      formData.append('description', data.description);
    }

    if (data.alt_text !== undefined) {
      formData.append('alt_text', data.alt_text);
    }

    if (data.is_public !== undefined) {
      formData.append('is_public', data.is_public.toString());
    }

    if (data.sort_order !== undefined) {
      formData.append('sort_order', data.sort_order.toString());
    }

    if (data.category_id !== undefined) {
      formData.append(
        'category_id',
        data.category_id ? data.category_id.toString() : ''
      );
    }

    return formData;
  }

  /**
   * Obtiene la URL completa de un archivo
   */
  obtenerUrlArchivo(filePath: string): string {
    return `${environment.apiBaseUrl}/storage/${filePath}`;
  }

  /**
   * Verifica si un archivo es una imagen
   */
  esImagen(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  /**
   * Obtiene el tamaño formateado del archivo
   */
  formatearTamano(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}
