import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../services/test_service/categoria.service';
import { Categoria } from '../../../../interface/interface_test/categoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSeleccionada: Pick<Categoria, 'nombre' | 'descripcion'> = {
    nombre: '',
    descripcion: '',
  };
  modoEdicion = false;
  idEdicion?: number;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  crearCategoria(): void {
    if (
      this.categoriaSeleccionada.nombre &&
      this.categoriaSeleccionada.descripcion
    ) {
      this.categoriaService
        .createCategoria(this.categoriaSeleccionada)
        .subscribe({
          next: (response) => {
            console.log(response.message);
            this.cargarCategorias();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al crear categoría:', error);
          },
        });
    }
  }

  editarCategoria(categoria: Categoria): void {
    this.modoEdicion = true;
    this.idEdicion = categoria.id;
    this.categoriaSeleccionada = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    };
  }

  actualizarCategoria(): void {
    if (
      this.idEdicion &&
      this.categoriaSeleccionada.nombre &&
      this.categoriaSeleccionada.descripcion
    ) {
      this.categoriaService
        .updateCategoria(this.idEdicion, this.categoriaSeleccionada)
        .subscribe({
          next: (response) => {
            console.log(response.message);
            this.cargarCategorias();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al actualizar categoría:', error);
          },
        });
    }
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: (response) => {
          console.log(response.message);
          this.cargarCategorias();
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
        },
      });
    }
  }

  limpiarFormulario(): void {
    this.categoriaSeleccionada = {
      nombre: '',
      descripcion: '',
    };
    this.modoEdicion = false;
    this.idEdicion = undefined;
  }

  getTotalArticulos(categoria: Categoria): number {
    return categoria.total_articulos || 0;
  }

  getPrecioPromedio(categoria: Categoria): string {
    if (categoria.precio_promedio_articulos === null) return 'N/A';
    return categoria.precio_promedio_articulos?.toFixed(2) || '0.00';
  }
}
