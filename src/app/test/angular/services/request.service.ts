import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  /*   getPosts() {
    return this.http.get('http://localhost/back_legajo/public/api/test_api');
  } */

  getPosts() {
    return this.http.get(environment.apiUrl2);
  }
}
