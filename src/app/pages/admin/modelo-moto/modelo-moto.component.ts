import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModelosMotosService } from '../../../services/services_motos/modelos-motos.service';
import { NgOptimizedImage } from '@angular/common';

interface Marca {
  id_marca: number;
  nombre: string;
  origen: string;
  fundacion: string;
  logo: string;
}

interface Modelo {
  id_modelo: number;
  marca_id: number;
  nombre: string;
  tipo_moto_id: number;
  cilindrada: number;
  imagen: string;
  marca: Marca;
  motos: any[];
}

@Component({
  selector: 'app-modelo-moto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './modelo-moto.component.html',
  styleUrl: './modelo-moto.component.css',
})
export class ModeloMotoComponent implements OnInit {
  private modelosService = inject(ModelosMotosService);

  // Estado
  modelos: Modelo[] = [];
  isLoading = false;
  searchTerm = '';
  selectedTipo = 0;

  // Tipos de motos para filtrar (ahora con IDs)
  tiposModelos = [
    { id: 1, nombre: 'Deportiva' },
    { id: 2, nombre: 'Scooter' },
    { id: 3, nombre: 'Adventure' },
    { id: 4, nombre: 'Naked' },
  ];

  ngOnInit() {
    this.loadModelos();
  }

  /**
   * Carga la lista de modelos
   */
  loadModelos() {
    this.isLoading = true;
    this.modelosService.getModelos().subscribe({
      next: (data) => {
        this.modelos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar modelos:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Filtra los modelos según los criterios de búsqueda
   */
  get filteredModelos(): Modelo[] {
    return this.modelos.filter((modelo) => {
      const matchesSearch =
        modelo.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        modelo.marca.nombre
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesTipo =
        this.selectedTipo === 0 || modelo.tipo_moto_id === this.selectedTipo;
      return matchesSearch && matchesTipo;
    });
  }

  /**
   * Elimina un modelo
   */
  deleteModelo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este modelo?')) {
      this.modelosService.deleteModelo(id).subscribe({
        next: () => {
          this.loadModelos();
        },
        error: (error) => {
          console.error('Error al eliminar modelo:', error);
        },
      });
    }
  }

  /**
   * Limpia los filtros
   */
  clearFilters() {
    this.searchTerm = '';
    this.selectedTipo = 0;
  }

  /**
   * Devuelve el nombre del tipo según el ID
   */
  getTipoNombre(tipoId: number): string {
    const tipo = this.tiposModelos.find((t) => t.id === tipoId);
    return tipo ? tipo.nombre : 'Desconocido';
  }
}
