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

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  motoForm: FormGroup = this.fb.group({
    modelo_id: ['', [Validators.required]],
    tipo_moto_id: ['', [Validators.required]],
    año: ['', [Validators.required]],
    precio_base: ['', [Validators.required, Validators.min(0)]],
    color: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required]],
    imagen: [null, [Validators.required]],
    cilindrada: ['', [Validators.required]],
    motor: ['', [Validators.required]],
    potencia: ['', [Validators.required]],
    arranque: ['', [Validators.required]],
    transmision: ['', [Validators.required]],
    capacidad_tanque: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d*\.?\d+$/), // Permite números decimales
      ],
    ],
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

  /**
   * Maneja la selección de archivo
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Actualizar el control del formulario
      this.motoForm.patchValue({
        imagen: file,
      });

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Form validity:', this.motoForm.valid);
    console.log('Selected file:', this.selectedFile);
    console.log('Form values:', this.motoForm.value);

    if (this.motoForm.valid && this.selectedFile) {
      this.isSubmitting = true;
      const formData = new FormData();

      // Agregar todos los campos del formulario al FormData
      Object.keys(this.motoForm.value).forEach((key) => {
        if (key !== 'imagen') {
          let value = this.motoForm.get(key)?.value;

          // Convertir booleanos a números
          if (typeof value === 'boolean') {
            value = value ? 1 : 0;
          }

          // Asegurar que los campos numéricos sean números
          if (
            [
              'precio_base',
              'stock',
              'peso_neto',
              'carga_util',
              'peso_bruto',
              'largo',
              'ancho',
              'alto',
              'año',
            ].includes(key)
          ) {
            value = Number(value);
          }

          formData.append(key, value);
        }
      });

      // Agregar el archivo de imagen
      formData.append('imagen', this.selectedFile);

      console.log('Enviando formData:', formData);

      this.motosService.createMoto(formData).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate(['/admin/motos']);
        },
        error: (error) => {
          console.error('Error completo:', error);
          if (error.error && error.error.errors) {
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
      console.log('Formulario inválido o archivo no seleccionado');
      Object.keys(this.motoForm.controls).forEach((key) => {
        const control = this.motoForm.get(key);
        control?.markAsTouched();
        if (control?.errors) {
          console.log(`Errores en ${key}:`, control.errors);
        }
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

  // Método para obtener el mensaje de error para capacidad_tanque
  getCapacidadTanqueError(): string {
    const control = this.motoForm.get('capacidad_tanque');
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['pattern']) {
        return 'El valor debe ser un número decimal válido';
      }
    }
    return '';
  }

  // Método para verificar si el campo capacidad_tanque es inválido
  isCapacidadTanqueInvalid(): boolean {
    const control = this.motoForm.get('capacidad_tanque');
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
