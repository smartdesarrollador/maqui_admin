import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MotosService } from '../../../../services/services_motos/motos.service';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';

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
  selector: 'app-edit-moto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-moto.component.html',
  styleUrl: './edit-moto.component.css',
})
export class EditMotoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private motosService = inject(MotosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estado del formulario
  isSubmitting = false;
  isLoadingData = true;
  modelos: Modelo[] = [];
  tipoMotos: TipoMoto[] = [];
  motoId: number = 0;

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
    imagen: [null],
    cilindrada: ['', [Validators.required]],
    motor: ['', [Validators.required]],
    potencia: ['', [Validators.required]],
    arranque: ['', [Validators.required]],
    transmision: ['', [Validators.required]],
    capacidad_tanque: [
      '',
      [Validators.required, Validators.pattern(/^\d*\.?\d+$/)],
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
    cargador_usb: [false],
    luz_led: [false],
    alarma: [false],
    bluetooth: [false],
  });

  ngOnInit() {
    // Obtener el ID de la moto de la URL
    this.route.params.subscribe((params) => {
      this.motoId = +params['id'];
      this.loadInitialData();
    });
  }

  private loadInitialData() {
    this.isLoadingData = true;

    // Cargar datos en paralelo
    forkJoin({
      moto: this.motosService.getMotoById(this.motoId),
      modelos: this.motosService.getModelos(),
      tipoMotos: this.motosService.getTipoMotos(),
    }).subscribe({
      next: (data) => {
        this.modelos = data.modelos;
        this.tipoMotos = data.tipoMotos;

        // Establecer la URL de la imagen actual
        if (data.moto.data.imagen) {
          this.previewUrl = `${environment.urlRaiz}/${data.moto.data.imagen}`;
        }

        // Actualizar el formulario con los datos de la moto
        this.motoForm.patchValue({
          ...data.moto.data,
          cargador_usb: !!data.moto.data.cargador_usb,
          luz_led: !!data.moto.data.luz_led,
          alarma: !!data.moto.data.alarma,
          bluetooth: !!data.moto.data.bluetooth,
        });

        this.isLoadingData = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoadingData = false;
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.motoForm.patchValue({
        imagen: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Form validity:', this.motoForm.valid);
    console.log('Form values:', this.motoForm.value);

    if (this.motoForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();

      // Agregar todos los campos del formulario al FormData
      Object.keys(this.motoForm.value).forEach((key) => {
        if (key !== 'imagen' || this.selectedFile) {
          let value = this.motoForm.get(key)?.value;

          if (typeof value === 'boolean') {
            value = value ? 1 : 0;
          }

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

      // Agregar la imagen solo si se seleccionó una nueva
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      this.motosService.updateMoto(this.motoId, formData).subscribe({
        next: (response) => {
          console.log('Moto actualizada:', response);
          this.router.navigate(['/admin/motos']);
        },
        error: (error) => {
          console.error('Error:', error);
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
      Object.keys(this.motoForm.controls).forEach((key) => {
        const control = this.motoForm.get(key);
        control?.markAsTouched();
        if (control?.errors) {
          console.log(`Errores en ${key}:`, control.errors);
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.motoForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

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

  isCapacidadTanqueInvalid(): boolean {
    const control = this.motoForm.get('capacidad_tanque');
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
