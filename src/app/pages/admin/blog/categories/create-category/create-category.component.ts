import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  categoryForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  createCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory = {
        nombre: this.categoryForm.controls.nombre.value || '', // Aseguramos que nunca es null o undefined
        descripcion: this.categoryForm.controls.descripcion.value || '', // Aseguramos que nunca es null o undefined
      };

      this.categoryService.createCategory(newCategory).subscribe(
        () => {
          console.log('La categoría se ha creado correctamente.');
          this.router.navigate(['/admin/blog/categories']);
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al crear la categoría:', error);
        }
      );
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
    });
  }
}
