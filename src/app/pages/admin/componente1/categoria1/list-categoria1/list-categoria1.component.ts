import { Component, OnInit } from '@angular/core';
import { Categoria1Service } from '../categoria1.service';
import { Categoria1 } from '../categoria1';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-categoria1',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './list-categoria1.component.html',
  styleUrl: './list-categoria1.component.css',
})
export class ListCategoria1Component implements OnInit {
  dominio = environment.dominio;
  categorias: Categoria1[] = [];
  p: number = 1;

  constructor(private categoriaService: Categoria1Service) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error fetching categories', err),
    });
  }

  deleteCategoria(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(
            (categoria) => categoria.id !== id
          );
          /* alert('Categoría eliminada satisfactoriamente'); */
          this.alertaDelete();
        },
        error: (err) => console.error('Error deleting category', err),
      });
    }
  }

  alertaDelete() {
    Swal.fire({
      icon: 'success',
      title: 'Registro eliminado',
    });
  }
}
