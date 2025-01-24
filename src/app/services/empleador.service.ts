import { Injectable } from '@angular/core';
import { Empleador } from '../interface/empleador';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadorService {
  url = environment.apiUrlEmpleador;
  urlUltimoEmpleador = environment.apiUrlUltimoEmpleador;
  urlActividadUltimoEmpleador = environment.apiUrlActividadUltimoEmpleador;

  /* selectTrabajador: Trabajador = new Trabajador(); */

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu_token',
  });

  constructor(private http: HttpClient) {}

  getEmpleadores(): Observable<Empleador> {
    return this.http.get(this.url);
  }

  getEmpleadorById(id: number): Observable<Empleador> {
    const urlEmpleador = this.url + '/' + id;
    return this.http.get<Empleador>(urlEmpleador);
  }

  createEmpleador(Empleador: Empleador): Observable<Empleador> {
    console.log(Empleador);
    return this.http.post(this.url, Empleador, { headers: this.reqHeader });
  }

  updateEmpleador(id: number, empleador: Empleador) {
    return this.http.put(this.url + '/' + id, empleador, {
      headers: this.reqHeader,
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getUltimoEmpleador(): Observable<Empleador> {
    return this.http.get(this.urlUltimoEmpleador);
  }

  getActividadUltimoEmpleador(): Observable<Empleador> {
    return this.http.get(this.urlActividadUltimoEmpleador);
  }
}
