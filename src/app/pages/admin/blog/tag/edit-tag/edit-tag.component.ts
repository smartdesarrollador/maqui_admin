import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tag',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-tag.component.html',
  styleUrl: './edit-tag.component.css',
})
export class EditTagComponent implements OnInit {
  tagForm: FormGroup;
  tagId: number;

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tagForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
    });

    // Obtener el ID del tag desde la URL
    this.tagId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Cargar los datos del tag a editar
    this.tagService.getTag(this.tagId).subscribe((tag) => {
      this.tagForm.patchValue({
        nombre: tag.nombre,
      });
    });
  }

  updateTag(): void {
    if (this.tagForm.valid) {
      this.tagService.updateTag(this.tagId, this.tagForm.value).subscribe(
        () => {
          console.log('Tag actualizado correctamente.');
          this.router.navigate(['/admin/blog/tags']); // Navegar a la lista de tags
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al actualizar el tag:', error);
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
