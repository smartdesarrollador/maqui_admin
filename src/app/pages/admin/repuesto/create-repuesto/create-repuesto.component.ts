import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  RepuestosService,
  TipoRepuesto,
} from '../../../../services/services_motos/repuestos.service';
import { TipoRepuestoService } from 'src/app/services/services_motos/tipo-repuesto.service';

@Component({
  selector: 'app-create-repuesto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-repuesto.component.html',
  styleUrl: './create-repuesto.component.css',
})
export class CreateRepuestoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private repuestosService = inject(RepuestosService);

  // Signals para el estado del formulario
  isLoading = signal(false);
  previewImage = signal<string>('');
  tiposRepuesto = signal<TipoRepuesto[]>([]);

  repuestoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    tipo: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required],
    tipo_repuesto_id: ['', Validators.required],
    imagen: [null],
  });

  ngOnInit() {
    this.loadTiposRepuesto();
  }

  private loadTiposRepuesto() {
    this.repuestosService.getTiposRepuesto().subscribe({
      next: (response) => {
        this.tiposRepuesto.set(response.data);
      },
      error: (error) => {
        console.error('Error cargando tipos de repuesto:', error);
      },
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.repuestoForm.patchValue({ imagen: file });

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.repuestoForm.valid) {
      this.isLoading.set(true);

      const formData = this.repuestosService.prepareFormData(
        this.repuestoForm.value,
        this.repuestoForm.get('imagen')?.value
      );

      this.repuestosService.createRepuesto(formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/repuestos']);
        },
        error: (error) => {
          console.error('Error al crear repuesto:', error);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      Object.keys(this.repuestoForm.controls).forEach((key) => {
        const control = this.repuestoForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
