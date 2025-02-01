import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
  cargador_usb: boolean;
  luz_led: boolean;
  alarma: boolean;
  cajuela: boolean;
  tablero_led: boolean;
  mp3: boolean;
  bluetooth: boolean;
  created_at: string;
  updated_at: string;
}

interface TipoMoto {
  id_tipo_moto: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  motos?: Moto[];
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: TipoMoto;
  errors?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TiposMotosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/tipos-motos`;

  /**
   * Obtiene todos los tipos de motos
   */
  getTiposMotos(): Observable<TipoMoto[]> {
    return this.http
      .get<TipoMoto[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Obtiene un tipo de moto por su ID
   */
  getTipoMoto(id: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Crea un nuevo tipo de moto
   */
  createTipoMoto(tipoMoto: {
    nombre: string;
    descripcion: string;
  }): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(this.apiUrl, tipoMoto)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Actualiza un tipo de moto existente
   */
  updateTipoMoto(
    id: number,
    tipoMoto: { nombre: string; descripcion: string }
  ): Observable<ApiResponse> {
    return this.http
      .put<ApiResponse>(`${this.apiUrl}/${id}`, tipoMoto)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Elimina un tipo de moto
   */
  deleteTipoMoto(id: number): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en TiposMotosService:', error);

    let errorMessage = 'Ha ocurrido un error en la operación';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error?.errors) {
      errorMessage = Object.values(error.error.errors).join(', ');
    }

    return throwError(() => new Error(errorMessage));
  }
}
