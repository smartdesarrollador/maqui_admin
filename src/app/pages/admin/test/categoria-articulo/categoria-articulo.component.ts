import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CategoriaArticulo,
  CategoriaArticuloForm,
  ErrorResponse,
} from '../../../../interface/interface_test/categoria-articulo';
import { CategoriaArticuloService } from '../../../../services/test_service/categoria-articulo.service';

@Component({
  selector: 'app-categoria-articulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-articulo.component.html',
  styleUrl: './categoria-articulo.component.css',
})
export class CategoriaArticuloComponent implements OnInit {
  // Lista de categorías
  categorias: CategoriaArticulo[] = [];

  // Estados
  loading: boolean = true;
  error: string | null = null;
  showForm: boolean = false;
  showArticulos: { [key: number]: boolean } = {}; // Para controlar qué categoría muestra sus artículos

  // Para el formulario
  formData: CategoriaArticuloForm = {
    nombre: '',
    descripcion: '',
  };
  editingId: number | null = null;

  constructor(private categoriaService: CategoriaArticuloService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Cargar categorías
  loadCategorias(): void {
    this.loading = true;
    this.error = null;

    this.categoriaService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response.data;
        this.loading = false;
      },
      error: (error) => {
        const errorResponse = error.error as ErrorResponse;
        this.error = errorResponse.message || 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  // Mostrar/ocultar artículos de una categoría
  toggleArticulos(categoriaId: number): void {
    this.showArticulos[categoriaId] = !this.showArticulos[categoriaId];
  }

  // Mostrar formulario para crear
  showCreateForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.formData = {
      nombre: '',
      descripcion: '',
    };
  }

  // Mostrar formulario para editar
  showEditForm(categoria: CategoriaArticulo): void {
    this.showForm = true;
    this.editingId = categoria.id;
    this.formData = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    };
  }

  // Guardar (crear o actualizar)
  onSubmit(): void {
    if (this.editingId) {
      // Actualizar
      this.categoriaService
        .updateCategoria(this.editingId, this.formData)
        .subscribe({
          next: (response) => {
            this.loadCategorias();
            this.resetForm();
          },
          error: (error) => {
            const errorResponse = error.error as ErrorResponse;
            this.error =
              errorResponse.message || 'Error al actualizar la categoría';
            console.error('Error:', error);
          },
        });
    } else {
      // Crear
      this.categoriaService.createCategoria(this.formData).subscribe({
        next: (response) => {
          this.loadCategorias();
          this.resetForm();
        },
        error: (error) => {
          const errorResponse = error.error as ErrorResponse;
          this.error = errorResponse.message || 'Error al crear la categoría';
          console.error('Error:', error);
        },
      });
    }
  }

  // Eliminar
  deleteCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => {
          this.loadCategorias();
        },
        error: (error) => {
          const errorResponse = error.error as ErrorResponse;
          this.error =
            errorResponse.message || 'Error al eliminar la categoría';
          console.error('Error:', error);
        },
      });
    }
  }

  // Resetear formulario
  resetForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.formData = {
      nombre: '',
      descripcion: '',
    };
  }
}
