import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  FinanciacionService,
  Financiamiento,
  FinanciamientoFilters,
} from '../../../services/services_motos/financiacion.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-financiacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './financiacion.component.html',
  styleUrl: './financiacion.component.css',
})
export class FinanciacionComponent implements OnInit {
  private financiacionService = inject(FinanciacionService);
  private fb = inject(FormBuilder);

  // Signals para estado reactivo
  financiamientos = signal<Financiamiento[]>([]);
  selectedFinanciamiento = signal<Financiamiento | null>(null);
  isModalOpen = signal(false);
  isLoading = signal(false);
  totalItems = signal(0);
  currentPage = signal(1);
  itemsPerPage = signal(10);
  lastPage = signal(1);
  pages: number[] = [];

  // Formulario de filtros
  filterForm: FormGroup = this.fb.group({
    estado: [''],
    monto_min: [''],
    monto_max: [''],
    cliente: [''],
    fecha_inicio: [''],
    fecha_fin: [''],
    sort_by: ['created_at'],
    sort_direction: ['desc'],
  });

  protected readonly Math = Math;

  ngOnInit() {
    this.loadFinanciamientos();

    // Suscribirse a cambios en el formulario
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadFinanciamientos();
      });
  }

  loadFinanciamientos() {
    this.isLoading.set(true);

    const filters: FinanciamientoFilters = {
      ...this.filterForm.value,
      page: this.currentPage(),
      per_page: this.itemsPerPage(),
    };

    this.financiacionService.getFinanciamientos(filters).subscribe({
      next: (response) => {
        this.financiamientos.set(response.data);
        this.totalItems.set(response.meta.total);
        this.lastPage.set(response.meta.last_page);
        this.generatePagesArray();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar financiamientos:', error);
        this.isLoading.set(false);
      },
    });
  }

  generatePagesArray() {
    this.pages = Array.from({ length: this.lastPage() }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.lastPage()) {
      this.currentPage.set(page);
      this.loadFinanciamientos();
    }
  }

  showDetails(financiamiento: Financiamiento) {
    this.financiacionService
      .getFinanciamiento(financiamiento.id_financiamiento)
      .subscribe({
        next: (response) => {
          this.selectedFinanciamiento.set(response.data);
          this.isModalOpen.set(true);
        },
        error: (error) => {
          console.error('Error al cargar detalles:', error);
        },
      });
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedFinanciamiento.set(null);
  }

  // Helpers para el template
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount);
  }
}
