import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MarcasService } from '../../../services/services_motos/marcas.service';
import { HttpClientModule } from '@angular/common/http';

interface Marca {
  id_marca: number;
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
  created_at?: string;
  updated_at?: string;
  modelos?: any[];
}

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css',
})
export class MarcaComponent implements OnInit {
  private marcasService = inject(MarcasService);
  private fb = inject(FormBuilder);

  // Signals
  marcas = signal<Marca[]>([]);
  isLoading = signal(true);
  isEditing = signal(false);
  selectedMarca = signal<Marca | null>(null);

  // Form
  marcaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    fundacion: ['', [Validators.required]],
    logo: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadMarcas();
  }

  loadMarcas(): void {
    this.isLoading.set(true);
    this.marcasService.getMarcas().subscribe({
      next: (data) => {
        this.marcas.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar marcas:', error);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.marcaForm.valid) {
      if (this.isEditing()) {
        this.updateMarca();
      } else {
        this.createMarca();
      }
    }
  }

  createMarca(): void {
    this.marcasService.createMarca(this.marcaForm.value).subscribe({
      next: (newMarca) => {
        this.marcas.update((marcas) => [...marcas, newMarca]);
        this.resetForm();
      },
      error: (error) => console.error('Error al crear marca:', error),
    });
  }

  updateMarca(): void {
    const marcaId = this.selectedMarca()?.id_marca;
    if (marcaId) {
      this.marcasService.updateMarca(marcaId, this.marcaForm.value).subscribe({
        next: (updatedMarca) => {
          this.marcas.update((marcas) =>
            marcas.map((marca) =>
              marca.id_marca === marcaId ? updatedMarca : marca
            )
          );
          this.resetForm();
        },
        error: (error) => console.error('Error al actualizar marca:', error),
      });
    }
  }

  editMarca(marca: Marca): void {
    this.isEditing.set(true);
    this.selectedMarca.set(marca);
    this.marcaForm.patchValue({
      nombre: marca.nombre,
      origen: marca.origen,
      fundacion: marca.fundacion,
      logo: marca.logo,
    });
  }

  deleteMarca(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
      this.marcasService.deleteMarca(id).subscribe({
        next: () => {
          this.marcas.update((marcas) =>
            marcas.filter((marca) => marca.id_marca !== id)
          );
        },
        error: (error) => console.error('Error al eliminar marca:', error),
      });
    }
  }

  resetForm(): void {
    this.marcaForm.reset();
    this.isEditing.set(false);
    this.selectedMarca.set(null);
  }
}
