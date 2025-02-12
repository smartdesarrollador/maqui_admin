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
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-file.component.html',
  styleUrl: './edit-file.component.css',
})
export class EditFileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly medioFileService = inject(MedioFileService);
  private readonly medioCategoriaService = inject(MedioCategoriaService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  protected readonly baseUrl = environment.urlRaiz;

  form: FormGroup;
  categorias: any[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';
  archivoSeleccionado: File | null = null;
  previewUrl: string | null = null;
  mediaFileId: number;

  constructor() {
    this.mediaFileId = Number(this.route.snapshot.params['id']);
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      alt_text: [''],
      is_public: [true],
      sort_order: [0],
      category_id: [null],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMedio();
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

  cargarMedio(): void {
    this.cargando = true;
    this.medioFileService.obtenerArchivo(this.mediaFileId).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          const medio = response.data;
          this.form.patchValue({
            title: medio.title,
            description: medio.description,
            alt_text: medio.alt_text,
            is_public: medio.is_public,
            sort_order: medio.sort_order,
            category_id: medio.category_id,
          });
          this.previewUrl = medio.file_path
            ? `${this.baseUrl}/${medio.file_path}`
            : null;
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el medio:', error);
        this.mostrarMensaje('Error al cargar el medio', 'error');
        this.cargando = false;
      },
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.form.patchValue({ file });

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.cargando = true;
      const formData = new FormData();

      if (this.archivoSeleccionado) {
        formData.append('file', this.archivoSeleccionado);
      }

      formData.append('title', this.form.value.title);
      if (this.form.value.description) {
        formData.append('description', this.form.value.description);
      }
      if (this.form.value.alt_text) {
        formData.append('alt_text', this.form.value.alt_text);
      }
      formData.append('is_public', this.form.value.is_public ? '1' : '0');
      if (this.form.value.sort_order !== null) {
        formData.append('sort_order', this.form.value.sort_order.toString());
      }
      if (this.form.value.category_id) {
        formData.append('category_id', this.form.value.category_id.toString());
      }

      this.medioFileService
        .actualizarArchivo(this.mediaFileId, formData)
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.mostrarMensaje(
                'Archivo actualizado exitosamente',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/admin/medios-files']);
              }, 1500);
            }
          },
          error: (error) => {
            console.error('Error al actualizar archivo:', error);
            this.mostrarMensaje(
              error.error?.message || 'Error al actualizar el archivo',
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
