import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabla1Service } from '../tabla1.service';
import { Tabla1 } from '../tabla1';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-tabla1',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './list-tabla1.component.html',
  styleUrl: './list-tabla1.component.css',
})
export class ListTabla1Component implements OnInit {
  dominio = environment.dominio;
  tablas: Tabla1[] = [];
  p: number = 1;

  constructor(private tabla1Service: Tabla1Service) {}

  ngOnInit(): void {
    this.getTablas();
  }

  getTablas(): void {
    this.tabla1Service.getTablas().subscribe({
      next: (data) => (this.tablas = data),
      error: (err) => console.error('Error fetching data', err),
    });
  }

  deleteTabla(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.tabla1Service.deleteTabla(id).subscribe({
        next: () => {
          this.tablas = this.tablas.filter((tabla) => tabla.id !== id);
          /* alert('Registro eliminado satisfactoriamente'); */
          this.alertaDelete();
        },
        error: (err) => console.error('Error deleting record', err),
      });
    }
  }

  alertaDelete() {
    Swal.fire({
      icon: 'success',
      title: 'Registro eliminado',
    });
  }
}
