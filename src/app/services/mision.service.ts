import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mision } from '../models/mision';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MisionService {
  url = environment.apiUrlMision;
  urlUpdate = environment.apiUrlMisionActualizar;

  selectCategory: Mision = new Mision();

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu_token',
  });

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Mision> {
    return this.http.get(this.url);
  }

  updateCategory(id: number, category: Mision) {
    return this.http.put(this.urlUpdate + '/1', category, {
      headers: this.reqHeader,
    });
  }

  updateData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrlMisionUpdate, data, {
      headers: headers,
    });
  }
}
