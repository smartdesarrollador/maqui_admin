import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepuestosService } from '../../../services/services_motos/repuestos.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
interface Repuesto {
  id_repuesto: number;
  nombre: string;
  tipo: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string;
  tipo_repuesto_id: number;
  tipoRepuesto?: {
    nombre: string;
  };
}

@Component({
  selector: 'app-repuesto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './repuesto.component.html',
  styleUrl: './repuesto.component.css',
})
export class RepuestoComponent implements OnInit {
  protected readonly baseUrl = environment.urlRaiz;
  private repuestosService = inject(RepuestosService);

  // Signals para estado reactivo
  repuestos = signal<Repuesto[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  perPage = signal(10);
  searchTerm = signal('');
  isLoading = signal(false);

  // Subject para manejar la búsqueda con debounce
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadRepuestos();
    this.setupSearch();
  }

  private setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm.set(term);
        this.currentPage.set(1);
        this.loadRepuestos();
      });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  loadRepuestos() {
    this.isLoading.set(true);

    this.repuestosService
      .getRepuestos(this.currentPage(), this.perPage(), this.searchTerm())
      .subscribe({
        next: (response) => {
          this.repuestos.set(response.data.data);
          this.totalPages.set(response.data.last_page);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error cargando repuestos:', error);
          this.isLoading.set(false);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadRepuestos();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  deleteRepuesto(id: number) {
    if (confirm('¿Está seguro de eliminar este repuesto?')) {
      this.repuestosService.deleteRepuesto(id).subscribe({
        next: () => {
          this.loadRepuestos();
        },
        error: (error) => {
          console.error('Error eliminando repuesto:', error);
        },
      });
    }
  }
}
