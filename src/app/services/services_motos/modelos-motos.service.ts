import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
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
  motos: any[]; // Podríamos crear una interfaz Moto si necesitamos los detalles
}

interface ModeloResponse {
  status: boolean;
  message: string;
  data: Modelo;
}

@Injectable({
  providedIn: 'root',
})
export class ModelosMotosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/modelos`;

  /**
   * Obtiene todos los modelos de motos
   */
  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.baseUrl);
  }

  /**
   * Obtiene un modelo específico por ID
   */
  getModeloById(id: number): Observable<ModeloResponse> {
    return this.http.get<ModeloResponse>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo modelo
   */
  createModelo(modelo: Partial<Modelo>): Observable<ModeloResponse> {
    return this.http.post<ModeloResponse>(this.baseUrl, modelo);
  }

  /**
   * Actualiza un modelo existente
   */
  updateModelo(
    id: number,
    modelo: Partial<Modelo>
  ): Observable<ModeloResponse> {
    return this.http.put<ModeloResponse>(`${this.baseUrl}/${id}`, modelo);
  }

  /**
   * Elimina un modelo
   */
  deleteModelo(id: number): Observable<ModeloResponse> {
    return this.http.delete<ModeloResponse>(`${this.baseUrl}/${id}`);
  }
}
