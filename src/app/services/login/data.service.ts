import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(environment.apiUrlRegister, data);
  }

  login(data: any) {
    return this.http.post(environment.apiUrlLogin, data);
  }
}
