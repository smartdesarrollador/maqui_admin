import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MotosService } from '../../../../services/services_motos/motos.service';
import { forkJoin } from 'rxjs';

interface Modelo {
  id_modelo: number;
  nombre: string;
  marca: {
    nombre: string;
  };
}

interface TipoMoto {
  id_tipo_moto: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-create-moto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-moto.component.html',
  styleUrl: './create-moto.component.css',
})
export class CreateMotoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private motosService = inject(MotosService);
  private router = inject(Router);

  // Estado del formulario
  isSubmitting = false;
  isLoadingData = true;
  modelos: Modelo[] = [];
  tipoMotos: TipoMoto[] = [];

  motoForm: FormGroup = this.fb.group({
    modelo_id: ['', [Validators.required]],
    tipo_moto_id: ['', [Validators.required]],
    año: ['', [Validators.required]],
    precio_base: ['', [Validators.required, Validators.min(0)]],
    color: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required]],
    imagen: ['moto-default.jpg'],
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
    cargador_usb: [0],
    luz_led: [0],
    alarma: [0],
    cajuela: [0],
    tablero_led: [0],
    mp3: [0],
    bluetooth: [0],
  });

  ngOnInit() {
    this.loadInitialData();
  }

  /**
   * Carga los datos necesarios para los selectores
   */
  private loadInitialData() {
    this.isLoadingData = true;

    // Usar forkJoin para cargar datos en paralelo
    forkJoin({
      modelos: this.motosService.getModelos(),
      tipoMotos: this.motosService.getTipoMotos(),
    }).subscribe({
      next: (data) => {
        this.modelos = data.modelos;
        this.tipoMotos = data.tipoMotos;
        this.isLoadingData = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoadingData = false;
      },
    });
  }

  onSubmit() {
    if (this.motoForm.valid) {
      this.isSubmitting = true;

      const formData = {
        ...this.motoForm.value,
        // Asegurar que los campos numéricos sean números
        precio_base: Number(this.motoForm.value.precio_base),
        stock: Number(this.motoForm.value.stock),
        peso_neto: Number(this.motoForm.value.peso_neto),
        carga_util: Number(this.motoForm.value.carga_util),
        peso_bruto: Number(this.motoForm.value.peso_bruto),
        largo: Number(this.motoForm.value.largo),
        ancho: Number(this.motoForm.value.ancho),
        alto: Number(this.motoForm.value.alto),
        año: Number(this.motoForm.value.año),
        // Convertir booleanos a números
        cargador_usb: this.motoForm.value.cargador_usb ? 1 : 0,
        luz_led: this.motoForm.value.luz_led ? 1 : 0,
        alarma: this.motoForm.value.alarma ? 1 : 0,
        bluetooth: this.motoForm.value.bluetooth ? 1 : 0,
      };

      this.motosService.createMoto(formData).subscribe({
        next: (response) => {
          console.log('Moto creada exitosamente:', response);
          this.router.navigate(['/admin/motos']);
        },
        error: (error) => {
          console.error('Error al crear moto:', error);
          if (error.error && error.error.errors) {
            // Manejar errores de validación
            Object.keys(error.error.errors).forEach((key) => {
              const control = this.motoForm.get(key);
              if (control) {
                control.setErrors({ serverError: error.error.errors[key][0] });
              }
            });
          }
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(this.motoForm.controls).forEach((key) => {
        const control = this.motoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Agregar método para debug
  logFormErrors() {
    Object.keys(this.motoForm.controls).forEach((key) => {
      const control = this.motoForm.get(key);
      if (control?.errors) {
        console.log(`Campo ${key}:`, {
          valor: control.value,
          errores: control.errors,
          touched: control.touched,
          dirty: control.dirty,
        });
      }
    });
  }

  // Helper para verificar si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.motoForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
