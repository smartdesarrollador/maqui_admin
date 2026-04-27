import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
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

interface ColorMoto {
  id_moto_color: number;
  modelo_id: number;
  color: string;
  imagen_color: string;
}

interface ColorFile {
  file: File | null;
  previewUrl: string | null;
  id?: number;
  isNew?: boolean;
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
  motoId: number = 0;
  coloresOriginales: ColorMoto[] = [];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  // Array para almacenar los archivos de colores
  colorFiles: ColorFile[] = [];

  // Control para rastrear los colores eliminados (para eliminarlos en el backend)
  coloresEliminados: number[] = [];

  motoForm: FormGroup = this.fb.group({
    modelo_id: ['', [Validators.required]],
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
    colores: this.fb.array([]),
  });

  // Getter para acceder fácilmente al FormArray de colores
  get coloresFormArray(): FormArray {
    return this.motoForm.get('colores') as FormArray;
  }

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
      colores: this.motosService.getColoresPorModelo(0),
    }).subscribe({
      next: (data) => {
        this.modelos = data.modelos;

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

        // Después de obtener los datos de la moto, cargar los colores asociados a su modelo
        const modeloId = data.moto.data.modelo_id;
        if (modeloId) {
          this.motosService.getColoresPorModelo(modeloId).subscribe({
            next: (coloresData: ColorMoto[]) => {
              this.coloresOriginales = coloresData;
              // Inicializar el FormArray de colores con los colores existentes
              this.initColoresFormArray(coloresData);
              this.isLoadingData = false;
            },
            error: (error: any) => {
              console.error('Error cargando colores:', error);
              this.isLoadingData = false;
            },
          });
        } else {
          this.isLoadingData = false;
        }
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.isLoadingData = false;
      },
    });
  }

  private initColoresFormArray(colores: ColorMoto[]) {
    // Limpiar el FormArray existente
    while (this.coloresFormArray.length > 0) {
      this.coloresFormArray.removeAt(0);
    }

    // Reiniciar el array de archivos de colores
    this.colorFiles = [];

    // Agregar los colores existentes al FormArray
    colores.forEach((color) => {
      this.coloresFormArray.push(
        this.fb.group({
          id_moto_color: [color.id_moto_color],
          color: [color.color, Validators.required],
          imagen_color: [color.imagen_color, Validators.required],
        })
      );

      // Agregar la previsualización de la imagen
      this.colorFiles.push({
        file: null,
        previewUrl: `${environment.urlRaiz}/${color.imagen_color}`,
        id: color.id_moto_color,
        isNew: false,
      });
    });
  }

  /**
   * Agregar un nuevo color al FormArray
   */
  agregarColor() {
    this.coloresFormArray.push(
      this.fb.group({
        id_moto_color: [null],
        color: ['', Validators.required],
        imagen_color: [null, Validators.required],
      })
    );

    this.colorFiles.push({
      file: null,
      previewUrl: null,
      isNew: true,
    });
  }

  /**
   * Eliminar un color del FormArray
   */
  eliminarColor(index: number) {
    // Si el color tiene un ID, lo guardamos para eliminarlo del backend
    const colorId = this.getColorId(index);
    if (colorId) {
      this.coloresEliminados.push(colorId);
    }

    // Eliminar del FormArray y de colorFiles
    this.coloresFormArray.removeAt(index);
    this.colorFiles.splice(index, 1);
  }

  /**
   * Verifica si un color es nuevo (no existía previamente)
   */
  isNewColor(index: number): boolean {
    return this.colorFiles[index]?.isNew === true;
  }

  /**
   * Obtiene el ID de un color
   */
  getColorId(index: number): number | null {
    if (index < 0 || index >= this.coloresFormArray.length) {
      return null;
    }

    const formGroup = this.coloresFormArray.at(index);
    if (!formGroup) {
      return null;
    }

    return formGroup.get('id_moto_color')?.value || null;
  }

  /**
   * Maneja la selección de archivo para un color específico
   */
  onColorFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      // Actualizar el FormGroup con el nuevo archivo
      const colorGroup = this.coloresFormArray.at(index) as FormGroup;
      if (colorGroup) {
        colorGroup.patchValue({
          imagen_color: file,
        });

        // Guardar el archivo y generar preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (index < this.colorFiles.length) {
            this.colorFiles[index] = {
              ...this.colorFiles[index],
              file: file,
              previewUrl: e.target.result,
            };
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  /**
   * Obtiene la URL de preview para un color específico
   */
  getColorPreviewUrl(index: number): string | null {
    return index < this.colorFiles.length
      ? this.colorFiles[index].previewUrl
      : null;
  }

  /**
   * Verifica si hay un archivo seleccionado para un color
   */
  getColorSelectedFile(index: number): File | null {
    return index < this.colorFiles.length ? this.colorFiles[index].file : null;
  }

  /**
   * Obtiene el nombre del archivo seleccionado para un color
   */
  getColorSelectedFileName(index: number): string {
    return index < this.colorFiles.length && this.colorFiles[index].file
      ? this.colorFiles[index].file!.name
      : '';
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
    console.log('Colors array:', this.coloresFormArray.value);
    console.log('Color files:', this.colorFiles);

    if (this.motoForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();

      // Agregar todos los campos del formulario al FormData (excepto colores e imagen)
      Object.keys(this.motoForm.value).forEach((key) => {
        if (key !== 'imagen' && key !== 'colores') {
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

      // Agregar información sobre colores
      const coloresData = this.coloresFormArray.value.map(
        (color: any, index: number) => ({
          ...color,
          fileIndex: index,
          isNew: !color.id_moto_color || color.id_moto_color === null,
        })
      );

      formData.append('colores', JSON.stringify(coloresData));

      // Añadir los IDs de colores eliminados
      if (this.coloresEliminados.length > 0) {
        formData.append(
          'colores_eliminados',
          JSON.stringify(this.coloresEliminados)
        );
      }

      // Agregar archivos de colores
      this.colorFiles.forEach((colorFile, index) => {
        if (colorFile && colorFile.file) {
          formData.append(`color_imagen_${index}`, colorFile.file);
        }
      });

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
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched(this.motoForm);
    }
  }

  /**
   * Marca todos los controles en un FormGroup como tocados
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
