import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotosService } from '../../../services/services_motos/motos.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Interfaces
interface Moto {
  id_moto: number;
  modelo_id: number;
  tipo_moto_id: number;
  año: string;
  precio_base: string;
  color: string;
  stock: number;
  descripcion: string;
  imagen: string;
  cilindrada: string;
  motor: string;
  potencia: string;
  modelo: {
    nombre: string;
    marca: {
      nombre: string;
    };
  };
  tipo_moto: {
    nombre: string;
  };
}

@Component({
  selector: 'app-moto',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, RouterModule],
  templateUrl: './moto.component.html',
  styleUrl: './moto.component.css',
})
export class MotoComponent implements OnInit {
  protected readonly baseUrl = environment.urlRaiz;

  protected readonly Math = Math;
  protected readonly Array = Array;

  private motosService = inject(MotosService);

  // Propiedades para la lista
  motos: Moto[] = [];
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 10;

  // Propiedades para filtros
  searchTerm = '';
  precioMin?: number;
  precioMax?: number;
  selectedTipoMoto?: number;
  orderBy = 'created_at';
  orderDirection: 'asc' | 'desc' = 'desc';

  // Estado de carga
  isLoading = false;

  ngOnInit() {
    this.loadMotos();
  }

  /**
   * Carga la lista de motos con los filtros actuales
   */
  loadMotos() {
    this.isLoading = true;

    this.motosService
      .getMotos({
        page: this.currentPage,
        per_page: this.itemsPerPage,
        search: this.searchTerm || undefined,
        precio_min: this.precioMin,
        precio_max: this.precioMax,
        tipo_moto_id: this.selectedTipoMoto,
        order_by: this.orderBy,
        order_direction: this.orderDirection,
      })
      .subscribe({
        next: (response) => {
          this.motos = response.data;
          this.totalItems = response.total;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar motos:', error);
          this.isLoading = false;
        },
      });
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMotos();
  }

  /**
   * Maneja la búsqueda
   */
  onSearch() {
    this.currentPage = 1; // Reset a la primera página
    this.loadMotos();
  }

  /**
   * Limpia los filtros
   */
  clearFilters() {
    this.searchTerm = '';
    this.precioMin = undefined;
    this.precioMax = undefined;
    this.selectedTipoMoto = undefined;
    this.orderBy = 'created_at';
    this.orderDirection = 'desc';
    this.currentPage = 1;
    this.loadMotos();
  }

  /**
   * Cambia el ordenamiento
   */
  toggleSort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = field;
      this.orderDirection = 'asc';
    }
    this.loadMotos();
  }

  /**
   * Elimina una moto
   */
  deleteMoto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta moto?')) {
      this.motosService.deleteMoto(id).subscribe({
        next: () => {
          this.loadMotos();
        },
        error: (error) => {
          console.error('Error al eliminar moto:', error);
        },
      });
    }
  }
}
