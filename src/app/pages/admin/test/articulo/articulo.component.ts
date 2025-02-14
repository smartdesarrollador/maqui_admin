import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticuloService } from '../../../../services/test_service/articulo.service';
import { Articulo } from '../../../../interface/interface_test/articulo';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css',
})
export class ArticuloComponent implements OnInit {
  articulos: Articulo[] = [];
  articuloSeleccionado: Articulo | null = null;
  nuevoArticulo: Articulo = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria_id: 0,
  };
  modoEdicion = false;

  constructor(private articuloService: ArticuloService) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getArticulos().subscribe({
      next: (response) => {
        this.articulos = response.data;
      },
      error: (error) => {
        console.error('Error al cargar artículos:', error);
      },
    });
  }

  crearArticulo(): void {
    this.articuloService.createArticulo(this.nuevoArticulo).subscribe({
      next: (response) => {
        this.articulos.push(response.data);
        this.resetForm();
        this.cargarArticulos();
      },
      error: (error) => {
        console.error('Error al crear artículo:', error);
      },
    });
  }

  editarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = { ...articulo };
    this.modoEdicion = true;
  }

  actualizarArticulo(): void {
    if (this.articuloSeleccionado) {
      this.articuloService
        .updateArticulo(this.articuloSeleccionado.id, this.articuloSeleccionado)
        .subscribe({
          next: () => {
            this.cargarArticulos();
            this.cancelarEdicion();
          },
          error: (error) => {
            console.error('Error al actualizar artículo:', error);
          },
        });
    }
  }

  eliminarArticulo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      this.articuloService.deleteArticulo(id).subscribe({
        next: () => {
          this.articulos = this.articulos.filter((a) => a.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar artículo:', error);
        },
      });
    }
  }

  cancelarEdicion(): void {
    this.articuloSeleccionado = null;
    this.modoEdicion = false;
  }

  resetForm(): void {
    this.nuevoArticulo = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria_id: 0,
    };
  }
}
