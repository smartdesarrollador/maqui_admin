import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces
interface Marca {
  id_marca: number;
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
  created_at?: string;
  updated_at?: string;
  modelos?: any[];
}

interface CreateMarcaDTO {
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
}

interface UpdateMarcaDTO extends Partial<CreateMarcaDTO> {}

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private readonly apiUrl = `${environment.apiBaseUrl}/marcas`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de todas las marcas
   */
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  /**
   * Obtiene una marca específica por su ID
   */
  getMarcaById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva marca
   */
  createMarca(marca: CreateMarcaDTO): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  /**
   * Actualiza una marca existente
   */
  updateMarca(id: number, marca: UpdateMarcaDTO): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca);
  }

  /**
   * Elimina una marca
   */
  deleteMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
