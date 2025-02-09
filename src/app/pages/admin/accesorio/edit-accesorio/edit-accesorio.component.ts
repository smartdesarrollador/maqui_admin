import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  AccesoriosService,
  TipoAccesorio,
} from '../../../../services/services_motos/accesorios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-accesorio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-accesorio.component.html',
  styleUrl: './edit-accesorio.component.css',
})
export class EditAccesorioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accesoriosService = inject(AccesoriosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected readonly baseUrl = environment.urlRaiz;

  // Vista previa de imagen
  imagePreview: string | null = null;
  currentImage: string | null = null;

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
    imagen: [null as unknown as File],
  });

  tiposAccesorios: TipoAccesorio[] = [];

  ngOnInit() {
    this.loadTiposAccesorios();
    this.loadAccesorio();
  }

  private loadTiposAccesorios() {
    this.accesoriosService.getTiposAccesorios().subscribe({
      next: (tipos) => {
        this.tiposAccesorios = tipos;
      },
      error: (error) => {
        console.error('Error cargando tipos de accesorios:', error);
        this.error = 'Error al cargar los tipos de accesorios';
      },
    });
  }

  private loadAccesorio() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.accesoriosService.getAccesorio(id).subscribe({
        next: (response) => {
          if (response.data) {
            const accesorio = Array.isArray(response.data)
              ? response.data[0]
              : response.data;
            this.accesorioForm.patchValue({
              nombre: accesorio.nombre,
              tipo: accesorio.tipo,
              precio: accesorio.precio.toString(),
              stock: accesorio.stock.toString(),
              descripcion: accesorio.descripcion,
              tipo_accesorio_id: accesorio.tipo_accesorio_id.toString(),
            });
            this.currentImage = accesorio.imagen;
          }
        },
        error: (error) => {
          console.error('Error cargando accesorio:', error);
          this.error = 'Error al cargar el accesorio';
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.accesorioForm.patchValue({ imagen: file });
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

      const id = Number(this.route.snapshot.paramMap.get('id'));
      const formData = this.accesoriosService.buildFormData(
        this.accesorioForm.value,
        this.accesorioForm.get('imagen')?.value || undefined
      );

      this.accesoriosService.updateAccesorio(id, formData).subscribe({
        next: (response) => {
          console.log('Accesorio actualizado:', response);
          this.router.navigate(['/admin/accesorios']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.error =
            'Error al actualizar el accesorio. Por favor, intente nuevamente.';
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

  hasError(field: string, error: string): boolean {
    const control = this.accesorioForm.get(field);
    return (control?.touched && control?.hasError(error)) || false;
  }
}
