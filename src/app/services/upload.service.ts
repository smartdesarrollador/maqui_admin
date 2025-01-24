import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Upload } from '../models/upload.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  selectCategory: Upload = new Upload();
  urlListar = environment.apiListarFiles;
  urlUpdateFile = environment.apiUpdateFile;
  urlDelete = environment.apiDeleteFile;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Upload> {
    return this.http.get(this.urlListar);
  }

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl3, data, {
      headers: headers,
    });
  }

  updateData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUpdateFile, data, {
      headers: headers,
    });
  }

  /* editarImagen(idImagen: number, archivo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('nombre', archivo);

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
