import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ModelosMotosService } from '../../../services/services_motos/modelos-motos.service';
import { MarcasService } from '../../../services/services_motos/marcas.service';
import { MotosService } from '../../../services/services_motos/motos.service';

interface Marca {
  id_marca: number;
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
}

interface TipoMoto {
  id_tipo_moto: number;
  nombre: string;
  descripcion: string;
}

interface Modelo {
  id_modelo: number;
  marca_id: number;
  nombre: string;
  tipo_moto_id: number;
  cilindrada: number;
  imagen: string;
  marca: Marca;
  motos: any[];
}

@Component({
  selector: 'app-modelo-moto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modelo-moto.component.html',
  styleUrl: './modelo-moto.component.css',
})
export class ModeloMotoComponent implements OnInit {
  private modelosService = inject(ModelosMotosService);
  private marcasService = inject(MarcasService);
  private motosService = inject(MotosService);
  private fb = inject(FormBuilder);

  modelos = signal<Modelo[]>([]);
  marcas = signal<Marca[]>([]);
  tipoMotos = signal<TipoMoto[]>([]);
  isLoading = signal(true);
  isSubmitting = signal(false);
  isEditing = signal(false);
  selectedModelo = signal<Modelo | null>(null);
  errorMessage = signal('');

  searchTerm = '';

  modeloForm: FormGroup = this.fb.group({
    marca_id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    tipo_moto_id: ['', [Validators.required]],
    cilindrada: ['', [Validators.required]],
    imagen: [''],
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.isLoading.set(true);
    forkJoin({
      modelos: this.modelosService.getModelos(),
      marcas: this.marcasService.getMarcas(),
      tipoMotos: this.motosService.getTipoMotos(),
    }).subscribe({
      next: (data) => {
        this.modelos.set(data.modelos);
        this.marcas.set(data.marcas);
        this.tipoMotos.set(data.tipoMotos);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  private reloadModelos(): void {
    this.modelosService.getModelos().subscribe((data) => this.modelos.set(data));
  }

  get filteredModelos(): Modelo[] {
    const term = this.searchTerm.toLowerCase();
    if (!term) return this.modelos();
    return this.modelos().filter(
      (m) =>
        m.nombre.toLowerCase().includes(term) ||
        m.marca.nombre.toLowerCase().includes(term)
    );
  }

  getTipoNombre(tipoId: number): string {
    const tipo = this.tipoMotos().find((t) => t.id_tipo_moto === tipoId);
    return tipo ? tipo.nombre : '-';
  }

  onSubmit(): void {
    if (!this.modeloForm.valid) {
      this.modeloForm.markAllAsTouched();
      return;
    }
    this.isEditing() ? this.updateModelo() : this.createModelo();
  }

  createModelo(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.modelosService.createModelo(this.modeloForm.value).subscribe({
      next: () => {
        this.reloadModelos();
        this.resetForm();
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'Error al crear el modelo');
        this.isSubmitting.set(false);
      },
    });
  }

  updateModelo(): void {
    const modeloId = this.selectedModelo()?.id_modelo;
    if (!modeloId) return;
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.modelosService.updateModelo(modeloId, this.modeloForm.value).subscribe({
      next: () => {
        this.reloadModelos();
        this.resetForm();
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'Error al actualizar el modelo');
        this.isSubmitting.set(false);
      },
    });
  }

  editModelo(modelo: Modelo): void {
    this.isEditing.set(true);
    this.selectedModelo.set(modelo);
    this.errorMessage.set('');
    this.modeloForm.patchValue({
      marca_id: modelo.marca_id,
      nombre: modelo.nombre,
      tipo_moto_id: modelo.tipo_moto_id,
      cilindrada: modelo.cilindrada,
      imagen: modelo.imagen || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteModelo(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este modelo?')) return;
    this.modelosService.deleteModelo(id).subscribe({
      next: () => {
        this.modelos.update((list) => list.filter((m) => m.id_modelo !== id));
      },
      error: (error) => {
        alert(error.error?.message || 'Error al eliminar el modelo');
      },
    });
  }

  resetForm(): void {
    this.modeloForm.reset();
    this.isEditing.set(false);
    this.selectedModelo.set(null);
    this.errorMessage.set('');
  }

  isFieldInvalid(field: string): boolean {
    const control = this.modeloForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
