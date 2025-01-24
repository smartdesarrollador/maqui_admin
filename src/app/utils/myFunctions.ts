import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Permite que Angular lo inyecte automáticamente
})
export class myFunctions {
  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public miMetodoGeneral() {
    // Implementa tu lógica aquí
  }
}
