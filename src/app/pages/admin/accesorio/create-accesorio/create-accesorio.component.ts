import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoriosService } from '../../../../services/services_motos/accesorios.service';

@Component({
  selector: 'app-create-accesorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-accesorio.component.html',
  styleUrl: './create-accesorio.component.css',
})
export class CreateAccesorioComponent {
  private fb = inject(FormBuilder);
  private accesoriosService = inject(AccesoriosService);
  private router = inject(Router);

  // Vista previa de imagen
  imagePreview: string | null = null;

  // Estado del formulario
  loading = false;
  error: string | null = null;

  // Formulario reactivo
  accesorioForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(255)]],
    tipo: ['', [Validators.required, Validators.maxLength(100)]],
    precio: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required],
    tipo_accesorio_id: ['', Validators.required],
    imagen: [null as unknown as File, Validators.required],
  });

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.accesorioForm.patchValue({ imagen: file });

      // Crear URL para vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.accesorioForm.valid) {
      this.loading = true;
      this.error = null;

      const formData = this.accesoriosService.buildFormData(
        this.accesorioForm.value,
        this.accesorioForm.get('imagen')?.value || undefined
      );

      this.accesoriosService.createAccesorio(formData).subscribe({
        next: (response) => {
          console.log('Accesorio creado:', response);
          this.router.navigate(['/admin/accesorios']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.error =
            'Error al crear el accesorio. Por favor, intente nuevamente.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.markFormGroupTouched(this.accesorioForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helpers para la validación en la plantilla
  hasError(field: string, error: string): boolean {
    const control = this.accesorioForm.get(field);
    return (control?.touched && control?.hasError(error)) || false;
  }
}
