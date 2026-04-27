import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
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

interface ColorFile {
  file: File | null;
  previewUrl: string | null;
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
  modelosDisponibles: Modelo[] = [];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  // Array para almacenar los archivos de colores
  colorFiles: ColorFile[] = [];

  motoForm: FormGroup = this.fb.group({
    modelo_id: ['', [Validators.required]],
    año: ['', [Validators.required]],
    precio_base: ['', [Validators.required, Validators.min(0)]],
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
    colores: this.fb.array([]),
  });

  // Getter para acceder fácilmente al FormArray de colores
  get coloresFormArray(): FormArray {
    return this.motoForm.get('colores') as FormArray;
  }

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
      motos: this.motosService.getMotos({ per_page: 100 }),
    }).subscribe({
      next: (data) => {
        this.modelos = data.modelos;
        const modelosUsados = new Set(data.motos.data.map((m) => m.modelo_id));
        this.modelosDisponibles = data.modelos.filter(
          (m) => !modelosUsados.has(m.id_modelo)
        );
        this.isLoadingData = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoadingData = false;
      },
    });
  }

  /**
   * Agrega un nuevo color al formulario
   */
  agregarColor() {
    const colorFormGroup = this.fb.group({
      color: ['', Validators.required],
      imagen_color: [null, Validators.required],
    });

    this.coloresFormArray.push(colorFormGroup);
    this.colorFiles.push({ file: null, previewUrl: null });
  }

  /**
   * Elimina un color del formulario
   */
  eliminarColor(index: number) {
    this.coloresFormArray.removeAt(index);
    this.colorFiles.splice(index, 1);
  }

  /**
   * Maneja la selección de archivo para un color específico
   */
  onColorFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      // Actualizar el control del formulario
      const colorGroup = this.coloresFormArray.at(index) as FormGroup;
      colorGroup.patchValue({
        imagen_color: file,
      });

      // Guardar el archivo y crear preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.colorFiles[index] = {
          file: file,
          previewUrl: e.target.result,
        };
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Obtiene la URL de preview para un color específico
   */
  getColorPreviewUrl(index: number): string | null {
    return this.colorFiles[index]?.previewUrl || null;
  }

  /**
   * Verifica si hay un archivo seleccionado para un color
   */
  getColorSelectedFile(index: number): File | null {
    return this.colorFiles[index]?.file || null;
  }

  /**
   * Obtiene el nombre del archivo seleccionado para un color
   */
  getColorSelectedFileName(index: number): string {
    return this.colorFiles[index]?.file?.name || '';
  }

  /**
   * Verifica si un campo en un color específico es inválido
   */
  isColorFieldInvalid(index: number, field: string): boolean {
    // Verificar si el índice es válido
    if (index < 0 || index >= this.coloresFormArray.length) {
      return false;
    }

    // Obtener el grupo de formulario
    const formGroup = this.coloresFormArray.at(index);
    if (!formGroup) {
      return false;
    }

    // Obtener el control
    const control = formGroup.get(field);
    if (!control) {
      return false;
    }

    // Verificar si el control es inválido
    return control.invalid && (control.dirty || control.touched);
  }

  /**
   * Maneja la selección de archivo principal
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
    console.log('Colors array:', this.coloresFormArray.value);
    console.log('Color files:', this.colorFiles);

    // Verificar si el formulario es válido y si hay al menos un color definido
    if (
      this.motoForm.valid &&
      this.selectedFile &&
      this.coloresFormArray.length > 0
    ) {
      this.isSubmitting = true;
      const formData = new FormData();

      // Agregar todos los campos del formulario al FormData (excepto colores e imagen)
      Object.keys(this.motoForm.value).forEach((key) => {
        if (key !== 'imagen' && key !== 'colores') {
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

      // Agregar el archivo de imagen principal
      formData.append('imagen', this.selectedFile);

      // Agregar el primer color al formulario principal de moto
      if (this.coloresFormArray.length > 0) {
        const colorGroup = this.coloresFormArray.at(0);
        if (colorGroup) {
          const colorValue = colorGroup.get('color')?.value;
          if (colorValue) {
            formData.append('color', colorValue);
          }
        }
      }

      // Agregar información sobre colores adicionales como un campo JSON
      const coloresData = this.coloresFormArray.value.map(
        (color: any, index: number) => ({
          color: color.color,
          // Solo incluir el índice para poder relacionarlo con los archivos que se enviarán
          fileIndex: index,
        })
      );
      formData.append('colores_adicionales', JSON.stringify(coloresData));

      // Agregar archivos de colores
      this.colorFiles.forEach((colorFile, index) => {
        if (colorFile && colorFile.file) {
          formData.append(`color_imagen_${index}`, colorFile.file);
        }
      });

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
      console.log(
        'Formulario inválido, archivo no seleccionado o no hay colores'
      );

      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched(this.motoForm);

      // Validar específicamente el array de colores
      if (this.coloresFormArray.length === 0) {
        alert('Debe agregar al menos un color para la moto');
      }
    }
  }

  /**
   * Marcar todos los campos de un FormGroup como tocados
   */
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else if (control) {
        control.markAsTouched();
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
