import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario2',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './formulario2.component.html',
  styleUrls: ['./formulario2.component.css'],
})
export class Formulario2Component {
  persona = {
    nombre: '',
    edad: '',
  };

  procesar() {
    console.log(this.persona);
  }
}
