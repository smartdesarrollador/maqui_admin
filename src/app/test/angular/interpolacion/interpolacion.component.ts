import { Component } from '@angular/core';
import { Persona } from '../../../persona';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-interpolacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './interpolacion.component.html',
  styleUrls: ['./interpolacion.component.css'],
})
export class InterpolacionComponent {
  nombre: string = 'Fernando';
  persona: Persona = {
    nombre: 'David',
    edad: 35,
  };
}
