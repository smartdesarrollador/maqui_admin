import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContratoLocalStorageService {

  constructor() { }

  // Guardar un valor en el Local Storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener un valor del Local Storage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Eliminar un valor del Local Storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
