import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TagService } from 'src/app/services/tag.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-tag',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.css',
})
export class CreateTagComponent {
  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private router: Router
  ) {
    this.tagForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  createTag(): void {
    if (this.tagForm.valid) {
      const newTag = this.tagForm.value;

      this.tagService.createTag(newTag).subscribe(
        () => {
          console.log('El tag se ha creado correctamente.');
          this.router.navigate(['/admin/blog/tags']);
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al crear el tag:', error);
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
    });
  }
}
