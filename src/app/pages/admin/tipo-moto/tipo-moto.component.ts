import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiposMotosService } from '../../../services/services_motos/tipos-motos.service';

// Interfaces
interface TipoMoto {
  id_tipo_moto: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  motos?: any[];
}

@Component({
  selector: 'app-tipo-moto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-moto.component.html',
  styleUrl: './tipo-moto.component.css',
})
export class TipoMotoComponent implements OnInit {
  private tiposMotosService = inject(TiposMotosService);

  tiposMoto: TipoMoto[] = [];
  tipoMotoSeleccionado: TipoMoto | null = null;
  nuevoTipoMoto = {
    nombre: '',
    descripcion: '',
  };
  modoEdicion = false;
  mensajeError = '';
  mensajeExito = '';

  ngOnInit(): void {
    this.cargarTiposMoto();
  }

  cargarTiposMoto(): void {
    this.tiposMotosService.getTiposMotos().subscribe({
      next: (tipos) => {
        this.tiposMoto = tipos;
        this.limpiarMensajes();
      },
      error: (error) => {
        this.mensajeError =
          'Error al cargar los tipos de moto: ' + error.message;
      },
    });
  }

  crearTipoMoto(): void {
    if (!this.nuevoTipoMoto.nombre || !this.nuevoTipoMoto.descripcion) {
      this.mensajeError = 'Por favor complete todos los campos';
      return;
    }

    this.tiposMotosService.createTipoMoto(this.nuevoTipoMoto).subscribe({
      next: (response) => {
        this.mensajeExito = 'Tipo de moto creado exitosamente';
        this.cargarTiposMoto();
        this.limpiarFormulario();
      },
      error: (error) => {
        this.mensajeError = 'Error al crear el tipo de moto: ' + error.message;
      },
    });
  }

  seleccionarParaEditar(tipo: TipoMoto): void {
    this.tipoMotoSeleccionado = { ...tipo };
    this.modoEdicion = true;
    this.nuevoTipoMoto = {
      nombre: tipo.nombre,
      descripcion: tipo.descripcion,
    };
  }

  actualizarTipoMoto(): void {
    if (!this.tipoMotoSeleccionado) return;

    this.tiposMotosService
      .updateTipoMoto(
        this.tipoMotoSeleccionado.id_tipo_moto,
        this.nuevoTipoMoto
      )
      .subscribe({
        next: (response) => {
          this.mensajeExito = 'Tipo de moto actualizado exitosamente';
          this.cargarTiposMoto();
          this.cancelarEdicion();
        },
        error: (error) => {
          this.mensajeError =
            'Error al actualizar el tipo de moto: ' + error.message;
        },
      });
  }

  eliminarTipoMoto(id: number): void {
    if (confirm('¿Está seguro de eliminar este tipo de moto?')) {
      this.tiposMotosService.deleteTipoMoto(id).subscribe({
        next: (response) => {
          this.mensajeExito = 'Tipo de moto eliminado exitosamente';
          this.cargarTiposMoto();
        },
        error: (error) => {
          this.mensajeError =
            'Error al eliminar el tipo de moto: ' + error.message;
        },
      });
    }
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.tipoMotoSeleccionado = null;
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.nuevoTipoMoto = {
      nombre: '',
      descripcion: '',
    };
  }

  private limpiarMensajes(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
  }
}
