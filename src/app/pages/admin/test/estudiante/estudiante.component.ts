import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudiantesService } from '../../../../services/test_service/estudiantes.service';
import {
  Estudiante,
  EstudianteInput,
} from '../../../../interface/interface_test/estudiantes';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css',
})
export class EstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: EstudianteInput = {
    nombre: '',
    email: '',
  };
  modoEdicion = false;
  idEdicion?: number;

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (response) => {
        this.estudiantes = response.data;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
      },
    });
  }

  crearEstudiante(): void {
    if (
      this.estudianteSeleccionado.nombre &&
      this.estudianteSeleccionado.email
    ) {
      this.estudiantesService
        .createEstudiante(this.estudianteSeleccionado)
        .subscribe({
          next: (response) => {
            console.log(response.message);
            this.cargarEstudiantes();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al crear estudiante:', error);
          },
        });
    }
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.modoEdicion = true;
    this.idEdicion = estudiante.id;
    this.estudianteSeleccionado = {
      nombre: estudiante.nombre,
      email: estudiante.email,
    };
  }

  actualizarEstudiante(): void {
    if (
      this.idEdicion &&
      this.estudianteSeleccionado.nombre &&
      this.estudianteSeleccionado.email
    ) {
      this.estudiantesService
        .updateEstudiante(this.idEdicion, this.estudianteSeleccionado)
        .subscribe({
          next: (response) => {
            console.log(response.message);
            this.cargarEstudiantes();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al actualizar estudiante:', error);
          },
        });
    }
  }

  eliminarEstudiante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.estudiantesService.deleteEstudiante(id).subscribe({
        next: (response) => {
          console.log(response.message);
          this.cargarEstudiantes();
        },
        error: (error) => {
          console.error('Error al eliminar estudiante:', error);
        },
      });
    }
  }

  limpiarFormulario(): void {
    this.estudianteSeleccionado = {
      nombre: '',
      email: '',
    };
    this.modoEdicion = false;
    this.idEdicion = undefined;
  }
}
