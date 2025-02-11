import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MedioCategoriaService } from '../../../services/medios/medio-categoria.service';

interface MediaCategoria {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  is_active: boolean;
  sort_order: number;
  parent_id: number | null;
  parent?: MediaCategoria;
  children?: MediaCategoria[];
}

@Component({
  selector: 'app-categoria-medios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categoria-medios.component.html',
  styleUrl: './categoria-medios.component.css',
})
export class CategoriaMediosComponent implements OnInit {
  private readonly medioCategoriaService = inject(MedioCategoriaService);
  private readonly fb = inject(FormBuilder);

  categorias: MediaCategoria[] = [];
  categoriaForm: FormGroup;
  modoEdicion = false;
  categoriaSeleccionada: MediaCategoria | null = null;
  cargando = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor() {
    this.categoriaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      is_active: [true],
      sort_order: [0],
      parent_id: [null],
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true;
    this.medioCategoriaService.listarCategorias().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.categorias = response.data;
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.mostrarMensaje('Error al cargar las categorías', 'error');
        this.cargando = false;
      },
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    this.cargando = true;
    const categoriaData = this.categoriaForm.value;

    const operacion = this.modoEdicion
      ? this.medioCategoriaService.actualizarCategoria(
          this.categoriaSeleccionada!.id,
          categoriaData
        )
      : this.medioCategoriaService.crearCategoria(categoriaData);

    operacion.subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.mostrarMensaje(
            `Categoría ${
              this.modoEdicion ? 'actualizada' : 'creada'
            } exitosamente`,
            'success'
          );
          this.resetearFormulario();
          this.cargarCategorias();
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.mostrarMensaje(
          `Error al ${this.modoEdicion ? 'actualizar' : 'crear'} la categoría`,
          'error'
        );
        this.cargando = false;
      },
    });
  }

  editarCategoria(categoria: MediaCategoria): void {
    this.modoEdicion = true;
    this.categoriaSeleccionada = categoria;
    this.categoriaForm.patchValue({
      name: categoria.name,
      description: categoria.description,
      is_active: categoria.is_active,
      sort_order: categoria.sort_order,
      parent_id: categoria.parent_id,
    });
  }

  eliminarCategoria(id: number): void {
    if (!confirm('¿Está seguro de eliminar esta categoría?')) {
      return;
    }

    this.cargando = true;
    this.medioCategoriaService.eliminarCategoria(id).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.mostrarMensaje('Categoría eliminada exitosamente', 'success');
          this.cargarCategorias();
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        this.mostrarMensaje('Error al eliminar la categoría', 'error');
        this.cargando = false;
      },
    });
  }

  resetearFormulario(): void {
    this.modoEdicion = false;
    this.categoriaSeleccionada = null;
    this.categoriaForm.reset({
      is_active: true,
      sort_order: 0,
    });
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }
}
