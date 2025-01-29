import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesMotosService } from '../../../services/services_motos/clientes-motos.service';

interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_usuario: string;
  tipo_documento: string;
  numero_documento: string;
  fecha_nacimiento: string;
  departamento: string;
  provincia: string;
  distrito: string;
  imagen?: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  perPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  loading: boolean = false;
  orderBy: string = 'nombre';
  orderDirection: 'asc' | 'desc' = 'asc';

  constructor(private clientesService: ClientesMotosService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.loading = true;
    this.clientesService
      .getClientes({
        page: this.currentPage,
        per_page: this.perPage,
        search: this.searchTerm,
        order_by: this.orderBy,
        order_direction: this.orderDirection,
      })
      .subscribe({
        next: (response) => {
          this.clientes = response.clientes;
          this.totalItems = response.pagination.total_items;
          this.totalPages = response.pagination.last_page;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando clientes:', error);
          this.loading = false;
        },
      });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadClientes();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadClientes();
  }

  toggleSort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = field;
      this.orderDirection = 'asc';
    }
    this.loadClientes();
  }

  getSortIcon(field: string): string {
    if (this.orderBy !== field) return '↕️';
    return this.orderDirection === 'asc' ? '↑' : '↓';
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
