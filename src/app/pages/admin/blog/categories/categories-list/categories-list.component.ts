import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Router, RouterLink } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Función para redirigir a la página de edición
  editCategory(id: number): void {
    this.router.navigate([`admin/blog/categories/edit/${id}`]); // Navegar a la ruta de edición
  }

  // Función para eliminar una categoría
  deleteCategory(id: number): void {
    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar esta categoría?'
    );
    if (confirmDelete) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        // Filtrar la lista de categorías después de eliminar
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
        console.log(`Categoría con ID ${id} eliminada.`);
      });
    }
  }
}
