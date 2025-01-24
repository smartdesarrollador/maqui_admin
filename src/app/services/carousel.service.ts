import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carousel } from '../models/carousel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  selectCategory: Carousel = new Carousel();
  urlListar = environment.apiListarFilesCarousel;
  urlUpdateFile = environment.apiUpdateFileCarousel;
  urlDelete = environment.apiDeleteFileCarousel;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Carousel> {
    return this.http.get(this.urlListar);
  }

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl3Carousel, data, {
      headers: headers,
    });
  }

  updateData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUpdateFileCarousel, data, {
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
