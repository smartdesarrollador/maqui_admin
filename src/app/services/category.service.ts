import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = environment.categoriesUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<{ data: Category[] }>(this.categoriesUrl).pipe(
      map((response) => response.data) // Accediendo a la propiedad `data`
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http
      .get<{ data: Category }>(`${this.categoriesUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoriesUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${id}`);
  }
}
