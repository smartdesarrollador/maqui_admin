import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-validaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formulario-validaciones.component.html',
  styleUrls: ['./formulario-validaciones.component.css'],
})
export class FormularioValidacionesComponent {
  persona = {
    nombre: '',
    edad: '',
  };

  procesar() {
    console.log(this.persona);
  }
}
