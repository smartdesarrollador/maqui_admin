import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoRepuestoService } from '../../../services/services_motos/tipo-repuesto.service';

interface TipoRepuesto {
  id_tipo_repuesto: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-tipo-repuesto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-repuesto.component.html',
  styleUrl: './tipo-repuesto.component.css',
})
export class TipoRepuestoComponent implements OnInit {
  private tipoRepuestoService = inject(TipoRepuestoService);

  tiposRepuesto = signal<TipoRepuesto[]>([]);
  tipoRepuestoEdit = signal<TipoRepuesto | null>(null);

  newTipoRepuesto = {
    nombre: '',
    descripcion: '',
  };

  isLoading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  ngOnInit(): void {
    this.loadTiposRepuesto();
  }

  loadTiposRepuesto(): void {
    this.isLoading.set(true);
    this.tipoRepuestoService.getAll().subscribe({
      next: (response) => {
        if (response.data) {
          this.tiposRepuesto.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los tipos de repuesto');
        this.isLoading.set(false);
      },
    });
  }

  createTipoRepuesto(): void {
    if (!this.newTipoRepuesto.nombre || !this.newTipoRepuesto.descripcion) {
      this.error.set('Por favor complete todos los campos');
      return;
    }

    this.isLoading.set(true);
    this.tipoRepuestoService.create(this.newTipoRepuesto).subscribe({
      next: (response) => {
        this.success.set('Tipo de repuesto creado exitosamente');
        this.loadTiposRepuesto();
        this.newTipoRepuesto = { nombre: '', descripcion: '' };
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al crear el tipo de repuesto');
        this.isLoading.set(false);
      },
    });
  }

  startEdit(tipoRepuesto: TipoRepuesto): void {
    this.tipoRepuestoEdit.set({ ...tipoRepuesto });
  }

  updateTipoRepuesto(): void {
    if (!this.tipoRepuestoEdit()) return;

    this.isLoading.set(true);
    const tipoRepuesto = this.tipoRepuestoEdit()!;

    this.tipoRepuestoService
      .update(tipoRepuesto.id_tipo_repuesto, tipoRepuesto)
      .subscribe({
        next: (response) => {
          this.success.set('Tipo de repuesto actualizado exitosamente');
          this.loadTiposRepuesto();
          this.tipoRepuestoEdit.set(null);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Error al actualizar el tipo de repuesto');
          this.isLoading.set(false);
        },
      });
  }

  deleteTipoRepuesto(id: number): void {
    if (!confirm('¿Está seguro de eliminar este tipo de repuesto?')) return;

    this.isLoading.set(true);
    this.tipoRepuestoService.delete(id).subscribe({
      next: (response) => {
        this.success.set('Tipo de repuesto eliminado exitosamente');
        this.loadTiposRepuesto();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al eliminar el tipo de repuesto');
        this.isLoading.set(false);
      },
    });
  }

  clearMessages(): void {
    this.error.set(null);
    this.success.set(null);
  }
}
