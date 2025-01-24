import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contacto } from '../models/contacto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  selectContacto: Contacto = new Contacto();
  urlListar = environment.apiListarContactos;

  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto> {
    return this.http.get(this.urlListar);
  }
}
