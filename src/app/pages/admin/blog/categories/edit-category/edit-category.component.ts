import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', Validators.required],
    });

    // Obtenemos el ID de la categoría de la URL
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Cargar los datos de la categoría a editar
    this.categoryService.getCategory(this.categoryId).subscribe((category) => {
      this.categoryForm.patchValue({
        nombre: category.nombre,
        descripcion: category.descripcion,
      });
    });
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      this.categoryService
        .updateCategory(this.categoryId, this.categoryForm.value)
        .subscribe(
          () => {
            console.log('Categoría actualizada correctamente.');
            this.router.navigate(['/admin/blog/categories']); // Navegar a la lista de categorías
            this.alerta();
          },
          (error) => {
            console.error('Hubo un error al actualizar la categoría:', error);
          }
        );
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro editado',
    });
  }
}
