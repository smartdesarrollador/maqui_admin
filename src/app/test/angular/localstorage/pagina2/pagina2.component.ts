import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina2',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css'],
})
export class Pagina2Component {
  // Variable para almacenar los datos recuperados del localStorage
  datosRecuperados: any;

  constructor() {
    // Recuperar datos del localStorage al inicializar el componente
    const datosGuardados = localStorage.getItem('misDatos');
    if (datosGuardados) {
      this.datosRecuperados = JSON.parse(datosGuardados);
    }
  }
}
