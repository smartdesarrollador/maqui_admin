import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MedioFileService } from '../../../../services/medios/medio-file.service';
import { MedioCategoriaService } from '../../../../services/medios/medio-categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-file.component.html',
  styleUrl: './create-file.component.css',
})
export class CreateFileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly medioFileService = inject(MedioFileService);
  private readonly medioCategoriaService = inject(MedioCategoriaService);
  readonly router = inject(Router);

  form: FormGroup;
  categorias: any[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';
  archivoSeleccionado: File | null = null;
  previewUrl: string | null = null;

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      alt_text: [''],
      is_public: [true],
      sort_order: [0],
      category_id: [null],
      file: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.medioCategoriaService.listarCategorias().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.categorias = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.mostrarMensaje('Error al cargar las categorías', 'error');
      },
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.form.patchValue({ file });

      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewUrl = null;
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.archivoSeleccionado) {
      this.cargando = true;
      const formData = new FormData();

      // Agregar el archivo
      formData.append('file', this.archivoSeleccionado);

      // Agregar los demás campos
      formData.append('title', this.form.value.title);
      if (this.form.value.description) {
        formData.append('description', this.form.value.description);
      }
      if (this.form.value.alt_text) {
        formData.append('alt_text', this.form.value.alt_text);
      }
      // Convertir explícitamente a string
      formData.append('is_public', this.form.value.is_public ? '1' : '0');
      if (this.form.value.sort_order !== null) {
        formData.append('sort_order', this.form.value.sort_order.toString());
      }
      if (this.form.value.category_id) {
        formData.append('category_id', this.form.value.category_id.toString());
      }

      this.medioFileService.crearArchivo(formData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.mostrarMensaje('Archivo creado exitosamente', 'success');
            setTimeout(() => {
              this.router.navigate(['/admin/medios-files']);
            }, 1500);
          }
        },
        error: (error) => {
          console.error('Error al crear archivo:', error);
          this.mostrarMensaje(
            error.error?.message || 'Error al crear el archivo',
            'error'
          );
          this.cargando = false;
        },
      });
    }
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }
}
