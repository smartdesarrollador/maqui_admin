import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoAccesoriosService } from '../../../services/services_motos/tipo-accesorios.service';

// Interfaces
interface TipoAccesorio {
  id_tipo_accesorio: number;
  nombre: string;
  descripcion: string;
  accesorios?: any[];
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-tipo-accesorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-accesorio.component.html',
  styleUrl: './tipo-accesorio.component.css',
})
export class TipoAccesorioComponent implements OnInit {
  private tipoAccesorioService = inject(TipoAccesoriosService);

  tiposAccesorios: TipoAccesorio[] = [];
  tipoAccesorioForm: Partial<Pick<TipoAccesorio, 'id_tipo_accesorio'>> &
    Omit<
      TipoAccesorio,
      'id_tipo_accesorio' | 'accesorios' | 'created_at' | 'updated_at'
    > = {
    nombre: '',
    descripcion: '',
  };
  editando = false;
  loading = false;
  error = '';

  ngOnInit() {
    this.cargarTiposAccesorios();
  }

  cargarTiposAccesorios() {
    this.loading = true;
    this.error = '';
    this.tipoAccesorioService.getTiposAccesorios().subscribe({
      next: (data) => {
        this.tiposAccesorios = data;
        this.loading = false;
      },
      error: (error) => {
        this.error =
          error.error?.message || 'Error al cargar los tipos de accesorios';
        this.loading = false;
        console.error(error);
      },
    });
  }

  guardar() {
    if (!this.tipoAccesorioForm.nombre || !this.tipoAccesorioForm.descripcion) {
      this.error = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    if (this.editando && this.tipoAccesorioForm.id_tipo_accesorio) {
      // Actualizar
      this.tipoAccesorioService
        .updateTipoAccesorio(
          this.tipoAccesorioForm.id_tipo_accesorio,
          this.tipoAccesorioForm
        )
        .subscribe({
          next: () => {
            this.resetForm();
            this.cargarTiposAccesorios();
          },
          error: (error) => {
            this.error = 'Error al actualizar el tipo de accesorio';
            this.loading = false;
            console.error(error);
          },
        });
    } else {
      // Crear nuevo
      this.tipoAccesorioService
        .createTipoAccesorio(this.tipoAccesorioForm)
        .subscribe({
          next: () => {
            this.resetForm();
            this.cargarTiposAccesorios();
          },
          error: (error) => {
            this.error = 'Error al crear el tipo de accesorio';
            this.loading = false;
            console.error(error);
          },
        });
    }
  }

  editar(tipoAccesorio: TipoAccesorio) {
    this.tipoAccesorioForm = { ...tipoAccesorio };
    this.editando = true;
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar este tipo de accesorio?')) {
      this.loading = true;
      this.tipoAccesorioService.deleteTipoAccesorio(id).subscribe({
        next: () => {
          this.cargarTiposAccesorios();
        },
        error: (error) => {
          this.error = 'Error al eliminar el tipo de accesorio';
          this.loading = false;
          console.error(error);
        },
      });
    }
  }

  resetForm() {
    this.tipoAccesorioForm = {
      nombre: '',
      descripcion: '',
    };
    this.editando = false;
    this.loading = false;
    this.error = '';
  }
}
