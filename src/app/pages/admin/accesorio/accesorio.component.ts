import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AccesoriosService,
  Accesorio,
  AccesorioFilters,
} from '../../../services/services_motos/accesorios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accesorio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './accesorio.component.html',
  styleUrl: './accesorio.component.css',
})
export class AccesorioComponent implements OnInit {
  private accesoriosService = inject(AccesoriosService);
  protected Math = Math;

  // Signals para estado reactivo
  accesorios = signal<Accesorio[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Filtros y paginación
  filters: AccesorioFilters = {
    nombre: '',
    tipo: '',
    precio_min: undefined,
    precio_max: undefined,
    tipo_accesorio_id: undefined,
    sort_by: 'nombre',
    sort_order: 'asc',
    per_page: 10,
    page: 1,
  };

  // Metadata de paginación
  totalItems = signal(0);
  currentPage = signal(1);
  totalPages = signal(1);

  ngOnInit() {
    this.loadAccesorios();
  }

  /**
   * Carga los accesorios aplicando filtros
   */
  loadAccesorios() {
    this.loading.set(true);
    this.error.set(null);
    console.log('Loading accesorios with filters:', this.filters);

    this.accesoriosService.getAccesorios(this.filters).subscribe({
      next: (response) => {
        console.log('Response received:', response);
        if (response && response.data) {
          this.accesorios.set(
            Array.isArray(response.data) ? response.data : [response.data]
          );
          if (response.meta) {
            this.totalItems.set(response.meta.total);
            this.currentPage.set(response.meta.current_page);
            this.totalPages.set(response.meta.last_page);
          }
        } else {
          console.error('Invalid response format:', response);
          this.error.set('Formato de respuesta inválido');
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading accesorios:', error);
        this.error.set(error.message || 'Error al cargar los accesorios');
        this.loading.set(false);
      },
      complete: () => {
        console.log('Request completed');
        this.loading.set(false);
      },
    });
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.filters.page = page;
    this.loadAccesorios();
  }

  /**
   * Maneja la búsqueda
   */
  onSearch() {
    this.filters.page = 1; // Reset a primera página
    this.loadAccesorios();
  }

  /**
   * Maneja el cambio en el ordenamiento
   */
  onSort(field: string) {
    if (this.filters.sort_by === field) {
      this.filters.sort_order =
        this.filters.sort_order === 'asc' ? 'desc' : 'asc';
    } else {
      this.filters.sort_by = field;
      this.filters.sort_order = 'asc';
    }
    this.loadAccesorios();
  }

  /**
   * Elimina un accesorio
   */
  deleteAccesorio(id: number) {
    if (confirm('¿Estás seguro de eliminar este accesorio?')) {
      this.accesoriosService.deleteAccesorio(id).subscribe({
        next: () => {
          this.loadAccesorios();
        },
        error: (error) => {
          this.error.set('Error al eliminar el accesorio');
          console.error('Error:', error);
        },
      });
    }
  }

  /**
   * Limpia los filtros
   */
  clearFilters() {
    this.filters = {
      nombre: '',
      tipo: '',
      precio_min: undefined,
      precio_max: undefined,
      tipo_accesorio_id: undefined,
      sort_by: 'nombre',
      sort_order: 'asc',
      per_page: 10,
      page: 1,
    };
    this.loadAccesorios();
  }

  generatePageArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
