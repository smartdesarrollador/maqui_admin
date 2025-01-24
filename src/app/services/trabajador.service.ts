import { Injectable } from '@angular/core';
import { Trabajador } from '../interface/trabajador';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  url = environment.apiUrlTrabajador;

  /* selectTrabajador: Trabajador = new Trabajador(); */

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu_token',
  });

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<Trabajador> {
    return this.http.get(this.url);
  }

  getTrabajadorById(id: number): Observable<Trabajador> {
    const urlTrabajador = this.url + '/' + id;
    return this.http.get<Trabajador>(urlTrabajador);
  }

  createTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    console.log(trabajador);
    return this.http.post(this.url, trabajador, { headers: this.reqHeader });
  }
}
