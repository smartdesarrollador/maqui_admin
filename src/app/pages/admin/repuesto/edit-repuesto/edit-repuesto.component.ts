import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  RepuestosService,
  TipoRepuesto,
} from '../../../../services/services_motos/repuestos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-repuesto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-repuesto.component.html',
  styleUrl: './edit-repuesto.component.css',
})
export class EditRepuestoComponent implements OnInit {
  protected readonly baseUrl = environment.urlRaiz;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private repuestosService = inject(RepuestosService);

  isLoading = signal(false);
  previewImage = signal<string>(this.baseUrl + '/');
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
    this.loadRepuesto();
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

  private loadRepuesto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isLoading.set(true);
      this.repuestosService.getRepuesto(id).subscribe({
        next: (response) => {
          const repuesto = response.data;
          this.repuestoForm.patchValue({
            nombre: repuesto.nombre,
            tipo: repuesto.tipo,
            precio: repuesto.precio,
            stock: repuesto.stock,
            descripcion: repuesto.descripcion,
            tipo_repuesto_id: repuesto.tipo_repuesto_id,
          });
          if (repuesto.imagen) {
            this.previewImage.set(repuesto.imagen);
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error cargando repuesto:', error);
          this.isLoading.set(false);
          this.router.navigate(['/admin/repuestos']);
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.repuestoForm.patchValue({ imagen: file });

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
      const id = Number(this.route.snapshot.paramMap.get('id'));

      const formData = this.repuestosService.prepareFormData(
        this.repuestoForm.value,
        this.repuestoForm.get('imagen')?.value
      );

      this.repuestosService.updateRepuesto(id, formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/repuestos']);
        },
        error: (error) => {
          console.error('Error actualizando repuesto:', error);
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
