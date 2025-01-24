import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  selectCategory: Producto = new Producto();
  urlListar = environment.apiListarFilesProducto;
  urlListarCursos = environment.apiListarCursosProducto;
  urlListarEspecialidades = environment.apiListarEspecialidadesProducto;
  urlUpdateFile = environment.apiUpdateFileProducto;
  urlDelete = environment.apiDeleteFileProducto;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Producto> {
    return this.http.get(this.urlListar);
  }

  getProductoId(id: number) {
    return this.http.get(this.urlListar + '/' + id);
  }

  getCursos(): Observable<Producto> {
    return this.http.get(this.urlListarCursos);
  }

  getEspecialidades(): Observable<Producto> {
    return this.http.get(this.urlListarEspecialidades);
  }

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl3Producto, data, {
      headers: headers,
    });
  }

  updateData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUpdateFileProducto, data, {
      headers: headers,
    });
  }

  /* editarImagen(idImagen: number, archivo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('imagen', archivo);

    const req = new HttpRequest(
      'PUT',
      `${this.urlUpdateFile}/${idImagen}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  } */

  deleteCategory(id: number) {
    return this.http.delete(this.urlDelete + '/' + id);
  }
}
