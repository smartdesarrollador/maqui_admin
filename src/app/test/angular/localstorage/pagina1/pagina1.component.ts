import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina1',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css'],
})
export class Pagina1Component {
  // Datos que deseas almacenar en el localStorage
  datosParaAlmacenar: any = { nombre: 'Ejemplo', edad: 25 };

  constructor() {}

  ngOnInit(): void {
    localStorage.setItem('misDatos', JSON.stringify(this.datosParaAlmacenar));
  }

  // Función para almacenar datos en el localStorage
  /* guardarDatosEnLocalStorage() {
    localStorage.setItem('misDatos', JSON.stringify(this.datosParaAlmacenar));
  } */
}
