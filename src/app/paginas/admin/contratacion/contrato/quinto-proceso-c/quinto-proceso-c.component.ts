import { Component } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router, RouterLink } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quinto-proceso-c',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './quinto-proceso-c.component.html',
  styleUrls: ['./quinto-proceso-c.component.css'],
})
export class QuintoProcesoCComponent {
  selectedValue: string = '';
  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.modelo_contrato = this.selectedValue;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    /* localStorage.setItem('selectedValue', this.selectedValue); */

    this.router.navigate(['admin/contratacion/contrato/proceso_6']);
  }
}
