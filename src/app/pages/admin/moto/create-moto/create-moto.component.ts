import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MotosService } from '../../../../services/services_motos/motos.service';

@Component({
  selector: 'app-create-moto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-moto.component.html',
  styleUrl: './create-moto.component.css',
})
export class CreateMotoComponent {
  private fb = inject(FormBuilder);
  private motosService = inject(MotosService);
  private router = inject(Router);

  // Estado del formulario
  isSubmitting = false;

  motoForm: FormGroup = this.fb.group({
    modelo_id: ['', [Validators.required]],
    tipo_moto_id: ['', [Validators.required]],
    año: ['', [Validators.required]],
    precio_base: ['', [Validators.required, Validators.min(0)]],
    color: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    cilindrada: ['', [Validators.required]],
    motor: ['', [Validators.required]],
    potencia: ['', [Validators.required]],
    arranque: ['', [Validators.required]],
    transmision: ['', [Validators.required]],
    capacidad_tanque: ['', [Validators.required]],
    peso_neto: [0, [Validators.required, Validators.min(0)]],
    carga_util: [0, [Validators.required, Validators.min(0)]],
    peso_bruto: [0, [Validators.required, Validators.min(0)]],
    largo: [0, [Validators.required, Validators.min(0)]],
    ancho: [0, [Validators.required, Validators.min(0)]],
    alto: [0, [Validators.required, Validators.min(0)]],
    neumatico_delantero: ['', [Validators.required]],
    neumatico_posterior: ['', [Validators.required]],
    freno_delantero: ['', [Validators.required]],
    freno_posterior: ['', [Validators.required]],
    cargador_usb: [false],
    luz_led: [false],
    alarma: [false],
    cajuela: [false],
    tablero_led: [false],
    mp3: [false],
    bluetooth: [false],
  });

  onSubmit() {
    if (this.motoForm.valid) {
      this.isSubmitting = true;

      this.motosService.createMoto(this.motoForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/motos']);
        },
        error: (error) => {
          console.error('Error al crear moto:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.motoForm.controls).forEach((key) => {
        const control = this.motoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper para verificar si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.motoForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
