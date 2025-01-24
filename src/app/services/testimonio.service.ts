import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Testimonio } from '../models/testimonio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestimonioService {
  selectCategory: Testimonio = new Testimonio();
  urlListar = environment.apiListarFilesTestimonio;
  urlUpdateFile = environment.apiUpdateFileTestimonio;
  urlDelete = environment.apiDeleteFileTestimonio;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Testimonio> {
    return this.http.get(this.urlListar);
  }

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl3Testimonio, data, {
      headers: headers,
    });
  }

  updateData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUpdateFileTestimonio, data, {
      headers: headers,
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(this.urlDelete + '/' + id);
  }
}
