import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CotizacionService } from '../../../services/services_motos/cotizacion.service';
import { toSignal } from '@angular/core/rxjs-interop';

interface CotizacionFilters {
  estado?: string;
  precio_min?: number;
  precio_max?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  cliente?: string;
  moto?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css',
})
export class CotizacionComponent implements OnInit {
  protected readonly Math = Math;
  private cotizacionService = inject(CotizacionService);

  // Signals para estado reactivo
  filters = signal<CotizacionFilters>({
    per_page: 10,
    page: 1,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  cotizaciones = signal<any[]>([]);
  totalItems = signal(0);
  selectedCotizacion = signal<any>(null);
  showModal = signal(false);

  loading = signal(false);

  ngOnInit() {
    this.loadCotizaciones();
  }

  loadCotizaciones() {
    this.loading.set(true);
    this.cotizacionService.getCotizaciones(this.filters()).subscribe({
      next: (response) => {
        this.cotizaciones.set(response.data);
        this.totalItems.set(response.total);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error cargando cotizaciones:', error);
        this.loading.set(false);
      },
    });
  }

  // Métodos para filtros
  applyFilters(filters: Partial<CotizacionFilters>) {
    this.filters.update((current) => ({
      ...current,
      ...filters,
      page: 1, // Reset a primera página al filtrar
    }));
    this.loadCotizaciones();
  }

  // Paginación
  onPageChange(page: number) {
    this.filters.update((current) => ({
      ...current,
      page,
    }));
    this.loadCotizaciones();
  }

  // Ordenamiento
  sort(field: string) {
    const currentOrder = this.filters().sort_order;
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

    this.filters.update((current) => ({
      ...current,
      sort_by: field,
      sort_order: newOrder,
    }));
    this.loadCotizaciones();
  }

  // Modal
  openDetailModal(cotizacion: any) {
    this.selectedCotizacion.set(cotizacion);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedCotizacion.set(null);
  }

  // Formateo de moneda
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount);
  }

  getPages(): number[] {
    return Array(Math.ceil(this.totalItems() / this.filters().per_page!))
      .fill(0)
      .map((_, i) => i + 1);
  }
}
