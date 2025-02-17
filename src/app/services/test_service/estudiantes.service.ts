import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Estudiante,
  EstudiantesResponse,
  EstudianteResponse,
  EstudianteCrudResponse,
  EstudianteDeleteResponse,
  EstudianteInput,
} from '../../interface/interface_test/estudiantes';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private apiUrl = `${environment.apiBaseUrl}/estudiantes`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de todos los estudiantes con sus cursos
   */
  getEstudiantes(): Observable<EstudiantesResponse> {
    return this.http.get<EstudiantesResponse>(this.apiUrl);
  }

  /**
   * Obtiene un estudiante específico por su ID
   * @param id ID del estudiante
   */
  getEstudiante(id: number): Observable<EstudianteResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EstudianteResponse>(url);
  }

  /**
   * Crea un nuevo estudiante
   * @param estudiante Datos del estudiante a crear
   */
  createEstudiante(
    estudiante: EstudianteInput
  ): Observable<EstudianteCrudResponse> {
    return this.http.post<EstudianteCrudResponse>(this.apiUrl, estudiante);
  }

  /**
   * Actualiza un estudiante existente
   * @param id ID del estudiante
   * @param estudiante Datos actualizados del estudiante
   */
  updateEstudiante(
    id: number,
    estudiante: EstudianteInput
  ): Observable<EstudianteCrudResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<EstudianteCrudResponse>(url, estudiante);
  }

  /**
   * Elimina un estudiante
   * @param id ID del estudiante a eliminar
   */
  deleteEstudiante(id: number): Observable<EstudianteDeleteResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<EstudianteDeleteResponse>(url);
  }
}
